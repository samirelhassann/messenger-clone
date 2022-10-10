import Chat from "./Chat";

export interface User {
  id: string;
  avatar: string;
  name: string;
  chats?: Array<Chat>;
  isLogged?: boolean;
  isLoading?: boolean;
}
