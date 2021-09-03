import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  CLEAR_PROJECT,
  CLEAR_PROJECTS,
  DASHBOARD_RECENT_PROJECTS,
  GET_PROJECT,
  GET_PROJECTS,
  GET_PEOPLE,
  GET_TEAMS,
  GET_TEAM_PROFILES,
  CLEAR_TEAM_MEMBERS,
  SEARCH_FOR_PROJECTS,
} from '../types';

const initialState = {
  projects: [],
  project: {},
  searchProjects: [],
  people: [],
  teams: [],
  teamMembers: [],
};

const persistConfig = {
  storage,
  key: 'projects',
  whitelist: ['people', 'teams', 'projects'],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    case GET_PROJECT:
      return {
        ...state,
        project: action.payload,
      };
    case CLEAR_PROJECT:
      return {
        ...state,
        project: {},
      };
    case CLEAR_PROJECTS:
      return {
        ...state,
        projects: [],
      };
    case GET_PEOPLE:
      return {
        ...state,
        people: action.payload,
      };
    case GET_TEAM_PROFILES:
      return {
        ...state,
        teamMembers: action.payload,
      };
    case SEARCH_FOR_PROJECTS:
      return {
        ...state,
        searchProjects: action.payload,
      };
    case CLEAR_TEAM_MEMBERS:
      return {
        ...state,
        teamMembers: [],
      };
    case GET_TEAMS:
      return {
        ...state,
        teams: action.payload,
      };
    default:
      return state;
  }
};

export default persistReducer(persistConfig, reducer);
