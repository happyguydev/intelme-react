import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { CLEAR_LABELS, GET_LABELS } from '../types';

const initialState = {
  labels: [],
};

const persistConfig = {
  storage,
  key: 'labels',
  whitelist: ['labels'],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LABELS:
      return {
        ...state,
        labels: action.payload,
      };

    case CLEAR_LABELS:
      return {
        ...state,
        labels: [],
      };
    default:
      return state;
  }
};

export default persistReducer(persistConfig, reducer);
