import { toast } from 'react-toastify';
import api from '../api';

export const login = async ({ tenant, username, password, remember_me }) => {
  const res = await api.post('api/iam/v1/auth/login', {
    tenant,
    username,
    password,
    remember_me,
  });

  if (res.status === 200) return res.data.token;
  if (res.status === 401) return toast.error('Unauthorized Attempt to login.');
  if (res.status === 500)
    return toast.error(
      'We have encountered a technical error on the platform. Please try again later or contact your administrator.'
    );
};

export const checkUserStatus = async () => {
  const res = await api.get(
    '/api/iam/v1/tenantadmin/tenants/users/state/status'
  );

  if (res.status !== 200) throw Error('Unable to check for user status');

  return res.data;
};

export const getToken = async () => {
  const res = await api.get(`/api/iam/v1/token`);

  return res.data.context;
};

export const refreshToken = async ({ refreshToken }) => {
  const res = await api.post('/api/iam/v1/token', {
    refresh_token: refreshToken,
    update_login_cookie: true,
  });

  return res.data;
};

export const checkAuthToken = async ({ tenant, username, password }) => {
  const res = await api.post(`api/iam/v1/auth/token`, {
    tenant,
    username,
    password,
  });

  if (res.status !== 200) {
    throw Error('Password incorrect');
  }

  return res.data;
};

export const getUserRoles = async ({ username }) => {
  const res = await api.get(
    `/api/iam/v1/tenantadmin/tenants/users/${username}/roles`
  );

  return res.data;
};

export const getUserProfile = async ({ username }) => {
  const res = await api.get(`/api/pm/v1/profiles/${username}`);

  if (res.status === 404) throw Error('User not found');

  return res.data;
};

export const updateUserProfile = async ({ username }, body) => {
  const res = await api.put(
    `/api/iam/v1/tenantadmin/tenants/users/${username}`,
    body
  );

  if (res.status !== 200) return Error('Unable to check for user status');

  return res.data;
};

export const getUserOverview = async ({ username }) => {
  const res = await api.get(`/api/pm/v1/projects/overview/${username}`);

  if (res.status === 404) return Error('User not found');

  return res.data;
};

export const updateUserSettings = async (userData) => {
  const res = await api.put('/api/pm/v1/profiles/settings', userData);

  if (res.status !== 200) return Error('Unable to check for user status');

  return res.data;
};

export const activateUser = async ({ activationCode }) => {
  const res = await api.post(
    '/api/iam/v1/tenantadmin/tenants/users/state/activate',
    {
      activationCode,
    }
  );
  if (res.status === 200) {
    return res.data;
  } else {
    throw Error('Unable to activate user.');
  }
};

export const forgotPassword = async ({
  isReset,
  username,
  tenantId,
  email,
  activationCode,
  password,
}) => {
  const res = await api.post(
    'api/iam/v1/guest/forgot_password',
    {
      isReset,
      username,
      tenantId,
      email,
      activationCode,
      password,
    },
    {
      params: { reset: isReset },
    }
  );

  return res.data;
};

export const resetPassword = async ({ username, password }) => {
  const res = await api.post(
    `/api/iam/v1/tenantadmin/tenants/users/${username}/reset_password`,
    {
      password,
    }
  );

  if (res.status !== 200) throw Error('Unable to reset password.');

  return res.data;
};

export const logout = async () => {
  const res = await api.post('/api/iam/v1/auth/logout');

  return res.data;
};
