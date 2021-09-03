import { makeStyles } from '@material-ui/core/styles';

const formStyles = makeStyles({
  label: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    fontFamily: 'Poppins, sans-serif',
    color: 'var(--gray-darker)',
    marginBottom: '0.5rem',
  },
  requiredField: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    fontFamily: 'Poppins, sans-serif',
    color: 'var(--gray-darker)',
    marginBottom: '0.5rem',
    marginLeft: '1rem',
    position: 'relative',
    '&::before': {
      content: "''",

      borderRadius: '2px',
      width: '4px',
      position: 'absolute',
      height: '4px',
      background: 'var(--teal-primary)',
      top: '50%',
      transform: 'translate(-350%, -50%)',
    },
  },
  inputContainer: {
    background: 'var(--white)',
    border: '1px solid rgba(81, 92, 111, 0.16)',
    borderRadius: '5px',
    paddingLeft: '1.5rem',
    paddingRight: '0.5rem',
    paddingTop: '0.5rem',
    height: '2.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '0.5rem',
    fontFamily: 'Poppins, sans-serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '0.9375rem',
    marginBottom: '1rem',
    cursor: 'pointer',
    transition: 'border 0.4s',
    '&:hover': {
      border: '1px solid var(--teal-primary)',
    },

    '&:active': {
      border: '1px solid var(--teal-primary)',
    },
    '&:focus': {
      border: '1px solid var(--teal-primary)',
    },
    '&:focus-within': {
      border: '1px solid var(--teal-primary)',
    },
  },
  datePicker: {
    background: 'var(--white)',
    border: '1px solid rgba(81, 92, 111, 0.16)',
    borderRadius: '5px',
    paddingLeft: '1.5rem',
    paddingRight: '0.5rem',
    paddingTop: '0.5rem',
    height: '2.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '0.5rem',
    fontFamily: 'Poppins, sans-serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '0.9375rem',
    marginBottom: '1rem',
    cursor: 'pointer',
    transition: 'border 0.4s',
    '&:hover': {
      border: '1px solid var(--teal-primary)',
    },
    '& .MuiAutocomplete-popupIndicatorOpen': {
      transform: 'rotate(0deg)',
    },
    '&:active': {
      border: '1px solid var(--teal-primary)',
    },
    '&:focus': {
      border: '1px solid var(--teal-primary)',
    },
    '&:focus-within': {
      border: '1px solid var(--teal-primary)',
    },
  },
  disciplinesContainer: {
    background: 'var(--white)',
    color: 'var(--text-normal) !important',
    border: '1px solid rgba(81, 92, 111, 0.16)',
    borderRadius: '5px',
    paddingLeft: '1.5rem',
    paddingRight: '0.5rem',
    paddingTop: '0.5rem',
    minHeight: '2.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '0.5rem',
    fontFamily: 'Poppins, sans-serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '0.9375rem',
    marginBottom: '1rem',
    cursor: 'pointer',
    transition: 'border 0.4s',

    '&:hover': {
      border: '1px solid var(--teal-primary)',
    },

    '&:active': {
      border: '1px solid var(--teal-primary)',
    },
    '&:focus': {
      border: '1px solid var(--teal-primary)',
    },
    '&:focus-within': {
      border: '1px solid var(--teal-primary)',
    },
  },
  iconStyle: {
    padding: '0',
  },
  disciplineTags: {
    background: 'var(--white)',
    height: 'auto',
    fontFamily: 'Poppins, sans-serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '0.9375rem',
    color: 'var(--text-normal)',
    margin: 0,
    padding: '0.5rem 0',
    '& span': {
      padding: 0,
      fontSize: '0.9375rem',
      paddingRight: '0.25rem',
    },
  },
});

export default formStyles;
