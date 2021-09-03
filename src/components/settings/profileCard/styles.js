import { makeStyles } from '@material-ui/core/styles';

const profileCardStyles = makeStyles({
  profileCardContainer: {
    maxWidth: '22rem',
    width: '22rem',
    minWidth: '22rem',
    fontFamily: 'Poppins, sans-serif',
    textAlign: 'center',
    letterSpacing: '-0.2px',
    color: 'var(--text-normal)',
    '& > div': {
      boxShadow: '0px 4px 20px rgb(0 0 0 / 5%)',
    },
  },

  userImage: {
    margin: '1rem auto 1rem auto',
    fontWeight: '600',
    position: 'relative',
  },
  username: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '500',
    fontSize: '1.25rem',
    lineHeight: '1.5rem',
    marginBottom: '0.5rem',
  },
  userCompany: {
    fontWeight: '300',
    fontSize: '1rem',
    lineHeight: '1rem',
    marginBottom: '1.5rem',
  },
  userEmail: {
    fontWeight: '400',
    fontSize: '0.75rem',
    lineHeight: '1rem',
    marginBottom: '4rem',
  },
  connectedAccountsTitle: {
    fontWeight: '400',
    fontSize: '1rem',
    lineHeight: '1rem',
    textAlign: 'left',
    margin: '1rem 0',
  },
  accountList: {
    marginBottom: '6rem',
  },
  accountItem: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  label: {
    '& > div': {
      cursor: 'pointer',
    },
  },
  accountName: {
    fontWeight: '400',
    fontSize: '0.75rem',
    lineHeight: '1rem',
    flex: '0 0 6.3125rem',
    marginLeft: '2rem',
  },
  accountConnectedBadge: {
    width: '4.4375rem',
    height: '1.25rem',
    backgroundColor: 'var(--orange-normal)',
    borderRadius: '0.625rem',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginleft: '4.625rem',
    marginRight: '-0.375rem',
    '& > span': {
      fontWeight: '500',
      fontSize: '0.625rem',
      lineHeight: '1rem',
      color: 'var(--white)',
    },
  },
  accountUnconnectedBadge: {
    width: '3.625rem',
    height: '1.25rem',
    background: 'var(--util-orange-light)',
    borderRadius: '0.625rem',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '13.375rem',
    '& > span': {
      fontWeight: '500',
      fontSize: '0.625rem',
      lineHeight: '1rem',
      color: 'var(--util-orange-normal)',
    },
  },
  projectItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '0.75rem',
  },
  projectStatusTitle: {
    fontWeight: '400',
    fontSize: '0.75rem',
    lineHeight: '1rem',
  },
  projectValue: {
    fontWeight: '500',
    fontSize: '0.75rem',
    lineHeight: '1rem',
    width: '2.75rem',
    height: '1.25rem',
    borderRadius: '1.25rem',
    padding: '2px',
    backgroundColor: 'var(--teal-light)',
    color: 'var(--teal-primary)',
  },
  divider: {
    color: '#F0F0F0',
    marginBottom: '1.5rem',
  },
  iconWrapper: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#EDF5F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'absolute',
    bottom: '0px',
    right: '74px',
    '& :hover': {
      opacity: 0.8,
    },
  },
  inputFile: {
    display: 'none',
  },
});

export default profileCardStyles;
