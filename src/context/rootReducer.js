import { authReducer } from "./reducer/authreducer";
import { postReducer } from "./reducer/postreducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
});

export default rootReducer;
