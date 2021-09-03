import {
  createTask,
  getTasksAssignees,
  searchTasks,
  taskSummaryUpdate,
  taskUpdate,
} from '../../services/tasks';
import { GET_TASKS_ASSIGNEES, SEARCH_FOR_TASKS, ADD_TASK } from '../types';

export const searchForTasks =
  ({ search, filters, sort, limit, offset }) =>
  async (dispatch) => {
    return searchTasks({
      search,
      filters,
      sort,
      limit,
      offset,
    }).then((res) => {
      dispatch({
        type: SEARCH_FOR_TASKS,
        payload: res,
      });
      return res;
    });
  };

export const getAssignees = () => async (dispatch) => {
  return getTasksAssignees().then((res) => {
    dispatch({
      type: GET_TASKS_ASSIGNEES,
      payload: res,
    });
    return res;
  });
};

export const addTask = (data) => async (dispatch) => {
  return createTask(data).then((res) => {
    dispatch({
      type: ADD_TASK,
      payload: res,
    });
    return res;
  });
};

export const updateTask =
  ({ projectId, taskId, updateData }) =>
  async (dispatch) => {
    return taskUpdate({ projectId, taskId, updateData });
  };

export const updateSummaryTask =
  ({ projectId, taskId, updateData }) =>
  async (dispatch) => {
    return taskSummaryUpdate({ projectId, taskId });
  };
