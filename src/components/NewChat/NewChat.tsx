import React, { useState, useEffect } from "react";
import {
  BackButton,
  ContactList,
  Container,
  Header,
  HeaderTitle,
} from "./NewChat.styles";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { User } from "../../interfaces/User";
import ChatListItem from "../ChatListItem/ChatListItem";
import Chat from "../../interfaces/Chat";
import Api from "../../Api";

interface Props {
  loggedUser: User;
  isOpen: boolean;
  chatList: Array<Chat>;
  closeAction: () => void;
}

const NewChat = ({ loggedUser, isOpen, chatList, closeAction }: Props) => {
  const [list, setList] = useState<Array<User>>([]);

  useEffect(() => {
    Api.getAllUsers(loggedUser.id).then((result) => {
      setList(result);
    });
  }, []);

  const addNewChat = async (user: User) => {
    await Api.addNewChat(loggedUser, user);

    closeAction();
  };

  return (
    <Container setIsOpen={isOpen}>
      <Header>
        <BackButton onClick={closeAction}>
          <ArrowBackIcon style={{ color: "#FFF" }} />
        </BackButton>
        <HeaderTitle>New Chat</HeaderTitle>
      </Header>
      <ContactList>
        {list
          .filter((l) => !chatList.some((cl) => cl.with === l.id))
          .map((item, key) => (
            <ChatListItem
              key={key}
              contactName={item.name}
              image={item.avatar}
              onClick={() => addNewChat(item)}
            />
          ))}
      </ContactList>
    </Container>
  );
};

export default NewChat;
