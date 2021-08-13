import {
  GETPROFILE_FOLLOWERS,
  POST_COUNT,
  GETPROFILE_USER,
  GETPROFILE_POST,
  PROFILEPOST_LOADING,
  PROFILE_LOADING,
} from "../actionsTypes";

const initialState = {
  postcount: null,
  followers: {
    followers: [],
    following: [],
  },
  user: {},
  post: [],
  profileloading: false,
  profilepostlaoding: false,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_COUNT:
      return {
        ...state,
        postcount: action.payload,
      };
    case GETPROFILE_FOLLOWERS:
      return {
        ...state,
        followers: action.payload,
      };
    case GETPROFILE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case GETPROFILE_POST:
      return {
        ...state,
        post: action.payload,
      };
    case PROFILEPOST_LOADING:
      return {
        ...state,
        profilepostlaoding: action.payload,
      };
    case PROFILE_LOADING:
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
};

export { profileReducer };
