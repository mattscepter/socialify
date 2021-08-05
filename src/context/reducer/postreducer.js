import {
  GETPOST_LOADING,
  GETPOST_SUCCESS,
  GETPOST_ERROR,
} from "../actionsTypes";

const initialState = {
  loading: false,
  posts: [],
  error: "",
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETPOST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GETPOST_SUCCESS:
      return {
        loading: false,
        posts: action.payload,
        error: "",
      };
    case GETPOST_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export { postReducer };
