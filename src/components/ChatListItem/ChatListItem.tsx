import { Skeleton } from "@mui/material";
import React from "react";
import {
  Avatar,
  ContactDate,
  ContactLastText as LastTextContainer,
  ContactName,
  Item,
  LastText,
  Line,
  LinesContainer,
} from "./ChatListItem.styles";

interface Props {
  contactName?: string;
  lastMessage?: string;
  image?: string;
  date?: string;
  isActive?: boolean;
  isLoading?: boolean;
  opacityLevel?: number;
  onClick?: () => void;
}

const ChatListItem = ({
  contactName,
  lastMessage,
  image = require("../../assets/default-contact-image.png"),
  date,
  isActive = false,
  isLoading = false,
  opacityLevel = 1,
  onClick,
}: Props) => {
  return (
    <Item onClick={onClick} isActive={isActive} opacityLevel={opacityLevel}>
      {isLoading && (
        <Skeleton
          variant="circular"
          width={50}
          height={50}
          style={{ borderRadius: "50%", marginLeft: "15px" }}
        />
      )}
      {!isLoading && (
        <Avatar
          src={image || require("../../assets/default-contact-image.png")}
        />
      )}

      <LinesContainer>
        {isLoading && (
          <Line>
            <Skeleton variant="rectangular" width={100} height={17} />
          </Line>
        )}

        {!isLoading && (
          <Line>
            <ContactName>{contactName}</ContactName>
            <ContactDate>{date}</ContactDate>
          </Line>
        )}

        <Line>
          <LastTextContainer>
            {isLoading && (
              <Skeleton
                variant="rectangular"
                width={200}
                height={17}
                style={{ marginTop: "5px" }}
              />
            )}
            {!isLoading && <LastText>{lastMessage}</LastText>}
          </LastTextContainer>
        </Line>
      </LinesContainer>
    </Item>
  );
};

export default ChatListItem;
