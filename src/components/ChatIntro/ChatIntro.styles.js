import styled from "styled-components";

export const Container = styled.div`
  background-color: #f0f2f5;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
  text-align: center;
`;

export const IntroImage = styled.img`
  width: 470px;
  height: auto;
`;

export const ConnectButton = styled.div`
  width: 150px;
  height: 40px;
  border: none;
  background-color: #42cba5;
  cursor: pointer;
  border-radius: 5px;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  transition: all ease 0.3s;
  box-shadow: 0 1px 1px #ccc;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;

  margin: 0px 20px;

  &:hover {
    background-color: #ccc;
  }
`;

export const IntroTitle = styled.h1`
  color: #41525d;
  font-size: 30px;
  font-weight: 500;
`;

export const IntroDescription = styled.h2`
  color: #41525d;
  font-size: 20px;
  font-weight: 300;
`;

export const ConnectionButtons = styled.div`
  display: flex;
`;
