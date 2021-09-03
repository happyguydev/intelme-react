import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {
  LOGOUT,
  SET_AUTH_DETAILS,
  USER_PROFILE,
  SET_USER_ROLES,
  GET_USER_OVERVIEW,
  UPDATE_PROFILE,
  UPDATE_SETTINGS,
} from '../types';

const initialState = {
  user: {},
  profile: {},
  roles: [],
  overview: {},
};

const persistConfig = {
  storage,
  key: 'auth',
  whitelist: ['auth', 'user', 'roles'],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_DETAILS:
      return {
        ...state,
        user: action.payload,
      };
    case SET_USER_ROLES:
      return {
        ...state,
        roles: action.payload,
      };
    case USER_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };

    case GET_USER_OVERVIEW:
      return {
        ...state,
        overview: action.payload,
      };

    case UPDATE_PROFILE:
      return {
        ...state,
      };

    case UPDATE_SETTINGS:
      return {
        ...state,
      };

    case LOGOUT: {
      return {
        user: {},
        roles: [],
        profile: {},
        overview: {},
      };
    }
    default:
      return state;
  }
};

export default persistReducer(persistConfig, reducer);
