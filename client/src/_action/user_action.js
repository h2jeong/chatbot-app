import { LOGIN_USER, REGISTER_USER } from "./types";
import axios from "axios";
import { USER_SERVER } from "../components/Config.js";

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then(res => res.data);

  return { type: LOGIN_USER, payload: request };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .then(res => res.data);

  return { type: REGISTER_USER, payload: request };
}
