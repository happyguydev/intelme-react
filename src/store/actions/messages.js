import { toast } from 'react-toastify';
import {
  getAllMessages,
  read,
  seeThread,
  sendNewMessage,
} from '../../services/messages';
import {
  CLEAR_MESSAGES,
  GET_MESSAGES,
  GET_MESSAGE_THREAD,
  READ_MESSAGE,
  SEND_MESSAGE,
} from '../types';

export const getMessages = (read, limit) => async (dispatch) => {
  return getAllMessages(read, limit).then((res) => {
    dispatch({
      type: GET_MESSAGES,
      payload: res,
    });
    return res;
  });
};

export const clearMessages = () => async (dispatch) => {
  return dispatch({
    type: CLEAR_MESSAGES,
  });
};

export const readMessage =
  ({ messageId, notif }) =>
  async (dispatch) => {
    return read({ messageId })
      .then((res) => {
        dispatch({
          type: READ_MESSAGE,
          payload: notif,
        });
        return notif;
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast.error('Notification not found.');
        } else {
          toast.error(
            'We have encountered a technical error on the platform. Please try again later or contact your administrator.'
          );
        }
      });
  };

export const getUserThread =
  ({ username, limit, offset, includeDetails }) =>
  async (dispatch) => {
    return seeThread({ username, limit, offset, includeDetails }).then(
      (res) => {
        dispatch({
          type: GET_MESSAGE_THREAD,
          payload: res,
        });
        return res;
      }
    );
  };

export const newMessage =
  ({ body, recipientId }) =>
  async (dispatch) => {
    return sendNewMessage({ body, recipientId })
      .then((res) => {
        dispatch({
          type: SEND_MESSAGE,
          payload: res,
        });
        return res;
      })
      .catch((err) => {
        throw Error(err);
      });
  };
