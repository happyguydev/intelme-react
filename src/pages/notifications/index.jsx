import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { FiMail } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/button';
import AllNotificationsList from './components/notificationsList';
import NotificationsSearchContainer from './components/search/notificationsSearch';
import SelectedNotification from './components/selectedNotification';
import notificationStyles from './styles';
import Breadcrumb from '../../components/breadcrumb';
import {
  getNotifications,
  readNotification,
  searchAllNotificationsAndMessages,
} from '../../store/actions/notifications';
import {
  getUserThread,
  newMessage,
  readMessage,
} from '../../store/actions/messages';
import {
  CLEAR_NOTIFICATION,
  CLEAR_MESSAGE,
  CLEAR_SENDED_MESSAGE,
} from '../../store/types';
import Wysiwyg from '../../components/wysiwyg';
import { AiOutlineUserAdd } from 'react-icons/ai';
import UserSelector from '../../components/userSelector';
import { getAllPeople, getProjects } from '../../store/actions/projects';
import Avatar from '../../components/avatar';
import { toast } from 'react-toastify';
import { getUserProfile } from '../../services/auth';
import {
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { Markup } from 'interweave';
import { format, parseISO } from 'date-fns';
import { enAU } from 'date-fns/locale';
// import { List } from '@material-ui/core';

const Notifications = () => {
  const dispatch = useDispatch();
  const { notification } = useSelector((state) => state.notifications);
  const { message } = useSelector((state) => state.messages);
  let teams = [];
  const { profile } = useSelector((state) => state.auth);
  const { search } = useLocation();

  const [visibleNewMessage, setVisibleNewMessage] = useState(false);
  const [visibleSelector, setVisibleSelector] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingFilters, setLoadingFilters] = useState(false);
  const [messagesThread, setMessagesThread] = useState([]);
  const [people, setPeople] = useState([]);
  const [combinedNotifications, setCombinedNotifications] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState();
  const [selected, setSelected] = useState(notification || message);
  const orderDropdown = [{ value: 'Most Recent' }, { value: 'Oldest' }];
  const typesDropdown = [
    { value: 'All' },
    { value: 'Messages' },
    { value: 'Notifications' },
  ];
  const [currentOrder, setCurrentOrder] = useState(orderDropdown[0].value);

  const [currentType, setCurrentType] = useState(typesDropdown[0].value);

  const selectProject = (project) => {
    setLoadingFilters(true);
    setSelectedProject(project);
    setCurrentType(typesDropdown[0].value);
    setCurrentOrder(orderDropdown[0].value);
    dispatch(
      searchAllNotificationsAndMessages({
        search: project.id,
        sort: 'desc',
      })
    ).then((res) => {
      setCombinedNotifications(res.result);
      setLoadingFilters(false);
    });
  };

  const unselectProject = () => {
    setLoadingFilters(true);
    setLoadingFilters(false);
    setSelectedProject(undefined);
  };

  const changeOrder = (value) => {
    setCurrentOrder(value);
    setLoadingFilters(true);
    if (value === 'Most Recent') {
      dispatch(
        searchAllNotificationsAndMessages({
          sort: 'desc',
        })
      ).then((res) => {
        setCombinedNotifications(res.result);
        setLoadingFilters(false);
      });
    } else {
      dispatch(
        searchAllNotificationsAndMessages({
          sort: 'asc',
        })
      ).then((res) => {
        setCombinedNotifications(res.result);
        setLoadingFilters(false);
      });
    }
    setCurrentType(typesDropdown[0].value);
  };

  const changeType = (value) => {
    setCurrentType(value);
    setLoadingFilters(true);
    if (value === 'Messages') {
      dispatch(
        searchAllNotificationsAndMessages({
          type: 'message',
          uniqueContactOnly: 'yes',
        })
      ).then((res) => {
        setCombinedNotifications(res.result);
        setLoadingFilters(false);
      });
    } else if (value === 'Notifications') {
      dispatch(
        searchAllNotificationsAndMessages({
          type: 'notification',
        })
      ).then((res) => {
        setCombinedNotifications(res.result);
        setLoadingFilters(false);
      });
    } else {
      dispatch(
        searchAllNotificationsAndMessages({
          sort: 'desc',
          limit: 400,
        })
      ).then((res) => {
        setCombinedNotifications(res.result);
        setLoadingFilters(false);
      });
    }
    setCurrentOrder(orderDropdown[0].value);
  };

  const onSearch = async (value) => {
    setLoadingFilters(true);
    setCombinedNotifications([]);
    setCurrentOrder(orderDropdown[0].value);
    setCurrentType(typesDropdown[0].value);
    await dispatch(
      searchAllNotificationsAndMessages({
        search: value,
      })
    )
      .then((res) => {
        setCombinedNotifications(res.result);
      })
      .finally(() => {
        setTimeout(() => {
          setLoadingFilters(false);
        }, 2000);
      });
  };

  const styles = notificationStyles();

  const onNewMessageClick = () => {
    setVisibleNewMessage(!visibleNewMessage);
    setMessagesThread([]);
    dispatch(getAllPeople()).then((res) => {
      const members = res.filter(
        (people) => people.username !== profile.username
      );
      setPeople(members);
    });
    setSelected();
    if (visibleNewMessage === false) {
      setSelectedUser();
      dispatch({
        type: CLEAR_SENDED_MESSAGE,
      });
    }
  };

  const handleOpenSelector = () => {
    setVisibleSelector(!visibleSelector);
  };

  const onMessageSend = async ({ comment, recipientId }) => {
    dispatch(newMessage({ body: comment, recipientId, profile }))
      .then((res) => {
        res.data.senderDetails = profile;

        setMessagesThread((previous) => [res.data, ...previous]);
      })
      .catch((err) => {
        toast.error('Something wrong happened!');
      });
  };

  const onNewMessageSent = async ({ comment, recipientId }) => {
    dispatch(newMessage({ body: comment, recipientId, profile }))
      .then((res) => {
        res.data.senderDetails = profile;
        setMessagesThread((previous) => [...previous, res.data]);
      })
      .catch((err) => {
        toast.error('Something wrong happened!');
      });
  };

  const handleUserSelect = (people, mode, isChecked) => {
    if (mode === 'people') {
      setSelectedUser(people);
    }
  };

  const onClickNotification = (notif) => {
    if (visibleNewMessage) {
      setVisibleNewMessage(false);
      dispatch({
        type: CLEAR_SENDED_MESSAGE,
      });
    }
    setMessagesThread([]);
    if (notif?.targetType) {
      dispatch(readNotification({ notificationId: notif?.id })).then(() => {
        dispatch(getNotifications({ read: '', limit: 200 }));
      });
    } else {
      if (notif?.senderDetails !== 1) {
        dispatch(readMessage({ messageId: notif?.id, notif }));
      }
      setLoading(true);
      dispatch(
        getUserThread({
          includeDetails: 'no',
          username:
            notif?.senderDetails === 1 ? notif?.recipientId : notif?.senderId,
        })
      ).then((res) => {
        const senderDetails = res.threadWithDetails;
        const addDetailsToArray = res.result
          .map((message) => {
            return message.senderId !== profile.username
              ? { ...message, senderDetails: senderDetails }
              : message;
          })
          .map((message) => {
            return message.senderId === profile.username
              ? { ...message, senderDetails: profile }
              : message;
          });
        setMessagesThread(
          addDetailsToArray.sort((a, b) => a.createdAt - b.createdAt)
        );
        setLoading(false);
      });
    }
    setSelected(notif);
  };

  useEffect(() => {
    if (message) {
      dispatch(
        getUserThread({ includeDetails: 'no', username: message?.senderId })
      ).then((res) => {
        const senderDetails = res.threadWithDetails;
        const addDetailsToArray = res.result
          .map((message) => {
            return message.senderId !== profile.username
              ? { ...message, senderDetails: senderDetails }
              : message;
          })
          .map((message) => {
            return message.senderId === profile.username
              ? { ...message, senderDetails: profile }
              : message;
          });
        setMessagesThread(
          addDetailsToArray.sort((a, b) => a.createdAt - b.createdAt)
        );
        setLoading(false);
      });
    } else {
      setSelected(notification);
    }
    if (search) {
      const splitString = search.split('=');
      if (
        splitString[0].includes('type') &&
        splitString[1] === 'notifications'
      ) {
        dispatch(
          searchAllNotificationsAndMessages({
            sort: 'desc',
            type: 'notification',
          })
        ).then((res) => {
          setCombinedNotifications(res.result);
          setCurrentType('Notifications');
        });
      } else if (
        splitString[0].includes('type') &&
        splitString[1] === 'messages'
      ) {
        dispatch(
          searchAllNotificationsAndMessages({
            sort: 'desc',
            type: 'message',
            uniqueContactOnly: 'yes',
          })
        ).then((res) => {
          setCombinedNotifications(res.result);
          setCurrentType('Messages');
        });
      } else if (splitString[0].includes('not')) {
        const searchNot = decodeURIComponent(splitString[1]);
        dispatch(
          searchAllNotificationsAndMessages({
            sort: 'desc',
            search: searchNot,
            uniqueContactOnly: 'yes',
          })
        ).then((res) => {
          setCombinedNotifications(res.result);
        });
      }
    } else {
      dispatch(
        searchAllNotificationsAndMessages({
          sort: 'desc',
          uniqueContactOnly: 'yes',
        })
      ).then((res) => {
        setCombinedNotifications(res.result);
      });
    }

    dispatch(getProjects()).then((res) => {
      setProjects(res);
      console.log(res);
    });

    return () => {
      dispatch({
        type: CLEAR_NOTIFICATION,
      });
      dispatch({
        type: CLEAR_MESSAGE,
      });
      setCombinedNotifications([]);
      setSelected(undefined);
    };
  }, []);

  return (
    <>
      <Breadcrumb
        firstLink="/dashboard"
        secondLink="/dashboard/notifications"
        secondLinkText="Messages & Notifications"
      />
      <div className={styles.container}>
        <div className={styles.listNotificationsContainer}>
          <NotificationsSearchContainer
            changeOrder={changeOrder}
            changeType={changeType}
            order={currentOrder}
            projectOptions={projects}
            unselectProject={unselectProject}
            selectProject={selectProject}
            selectedProject={selectedProject}
            type={currentType}
            orderValues={orderDropdown}
            typeValues={typesDropdown}
            onSearch={onSearch}
          />
          <AllNotificationsList
            selected={selected}
            selectedMessage={selectedUser}
            newMessage={visibleNewMessage}
            onClickNotification={onClickNotification}
            data={combinedNotifications}
            loadingFilters={loadingFilters}
          />
        </div>
        <div className={styles.newAndSelected}>
          <Button onClick={onNewMessageClick} background="#FF8A47" primarySmall>
            <FiMail /> New Message
          </Button>
          {visibleNewMessage ? (
            <div className={styles.messageContainer}>
              <div className={styles.recipientContainer}>
                <div className={styles.buttonContainer}>
                  <button
                    onClick={handleOpenSelector}
                    className={
                      !selectedUser ? styles.addRecipient : styles.isSelected
                    }
                  >
                    <h1>To</h1>
                    {!selectedUser ? (
                      <>
                        <div>
                          <AiOutlineUserAdd />
                        </div>
                        Recipient
                      </>
                    ) : (
                      <Avatar
                        userDetails={selectedUser}
                        height="44px"
                        width="44px"
                        fontSize="22px"
                      />
                    )}
                  </button>
                  <UserSelector
                    transform="translate(13%,0)"
                    visible={visibleSelector}
                    onlyMembers
                    data={{ teams, people }}
                    onClick
                    onClickAction={(person, mode, isChecked) =>
                      handleUserSelect(person, mode, isChecked)
                    }
                  />
                  <span>
                    {selectedUser?.firstName
                      ? `${selectedUser?.firstName} ${selectedUser?.lastName}`
                      : selectedUser?.username}
                  </span>
                </div>
                <List className={styles.list}>
                  {messagesThread?.map((message) => (
                    <ListItem key={message.id} className={styles.messageItem}>
                      <ListItemIcon>
                        <div className={styles.avatarWrapper}>
                          <Avatar
                            width="40px"
                            height="40px"
                            fontSize="1rem"
                            userDetails={
                              message?.senderDetails ||
                              message?.recipientDetails
                            }
                          />
                        </div>
                      </ListItemIcon>
                      <ListItemText
                        className={styles.textContainer}
                        primary={
                          <div>
                            <h3 className={styles.senderTitle}>
                              {message?.senderDetails?.firstName}{' '}
                              {message?.senderDetails?.lastName}
                            </h3>
                            <span className={styles.senderBody}>
                              <Markup content={message?.body} />
                            </span>
                          </div>
                        }
                        secondary={
                          <span className={styles.createdDate}>
                            {format(
                              parseISO(message?.createdAt?.replace('Z', '')),
                              "d LLL yy '-' hh':'mmaaa cccc",
                              { locale: enAU }
                            )}
                          </span>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </div>
              <Wysiwyg
                sendMessage
                onMessageSend={onNewMessageSent}
                recipientId={selectedUser?.username || selected?.username}
              />
            </div>
          ) : (
            <SelectedNotification
              loading={loading}
              onMessageSend={onMessageSend}
              thread={messagesThread}
              selected={selected}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Notifications;
