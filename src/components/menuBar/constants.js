import React from 'react';
import { FiHome, FiPieChart } from 'react-icons/fi';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

export const MenuBarOptions = [
  {
    label: 'Dashboard',
    selectedIcon: <FiHome width={20} height={20} />,
    neutralIcon: <FiHome width={20} height={20} />,
    link: '/dashboard',
  },
  {
    label: 'My Tasks',
    selectedIcon: <CheckCircleOutlineOutlinedIcon />,
    neutralIcon: <CheckCircleOutlineOutlinedIcon />,
    link: '/tasks',
  },
  {
    label: 'My Projects',
    selectedIcon: <InsertDriveFileOutlinedIcon />,
    neutralIcon: <InsertDriveFileOutlinedIcon />,
    link: '/projects',
  },
  {
    label: 'People',
    selectedIcon: <PeopleAltOutlinedIcon />,
    neutralIcon: <PeopleAltOutlinedIcon />,
    link: '/people',
  },
  {
    label: 'Statistics',
    selectedIcon: <FiPieChart />,
    neutralIcon: <FiPieChart />,
    link: '/statistics',
  },
];

export const MenuBarBottomOptions = [
  {
    label: 'Help',
    selectedIcon: <HelpOutlineOutlinedIcon />,
    neutralIcon: <HelpOutlineOutlinedIcon />,
    link: '/help',
  },
  {
    label: 'Settings',
    selectedIcon: <SettingsOutlinedIcon />,
    neutralIcon: <SettingsOutlinedIcon />,
    link: '/settings',
  },
];
