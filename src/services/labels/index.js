import api from '../api';

export const fetchLabelsForProject = ({ projectId }) => {
  const res = api.get(`/api/pm/v1/projects/${projectId}/label`);

  return res;
};

export const addRemoveLabel = async ({projectId, label, type, action, taskId, taskType, docName}) => {
  let body;
  if (type === 'task') {
    body = {
      label: label,
      action: action,
      type: "task",
      taskId: taskId,
      taskType: taskType
    }
  } else {
    body = {
      label: label,
      action: action,
      type: "file",
      docName: docName,
    }
  }
  const res = await api.post(`/api/pm/v1/projects/${projectId}/label`, body);

  return res.data;
}