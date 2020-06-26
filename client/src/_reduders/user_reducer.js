import { REGISTER_USER, LOGIN_USER } from "../_action/types";

export default function(state = {}, action) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case LOGIN_USER:
      return { ...state, login: action.payload };
    default:
      return state;
  }
}
