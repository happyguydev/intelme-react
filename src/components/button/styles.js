import { makeStyles } from '@material-ui/core/styles';

export const buttonStyles = makeStyles({
  primary: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    background: (props) =>
      !props.disabled ? props.background : 'var(--gray-light) !important',
    color: 'var(--white)',
    outline: 'none',
    cursor: 'pointer',
    height: 'fit-content',
  },
  primaryBig: {
    background: (props) =>
      !props.disabled ? props.background : 'var(--gray-light) !important',
    borderRadius: '8px',
    padding: '1rem 2rem',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '1rem',
    display: 'flex',
    alignItems: 'center',
    margin: (props) => props.margin,
    letterSpacing: '-0.2px',
    color: 'var(--white)',
    transition: '0.3s all',
    cursor: 'pointer',
    '& svg': {
      marginRight: '9.35px',
      fontSize: '1rem',
    },
    '&:hover': {
      background: '#DF7131',
    },

    '&:disabled': {
      background: 'var(--gray-light)',
      cursor: 'default',
    },
  },
  primarySmall: {
    background: (props) =>
      !props.disabled ? props.background : 'var(--gray-light) !important',
    borderRadius: '4px',
    padding: '0.25rem 0.5rem',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '0.75rem',
    lineHeight: '1rem',
    display: 'flex',
    alignItems: 'center',
    margin: (props) => props.margin,
    letterSpacing: '-0.2px',
    color: 'var(--white)',
    transition: '0.3s all',
    cursor: 'pointer',
    '& svg': {
      marginRight: '9.35px',
      fontSize: '1rem',
    },
    '&:hover': {
      background: '#DF7131',
    },
    height: 'fit-content',
  },
  secondary: {
    background: (props) =>
      !props.disabled ? props.background : 'var(--gray-light) !important',
    borderRadius: '20px',
    padding: '0.5rem 0.75rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '0.75rem',
    lineHeight: '1rem',
    letterSpacing: '-0.2px',
    color: (props) =>
      !props.disabled ? 'var(--util-orange-normal)' : 'var(--white) !important',
    outline: 'none',
    cursor: 'pointer',
    height: 'fit-content',
    '&:hover': {
      color: '#DF7131',
    },
  },
  secondarySmall: {
    padding: '0.25rem 0.75rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '0.75rem',
    lineHeight: '1rem',
    letterSpacing: '-0.2px',
    background: (props) =>
      !props.disabled ? props.background : 'var(--gray-light) !important',
    borderRadius: '1rem',
    color: (props) =>
      !props.disabled ? props.color : 'var(--white) !important',
    outline: 'none',
    cursor: 'pointer',
    '&:hover': {
      color: (props) =>
        props.color == '#089BAB' ? '#017D8A !important' : '#DF7131 !important',
    },
    '& svg': {
      fontSize: ' 0.75rem',
      marginRight: '6.5px',
    },
    '&:hover svg': {
      color: (props) =>
        props.color == '#089BAB' ? '#017D8A !important' : '#DF7131 !important',
    },
    height: 'fit-content',
  },
  textButton: {
    background: 'transparent',
    borderRadius: '8px',
    padding: '1rem 2rem',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '1rem',
    display: 'flex',
    alignItems: 'center',
    margin: (props) => props.margin,
    letterSpacing: '-0.2px',
    color: (props) =>
      !props.disabled ? '#FF8A47' : 'var(--gray-light) !important',
    transition: '0.3s all',
    cursor: 'pointer',
    '& svg': {
      marginRight: '9.35px',
      fontSize: '1rem',
    },
    '&:hover': {
      color: '#DF7131',
    },
  },
});
