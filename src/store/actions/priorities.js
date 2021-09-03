import { getAllPriorities } from '../../services/priorities';
import { GET_PRIORITIES } from '../types';

export const getPriorities = () => async (dispatch) => {
  return getAllPriorities().then((res) => {
    dispatch({
      type: GET_PRIORITIES,
      payload: res,
    });
    return res;
  });
};
