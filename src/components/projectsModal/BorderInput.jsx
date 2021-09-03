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
  input: {
    width: '100%',
    boxSizing: 'border-box',
    background: '#F7F7F780',
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: '14px',
 padding:'0px',
    width: (props) => (props.name == 'sender' ? '260px' : '100%'),
    height: (props) => (props.name == 'sender' ? '40px' : 'auto'),

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
      '&:focus': {
        borderColor:'var(--teal-primary)',
      
      },
    },
  },
}));

export default function BorderInput(props) {
  const classes = useStyles(props);
  return <InputBase {...props} className={classes.input} />;
}
