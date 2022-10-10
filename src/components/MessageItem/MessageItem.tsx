import React from "react";
import {
  Item,
  MessageDate,
  MessageLine,
  MessageText,
} from "./MessageItem.styles";

interface Props {
  text: string;
  isOtherPerson: boolean;
  date: string;
}

const MessageItem = ({ text, isOtherPerson, date }: Props) => {
  return (
    <MessageLine isOtherPerson={isOtherPerson}>
      <Item isOtherPerson={isOtherPerson}>
        <MessageText>{text}</MessageText>
        <MessageDate>{date}</MessageDate>
      </Item>
    </MessageLine>
  );
};

export default MessageItem;
