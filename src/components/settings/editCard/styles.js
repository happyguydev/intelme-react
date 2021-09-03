import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const EditProfileStyles = makeStyles({
  root: {
    flexGrow: 1,
    fontFamily: 'Poppins',
    letterSpacing: '-0.2px',
    maxWidth: '46rem',
  },
  tabContainer: {
    width: '100%',
    minHeight: '30rem',
    background: 'var(--white)',
    padding: '2rem 1.5rem',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
    color: 'var(--text-normal)',
    borderRadius: '0px 10px 10px 10px',
    '& > p': {
      fontFamily: 'Poppins',
    },
  },
  actionButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& > button': {
      marginleft: '1.5rem',
      padding: '0.625rem 1rem',
    },
  },
  userAvatar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: '0.875rem',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '1.25rem',
    color: 'black',
    '& > span': {
      marginLeft: '0.5rem',
    },
  },
  divider: {
    width: '45%',
    marginTop: '2rem',
    marginBottom: '1rem',
  },
  teamsTitle: {
    fontSize: '1rem',
    fontWeight: '400',
    lineHeight: '1rem',
    color: 'var(--text-normal)',
    marginBottom: '2.625rem',
  },
});

export default EditProfileStyles;

const AntTabs = withStyles({
  root: {
    borderBottom: 'transparent',
    backgroundColor: 'transparent',
    fontFamily: 'Poppins',
    '& button:first-child': {
      marginLeft: 0,
    },
  },
  indicator: {
    backgroundColor: 'var(--white)',
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    fontWeight: 400,
    fontFamily: 'Poppins',
    minWidth: '9.625rem',
    color: 'var(--text-darker)',
    backgroundColor: '#F8FEFF',
    borderRadius: '10px 20px 0px 0px',
    marginLeft: '-1.375rem',
    fontSize: '1rem',
    lineHeight: '1rem',
    '&$selected': {
      minWidth: '7.5rem',
      color: 'var(--text-normal)',
      backgroundColor: 'var(--white)',
      borderRadius: '10px 20px 0px 0px',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
      zIndex: '99',
    },
    '&:focus': {
      outline: 'none',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

export { AntTabs, AntTab };
