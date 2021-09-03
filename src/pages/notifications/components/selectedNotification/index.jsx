import React, { useEffect, useRef } from 'react';
import { format, parseISO } from 'date-fns';
import { enAU } from 'date-fns/locale';
import selectedNotificationsStyle from './styles';
import { ReactComponent as BlackBell } from '../../../../components/icons/notifications-black-bell.svg';
import {
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { Markup } from 'interweave';
import pureRelativeDate from '../../../../utils/pureRelativeDate';
import Wysiwyg from '../../../../components/wysiwyg';
import notificationIcons from '../../../../components/notificationList/icons';
import Avatar from '../../../../components/avatar';

const SelectedNotification = ({ selected, thread, loading, onMessageSend }) => {
  const listScroll = useRef();

  const scrollToBottom = () => {};

  useEffect(() => {
    scrollToBottom();
    console.log(thread.reverse());
  }, [thread]);

  const styles = selectedNotificationsStyle();
  const reversedThread = thread.reverse();
  return (
    <>
      {!selected ? (
        <div className={styles.empty}>
          <BlackBell />
          Select an Notification to open.
        </div>
      ) : selected.targetType ? (
        <div className={styles.selected}>
          <ListItem className={styles.selectedNotification}>
            <ListItemIcon style={{ fontSize: '2rem' }}>
              {
                notificationIcons.find(
                  (notType) => notType.type === selected.targetType
                )?.icon
              }
            </ListItemIcon>
            <ListItemText
              className={styles.item}
              primary={<Markup content={selected?.body} />}
              secondary={
                selected?.createdAt ? pureRelativeDate(selected?.createdAt) : ''
              }
            />
          </ListItem>
        </div>
      ) : (
        <div className={styles.messageContainer}>
          <div>
            <p className={styles.senderHeader}>
              {selected?.senderDetails === 1
                ? selected.recipientDetails?.firstName
                  ? `${selected?.recipientDetails?.firstName} ${selected?.recipientDetails?.lastName}`
                  : selected?.recipientDetails?.username
                : selected.senderDetails?.firstName
                ? `${selected?.senderDetails?.firstName} ${selected?.senderDetails?.lastName}`
                : selected?.senderDetails?.username}
            </p>
            <p className={styles.responses}>{thread?.length} responses</p>
          </div>
          <List className={styles.list}>
            {loading || thread === 0 ? (
              <div className={styles.loadContainer}>
                <CircularProgress className={styles.loading}></CircularProgress>
              </div>
            ) : (
              reversedThread?.map((message) => (
                <>
                  <ListItem key={message.id} className={styles.messageItem}>
                    <ListItemIcon>
                      <div className={styles.avatarWrapper}>
                        <Avatar
                          width="40px"
                          height="40px"
                          fontSize="1.25rem"
                          userDetails={
                            message?.senderDetails || message?.recipientDetails
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
                  <div ref={listScroll} />
                </>
              ))
            )}
          </List>
          <Wysiwyg
            recipientId={
              selected?.senderDetails === 1
                ? selected.recipientId
                : selected.senderId
            }
            onMessageSend={onMessageSend}
            sendMessage
          />
        </div>
      )}
    </>
  );
};

export default SelectedNotification;
