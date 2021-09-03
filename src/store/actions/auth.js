import {
  LOGOUT,
  SET_AUTH_DETAILS,
  SET_USER_ROLES,
  USER_PROFILE,
  USER_STATUS,
  GET_USER_OVERVIEW,
  UPDATE_PROFILE,
  UPDATE_SETTINGS,
  FORGOT_PASSWORD,
} from '../types';

import {
  login,
  getUserRoles,
  getUserProfile,
  logout,
  checkUserStatus,
  getUserOverview,
  updateUserProfile,
  updateUserSettings,
  forgotPassword,
} from '../../services/auth';
import { toast } from 'react-toastify';

export const loginAction =
  ({ tenant, username, password, rememberMe }) =>
  async (dispatch) => {
    return login({
      tenant: tenant,
      username: username,
      password: password,
      remember_me: rememberMe,
    }).then((res) => {
      dispatch({
        type: SET_AUTH_DETAILS,
        payload: res,
      });
      return res;
    });
  };

export const forgotPasswordAction =
  ({ tenantId, username, email, activationCode, password }) =>
  async (dispatch) => {
    return forgotPassword({
      tenantId,
      username,
      email,
      activationCode,
      password,
    })
      .then((res) => {
        dispatch({
          type: FORGOT_PASSWORD,
          payload: res,
        });
        return res;
      })
      .catch((err) => {
        const { response } = err;
        if (response.status === 500)
          return toast.error(
            'We have encountered a technical error on the platform. Please try again later or contact your administrator.'
          );
      });
  };

export const getRoles =
  ({ username }) =>
  async (dispatch) => {
    return getUserRoles({ username }).then((res) => {
      dispatch({
        type: SET_USER_ROLES,
        payload: res,
      });
      return res;
    });
  };

export const checkStatus = () => async (dispatch) => {
  return checkUserStatus().then((res) => {
    dispatch({
      type: USER_STATUS,
      payload: res,
    });
    return res;
  });
};

export const getProfile =
  ({ username }) =>
  async (dispatch) => {
    return getUserProfile({ username }).then((res) => {
      dispatch({
        type: USER_PROFILE,
        payload: res,
      });
      return res;
    });
  };

export const updateProfile =
  ({ username }, body) =>
  async (dispatch) => {
    return updateUserProfile({ username }, body).then((res) => {
      dispatch({
        type: UPDATE_PROFILE,
        payload: res,
      });
      return res;
    });
  };

export const updateSettings = (userData) => async (dispatch) => {
  return updateUserSettings(userData).then((res) => {
    dispatch({
      type: UPDATE_SETTINGS,
      payload: res,
    });
    return res;
  });
};

export const getOverview =
  ({ username }) =>
  async (dispatch) => {
    return getUserOverview({ username }).then((res) => {
      dispatch({
        type: GET_USER_OVERVIEW,
        payload: res,
      });
      return res;
    });
  };

export const logoutAction = () => async (dispatch) => {
  return logout().then(() => {
    dispatch({
      type: LOGOUT,
    });
  });
};
