import { combineReducers } from 'redux';

import authReducer from './auth';
import messagesReducer from './messages';
import notificationsReducer from './notifications';
import prioritiesReducer from './priorities';
import projectsReducer from './projects';
import filesReducer from './files';
import tasksReducer from './tasks';
import labelsReducer from './labels';

export default combineReducers({
  auth: authReducer,
  notifications: notificationsReducer,
  messages: messagesReducer,
  priorities: prioritiesReducer,
  projects: projectsReducer,
  files: filesReducer,
  tasks: tasksReducer,
  labels: labelsReducer,
});
