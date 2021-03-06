import { makeStyles } from '@material-ui/core/styles';

const notificationStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: 'calc(100vh - 5rem)',
    height: '100%',
    overflow: 'hidden',
  },
  listNotificationsContainer: {
    width: '50%',
    marginRight: '2rem',
  },
  newAndSelected: {
    width: '50%',
    '& button': {
      marginLeft: 'auto',
    },
  },
  messageContainer: {
    height: '672px',
    marginTop: '1.5rem',
    background: 'var(--white)',
    boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '0.625rem',
    padding: '1.5rem 1.25rem',
    display: 'flex',
    fontFamily: 'Poppins, sans-serif',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  recipientContainer: {
    height: '100%',
    '& h1': {
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: '1.5rem',
      marginRight: '1.5rem',
      color: 'var(--text-normal)',
    },
  },
  addRecipient: {
    background: 'transparent',
    display: 'flex',
    position: 'relative',
    flexDirection: 'row',
    marginLeft: '0 !important',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#636363',
    height: '2.75rem',
    fontSize: '1rem',
    lineHeight: '150%',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: '-0.002em',
    cursor: 'pointer',
    transition: '0.3s all',
    '& div': {
      border: '1.5px dashed var(--gray-normal)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '1rem',
      transition: '0.3s all',
      '& svg': {
        color: 'var(--gray-normal)',
        fontSize: '2.75rem',
        padding: '0.5rem',
        transition: '0.3s all',
      },
    },
    '& h1': {
      marginRight: '1.5rem',
    },
    '&:hover': {
      color: 'var(--teal-primary)',
      '& div': {
        '& *': {
          color: 'var(--teal-primary)',

          borderColor: 'var(--teal-primary)',
        },
        color: 'var(--teal-primary)',
        borderColor: 'var(--teal-primary)',
      },
    },
    '&:focus': {
      color: 'var(--teal-primary)',
      '& div': {
        color: 'var(--teal-primary)',
        borderColor: 'var(--teal-primary)',
        '& *': {
          color: 'var(--teal-primary)',

          borderColor: 'var(--teal-primary)',
        },
      },
    },
    '&:active': {
      color: 'var(--teal-primary)',
      '& div': {
        color: 'var(--teal-primary)',
        '& *': {
          color: 'var(--teal-primary)',

          borderColor: 'var(--teal-primary)',
        },
        borderColor: 'var(--teal-primary)',
      },
    },
  },
  isSelected: {
    background: 'transparent',
    display: 'flex',
    position: 'relative',
    flexDirection: 'row',
    marginLeft: '0 !important',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#636363',
    height: '2.75rem',
    fontSize: '1rem',
    lineHeight: '150%',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: '-0.002em',
    cursor: 'pointer',
    transition: '0.3s all',
    '& span': {
      fontSize: '1rem',
      lineHeight: '150%',
      letterSpacing: '-0.002em',
      color: 'var(--text-normal)',
    },
  },
  list: {
    minHeight: '400px',
    maxHeight: '455px',
    position: 'relative',
    overflow: 'auto',
  },
  senderHeader: {
    fontWeight: 500,
    fontSize: '1.125rem',
    lineHeight: '1.25rem',
    letterSpacing: '-0.2px',
    marginBottom: '0.375rem',
    color: 'var(--text-normal)',
  },
  responses: {
    marginBottom: '1.125rem',
    fontSize: '0.75rem',
    lineHeight: '1.25rem',
    letterSpacing: '-0.2px',
    color: 'var(--text-normal)',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '1rem',
    position: 'relative',
    '& > div': {
      bottom: '-220px',
      bottom: 'auto',
      top: '65px',
      '&::before ': {
        content: " ''",
        width: 0,
        height: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        transform: 'translate(190%, -95%)',
        borderTop: '0.5rem solid transparent',
        borderLeft: '0.5rem solid transparent',
        borderRight: ' 0.5rem solid transparent',
        borderBottom: '0.5rem solid var(--white)',
      },
    },
  },
  senderTitle: {
    fontSize: '0.75rem',
    fontWeight: 500,
    lineHeight: '1rem',
    letterSpacing: '-0.2px',
    color: 'var(--text-normal)',
  },
  senderBody: {
    fontFamily: 'Poppins, sans-serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    marginBottom: '0.25rem',
    letterSpacing: '-0.2px',
    color: '(var--text-normal)',
  },
  createdDate: {
    fontFamily: 'Poppins, sans-serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '0.625rem',
    marginBottom: '0.25rem',
    lineHeight: '1rem',
    color: 'var(--gray-normal)',
  },
});

export default notificationStyles;
