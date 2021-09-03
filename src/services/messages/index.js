import api from '../api';

export const getAllMessages = async (read, limit) => {
  const res = await api.get('api/ntf/v1/message/received', {
    params: {
      read,
      limit,
    },
  });
  return res.data?.result;
};

export const getAllTheRecentPeople = async (read, limit) => {
  const res = await api.get('api/ntf/v1/message/recent_people');
  return res.data?.result;
};

export const read = async ({ messageId }) => {
  const res = await api.put(`/api/ntf/v1/message/${messageId}`);

  return res.data;
};

export const sendNewMessage = async ({ body, recipientId }) => {
  const res = await api.post('/api/ntf/v1/message', {
    body,
    recipientId,
  });

  return res;
};

export const seeThread = async ({
  username,
  limit,
  offset,
  includeDetails,
}) => {
  const res = await api.get(`api/ntf/v1/message/thread/${username}`, {
    params: {
      limit,
      offset,
      includeDetails,
    },
  });

  return res.data;
};

export const searchNotificationsAndMessages = async ({
  search,
  sort,
  limit,
  offset,
  type,
  uniqueContactOnly,
}) => {
  const res = await api.get('api/ntf/v1/search', {
    params: {
      search,
      sort,
      limit,
      offset,
      type,
      uniqueContactOnly,
    },
  });

  return res.data;
};
