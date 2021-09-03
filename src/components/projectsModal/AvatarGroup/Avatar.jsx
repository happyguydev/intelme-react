import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme, props) => ({
  avatar: {
    color: '#089BAB !important',
    background: (props) => `#${props.color}`,
    fontWeight: 500,
  },
}));

export default function CustomAvatar(props) {
  const classes = useStyles(props);
  const { user } = props;
  return (
    <Avatar
      className={classes.avatar}
      alt={user.firstName ? user.firstName : 'firstname'}
      src={user.img}
    >
      {!user.img &&
        (props.mode === 'people'
          ? `${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`
          : `${user.name[0].toUpperCase()}`)}
    </Avatar>
  );
}
