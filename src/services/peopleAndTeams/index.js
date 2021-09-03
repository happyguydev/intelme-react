import api from '../api';

const searchAllUsers = async ({ search, limit, offset }) => {
  const res = await api.get('/api/iam/v1/tenantadmin/tenants/users', {
    params: {
      search,
      limit,
      offset,
    },
  });

  return res.data;
};

const searchAllTeams = async ({ search, limit, offset, profilesToInclude }) => {
  const res = await api.get('/api/iam/v1/tenantadmin/tenants/team', {
    params: {
      search,
      limit,
      offset,
      profilesToInclude,
    },
  });
  return res.data;
};
