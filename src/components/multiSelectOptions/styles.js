import { makeStyles } from '@material-ui/core/styles';

const userStyles = makeStyles({
  container: {
    padding: '1rem 2.75rem',
    background: 'var(--gray-dark)',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '45.9375rem',
    minWidth: '34rem',
    position: 'fixed',
    bottom: '10rem',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1201
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  iconWrapper: {
    width: '1rem',
    height: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContentL: 'center',
    marginRight: '0.5625rem',
    backgroundColor: '#DADADA',
    cursor: 'pointer',
    borderRadius: '50%',
    transition: '0.3s',
    '&:hover': {
      opacity: 0.7,
    },
  },
  orangeBtn: {
    cursor: 'pointer',
    background: 'rgba(255, 211, 171, 0.2)',
    borderRadius: '15px',
    fontFamily: 'Poppins',
    fontWeight: 500,
    fontSize: '0.875rem',
    lineHeight: '1rem',
    letterSpacing: '-0.2px',
    padding: '0.5rem 0.75rem',
    color: 'var(--util-orange-normal)',
    marginLeft: '2rem',
    transition: '0.3s',
    '&:hover': {
      background: 'rgba(255, 211, 171, 0.3)',
    },
  },
  title: {
    fontSize: '1.125rem',
    color: '#DADADA',
    fontFamily: 'Poppins',
    lineHeight: '1.6875rem',
  },
});

export default userStyles;
