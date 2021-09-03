import api from '../api';

export const getAllNotifications = async ({ read, limit }) => {
  const res = await api.get('api/ntf/v1/notification', {
    params: {
      read,
      limit,
    },
  });
  return res.data;
};

export const read = async ({ notificationId }) => {
  const res = await api.put(`api/ntf/v1/notification/${notificationId}`);

  return res.data;
};
