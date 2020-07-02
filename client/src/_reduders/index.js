import { combineReducers } from "redux";
import user from "./user_reducer";
import chat from "./chat_reducer";
import chatbot from "./chatbot_reducer";

const rootReducer = combineReducers({
  user,
  chat,
  chatbot
});

export default rootReducer;
