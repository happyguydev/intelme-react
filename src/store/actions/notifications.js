import { searchNotificationsAndMessages } from '../../services/messages';
import { getAllNotifications, read } from '../../services/notifications';
import {
  CLEAR_NOTIFICATIONS,
  GET_NOTIFICATIONS,
  READ_NOTIFICATION,
  SEARCH_NOTIFICATIONS_AND_MESSAGES,
} from '../types';

export const getNotifications =
  ({ read, limit }) =>
  async (dispatch) => {
    return getAllNotifications({ read, limit }).then((res) => {
      dispatch({
        type: GET_NOTIFICATIONS,
        payload: res,
      });
      return res;
    });
  };

export const readNotification =
  ({ notificationId }) =>
  async (dispatch) => {
    return read({ notificationId })
      .then((res) => {
        dispatch({
          type: READ_NOTIFICATION,
          payload: res,
        });
        return res;
      })
      .catch((err) => {
        throw Error(err);
      });
  };

export const clearNotifications = () => async (dispatch) => {
  dispatch({
    type: CLEAR_NOTIFICATIONS,
  });
};

export const searchAllNotificationsAndMessages =
  ({ search, sort, limit, offset, type, uniqueContactOnly }) =>
  async (dispatch) => {
    return searchNotificationsAndMessages({
      search,
      sort,
      limit,
      offset,
      type,
      uniqueContactOnly,
    })
      .then((res) => {
        dispatch({
          type: SEARCH_NOTIFICATIONS_AND_MESSAGES,
          payload: res,
        });
        return res;
      })
      .catch((err) => {
        throw Error(err);
      });
  };
