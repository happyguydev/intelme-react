import { makeStyles } from '@material-ui/core/styles';

const userStyles = makeStyles({
  container: {
    padding: '1rem 0px 0.3125rem 0px',
    background: 'var(--white',
    boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    maxWidth: '11.75rem',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      width: '1rem',
      height: '1rem',
      backgroundColor: 'var(--white)',
      top: '-6px',
      left: '50% ',
      borderRadius: '2px',
      transform: 'translateX(-50%) rotate(135deg)',
    },
  },

  icon: {
    marginRight: '0.6875rem',
  },

  item: {
    listStyle: 'none',
    fontSize: '1rem',
    color: 'var(--text-normal)',
    display: 'flex',
    padding: '0.375rem 0px 0.375rem 1rem',
    alignItems: 'center',
    margin: '0px 0px 0.25rem 0px',
    fontFamily: 'Poppins',
    whiteSpace: 'nowrap',
    '&:hover': {
      background: 'var(--gray-lighter)',
      cursor: 'pointer',
    },
  },
});

export default userStyles;
