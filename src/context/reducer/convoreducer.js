import {
  GET_CONVO,
  ADD_CONVO,
  SEND_MSG,
  SHIFT_CONVO,
  SELECTED_CONVO,
  SELECTED_IMG,
  DELETE_CONVO,
} from "../actionsTypes";

const initialState = {
  convo: [],
  selected: null,
  selectedImg: null,
};

const convoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONVO:
      return {
        ...state,
        convo: action.payload,
      };
    case ADD_CONVO:
      return {
        ...state,
        convo: [action.payload, ...state.convo],
      };
    case DELETE_CONVO:
      return {
        ...state,
        convo: [...state.convo.filter((c) => c._id !== action.payload)],
      };
    case SHIFT_CONVO:
      let sconvo = state.convo.filter((c) => c._id === action.payload)[0];
      return {
        ...state,
        convo: [sconvo, ...state.convo.filter((c) => c._id !== action.payload)],
      };
    case SELECTED_CONVO:
      return {
        ...state,
        selected: action.payload,
      };
    case SELECTED_IMG:
      return {
        ...state,
        selectedImg: action.payload,
      };
    case SEND_MSG:
      if (
        state.selected !== null &&
        state.selected._id === action.payload._id
      ) {
        return {
          ...state,
          convo: state.convo.map((C) => {
            if (C._id === action.payload._id) {
              return {
                ...C,
                messages: [...C.messages, action.payload.message],
              };
            } else {
              return C;
            }
          }),
          selected: {
            ...state.selected,
            ...state.selected.messages.push(action.payload.message),
          },
        };
      } else {
        return {
          ...state,
          convo: state.convo.map((C) => {
            if (C._id === action.payload._id) {
              return {
                ...C,
                messages: [...C.messages, action.payload.message],
              };
            } else {
              return C;
            }
          }),
        };
      }
    default:
      return state;
  }
};

export { convoReducer };
