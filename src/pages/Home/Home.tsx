import React, { useEffect, useState } from "react";
import {
  AppWindow,
  AvatarImage,
  Body,
  ChatList,
  ContentArea,
  Header,
  HeaderButton,
  HeaderButtons,
  Search,
  SearchContainer,
  SearchInput,
  SideBar,
} from "./Home.styles";

import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks/useAppSelector";
import { login } from "../../redux/reducers/userReducer";

import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";

import Chat from "../../interfaces/Chat";

import ChatListItem from "../../components/ChatListItem/ChatListItem";
import ChatIntro from "../../components/ChatIntro/ChatIntro";
import ChatWindow from "../../components/ChatWindow/ChatWindow";
import NewChat from "../../components/NewChat/NewChat";
import Api from "../../Api";
import { Skeleton } from "@mui/material";

const Home = () => {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user);

  const [chatList, setChatList] = useState<Array<Chat>>([]);
  const [activeChat, setActiveChat] = useState<Chat>();
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const [isContactListLoading, setIsContactListLoading] = useState(false);

  useEffect(() => {
    if (user.isLoading) setIsContactListLoading(true);

    if (user.isLogged) {
      setIsContactListLoading(true);
      const unsub = Api.onChatList(user.id, setChatList);
      setIsContactListLoading(false);

      return unsub;
    }
  }, [user]);

  const handleChatClick = (selectedChat: Chat) => {
    setActiveChat(selectedChat);
  };

  const handleClickNewChat = () => {
    setIsNewChatOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLoginData = async (u: any) => {
    const newUser = {
      id: u.uid,
      name: u.displayName,
      avatar: u.photoURL,
    };

    dispatch(login(newUser));

    await Api.addUser(newUser);
  };

  return (
    <Body>
      <AppWindow>
        <SideBar>
          {user.isLogged && (
            <NewChat
              loggedUser={user}
              isOpen={isNewChatOpen}
              chatList={chatList}
              closeAction={() => setIsNewChatOpen(false)}
            />
          )}

          <Header>
            {user.isLoading && (
              <Skeleton variant="circular" width={40} height={40} />
            )}

            {!user.isLoading && (
              <AvatarImage
                src={
                  user.isLogged
                    ? user?.avatar
                    : require("../../assets/default-contact-image.png")
                }
              />
            )}

            {user.isLogged && (
              <HeaderButtons>
                <HeaderButton>
                  <DonutLargeIcon style={{ color: "#919191" }} />
                </HeaderButton>
                <HeaderButton onClick={handleClickNewChat}>
                  <ChatIcon style={{ color: "#919191" }} />
                </HeaderButton>
                <HeaderButton>
                  <MoreVertIcon style={{ color: "#919191" }} />
                </HeaderButton>
              </HeaderButtons>
            )}
          </Header>
          <Search>
            <SearchContainer>
              <SearchIcon fontSize="small" style={{ color: "#919191" }} />
              <SearchInput
                type="search"
                placeholder="Search or Start a new chat"
                disabled={!user.isLogged}
              />
            </SearchContainer>
          </Search>
          <ChatList>
            {isContactListLoading &&
              Array(10)
                .fill(1)
                .map((item, index) => (
                  <ChatListItem
                    key={index}
                    isLoading
                    opacityLevel={1.1 - 0.1 * index}
                  />
                ))}

            {user.isLogged &&
              !isContactListLoading &&
              chatList.map((item, key) => (
                <ChatListItem
                  key={key}
                  isActive={activeChat?.chatId === item.chatId}
                  contactName={item.title}
                  image={item.image}
                  lastMessage={item.lastMessage}
                  date={item.date}
                  onClick={() => handleChatClick(item)}
                />
              ))}
          </ChatList>
        </SideBar>
        <ContentArea>
          {!activeChat && (
            <ChatIntro
              isUserLogged={user.isLogged || false}
              loginAction={handleLoginData}
            />
          )}

          {activeChat && user && (
            <ChatWindow loggedUser={user} activeChat={activeChat} />
          )}
        </ContentArea>
      </AppWindow>
    </Body>
  );
};

export default Home;
