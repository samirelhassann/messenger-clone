import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ChatHeader = styled.div`
  height: 60px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Avatar = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-left: 15px;
  margin-right: 15px;
`;

export const ContactName = styled.div`
  font-size: 17px;
  color: #000;
`;

export const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

export const HeaderButton = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #ccc;
  }
`;

export const ChatBody = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: #e5ddd5;
  background-size: cover;
  background-position: top;
  background-image: ${(props) => `url(${props.backgroundImage})`};
  padding: 20px 30px;

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export const ChatFooter = styled.div`
  height: 62px;
  display: flex;
  align-items: center;
`;

export const LeftFooterButtons = styled.div`
  display: flex;
  margin: 0px 15px;
`;

export const FooterInput = styled.div`
  flex: 1;
`;

export const EmojiArea = styled.div`
  overflow-y: hidden;
  transition: all ease 0.3s;
  height: ${(props) => (props.isOpen ? "auto" : "0px")};

  aside.EmojiPickerReact.epr-main {
    width: 100% !important;
  }

  .EmojiPickerReact .Flex.FlexRow {
    display: none;
  }
`;

export const RightFooterButtons = styled.div`
  display: flex;
  margin: 0px 15px;
`;

export const InputText = styled.input`
  width: 100%;
  height: 40px;
  border: 0;
  outline: 0;
  background-color: #fff;
  border-radius: 20px;
  font-size: 15px;
  color: #4a4a4a;
  padding-left: 15px;
`;
