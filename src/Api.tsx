import firebase from "firebase/compat/app";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import firebaseConfig from "./firebaseConfig";

import { User } from "./interfaces/User";
import Chat from "./interfaces/Chat";
import moment from "moment";
import Message from "./interfaces/Message";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default {
  fbPopup: async () => {
    const auth = getAuth();
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
  },

  gcpPopup: async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  },

  addUser: async (user: User) => {
    await db.collection("users").doc(user.id).set(
      {
        name: user.name,
        avatar: user.avatar,
      },
      { merge: true }
    );
  },

  getAllUsers: async (userId: string) => {
    const results = await db.collection("users").get();

    return results.docs
      .map((result) => {
        const data = result.data();

        return {
          id: result.id,
          name: data.name,
          avatar: data.avatar,
        } as User;
      })
      .filter((item) => item.id !== userId);
  },

  addNewChat: async (loggedUser: User, userToChat: User) => {
    const newChat = await db.collection("chats").add({
      messages: [],
      users: [loggedUser.id, userToChat.id],
    });

    db.collection("users")
      .doc(loggedUser.id)
      .update({
        chats: firebase.firestore.FieldValue.arrayUnion({
          chatId: newChat.id,
          title: userToChat.name,
          image: userToChat.avatar,
          with: userToChat.id,
        }),
      });

    db.collection("users")
      .doc(userToChat.id)
      .update({
        chats: firebase.firestore.FieldValue.arrayUnion({
          chatId: newChat.id,
          title: loggedUser.name,
          image: loggedUser.avatar,
          with: loggedUser.id,
        }),
      });
  },

  onChatList: (
    userId: string,
    chatListAction: (userChats: Array<Chat>) => void
  ) => {
    return db
      .collection("users")
      .doc(userId)
      .onSnapshot((doc) => {
        if (doc.exists) {
          const data = doc.data();

          if (data?.chats) {
            chatListAction(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              data.chats.map((chat: any) => {
                return {
                  ...chat,
                  date: chat.date?.seconds
                    ? moment(chat.date?.seconds * 1000).format("HH:mm")
                    : "",
                };
              })
            );
          }
        }
      });
  },

  onChatContent: (
    chatId: string,
    setList: (list: Array<Message>) => void,
    setUsers: (list: Array<string>) => void
  ) => {
    return db
      .collection("chats")
      .doc(chatId)
      .onSnapshot((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setList(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data?.messages.map((message: any) => {
              return {
                ...message,
                date: moment(message.date.seconds * 1000).format("HH:mm"),
              };
            })
          );
          setUsers(data?.users);
        }
      });
  },

  sendMessage: (
    chatData: Chat,
    userId: string,
    type: string,
    body: string,
    users: Array<string>
  ) => {
    db.collection("chats")
      .doc(chatData.chatId)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          type,
          author: userId,
          body,
          date: new Date(),
        }),
      });

    users.forEach(async (user) => {
      const u = await db.collection("users").doc(user).get();
      const uData = u.data();

      if (uData?.chats) {
        const chats = [...uData.chats];

        chats
          .filter((chat) => chat.chatId === chatData.chatId)
          .forEach((chat) => {
            chat.lastMessage = body;
            chat.date = new Date();
          });

        await db.collection("users").doc(user).update({
          chats,
        });
      }
    });
  },
};
