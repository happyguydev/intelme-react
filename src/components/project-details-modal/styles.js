import { makeStyles } from '@material-ui/core/styles';

const userStyles = makeStyles({
  container: {
    padding: '22px 32px 20px 32px',
    background: '#ffffff',
    boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    maxWidth: '800px',
    minWidth: '400px',
    position: 'absolute',
    left: '-170px',
    top: '57px',
    '&::before': {
      content: '""',
      position: 'absolute',
      width: '16px',
      height: '16px',
      backgroundColor: '#fff',
      top: '-6px',
      right: '40.8%',
      borderRadius: '2px',
      transform: 'rotate(135deg)',
    },
  },
  projectDetails: {
    position: 'relative',
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
    fontSize: '16px',
    color: '#4D4D4D',
    lineHeight: '27px',
    fontFamily: 'Poppins',
    margin: '22px 0px 16px 0px',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  wrapperText: {
    display: 'flex',
    marginBottom: '18px',
  },
  title: {
    color: '#7E7E7E',
    fontWeight: 300,
    fontSize: '13px',
    lineHeight: '22px',
    textAlign: 'right',
    marginRight: '25px',
    fontFamily: 'Poppins',
    width: '100px',
  },
  descriptionTitle: {
    fontSize: '15px',
    color: '#4D4D4D',
    lineHeight: '22px',
    fontFamily: 'Poppins',
  },
  titleContects: {
    color: '#7E7E7E',
    fontWeight: 300,
    fontSize: '13px',
    lineHeight: '22px',
    fontFamily: 'Poppins',
    marginBottom: '16px',
  },
  dots: {
    marginTop: '0.6rem',
    marginLeft: '2rem',
    background: 'none',
    cursor: 'pointer',
    '&:hover svg': {
      color: '#089BAB !important',
    },
  },
});

export default userStyles;
