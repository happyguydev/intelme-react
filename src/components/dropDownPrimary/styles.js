import { makeStyles } from '@material-ui/core/styles';

const ToReviewStyles = makeStyles({
  dropDownWrapper: {
    backgroundColor: '#EDF5F6',
    minWidth: '6.2rem',
    borderRadius: '0px 0px 20px 20px',
    width: '100%',
    padding: '0px',
    '& p': {
      color: '#089BAB',
      fontWeight: 500,
      whiteSpace: 'nowrap',
      padding: '8px 4px 12px 0px',
      '&:hover': {
        color: 'var(--teal-dark)',
      },
    },
    '& li': {
      padding: '0px',
      margin: '0px 12px',
      borderTop: '1px solid rgba(53, 173, 186, 0.5)',
      '&:hover': {
        background: 'none !important',
      },
    },
    boxShadow: 'none',
  },
  teamBtn: {
    background: '#EDF5F6',
    borderRadius: '20px',
    padding: '8px 12px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    marginLeft: 'auto',
    '& svg path': {
      fill: '#089BAB !important',
    },
    '& p': {
      color: '#089BAB',
      fontWeight: 500,
      marginRight: '4px',
      whiteSpace: 'nowrap',
      '&:hover': {
        color: 'var(--teal-dark)',
      },
    },
  },
  dropDownContainer: {
    '& .rc-menu-button--open': {
      borderRadius: '20px 20px 0px 0px',
    },
  },
});

export default ToReviewStyles;
