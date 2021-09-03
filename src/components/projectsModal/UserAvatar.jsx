import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme, props) => ({
  root: {
    border: "2px solid #5DDB6A",
    width: props => props.width ? props.width : theme.spacing(4),
    height: props => props.height ? props.height : theme.spacing(4),
  },
}));

export default function UserAvatar(props) {
  const classes = useStyles(props);

  return (
    <Avatar {...props} className={classes.root} />
  );
}