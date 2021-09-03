import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  CLEAR_NOTIFICATION,
  CLEAR_NOTIFICATIONS,
  GET_NOTIFICATIONS,
  READ_NOTIFICATION,
  SEARCH_NOTIFICATIONS_AND_MESSAGES,
} from '../types';

const initialState = {
  notifications: [],
  notification: undefined,
  notifMessages: [],
};

const persistConfig = {
  storage,
  key: 'notifications',
  whitelist: ['notifications'],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return { ...state, notifications: action.payload };

    case READ_NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
      };

    case SEARCH_NOTIFICATIONS_AND_MESSAGES:
      return {
        ...state,
        notifMessages: action.payload,
      };

    case CLEAR_NOTIFICATION:
      return {
        ...state,
        notification: undefined,
      };
    case CLEAR_NOTIFICATIONS:
      return {
        ...state,
        notifications: [],
      };
    default:
      return state;
  }
};

export default persistReducer(persistConfig, reducer);
