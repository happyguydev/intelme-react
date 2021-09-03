import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  CLEAR_ONLY_PRIORITIES,
  CLEAR_TASKS_AND_FILES,
  GET_ONLY_PRIORITIES,
  GET_PRIORITIES,
} from '../types';

const initialState = {
  priorities: [],
  tasksAndFiles: [],
};

const persistConfig = {
  storage,
  key: 'priorities',
  whitelist: ['priorities'],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRIORITIES:
      return {
        ...state,
        priorities: action.payload,
      };
    case GET_ONLY_PRIORITIES:
      return {
        ...state,
        tasksAndFiles: action.payload,
      };
    case CLEAR_ONLY_PRIORITIES:
      return {
        ...state,
        priorities: [],
      };
    case CLEAR_TASKS_AND_FILES:
      return {
        ...state,
        tasksAndFiles: [],
      };
    default:
      return state;
  }
};

export default persistReducer(persistConfig, reducer);
