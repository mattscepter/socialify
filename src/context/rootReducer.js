import { authReducer } from "./reducer/authreducer";
import { postReducer } from "./reducer/postreducer";
import { followerReducer } from "./reducer/followerreducer";
import { combineReducers } from "redux";
import { profileReducer } from "./reducer/profilereducer";
import { convoReducer } from "./reducer/convoreducer";

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
  follower: followerReducer,
  profile: profileReducer,
  convo: convoReducer,
});

export default rootReducer;
