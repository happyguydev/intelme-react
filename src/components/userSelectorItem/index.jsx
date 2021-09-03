import { ListItem } from '@material-ui/core';
import React from 'react';
import userSelectorItemStyles from './styles';

const UserSelectorItem = ({ read, children, onClick }) => {
  const styles = userSelectorItemStyles();
  return (
    <ListItem className={styles.Item} onClick={onClick}>
      {children}
    </ListItem>
  );
};

export default UserSelectorItem;
