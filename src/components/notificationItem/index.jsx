import { ListItem } from '@material-ui/core';
import React from 'react';
import notificationItemStyles from './styles';

const NotificationItem = ({ read, children, onClick }) => {
  const styles = notificationItemStyles();
  return (
    <ListItem
      disableGutters
      className={read ? styles.Item : styles.unreadItem}
      onClick={() => onClick()}
    >
      {children}
    </ListItem>
  );
};

export default NotificationItem;
