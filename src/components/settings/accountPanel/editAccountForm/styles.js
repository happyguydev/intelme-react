import { makeStyles } from '@material-ui/core';

const accountPanelStyles = makeStyles((theme) => ({
  actionButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& div': {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '0.75rem',
      lineHeight: '1rem',
      letterSpacing: '-0.2px',
    },
    '& > button': {
      marginLeft: '1.5rem',
    },
  },
  changePasswordButton: {
    width: '8.3125rem',
    height: '2rem',
    borderRadius: '1.25rem',
    padding: '0.5rem 0.75rem 0.5rem 0.75rem',
    backgroundColor: 'var(--teal-light)',
    color: 'var(--teal-primary)',
    fontFamily: 'Poppins',
    fontSize: '0.75rem',
    fontWeight: '500',
    lineHeight: '1rem',
    letterSpacing: '-0.2px',
    textTransform: 'none',
    '&:focus': {
      outline: 'none',
    },
  },
  submitButton: {
    borderRadius: '10px',
    padding: '0.625rem 1rem',
    backgroundColor: 'var(--util-orange-normal)',
    color: 'var(--white)!important',
    fontFamily: 'Poppins',
    fontSize: '0.75rem',
    fontWeight: '600',
    lineHeight: '1rem',
    letterSpacing: '-0.2px',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'var(--util-orange-dark)',
    },
    '&:focus': {
      outline: 'none',
    },
    '&[disabled]': {
      backgroundColor: 'var(--gray-light)',
    },
  },
  formFieldLabel: {
    fontSize: '0.875rem',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '1.25rem',
    color: 'var(--gray-darker)',
    marginBottom: '0.5rem',
    fontFamily: 'Poppins',
  },
  mobileTitleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  mobileNoRequiredTick: {
    width: '0.25rem',
    height: '0.25rem',
    borderRadius: '50%',
    backgroundColor: 'var(--teal-primary)',
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
  },
  mobileNoError: {
    fontSize: '0.75rem',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '1rem',
    color: 'var(--util-red-300)',
    fontFamily: 'Poppins',
    marginTop: '0.5rem',
  },
  userAvatar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: '0.875rem',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '1.25rem',
    color: '#000000',
    '& > span': {
      marginLeft: '0.5rem',
    },
  },
  lineStyle: {
    width: '19rem',
    marginTop: '2rem',
    marginBottom: '1rem',
  },
  teamsTitle: {
    fontFamily: 'Poppins, sans-serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '1rem',
    lineHeight: '1rem',
    letterSpacing: '-0.2px',
    color: 'var(--text-normal)',
    marginBottom: '2.625rem',
    marginTop: '1rem',
  },
  divider: {
    borderTop: '1px solid var(--gray-lighter)',
    marginRight: '55%',
    marginTop: '2rem',
  },
}));

export default accountPanelStyles;
