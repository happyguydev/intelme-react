import api from '../api';

export const searchTasks = async ({ search, filters, sort, limit, offset }) => {
  const res = await api.get(`/api/pm/v1/search/activity`, {
    params: {
      search,
      filters,
      sort,
      limit,
    },
  });
  return res.data.results;
};

export const getTasksAssignees = async () => {
  const res = await api.get('/api/pm/v1/search/filters/task');

  return res.data.users;
};

export const getPriority = async ({ projectId, taskId, taskType }) => {
  const res = await api.get(
    `/api/pm/v1/projects/${projectId}/tasks/${taskId}/${taskType}`
  );

  if (res.status !== 200) throw Error('Unable to get activity');

  return res.data;
};

export const getSummary = async ({ fileSummaryUrl }) => {
  const res = await api.get(fileSummaryUrl);

  if (res.status !== 200) throw Error('Unable to get file summary');

  return res.data;
};

export const follow = async ({ projectId, taskId, type }) => {
  const res = await api.put(
    `/api/pm/v1/projects/${projectId}/tasks/${taskId}/${type}/follow`
  );

  return res.data;
};

export const unfollow = async ({ projectId, taskId, type }) => {
  const res = await api.delete(
    `/api/pm/v1/projects/${projectId}/tasks/${taskId}/${type}/follow`
  );

  return res.data;
};

export const postCommentProject = async ({ projectId, comment }) => {
  const res = await api.post(`/api/pm/v1/projects/${projectId}/comments`, {
    comment: comment,
  });

  return res.data;
};

export const postCommentTask = async ({
  projectId,
  activityType,
  activityId,
  comment,
}) => {
  const res = await api.post(
    `/api/pm/v1/projects/${projectId}/activity/${activityType}/${activityId}/comments`,
    {
      comment: comment,
    }
  );

  return res.data;
};

export const postCommentFile = async ({ projectId, docName, comment }) => {
  const res = await api.post(
    `/api/pm/v1/projects/${projectId}/file/${docName}/comments`,
    {
      comment: comment,
    }
  );

  return res.data;
};

export const deleteComment = async ({ projectId, commentOnId, commentId }) => {
  const res = await api.delete(
    `/api/pm/v1/projects/${projectId}/${commentOnId}/comments/${commentId}`
  );

  if (res.status !== 200) throw Error('Unable to delete comment');

  return res.data;
};

export const getAllComments = async ({
  projectId,
  commentOn,
  commentOnId,
  filter = '',
  direction = '',
  total,
}) => {
  const res = await api.get(
    `/api/pm/v1/projects/${projectId}/${commentOn}/${commentOnId}/comments?filter=${filter}&direction=${direction}&limit=${total}`
  );

  if (res.status !== 200) throw Error('Unable to get all comments');

  return res.data;
};

export const createTask = async (data) => {
  const { projectId, ...values } = data;
  const res = await api.post(`/api/pm/v1/projects/${projectId}/tasks`, {
    ...values,
  });
  return res.data;
};

export const deleteTask = async ({ projectId, taskId, type }) => {
  const res = await api.delete(
    `/api/pm/v1/projects/${projectId}/tasks/${taskId}/${type}`
  );

  if (res.status !== 200) throw Error('Unable to delete task');

  return res.data;
};

export const taskUpdate = async ({ projectId, taskId, updateData }) => {
  const res = await api.put(
    `/api/pm/v1/projects/${projectId}/tasks/${taskId}`,
    updateData
  );

  if (res.status !== 200) throw Error('Unable to update task');

  return res.data;
};

export const taskSummaryUpdate = async ({ projectId, taskId, updateData }) => {
  const res = await api.put(
    `/api/pm/v1/projects/${projectId}/tasks/summary/${taskId}`,
    {
      status: 'Completed',
    }
  );
};

export const getAssignedProfile = async ({ username }) => {
  const res = await api.get(`/api/pm/v1/profiles/${username}`);

  return res.data;
};
