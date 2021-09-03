import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

const changePasswordStyles = makeStyles((theme) => ({
  title: {
    fontFamily: 'Montserrat',
    fontSize: '1rem',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '1.5rem',
    color: 'var(--teal-primary)',
    marginBottom: '2rem',
  },
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  fieldsContainer: {
    width: '330px',
    '& > div': {
      marginTop: '1.5rem',
    },
    '& > div:first-child': {
      marginTop: '0',
    },
  },
  textContainer: {
    marginLeft: '3.5rem',
  },
  helperText: {
    backgroundColor: 'var(--teal-light)',
    margin: 0,
    paddingLeft: '0.875rem',
    paddingTop: '0.25rem',
    paddingRight: '0.875rem',
  },
  lineStyle: {
    marginBottom: '1.5rem',
  },
  textTitle: {
    fontFamily: 'Poppins',
    fontSize: '0.75rem',
    lineHeight: '1rem',
    fontWeight: '400',
    marginLeft: '0.5rem',
    color: 'var(--gray-normal)',
  },
  textDetail: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '1rem',
    '& > p ': {
      fontFamily: 'Poppins',
      fontSize: '0.75rem',
      lineHeight: '1rem',
      fontWeight: '400',
      marginLeft: '0.5rem',
    },
  },
  actionBtns: {
    marginTop: '6.125rem',
    display: 'flex',
    justifyContent: 'flex-end',
    '& div': {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '0.75rem',
      lineHeight: '1rem',
      letterSpacing: '-0.2px',
    },
    '& > button': {
      marginLeft: '1.5rem',
      padding: '0.625rem 1rem',
    },
  },
  submitButton: {
    borderRadius: '10px',
    padding: '0.625rem 1rem',
    backgroundColor: 'var(--util-orange-normal)',
    color: 'var(--white)',
    fontFamily: 'Poppins',
    fontSize: '0.75rem',
    fontWeight: '400',
    lineHeight: '1rem',
    letterSpacing: '-0.2px',
    textTransform: 'none',
    color: '#fff',
    '&:hover': {
      backgroundColor: 'var(--util-orange-dark)',
    },
    '&:focus': {
      outline: 'none',
    },
    '&[disabled]': {
      backgroundColor: 'var(--gray-light)',
      color: '#fff',
    },
  },
}));

export default changePasswordStyles;
