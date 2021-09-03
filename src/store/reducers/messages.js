import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  GET_MESSAGES,
  READ_MESSAGE,
  CLEAR_MESSAGES,
  CLEAR_MESSAGE,
  GET_MESSAGE_THREAD,
  SEND_MESSAGE,
  CLEAR_SENDED_MESSAGE,
} from '../types';

const initialState = {
  messages: [],
  message: undefined,
  thread: [],
  sendedNewMessage: undefined,
};

const persistConfig = {
  storage,
  key: 'messages',
  whitelist: ['messages'],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    case READ_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: undefined,
      };

    case SEND_MESSAGE:
      return {
        ...state,
        sendedNewMessage: action.payload,
      };
    case CLEAR_SENDED_MESSAGE:
      return {
        ...state,
        sendedNewMessage: undefined,
      };
    case GET_MESSAGE_THREAD:
      return {
        ...state,
        thread: action.paylaod,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        messages: [],
      };
    default:
      return state;
  }
};

export default persistReducer(persistConfig, reducer);
