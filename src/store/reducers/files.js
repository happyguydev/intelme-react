import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { SEARCH_FILES, CLEAR_FILES, GET_SINGLE_FILE, CLEAR_SINGLE_FILE } from '../types';

const initialState = {
  files: [],
  file: {},
};

const persistConfig = {
  storage,
  key: 'files',
  whitelist: ['files'],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_FILES:
      return {
        ...state,
        files: action.payload,
      };
    case CLEAR_FILES:
      return {
        ...state,
        files: [],
      };

    case GET_SINGLE_FILE:
      return {
        ...state,
        file: action.payload,
      };

    case CLEAR_SINGLE_FILE:
      return {
        ...state,
        file: undefined,
      }
    default:
      return state;
  }
};

export default persistReducer(persistConfig, reducer);
