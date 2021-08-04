import { createStore } from "redux";
import { authReducer } from "./reducer/authreducer";

const store = createStore(authReducer);

export default store;
