import {
  GETPOST_LOADING,
  GETPOST_SUCCESS,
  GETPOST_ERROR,
  POSTED,
} from "../actionsTypes";

const initialState = {
  loading: false,
  posts: [],
  error: "",
  posted: null,
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
        ...state,
        posts: action.payload,
        error: "",
        loading: false,
      };
    case GETPOST_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case POSTED:
      return {
        ...state,
        posted: action.payload,
      };
    default:
      return state;
  }
};

export { postReducer };
