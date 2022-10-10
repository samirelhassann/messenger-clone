import React from "react";
import {
  Container,
  IntroImage,
  IntroTitle,
  IntroDescription,
  ConnectButton,
  ConnectionButtons,
} from "./ChatIntro.styles";

import LinkOffIcon from "@material-ui/icons/LinkOff";
import GoogleIcon from "@mui/icons-material/Google";
import FacbookIcon from "@mui/icons-material/Facebook";
import Api from "../../Api";
import { useDispatch } from "react-redux";
import { loadingInfos } from "../../redux/reducers/userReducer";

interface Props {
  isUserLogged: boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loginAction: (u: any) => Promise<void>;
}

const ChatIntro = ({ isUserLogged, loginAction }: Props) => {
  const dispatch = useDispatch();

  const handleGCPLogin = async () => {
    dispatch(loadingInfos());
    const result = await Api.gcpPopup();

    if (result) loginAction(result.user);
  };

  const handleFbLogin = async () => {
    dispatch(loadingInfos());
    const result = await Api.fbPopup();

    if (result) loginAction(result.user);
  };

  return (
    <Container>
      {isUserLogged && (
        <>
          <IntroImage src={require("../../assets/whatsIntro.jpg")} />
          <IntroTitle>Keep your cellphone connected.</IntroTitle>
          <IntroDescription>
            Send and receive messages withour keeping your phone online. Use
            Whatsapp on up to 4 linked devices and 1 phone at the same time.
          </IntroDescription>
        </>
      )}

      {!isUserLogged && (
        <>
          <LinkOffIcon
            style={{ color: "#42CBA5", width: "100px", height: "100px" }}
          />
          <IntroTitle>You are not connected.</IntroTitle>

          <ConnectionButtons>
            <ConnectButton onClick={handleGCPLogin}>
              Connect
              <GoogleIcon
                style={{
                  color: "#FFF",
                  width: "30px",
                  height: "30px",
                  marginLeft: "5px",
                }}
              />
            </ConnectButton>

            <ConnectButton onClick={handleFbLogin}>
              Connect
              <FacbookIcon
                style={{
                  color: "#FFF",
                  width: "30px",
                  height: "30px",
                  marginLeft: "5px",
                }}
              />
            </ConnectButton>
          </ConnectionButtons>
        </>
      )}
    </Container>
  );
};

export default ChatIntro;
