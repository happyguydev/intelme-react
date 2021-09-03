import React, { Fragment } from 'react';
import { format, parseISO } from 'date-fns';
import { enAU } from 'date-fns/locale';
import {
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { Markup } from 'interweave';
import { ReactComponent as NewMessagePlaceholder } from '../../../../components/icons/newMessageIcon.svg';
import InfiniteScroll from 'react-infinite-scroll-component';

import fullListStyles, { ListContainer } from './styles';
import pureRelativeDate from '../../../../utils/pureRelativeDate';

import { notificationIcons } from '../../../../components/notificationList/icons';

import Avatar from '../../../../components/avatar';

const AllNotificationsList = ({
  data,
  onClickNotification,
  selected,
  newMessage,
  selectedMessage,
  newMessageRecipient,
  loadingFilters,
}) => {
  const styles = fullListStyles();

  let newMessagePlaceholder = [
    {
      id: 'NEW_MESSAGE',
      type: 'New Message',
      body: 'New Message',
      createdAt: new Date().toISOString(),
    },
  ];

  let finalNewMessage = [];
  if (newMessage) {
    finalNewMessage = newMessagePlaceholder.concat(data);
  } else {
    finalNewMessage = data;
  }
  return (
    <>
      {!data ? (
        <div className={styles.emptyList}>
          You have no notifications to read.
        </div>
      ) : (
        <ListContainer>
          <List dense={false} disablePadding className={styles.list}>
            {loadingFilters ? (
              <div className={styles.loading}>
                <CircularProgress />
              </div>
            ) : finalNewMessage.length === 0 ? (
              <span className={styles.emptyText}>No results found.</span>
            ) : (
              finalNewMessage?.map((item, index) => (
                <Fragment key={item?.id}>
                  {!item?.targetType && item.id !== 'NEW_MESSAGE' ? (
                    <ListItem
                      className={
                        selected?.id === item?.id
                          ? styles.selectedItem
                          : styles.Item
                      }
                      value={item.id}
                      onClick={() => onClickNotification(item)}
                      disableGutters
                    >
                      <ListItemIcon>
                        <div className={styles.avatarWrapper}>
                          <Avatar
                            width="40px"
                            height="40px"
                            fontSize="1rem"
                            userDetails={
                              item?.senderDetails === 1
                                ? item?.recipientDetails
                                : item?.senderDetails
                            }
                          />
                        </div>
                      </ListItemIcon>
                      <ListItemText
                        className={styles.textContainer}
                        primary={
                          <div>
                            <h3 className={styles.senderTitle}>
                              {item?.senderDetails === 1
                                ? item.recipientDetails?.firstName
                                  ? `${item?.recipientDetails?.firstName} ${item?.recipientDetails?.lastName}`
                                  : item?.recipientDetails?.username
                                : item.senderDetails?.firstName
                                ? `${item?.senderDetails?.firstName} ${item?.senderDetails?.lastName}`
                                : item?.senderDetails?.username}
                            </h3>
                            <span className={styles.senderBody}>
                              <Markup content={item.body} />
                            </span>
                          </div>
                        }
                        secondary={
                          <span className={styles.createdDate}>
                            {item?.createdAt
                              ? format(
                                  parseISO(item?.createdAt.replace('Z', '')),
                                  "hh':'mmaaa cccc d LLL yy",
                                  { locale: enAU }
                                )
                              : '-'}
                          </span>
                        }
                      />
                    </ListItem>
                  ) : item.id !== 'NEW_MESSAGE' ? (
                    <ListItem
                      className={
                        selected?.id === item?.id
                          ? styles.selectedItem
                          : styles.Item
                      }
                      onClick={() => onClickNotification(item)}
                      disableGutters
                    >
                      <ListItemIcon>
                        <div className={styles.iconWrapper}>
                          {
                            notificationIcons.find(
                              (notType) => notType.type === item?.targetType
                            )?.icon
                          }
                        </div>
                      </ListItemIcon>
                      <ListItemText
                        className={styles.textContainer}
                        primary={<Markup content={item?.body} />}
                        secondary={pureRelativeDate(item?.createdAt)}
                      />
                    </ListItem>
                  ) : (
                    <div className={styles.newMessagePlaceholder}>
                      {selectedMessage ? (
                        <>
                          <Avatar
                            width="2.5rem"
                            height="2.5rem"
                            userDetails={selectedMessage}
                          />
                          <span>
                            {selectedMessage?.firstName
                              ? `${selectedMessage?.firstName}  ${selectedMessage?.lastName}`
                              : selectedMessage?.username}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className={styles.avatarPlaceholder}>
                            <NewMessagePlaceholder />
                          </span>
                          <span>New Message</span>
                        </>
                      )}
                    </div>
                  )}
                </Fragment>
              ))
            )}
          </List>
        </ListContainer>
      )}
    </>
  );
};

export default AllNotificationsList;
