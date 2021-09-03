import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0.125rem 0.25rem',
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '0.25rem',
    borderBottom: '1px solid var(--teal-light)',
    marginRight: '0.9375rem',
    transition: 'all 0.5s',
    '& .MuiInputBase-input': {
      '&::placeholder': {
        fontFamily: 'Poppins, sans-serif',
        fontSize: '1.25rem',
        lineheight: '1.875rem',
        fontWeight: 'normal',
        fontStyle: 'normal',
        color: 'var(--gray-super-light)',
      },

  
    },
    '&:hover': {
      borderBottom: '1px solid var(--teal-primary)',
    },
  },
  input: {
    marginLeft: theme.spacing(1),
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
    borderRadius: '2px',
    background: 'var(--teal-primary)',
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
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.required ? <span className={classes.dot}></span> : null}
      <InputBase {...props} className={classes.input} />
    </div>
  );
}
