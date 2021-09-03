import {
  GET_PROJECTS,
  GET_PROJECT,
  DASHBOARD_RECENT_PROJECTS,
  GET_TEAMS,
  CLEAR_PROJECT,
  CLEAR_PROJECTS,
  GET_TEAM_PROFILES,
  GET_PEOPLE,
  SEARCH_FOR_PROJECTS,
} from '../types';

import {
  createProject,
  getAllProjects,
  getPeople,
  getSingleProject,
  getTeams,
  searchProject,
  searchTeamUsers,
} from '../../services/projects';

export const getProjects = () => async (dispatch) => {
  return getAllProjects().then((res) => {
    dispatch({
      type: GET_PROJECTS,
      payload: res,
    });
    return res;
  });
};

export const getAllPeople = () => async (dispatch) => {
  return getPeople().then((res) => {
    dispatch({
      type: GET_PEOPLE,
      payload: res,
    });
    return res;
  });
};

export const searchAllTeamUsers =
  ({ search, teamId }) =>
  async (dispatch) => {
    return searchTeamUsers({ search, teamId }).then((res) => {
      dispatch({
        type: GET_TEAM_PROFILES,
        payload: res,
      });
      return res;
    });
  };

export const getAllTeams = () => async (dispatch) => {
  return getTeams().then((res) => {
    dispatch({
      type: GET_TEAMS,
      payload: res,
    });
    return res;
  });
};

export const getProject =
  ({ projectId }) =>
  async (dispatch) => {
    return getSingleProject({ projectId }).then((res) => {
      dispatch({
        type: GET_PROJECT,
        payload: res,
      });
      return res;
    });
  };
export const addProject = (data) => async (dispatch) => {
  return createProject(data);
};

export const searchForProjects =
  ({ search, filters, limit, offset, include }) =>
  async (dispatch) => {
    return searchProject({
      search,
      filters,
      limit,
      offset,
      include,
    }).then((res) => {
      dispatch({
        type: SEARCH_FOR_PROJECTS,
        payload: res,
      });
      return res;
    });
  };

export const clearProject = () => async (dispatch) => {
  return dispatch({
    type: CLEAR_PROJECT,
  });
};

export const clearProjects = () => async (dispatch) => {
  return dispatch({
    type: CLEAR_PROJECTS,
  });
};
