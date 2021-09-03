import { makeStyles } from '@material-ui/core/styles';

const notificationItemStyles = makeStyles({
  Item: {
    height: '4.5rem',
    display: 'flex',
    alignItems: 'center',
    paddingRight: '1.5rem',
    background: 'var(--white)',
    marginBottom: '0.375rem !important',
    transition: 'background 0.3s',
    borderRadius: '4px',
    cursor: 'pointer',
    '&:hover': {
      background: 'var(--gray-lighter)',
    },
  },
  unreadItem: {
    height: '4.5rem',
    display: 'flex',
    alignItems: 'center',
    background: 'var(--teal-light)',
    cursor: 'pointer',
    marginBottom: '0.375rem !important',
    paddingRight: '1.5rem',
    borderRadius: '4px',
    transition: 'background 0.3s',
    '&:hover': {
      background: 'var(--gray-lighter)',
    },
  },
});

export default notificationItemStyles;
