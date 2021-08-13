import {
  GET_FOLLOWERS,
  ACCEPTED,
  GET_FOllOWERS_DATA,
  GET_FOllOWING_DATA,
  SHOW_FOLLOWERS,
} from "../actionsTypes";

const initialState = {
  followers: [],
  following: [],
  requests: [],
  requested: [],
  followersData: [],
  followingData: [],
  accepted: null,
  showfollower: {
    id: null,
    data: [],
    type: null,
    show: false,
  },
};

const followerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FOLLOWERS:
      return {
        ...state,
        followers: action.payload.followers,
        following: action.payload.following,
        requests: action.payload.requests,
        requested: action.payload.requested,
      };
    case ACCEPTED:
      return {
        ...state,
        accepted: action.payload,
      };
    case GET_FOllOWERS_DATA:
      return {
        ...state,
        followersData: action.payload,
      };
    case GET_FOllOWING_DATA:
      return {
        ...state,
        followingData: action.payload,
      };
    case SHOW_FOLLOWERS:
      return {
        ...state,
        showfollower: action.payload,
      };

    default:
      return state;
  }
};

export { followerReducer };
