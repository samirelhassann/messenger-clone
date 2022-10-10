import styled from "styled-components";

export const Container = styled.div`
  width: 35%;
  max-width: 415px;
  position: fixed;
  left: ${(props) => (props.setIsOpen ? "0" : "-500px")};
  top: 0;
  bottom: 0;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ddd;
  transition: all ease 0.3s;
`;

export const Header = styled.div`
  display: flex;
  background-color: #00a884;
  align-items: center;
  padding: 60px 15px 15px 15px;
`;

export const BackButton = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const HeaderTitle = styled.div`
  font-size: 19px;
  color: #fff;
  height: 40px;
  line-height: 40px;
  flex: 1;
  font-wight: bold;
  margin-left: 10px;
`;

export const ContactList = styled.div`
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
