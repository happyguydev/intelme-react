import api from '../api';
/**
 *
 * @param {Number} aLimit
 * @param {Number} aOffset
 * @param {Number} fLimit
 * @param {Number} fOffset
 * @returns {array<any>} returns a mixed list of files (Documents Metadata) and tasks sorted by priority
 */
export const getPriorityTasksAndFiles = async (
  aLimit = 20,
  aOffset = 0,
  fLimit = 20,
  fOffset = 0
) => {
  // list activities sort by priority
  const activities = api.get(
    `api/pm/v1/search/activity?filters=${'priority=!=null'}&sort=${'priority=desc'}&limit=${aLimit}&offset=${aOffset}`
  );
  // list files sort by priority
  const files = api.post(
    `api/docstore/v1/search?sort=${'priority=desc'}&projectName=yes&limit=${fLimit}&offset=${fOffset}`,
    { priority: '!=null' }
  );

  const results = await Promise.all([activities, files])
    .then((resp) => {
      let res = resp[0].data.results.concat(resp[1].data.result);
      res.sort((first, second) => {
        return second.priority - first.priority;
      });

      return res;
    })
    .catch((err) => {
      //TODO: handel errors here
      console.error(err);
      return [];
    });

  return results;
};

export const getAllPriorities = async () => {
  const res = await api.get('api/pm/v1/search/activity');

  return res.data.results;
};
