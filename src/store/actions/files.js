import { SEARCH_FILES, GET_SINGLE_FILE } from '../types';
import {
  getSingleFile,
  searchDocumentMetaData,
  searchFiles,
  searchMatchingFiles,
  searchOldDocumentMetaData,
  searchRivisionHistories,
} from '../../services/files';

export const searchProjectFiles =
  ({ projectId }) =>
  async (dispatch) => {
    return searchFiles({ projectId }).then((res) => {
      dispatch({
        type: SEARCH_FILES,
        payload: res,
      });
      return res;
    });
  };

export const getSingleProjectFile =
  ({ projectId, docName }) =>
  async (dispatch) => {
    return getSingleFile({ projectId, docName }).then((res) => {
      dispatch({
        type: GET_SINGLE_FILE,
        payload: res,
      });
      return res;
    });
  };

export const searchMatchingProjectFiles =
  ({ level, zone }) =>
  async (dispatch) => {
    return searchMatchingFiles({ level, zone }).then((res) => {
      dispatch({
        type: SEARCH_FILES,
        payload: res,
      });
      return res;
    });
  };

export const searchProjectRivisionHistories =
  ({ projectId, docName }) =>
  async (dispatch) => {
    return searchOldDocumentMetaData({ projectId, docName }).then((res) => {
      dispatch({
        type: SEARCH_FILES,
        payload: res,
      });
      return res;
    });
  };
