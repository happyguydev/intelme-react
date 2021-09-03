import { makeStyles } from '@material-ui/core/styles';

const searchContainerStyles = makeStyles({
  wrapper: {
    marginBottom: '0.8125rem',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  root: {
    borderRadius: 0,
    padding: '0.125rem 0.25rem',
    display: 'flex',
    alignItems: 'center',
    background: 'transparent',
    boxShadow: 'none',
    borderBottom: '1px solid rgba(29, 32, 32, 0.1)',
    marginBottom: '1.25rem',
    maxWidth: '100%',
    '&:hover': {
      borderColor: '#089BAB',
    },
  },
  searchInput: {
    width: '100%',
    marginLeft: '0.5rem',
    fontFamily: 'Poppins, sans-serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '0.75rem',
    lineHeight: '0.75rem',
    color: 'var(--text-normal)',
    '&::placeholder': {
      color: 'var(--text-normal)',
      fontFamily: 'Poppins, sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '0.75rem',
      lineHeight: '0.75rem',
    },
  },

  projectButton: {
    background: 'var(--teal-primary)',
    padding: '0.5rem 1rem',
    borderRadius: '30px',
    fontFamily: 'Poppins, sans-serif',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '1rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
    lineHeight: '1.5rem',
    color: 'var(--white)',
    marginRight: '0.5rem',
    marginLeft: 'auto',
    transition: 'background 0.3s ease-in',
    '& svg': {
      marginRight: '0.5rem',
      fontSize: '1.5rem',
    },
    '&:hover': {
      background: 'var(--teal-dark)',
    },
  },
});

export default searchContainerStyles;
