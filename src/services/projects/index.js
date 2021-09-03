import api from '../api';
/**
 *
 */

export const getAllProjects = async () => {
  const res = await api.get('/api/pm/v1/projects');
  return res.data.result;
};

export const getSingleProject = async ({ projectId }) => {
  const res = await api.get(`/api/pm/v1/projects/${projectId}`);
  return res.data;
};

export const getProjectByUsername = async ({ username }) => {
  const res = await api.get(`/api/pm/v1/projects/members/user/${username}`);

  return res.data;
};
export const getProjectByUsernameAndFilter = async ({ username, ownerId }) => {
  const res = await api.get(
    `/api/pm/v1/projects/members/user/${username}?filters=ownerId=${ownerId}`
  );

  return res.data;
};

export const getPeople = async () => {
  const res = await api.get('/api/pm/v1/search/profiles');
  return res.data.result;
};

export const getTeams = async () => {
  const res = await api.get(
    `/api/iam/v1/tenantadmin/tenants/teams?profilesToInclude=3`
  );
  return res.data.result;
};

export const searchTeamUsers = async ({ search, teamId }) => {
  const res = await api.get('/api/pm/v1/search/profiles', {
    params: {
      search: search,
      teamId: teamId,
    },
  });

  return res.data.result;
};

export const createProject = async (data) => {
  const res = await api.post(`/api/workflow/v1/projects`, data);

  return res;
};

export const getProjectMembers = async ({ projectId, query }) => {
  const res = await api.get(`/api/pm/v1/projects/${projectId}/members`, {
    params: query,
  });

  return res.data;
};

export const searchProject = async ({
  search,
  filters,
  limit,
  offset,
  include,
}) => {
  const res = await api.get('/api/pm/v1/projects', {
    params: {
      search,
      filters,
      limit,
      offset,
      include,
    },
  });
  return res.data;
};

export const getProjectFilters = async () => {
  const res = await api.get('/api/pm/v1/search/filters/project');
  return res.data;
};

export const deleteProject = async ({ projectId }) => {
  const res = await api.delete(`/api/pm/v1/projects/${projectId}`);

  if (res.status !== 200) throw Error('Unable to delete task');

  return res.data;
};

export const deleteDocument = async ({ projectId, docName }) => {
  const res = await api.delete(
    `/api/docmgmt/v1/docstorage/projects/${projectId}/files/${docName}`
  );

  if (res.status !== 200) throw Error('Unable to delete document');

  return res.data;
};

export const getRecentProjects = async () => {
  const res = await api.get(`/api/pm/v1/projects/recent/due-tasks`);
  return res.data?.result;
};

export const EditPriorityDocument = async ({
  projectId,
  docName,
  updateData,
}) => {
  const res = await api.post(
    `/api/docstore/v1/user-settings/${projectId}/${encodeURIComponent(
      docName
    )}/priority`,
    updateData
  );
  if (res.status !== 200) throw Error('Unable to update file');

  return res.data;
};
