import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles((props) => ({
  root: {
    padding: '0.125rem 0.25rem',
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '0.25rem',

    marginRight: '0.9375rem',

    '& .MuiInputBase-input': {
      padding: '16px',
      borderBottom: '1px solid var(--teal-light)',
      '&::placeholder': {
        fontFamily: 'Poppins, sans-serif',
        fontSize: '1.25rem',
        lineheight: '1.875rem',
        fontWeight: 'normal',
        fontStyle: 'normal',
        color: 'var(--gray-super-light)',
      },
      '&:focus': {
        borderColor:'var(--teal-primary)'
      },
    },
  },
  input: {
    marginLeft: props.spacing(1),
    flex: 1,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '1.25rem',
    lineHeight: '1.875rem',
    color: 'var(--text-normal)',
 
  },
  dot: {
    width: '10px',
    height: '10px',
    background: 'var(--teal-primary)',
    borderRadius: '1px',
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function LineInput(props) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      {props.required ? <span className={classes.dot}></span> : null}
      <InputBase {...props} className={classes.input} />
    </div>
  );
}
