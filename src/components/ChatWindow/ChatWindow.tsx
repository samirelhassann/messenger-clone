import React, { useState, useEffect, useRef } from "react";
import {
  Avatar,
  ChatBody,
  ChatFooter,
  ChatHeader,
  ContactName,
  Container,
  EmojiArea,
  FooterInput,
  HeaderButton,
  HeaderButtons,
  HeaderInfo,
  InputText,
  LeftFooterButtons,
  RightFooterButtons,
} from "./ChatWindow.styles";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";
import MicIcon from "@material-ui/icons/Mic";
import MessageItem from "../MessageItem/MessageItem";
import Message from "../../interfaces/Message";
import { User } from "../../interfaces/User";
import Chat from "../../interfaces/Chat";
import Api from "../../Api";

interface Props {
  loggedUser: User;
  activeChat: Chat;
}

const ChatWindow = ({ loggedUser, activeChat }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let recognition: any = null;

  const speechRecognition =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).SpeechRecognition ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).webkitSpeechRecognition;

  if (speechRecognition !== undefined) recognition = new speechRecognition();

  const [emojiOpen, setEmojiOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [listening, setListening] = useState(false);
  const [chatList, setChatList] = useState<Array<Message>>([]);
  const [users, setUsers] = useState<Array<string>>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body = useRef<any>();

  useEffect(() => {
    setChatList([]);
    const unsub = Api.onChatContent(activeChat.chatId, setChatList, setUsers);
    return unsub;
  }, [activeChat.chatId]);

  useEffect(() => {
    setInputText("");

    if (body.current && body.current.scrollHeight > body.current.offsetHeight)
      body.current.scrollTop =
        body.current.scrollHeight - body.current.offsetHeight;
  }, [chatList]);

  const handleEmojiClick = (emoji: EmojiClickData) => {
    setInputText(`${inputText}${emoji.emoji}`);
  };

  const handleEmoticonInputClick = () => {
    setEmojiOpen(!emojiOpen);
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputText(e.currentTarget.value);
  };

  const handleSendText = () => {
    return null;
  };

  const handleSendMic = () => {
    if (recognition !== null) {
      recognition.onstart = () => {
        setListening(true);
      };
      recognition.onend = () => {
        setListening(false);
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (e: any) => {
        setInputText(e.results[0][0].transcript);
      };

      recognition.start();
    }
  };

  const handleOnKeyUp = (e: KeyboardEvent) => {
    if (e.key == "Enter") handleSendClick();
  };

  const handleSendClick = () => {
    if (inputText.trim() !== "") {
      Api.sendMessage(activeChat, loggedUser.id, "text", inputText, users);
      setInputText("");
      setEmojiOpen(false);
    }
  };

  return (
    <Container>
      <ChatHeader>
        <HeaderInfo>
          <Avatar src={activeChat.image}></Avatar>
          <ContactName> {activeChat.title}</ContactName>
        </HeaderInfo>

        <HeaderButtons>
          <HeaderButton>
            <SearchIcon style={{ color: "#919191" }} />
          </HeaderButton>
          <HeaderButton>
            <AttachFileIcon style={{ color: "#919191" }} />
          </HeaderButton>
          <HeaderButton>
            <MoreVertIcon style={{ color: "#919191" }} />
          </HeaderButton>
        </HeaderButtons>
      </ChatHeader>
      <ChatBody
        ref={body}
        backgroundImage={require("../../assets/background-chat.jpg")}
      >
        {chatList.map((chat, key) => (
          <MessageItem
            key={key}
            text={chat.body}
            date={chat.date}
            isOtherPerson={chat.author !== loggedUser.id}
          />
        ))}
      </ChatBody>
      <EmojiArea isOpen={emojiOpen}>
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          lazyLoadEmojis={false}
          skinTonesDisabled
        />
      </EmojiArea>
      <ChatFooter>
        <LeftFooterButtons>
          {emojiOpen && (
            <HeaderButton onClick={handleEmoticonInputClick}>
              <CloseIcon style={{ color: "#919191" }} />
            </HeaderButton>
          )}
          {!emojiOpen && (
            <HeaderButton onClick={handleEmoticonInputClick}>
              <InsertEmoticonIcon style={{ color: "#919191" }} />
            </HeaderButton>
          )}
        </LeftFooterButtons>

        <FooterInput>
          <InputText
            type="text"
            placeholder="Type something..."
            value={inputText}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              handleInputChange(e)
            }
            onKeyUp={handleOnKeyUp}
          />
        </FooterInput>

        <RightFooterButtons>
          {inputText !== "" && (
            <HeaderButton onClick={handleSendText}>
              <SendIcon
                style={{ color: "#919191" }}
                onClick={handleSendClick}
              />
            </HeaderButton>
          )}

          {inputText === "" && (
            <HeaderButton onClick={handleSendMic}>
              <MicIcon style={{ color: listening ? "#126EcE" : "#919191" }} />
            </HeaderButton>
          )}
        </RightFooterButtons>
      </ChatFooter>
    </Container>
  );
};

export default ChatWindow;
