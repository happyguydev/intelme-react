import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
  input: {
    width: '100%',
  
    boxSizing: 'border-box',
    borderRadius: '5px',
    background: '#F7F7F780',
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: '1rem',
  padding:'0px',
    '& .MuiInputBase-input': {
      padding:'12px !important',
      border: '1px solid #DBDBDB',
      borderRadius:'5px',
      '&::placeholder': {
        fontFamily: 'Poppins, sans-serif',
        fontSize: '0.875rem',
        lineheight: '1.25rem',
        fontWeight: 'normal',
        fontStyle: 'normal',
        color: 'var(--gray-normal)',
      
      },
      '&:focus':{
        borderColor: 'var(--teal-primary)',
      }
    },
  },
}));

export default function BorderInput(props) {
  const classes = useStyles();
  return <InputBase {...props} className={classes.input} />;
}
