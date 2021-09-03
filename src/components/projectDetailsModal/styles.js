import { makeStyles } from '@material-ui/core/styles';

const userStyles = makeStyles({
  container: {
    padding: '1.375rem 2rem 1.25rem 2rem',
    background: 'var(--white)',
    boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    width: '800px',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      width: '1rem',
      height: '1rem',
      backgroundColor: 'var(--white)',
      top: '-6px',
      right: '50px ',
      borderRadius: '2px',
      transform: 'rotate(135deg)',
    },
  },
  iconWrapper: {
    marginLeft: 'auto',
    cursor: 'pointer',
    marginRight: '-10px',
    '&:hover': {
      opacity: 0.7,
    },
  },
  description: {
    fontSize: '1rem',
    color: '#4D4D4D',
    lineHeight: '27px',
    fontFamily: 'Poppins',
    margin: '1.375rem 0px 1rem 0px',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  wrapperText: {
    display: 'flex',
    marginBottom: '1.125rem',
  },
  title: {
    color: '#7E7E7E',
    fontWeight: 300,
    fontSize: '0.8125rem',
    lineHeight: '1.375rem',
    textAlign: 'right',
    marginRight: '1.5625rem',
    fontFamily: 'Poppins',
    width: '6.25rem',
  },
  descriptionTitle: {
    fontSize: '0.9375rem',
    color: 'var(--text-normal)',
    lineHeight: '1.375rem',
    fontFamily: 'Poppins',
  },
  titleContects: {
    color: '#7E7E7E',
    fontWeight: 300,
    fontSize: '0.8125rem',
    lineHeight: '1.375rem',
    fontFamily: 'Poppins',
    marginBottom: '1rem',
  },
});

export default userStyles;
