import {
  FiUsers,
  FiUser,
  FiMessageCircle,
  FiFile,
  FiPenTool,
} from 'react-icons/fi';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';

export const notificationIcons = [
  {
    type: 'Team',
    icon: <FiUsers />,
  },
  {
    type: 'Member',
    icon: <FiUser />,
  },
  {
    type: 'Comment',
    icon: <FiMessageCircle />,
  },
  {
    type: 'Project',
    icon: <FiFile />,
  },
  {
    type: 'File',
    icon: <FiFile />,
  },
  {
    type: 'task',
    icon: <CheckCircleOutlineOutlinedIcon />,
  },
  {
    type: 'Activity',
    icon: <CheckCircleOutlineOutlinedIcon />,
  },
  {
    type: 'Discipline',
    icon: <FiPenTool />,
  },

  {
    type: 'summary',
    icon: <FiPenTool />,
  },
  { type: 'drawing', icon: <FiFile /> },
];

export default notificationIcons;
