import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_USER,
  GETUSER_LOADING,
  EDIT_DATA,
  ONLINE_USERS,
} from "../actionsTypes";

const initialState = {
  getuserloading: false,
  loading: false,
  user: {},
  error: "",
  authstate: false,
  socket: null,
  edited: null,
  onlineusers: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETUSER_LOADING:
      return {
        ...state,
        getuserloading: true,
      };
    case LOGIN_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        authstate: true,
        loading: false,
        getuserloading: false,
        user: action.payload.userData,
        error: "",
        socket: action.payload.socket,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        getuserloading: false,
        user: [],
        error: action.payload,
        authstate: false,
        socket: null,
      };
    case LOGOUT_USER:
      return {
        ...state,
        loading: false,
        getuserloading: false,
        user: [],
        error: "",
        authstate: false,
        socket: null,
      };
    case EDIT_DATA:
      return {
        ...state,
        edited: action.payload,
      };
    case ONLINE_USERS:
      return {
        ...state,
        onlineusers: action.payload,
      };
    default:
      return state;
  }
};

export { authReducer, initialState };
