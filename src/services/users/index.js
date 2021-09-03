import api from '../api';

export const searchAllUsers = async () => {
  const res = await api.get('/api/iam/v1/tenantadmin/tenants/users');

  return res.data;
};
