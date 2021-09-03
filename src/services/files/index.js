import api from '../api';

export const searchFiles = async ({
  projectId,
  revision,
  priority,
  type,
  revisionDate,
  status,
  discipline,
  title,
  search,
  limit,
  offset,
}) => {
  if (priority !== undefined) {
  }
  const res = await api.post(
    `/api/docstore/v1/search`,
    {
      projectId: projectId,
      revision: revision,
      priority,
      type,
      revisionDate,
      status,
      discipline,
      title,
    },
    {
      params: {
        search,
        limit,
        offset,
      },
    }
  );

  return res.data.result;
};

export const getFileDetails = async ({ projectId, docName }) => {
  const res = await api.get(
    `/api/docstore/v1/documents/object/projects/${projectId}/${encodeURIComponent(
      docName
    )}`
  );

  return res;
};

export const getSingleFile = async ({ projectId, docName }) => {
  const res = await api.get(
    `​/api​/docstore​/v1​/documents​/object​/projects​/${projectId}​/${encodeURIComponent(
      docName
    )}`
  );

  return res.data;
};

export const searchMatchingFiles = async ({
  level,
  zone,
  projectId,
  docId,
  documentName,
}) => {
  let body;
  if (docId) {
    body = {
      level: level,
      zone: zone,
      projectId: projectId,
      docId: docId,
    };
  } else {
    body = {
      level: level,
      zone: zone,
      projectId: projectId,
      documentName: documentName,
    };
  }
  const res = await api.post(`/api/docstore/v1/search`, body);

  return res.data.result;
};

export const searchDocumentMetaData = async ({ projectId, docName }) => {
  const res = await api.get(
    `/api/docstore/v1/documents/object/projects/${projectId}/${docName}`
  );

  if (res.status !== 200) throw Error('Unable to search document');

  return res.data;
};

export const searchOldDocumentMetaData = async ({ projectId, docName }) => {
  const res = await api.get(
    `/api/docstore/v1/documents/object/projects/${projectId}/${docName}/revision-history`
  );

  if (res.status !== 200) throw Error('Unable to get old document metadata');

  return res.data;
};

export const uploadFile = async (
  { projectId, file, type, overwrite },
  onUploadProgress,
  cancelTokenSource
) => {
  let formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);

  const res = await api.post(
    `/api/docmgmt/v1/docstorage/projects/${projectId}/files?overwrite=${overwrite}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
      cancelToken: cancelTokenSource.token,
    }
  );

  if (res.status !== 200) throw Error('Unable to upload file');

  return res.data;
};

export const uploadImage = async ({ image, destination }) => {
  let formData = new FormData();
  formData.append('file', image);

  const res = await api.post(
    `/api/pm/v1/upload/icon/${destination}/z`,
    formData,
    {}
  );

  return res;
};

export const getFileFilters = async ({ projectId }) => {
  const res = await api.get(
    `/api/docstore/v1/search/projects/${projectId}/filters`
  );

  return res.data;
};

export const getAIPrediction = async ({ projectId, id }) => {
  const res = await api.get(
    `api/docstore/v1/documents/ai/projects/${projectId}/${id}`
  );

  return res.data;
};

export const extractTitleData = async ({ title }) => {
  const res = await api.post('/api/docstore/v1/documents/ai/process/title', {
    title,
  });
  return res.data;
};

export const confirmFile = async ({ projectId, id, overwrite, values }) => {
  const res = await api.post(
    `api/docstore/v1/documents/ai/projects/${projectId}/${id}`,
    values,
    {
      params: {
        overwrite,
      },
    }
  );

  return res.data;
};

export const updateFile = async ({ projectId, docName, values }) => {
  const res = await api.put(
    `/api/docstore/v1/documents/object/projects/${projectId}/${docName}`,
    values
  );

  return res.data;
};

export const deleteFile = async ({ projectId, docName }) => {
  const res = await api.delete(
    `/api/docmgmt/v1/docstorage/projects/${projectId}/files/${docName}`
  );

  return res.data;
};

export const downloadFile = async ({ projectId, docName }) => {
  const res = await api.get(
    `api/docstore/v1/documents/download/projects/${projectId}/${docName}`, {
      responseType: 'blob'
    }
  );

  return res.data;
}

//FILE CONFIRMATION PROCESS
//​ /api​/docstore​/v1​/documents​/ai​/projects​/{projectId}​/{id} GET AI PREDICTION
// Fill the Form data in the file confirmation modal with these values
// ​/api​/docstore​/v1​/documents​/ai​/projects​/{projectId}​/{id}
// Confirm process based on the restrictions added
// STATUS = MERGED => User can't see file again
// Revision is different, user is asked to overwrite
// Revision is equal, user can't overwrite
