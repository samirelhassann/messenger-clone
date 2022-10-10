import styled from "styled-components";

export const MessageLine = styled.div`
  margin: 10px;
  display: flex;
  justify-content: ${(props) =>
    props.isOtherPerson ? "flex-start" : "flex-end"};
`;

export const Item = styled.div`
  display: flex;
  background-color: ${(props) => (props.isOtherPerson ? "#fff" : "#D9FDD3")};
  border-radius: 10px;
  padding: 8px;
  box-shadow: 0 1px 1px #ccc;
  flex-direction: column;
  max-width: 90%;
`;

export const MessageText = styled.div`
  font-size: 16px;
  margin: 5px 40px 5px 5px;
`;

export const MessageDate = styled.div`
  font-size: 14px;
  color: #999;
  text-align: right;
  margin-right: 2px;
  height: 15px;
  margin-top: -15px;
`;
