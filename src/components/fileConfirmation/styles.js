import { makeStyles } from '@material-ui/core/styles';

const FileConfirmationStyles = makeStyles({
  root: {
    background: 'var(--teal-light)',
    position: 'relative',
    padding: '2rem',
  },
  title: {
    fontFamily: 'Montserrat, sans-serif',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '2rem',
    lineHeight: '2rem',
    color: 'var(--teal-primary)',
    marginBottom: '0.5rem',
  },
  closeButton: {
    position: 'absolute',
    right: '0.75rem',
    top: '0.75rem',
  },
  fileInfo: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '0.75rem',
    display: 'flex',
    lineHeight: '1rem',
    letterSpacing: '-0.2px',
    marginBottom: '1.5rem',
    '& span:nth-child(3)': {
      marginLeft: '2rem',
    },
  },
  declaration: {
    fontWeight: '300',
    color: 'var(--gray-normal)',
    marginRight: '1rem',
  },
  fileType: {
    display: 'flex',
    '& svg': {
      marginRight: '0.5rem',
      fontSize: '1rem',
    },
  },

  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
  },
  docViewer: {
    width: '70%',
    marginRight: '1.5rem',
  },
  form: {
    width: '30%',
  },
  bottomActions: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  confirmButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.625rem 1rem',
    background: 'var(--util-orange-normal)',
    borderRadius: '0.625rem',
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '0.75rem',
    lineHeight: '1rem',
    letterSpacing: '-0.2px',
    color: 'var(--white)',
    transition: 'background 0.3s',
    '&:hover': {
      background: 'var(--util-orange-dark)',
    },
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '4rem',
    '& button:first-child': {
      marginRight: '0.5rem',
    },
  },
  managerReject: {
    background: 'var(--util-red-300)',
    borderRadius: '0.625rem',
    padding: '0.625rem 1rem',
    fontFamily: 'Poppins, sans-serif',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '0.75rem',
    lineHeight: '1rem',
    cursor: 'pointer',
    letterSpacing: '-0.2px',
    color: 'var(--white)',
    transition: 'background 0.3s',
    marginRight: '0.5rem',
    '&:hover': {
      background: 'var(--util-red-500)',
    },
    '&:focus': { background: 'var(--util-red-500)' },
    '&:active': {
      background: 'var(--util-red-500)',
    },
  },
  deleteFile: {
    background: 'var(--util-red-300)',
    borderRadius: '0.625rem',
    padding: '0.625rem 1rem',
    fontFamily: 'Poppins, sans-serif',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '0.75rem',
    lineHeight: '1rem',
    cursor: 'pointer',
    letterSpacing: '-0.2px',
    color: 'var(--white)',
    transition: 'background 0.3s',
    '&:hover': {
      background: 'var(--util-red-500)',
    },
    '&:focus': { background: 'var(--util-red-500)' },
    '&:active': {
      background: 'var(--util-red-500)',
    },
  },
  managerApprove: {
    background: 'var(--teal-primary)',
    borderRadius: '0.625rem',
    padding: '0.625rem 1rem',
    fontFamily: 'Poppins, sans-serif',
    fontStyle: 'normal',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '0.75rem',
    lineHeight: '1rem',
    letterSpacing: '-0.2px',
    color: 'var(--white)',
    transition: 'background 0.3s',
    '&:hover': {
      background: 'var(--teal-dark)',
    },
    '&:focus': {
      background: 'var(--teal-dark)',
    },
    '&:active': {
      background: 'var(--teal-dark)',
    },
  },
});

export default FileConfirmationStyles;
