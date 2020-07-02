import Axios from "axios";
import { GET_CHATS, AFTER_POST_MESSAGE } from "./types";
import { CHAT_SERVER } from "../components/Config";

export function getChats() {
  const request = Axios.get(`${CHAT_SERVER}/getChats`).then(res => res.data);

  return { type: GET_CHATS, payload: request };
}

export function afterPostMessage(data) {
  return { type: AFTER_POST_MESSAGE, payload: data };
}
