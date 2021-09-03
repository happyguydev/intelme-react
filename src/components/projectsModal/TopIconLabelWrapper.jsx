import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    color: 'var(--text-normal)',
    // width: (props) => props.width ? `${width}%` : "max-content"
  },
  innerWrapper: {
    display: 'flex',
    marginBottom: '10px',
  },
  contentWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginTop:"10px"
  },
  label: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: '16px',
  },
  icon: {
    marginRight: '10px',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      marginRight: '0.625rem',
    },
  },
}));

export default function TopIconLabelWrapper(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.innerWrapper}>
        {props.icon && (
          <div className={classes.iconContainer}>{props.icon}</div>
        )}
        <Typography className={classes.label}>{props.label}</Typography>
      </div>
      <div className={classes.contentWrapper}>{props.children}</div>
    </div>
  );
}
