import styled from "styled-components";

export const Item = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  height: 70px;
  background-color: ${(props) => (props.isActive ? "#EBEBEB" : "transparent")};
  opacity: ${(props) => props.opacityLevel};

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: 15px;
`;

export const LinesContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid #eee;
  padding-right: 15px;
  margin-left: 10px;
  height: 70%;

  flex-wrap: wrap;
  min-width: 0;
`;

export const Line = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const ContactName = styled.div`
  font-size: 17px;
  color: #000;
  margin-bottom: 4px;
`;

export const ContactDate = styled.div`
  font-size: 12px;
  color: #999;
  font-weight: bold;
`;

export const ContactLastText = styled.div`
  font-size: 14px;
  color: #999;
  display: flex;
  width: 100%;
  font-weight: bold;
`;

export const LastText = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0;
`;
