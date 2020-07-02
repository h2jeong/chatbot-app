import Axios from "axios";
import { GET_CHATS } from "./types";
import { CHAT_SERVER } from "../components/Config";

export function getChats() {
  const request = Axios.get(`${CHAT_SERVER}/getChats`).then(res => res.data);

  return { type: GET_CHATS, payload: request };
}
