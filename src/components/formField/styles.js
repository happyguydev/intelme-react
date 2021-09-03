import { makeStyles } from '@material-ui/core/styles';

const inputStyles = makeStyles({
  wrapper: {
    width: '100%',
  },
  inputContainerError: {
    background: 'var(--white)',
    border: '1px solid var(--util-red-300)',
    borderRadius: '5px',
    fontFamily: 'Poppins',
    fontSize: '0.9375rem',
    color: 'var(--text-normal)',
    transition: 'border 0.4s',

    '& input[type="password"]::-ms-reveal': {
      display: 'none',
    },
    '& input[type="password"]::-ms-clear': {
      display: 'none',
    },
    '&:hover': {
      border: '1px solid var(--util-red-300)',
    },

    '&:active': {
      border: '1px solid var(--util-red-300)',
    },
    '&:focus': {
      border: '1px solid var(--util-red-300)',
    },
    '&:focus-within': {
      border: '1px solid var(--util-red-300)',
    },
  },
  inputContainer: {
    background: 'var(--white)',
    border: '1px solid rgba(81, 92, 111, 0.16)',
    borderRadius: '5px',
    fontFamily: 'Poppins',
    fontSize: '0.9375rem',
    color: 'var(--text-normal)',
    transition: 'border 0.4s',

    '& input[type="password"]::-ms-reveal': {
      display: 'none',
    },
    '& input[type="password"]::-ms-clear': {
      display: 'none',
    },
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
  input: {
    height: '2.5rem',
    padding: ' 0 1.3125rem',
    fontFamily: 'Poppins',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    color: 'var(--text-normal)',
    borderRadius: '5px',

    '&::placeholder': {
      color: 'var(--gray-light)',
      fontFamily: 'Poppins',
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      fontWeight: 'normal',
    },
  },
  labelStyle: {
    color: 'var(--gray-darker)',
    fontFamily: 'Poppins',
    fontSize: '0.875rem',
    paddingBottom: '0.5rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: 'normal',
    '& svg': {
      marginRight: '0.5rem',
    },
  },

  helperText: {
    fontFamily: 'Poppins',
    color: 'var(--util-red-300)',
    fontWeight: 'normal',
    fontSize: '0.75rem',
    lineHeight: '1rem',
    margin: '0.5rem 0 0',
  },
  passwordEye: {
    '& button': {
      padding: '0.375rem 0.75rem',
      backgroundColor: 'none',
      borderRadius: 'none',
      '& svg': {
        fontSize: '1.25rem',
      },
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  },
  disabled: {
    background: 'var(--white)',
    border: '1px solid rgba(81, 92, 111, 0.16)',
    borderRadius: '5px',
    fontFamily: 'Poppins',
    fontSize: '0.9375rem',
    color: 'var(--text-normal)',
    transition: 'border 0.4s',
    '&:hover': {
      border: '1px solid rgba(81, 92, 111, 0.16)',
    },

    '&:active': {
      border: '1px solid rgba(81, 92, 111, 0.16)',
    },
    '&:focus': {
      border: '1px solid rgba(81, 92, 111, 0.16)',
    },
    '&:focus-within': {
      border: '1px solid rgba(81, 92, 111, 0.16)',
    },
  },
});

export default inputStyles;
