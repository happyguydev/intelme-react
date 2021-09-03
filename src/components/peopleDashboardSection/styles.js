import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const ToReviewStyles = makeStyles({
  tasksContainer: {
    background: '#FFFFFF',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
    borderRadius: '10px',
    padding: '24px',
    marginBottom: '2rem',
    height: '24rem',
    maxHeight: '24rem',
    maxWidth: '46rem',
    position: 'relative',
    width: 'auto',
    '& h1': {
      color: 'var(--teal-primary)',
      lineHeight: '24px',
      fontSize: '20px',
    },
    '& span': {
      padding: '0.5rem 0',

      background: 'var(--gray-lighter)',
    },
    '& > div': {
      justifyContent: 'space-between',
    },
    '& a.primary-text': {
      color: 'var(--teal-primary)',
      fontWeight: 500,
      position: 'absolute',
      bottom: '24px',
      right: '24px',
      '&:hover': {
        color: 'var(--teal-dark)',
      },
    },
  },
  teamBtn: {
    width: '100%',
    marginTop: '24px',
    background: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    '& p': {
      marginRight: '8px',
    },
    '& span': {
      width: '0px',
      height: '0px',
      borderLeft: '7px solid transparent',
      borderRight: '7px solid transparent',

      borderTop: '7px solid #C7C7C7',
    },
  },
  people: {
    width: 'auto',
    height: '27.75rem',
    maxHeight: '27.75rem',
    maxWidth: '22rem',
    background: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '0.625rem',
    backgroundImage: 'url(/people.svg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'bottom',

    '& h3': {
      fontSize: '1.5rem',
      margin: '1.5rem',
      lineHeight: '1.5rem',
      color: 'var(--teal-primary)',
    },
    '& p': {
      fontSize: '0.75rem',
      margin: '1.5rem',
      width: '70%',
      lineHeight: '1.25rem',
      letterSpacing: '-0.2px',
      fontFamily: 'Poppins, sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      color: 'var(--text-normal)',
    },
  },
  teamWrapper: {
    boxShadow: 'none',
    minWidth: '19rem',
    '& .rc-menu__item--type-radio.rc-menu__item--checked::before': {
      display: 'none',
    },
    '& .rc-menu__item--type-radio': {
      padding: '24px 0px 0px',
      '&:hover': {
        background: 'none !important',
      },
    },
    '& .user-name': {
      width: '100%',
      justifyContent: 'space-between',
    },
    '& h4': {
      marginLeft: '10px',
    },
    '& h5': {
      color: '#A5A5A5',
    },
    '& button': {
      padding: '7px 13px',
      '& svg': {
        margin: '0px',
      },
    },
  },
  peopelWrapper: {
    margin: '20px 0px',
    '& h1': {
      fontSize: '1rem',
      fontWeight: '400',
      fontFamily: 'Poppins',
      lineHeight: '16px',
    },
  },
  peopelGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5,1fr)',
    gridColumnGap: '26px',

    '& > div': {
      margin: '0px',
      marginTop: '16px',
    },
  },
  skeletonContainer: {
    width: '100%',

    '& span': {
      padding: '0.5rem 0',

      background: 'var(--gray-lighter)',
    },
  },
});

export default ToReviewStyles;
