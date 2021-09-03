import { makeStyles } from '@material-ui/core/styles';

const selectedNotificationsStyle = makeStyles({
  empty: {
    background: 'rgb(77, 77, 77, 0.05)',
    borderRadius: '10px',
    marginTop: '2rem',
    height: '672px',
    fontFamily: 'Poppins, san-serif',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '0.875rem',
    lineHeight: '2rem',
    color: 'var(--text-normal)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    margin: '1.5rem 0',
  },
  selectedNotification: {
    cursor: 'pointer',
    display: 'flex',
    background: 'var(--white)',
    alingItems: 'center',
    borderRadius: '0.625rem',
    marginBottom: '0.375rem',
    padding: '2rem',
  },
  item: {
    padding: 0,
    borderRadius: '0.625rem',
    '& div': {
      fontFamily: 'Poppins, sans-serif',
      lineHeight: '1.25rem',
      fontWeight: 'normal',
      fontStyle: 'normal',
      color: 'var(--text-normal)',
      letterSpacing: '-0.2px',
      '& a': {
        transition: 'color 0.3s',
        fontFamily: 'Poppins, sans-serif',
        lineHeight: '1.25rem',
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: '-0.2px',
        '&:hover': {
          fontFamily: 'Poppins, sans-serif',
          lineHeight: '1.25rem',
          fontWeight: '500',
          fontStyle: 'normal',
          letterSpacing: '-0.2px',
          color: 'var(--teal-primary)',
        },
      },
    },
  },
  messageItem: {
    padding: 0,
    display: 'flex',
    marginBottom: '0.5rem',
    paddingBottom: '0.25rem',
    borderBottom: '1px solid var(--gray-lighter)',
    alignItems: 'center',
    '& div': {
      fontFamily: 'Poppins, sans-serif',
      lineHeight: '1.25rem',
      fontWeight: 'normal',
      margin: 0,
      fontStyle: 'normal',
      color: 'var(--text-normal)',
      letterSpacing: '-0.2px',

      '& a': {
        transition: 'color 0.3s',
        fontFamily: 'Poppins, sans-serif',
        lineHeight: '1.25rem',
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: '-0.2px',
        '&:hover': {
          fontFamily: 'Poppins, sans-serif',
          lineHeight: '1.25rem',
          fontWeight: '500',
          fontStyle: 'normal',
          letterSpacing: '-0.2px',
          color: 'var(--teal-primary)',
        },
      },
    },
  },
  avatarWrapper: {
    width: '40px',
    height: '40px',
    marginRight: '0.5rem !important',
    '& div': {
      color: 'var(--white)',
    },
  },
  messageContainer: {
    marginTop: '1.5rem',
    background: 'var(--white)',
    boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '0.625rem',
    padding: '1.5rem 1.25rem',
    display: 'flex',
    fontFamily: 'Poppins, sans-serif',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    margin: 0,
    height: '672px',
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
  list: {
    minHeight: '455px',
    maxHeight: '455px',
    position: 'relative',
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: 'column-reverse',
    overscrollBehaviorY: 'contain',
    scrollSnapType: 'y proximity',
    '& li:last-child': {
      scrollSnapAlign: 'end',
    },
  },
  textContainer: {
    width: '100%',
  },
  loading: {
    display: 'flex',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  loadContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'column-reverse',
    justifyContent: 'center',
  },
});

export default selectedNotificationsStyle;
