import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ArrowDropUp, ChatBubbleOutlineOutlined } from '@material-ui/icons';

import SearchBar from '../searchBar';
import { ReactComponent as BellIcon } from '../icons/bell.svg';
import { ReactComponent as MessageIcon } from '../icons/message.svg';
import { ReactComponent as StarIcon } from '../icons/star.svg';
import appBarStyles, { AvatarIcon, Button, Menu, MenuItem } from './styles';
import NotificationList from '../notificationList';

import { getProfile } from '../../store/actions/auth';
import { getMessages } from '../../store/actions/messages';
import { getNotifications } from '../../store/actions/notifications';
import { getPriorities } from '../../store/actions/priorities';
import {
  CLEAR_NOTIFICATIONS,
  CLEAR_PROJECT,
  CLEAR_PROJECTS,
  LOGOUT,
  CLEAR_MESSAGES,
  CLEAR_MESSAGE,
  CLEAR_NOTIFICATION,
  CLEAR_FILTERED_TASKS,
  GET_ONLY_PRIORITIES,
  CLEAR_LABELS,
  CLEAR_ONLY_PRIORITIES,
  CLEAR_TASKS_AND_FILES,
} from '../../store/types';
import { searchFiles } from '../../services/files';
import { searchTasks } from '../../services/tasks';
import useOutsideAlerter from '../../utils/outsideClick';
import { getPriorityTasksAndFiles } from '../../services/priorities';

const AppBar = () => {
  const styles = appBarStyles();
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state?.messages);
  const { notifications } = useSelector((state) => state?.notifications);
  const { tasksAndFiles } = useSelector((state) => state?.priorities);
  const { profile } = useSelector((state) => state?.auth);
  const { user } = useSelector((state) => state?.auth);
  const [visibleNotifications, setVisibleNotifications] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState(false);
  const [visiblePriorities, setVisiblePriorities] = useState(false);
  const [redirect, setRedirect] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const messagesWrapper = useRef(null);
  const notificationsWrapper = useRef(null);
  const prioritiesWrapper = useRef(null);

  useEffect(() => {
    dispatch(getMessages(''));
    dispatch(getNotifications({ read: '' }));
    dispatch(getProfile({ username: user.username }));

    return () => {};
  }, []);

  const onClickLogout = () => {
    dispatch({
      type: CLEAR_MESSAGES,
    });
    dispatch({
      type: CLEAR_NOTIFICATIONS,
    });
    dispatch({
      type: CLEAR_PROJECT,
    });
    dispatch({
      type: CLEAR_PROJECTS,
    });
    dispatch({
      type: CLEAR_LABELS,
    });
    dispatch({
      type: CLEAR_MESSAGE,
    });
    dispatch({
      type: CLEAR_NOTIFICATION,
    });
    dispatch({
      type: CLEAR_FILTERED_TASKS,
    });
    dispatch({
      type: LOGOUT,
    });
    dispatch({
      type: CLEAR_ONLY_PRIORITIES,
    });
    dispatch({
      type: CLEAR_TASKS_AND_FILES,
    });
    setRedirect('/login');
  };

  const onClickMenu = () => {
    setShowMenu(true);
  };

  const onClickNotifications = () => {
    setVisibleNotifications(true);
  };

  const onClickMessages = () => {
    setVisibleMessages(true);
  };
  const onClickPriorities = () => {
    getPriorityTasksAndFiles().then((res) => {
      dispatch({
        type: GET_ONLY_PRIORITIES,
        payload: res,
      });
      setVisiblePriorities(true);
    });
  };

  const hideMessages = () => {
    setVisibleMessages(false);
  };

  const hideNotifications = () => {
    setVisibleNotifications(false);
  };

  const hidePriorities = () => {
    setVisiblePriorities(false);
  };

  const newNotifications = notifications?.countUnread;
  const newMessages = messages?.filter(
    (message) => message.read === false
  ).length;

  useOutsideAlerter(messagesWrapper, hideMessages);
  useOutsideAlerter(notificationsWrapper, hideNotifications);
  useOutsideAlerter(prioritiesWrapper, hidePriorities);

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <div className={styles.appBarContainer}>
        <SearchBar />
        <div className={styles.actionBar}>
          <Button
            onClick={onClickNotifications}
            ref={notificationsWrapper}
            className={styles.notificationButton}
          >
            <BellIcon
              className={
                visibleNotifications
                  ? 'notificationIconActive'
                  : 'notificationIcon'
              }
            />

            {newNotifications > 0 ? (
              <div className={styles.notifications}> {newNotifications} </div>
            ) : null}

            <NotificationList
              visible={visibleNotifications}
              data={notifications?.result}
              emptyText="You have no notifications."
              link={{
                pathname: '/dashboard/notifications',
                search: 'type=notifications',
              }}
            />
          </Button>
          <Button
            ref={messagesWrapper}
            onClick={onClickMessages}
            className={styles.messageButton}
          >
            <MessageIcon
              className={visibleMessages ? 'messageIconActive' : 'messageIcon'}
            />
            {newMessages > 0 ? (
              <div className={styles.notifications}> {newMessages} </div>
            ) : null}
            <NotificationList
              hasHeader
              buttonIcon={<ChatBubbleOutlineOutlined />}
              buttonText="New Message"
              onClickHeaderButton={() => console.log('New Message')}
              visible={visibleMessages}
              data={messages}
              emptyText="You have no messages."
              linkText="See all messages"
              link={{
                pathname: '/dashboard/notifications',
                search: 'type=messages',
              }}
            />
          </Button>
          <Button
            onClick={onClickPriorities}
            className={styles.button}
            ref={prioritiesWrapper}
          >
            <StarIcon
              className={visiblePriorities ? 'starIconActive' : 'starIcon'}
            />
            <NotificationList
              data={tasksAndFiles}
              hasAction
              visible={visiblePriorities}
              emptyText="Your priority list is empty."
              linkText="See all priorities"
            />
          </Button>

          <Button
            className={styles.profile}
            onClick={onClickMenu}
            onBlur={() => setShowMenu(false)}
            tabIndex="1"
          >
            {profile?.settings?.icon ? (
              <AvatarIcon className={styles.avatarOnlyIcon}>
                <img
                  src={`data:image/png;base64,${profile?.settings?.icon}`}
                  alt=""
                />
              </AvatarIcon>
            ) : (
              <AvatarIcon color={`#${profile?.settings?.color}`}>
                {profile?.firstName?.charAt(0)}
                {profile?.lastName?.charAt(0)}
              </AvatarIcon>
            )}
            {showMenu ? (
              <Menu>
                <ArrowDropUp />
                <MenuItem
                  onClick={() => {
                    setRedirect('/settings');
                  }}
                  className="first"
                >
                  Settings
                </MenuItem>
                <MenuItem onClick={onClickLogout}>Logout</MenuItem>
              </Menu>
            ) : null}
          </Button>
        </div>
      </div>
    </>
  );
};

export default AppBar;
