import { makeStyles } from '@material-ui/core/styles';

const userSelectorItemStyles = makeStyles({
  Item: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: '1.5rem',
    background: 'var(--white)',
    marginBottom: '0.375rem',
    transition: 'background 0.3s',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    paddingRight: '12px',
    '&:hover': {
      background: 'var(--gray-lighter)',
      '& span': {
        visibility: 'visible',
      },
      '& button': {
        visibility: 'visible',
      },
    },
    '& button': {
      visibility: 'hidden',
    },
  },
});

export default userSelectorItemStyles;
