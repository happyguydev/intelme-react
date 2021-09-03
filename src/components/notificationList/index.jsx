import React, { Fragment, useEffect, useRef, useState } from 'react';
import { ArrowDropUp } from '@material-ui/icons';
import { format, parseISO } from 'date-fns';
import {
  List,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { Markup } from 'interweave';
import { enAU } from 'date-fns/locale';

import listStyles, {
  ActionButton,
  EmptyContainer,
  ListContainer,
  ListFooter,
  ListHeader,
} from './styles';

import NotificationItem from '../notificationItem';
import notificationIcons from './icons';
import { ReactComponent as FullStar } from '../icons/fullStar.svg';

import { ReactComponent as HalfStar } from '../icons/halfStar.svg';
import { ReactComponent as Star } from '../icons/star.svg';
import Avatar from '../avatar';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  getNotifications,
  readNotification,
} from '../../store/actions/notifications';
import { getMessages, readMessage } from '../../store/actions/messages';

const NotificationList = ({
  visible,
  headerButton,
  onClickHeaderButton,
  data,
  emptyText,
  buttonIcon,
  hasHeader,
  hasAction,
  buttonText,
  onClickAction,
  linkText,
  link,
}) => {
  const styles = listStyles();
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState();

  const onClickItem = (notif) => {
    const html = notif?.body;
    let div = document.createElement('div');
    div.innerHTML = html;
    let formattedBody = div.textContent || div.innerText || '';

    if (notif?.targetType) {
      dispatch(readNotification({ notificationId: notif?.id })).then(() => {
        dispatch(getNotifications({ read: '' }));
      });
    } else {
      console.log('Message');
      dispatch(readMessage({ messageId: notif?.id, notif }));
      dispatch(getMessages({ read: '' })).then(() => {
        setRedirect({
          pathname: '/dashboard/notifications',
          search: `not=${encodeURIComponent(formattedBody)}`,
        });
      });
    }
    setRedirect('');
  };

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      {visible ? (
        <ListContainer>
          {hasHeader ? (
            <ListHeader>
              <div
                className={styles.headerButton}
                onClick={onClickHeaderButton}
              >
                {buttonIcon} {buttonText}
              </div>
            </ListHeader>
          ) : null}
          <List dense={false} disablePadding className={styles.list}>
            {data?.length === 0 ? (
              <EmptyContainer>{emptyText}</EmptyContainer>
            ) : (
              <>
                {data?.map((item) => (
                  <Fragment key={item?.id || item?.docId}>
                    {!item?.targetType && !hasAction ? (
                      <NotificationItem
                        onClick={() => onClickItem(item)}
                        read={item?.read}
                      >
                        <ListItemIcon>
                          <div className={styles.avatarWrapper}>
                            <Avatar
                              userDetails={item?.senderDetails}
                              height="100%"
                              width="100%"
                              fontSize="1rem"
                            />
                          </div>
                        </ListItemIcon>
                        <ListItemText
                          className={styles.ItemText}
                          primary={
                            <div>
                              <h3>
                                {item?.senderDetails?.firstName}{' '}
                                {item?.senderDetails?.lastName}
                              </h3>
                              <span className={styles.senderBody}>
                                <Markup content={item.body} />
                              </span>
                            </div>
                          }
                          secondary={format(
                            parseISO(item.createdAt.replace('Z', '')),
                            "hh':'mmaaa cccc",
                            { locale: enAU }
                          )}
                        />
                      </NotificationItem>
                    ) : !hasAction ? (
                      <NotificationItem
                        read={item.read}
                        onClick={() => onClickItem(item)}
                        key={item.id || item.docId}
                      >
                        <ListItemIcon>
                          {
                            notificationIcons.find(
                              (notType) => notType.type === item.targetType
                            )?.icon
                          }
                        </ListItemIcon>
                        <ListItemText
                          className={styles.ItemText}
                          primary={<Markup content={item.body} />}
                          secondary={format(
                            parseISO(item.createdAt.replace('Z', '')),
                            "hh':'mmaaa cccc",
                            { locale: enAU }
                          )}
                        />
                      </NotificationItem>
                    ) : (
                      <NotificationItem read={item.read}>
                        <ListItemIcon>
                          {
                            notificationIcons.find(
                              (notType) => notType.type === item.type
                            )?.icon
                          }
                        </ListItemIcon>
                        <ListItemText
                          className={styles.ItemText}
                          primary={
                            <div>
                              {console.log(item?.project?.shift()?.name)}
                              <h3>{item?.name || item?.title}</h3>
                              <span>
                                {item?.project?.shift()?.name || item.fileName}
                              </span>
                            </div>
                          }
                          secondary={
                            item.createdAt
                              ? format(
                                  parseISO(item?.createdAt?.replace('Z', '')),
                                  "hh':'mmaaa cccc",
                                  { locale: enAU }
                                )
                              : format(
                                  parseISO(
                                    item?.creationTime?.replace('Z', '')
                                  ),
                                  "hh':'mmaaa cccc",
                                  { locale: enAU }
                                )
                          }
                        />
                        <ListItemSecondaryAction>
                          <ActionButton
                            aria-label="priority"
                            onClick={onClickAction}
                          >
                            {item.priority === 5 ? (
                              <FullStar className={styles.actionStar} />
                            ) : item.priority === 3 ? (
                              <HalfStar className={styles.actionStar} />
                            ) : item.priority === 1 ? (
                              <Star className={styles.outlinedStar} />
                            ) : (
                              <Star className={styles.emptyStar} />
                            )}
                          </ActionButton>
                        </ListItemSecondaryAction>
                      </NotificationItem>
                    )}
                  </Fragment>
                ))}
              </>
            )}
          </List>
          <ListFooter>
            <Link to={link}>
              {!linkText ? 'See all notifications' : linkText}
            </Link>
          </ListFooter>
        </ListContainer>
      ) : null}
    </>
  );
};

export default NotificationList;
