import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  ADD_TASK,
  CLEAR_FILTERED_TASKS,
  GET_TASKS_ASSIGNEES,
  SEARCH_FOR_TASKS,
} from '../types';

const initialState = {
  tasks: [],
  assignees: [],
};

const persistConfig = {
  storage,
  key: 'tasks',
  whitelist: ['tasks'],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_FOR_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case GET_TASKS_ASSIGNEES:
      return {
        ...state,
        assignees: action.payload,
      };

    case ADD_TASK:
      const tasks = state?.tasks;
      return {
        ...state,
        tasks: [action.payload].concat(tasks),
      };
    case CLEAR_FILTERED_TASKS:
      return {
        ...state,
        tasks: [],
      };
    default:
      return state;
  }
};

export default persistReducer(persistConfig, reducer);
