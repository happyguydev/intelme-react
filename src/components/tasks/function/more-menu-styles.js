import { withStyles, makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components';

export const StyledMenu = withStyles({
  paper: {
    filter: 'drop-shadow(0px 1px 10px rgba(0, 0, 0, 0.1))',
    borderRadius: '10px',
    padding: '0',
    marginTop: '13px',
    overflow: 'unset',
    '& svg': {
      color: '#ffffff',
      fontSize: '2.5rem',
      position: 'absolute',
      bottom: '87%',
      left: '37%',
    },
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

export const StyledMenuItem = withStyles((theme) => ({
  root: {
    padding: '0.75rem 2.5rem 0.75rem 1rem',
    fontSize: '0.875rem',
    lineHeight: '1rem',
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: 'var(--text-normal)',
    '&:last-child': {
      color: 'var(--util-red-300)',
    },
  },
}))(MenuItem);

export const MoreMenuViewContainer = styled.div`
  .more-icon {
    padding: 0;
    margin-left: 1.5rem;
  }
`;

export default MoreMenuViewContainer;

export const ModalStyles = makeStyles(() => ({
  title: {
    padding: '0',
    '& > h2': {
      color: 'var(--teal-primary)',
      fontFamily: 'Montserrat',
      fontWeight: '400',
      fontSize: '1.125rem',
      lineHeight: '1rem',
      letterSpacing: '-0.2px',
    },
  },
  content: {
    padding: '20px 0 20px 0',
    '& > p': {
      fontFamily: 'Poppins',
      fontWeight: '500',
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      letterSpacing: '-0.2px',
    },
  },
  contentTitle: {
    color: 'var(--text-normal)',
  },
  contentName: {
    color: 'var(--teal-primary)',
  },
  action: {
    padding: 0,
    '& button': {
      color: 'var(--white)',
      borderRadius: '0.625rem',
      padding: '0.625rem 1rem',
      fontSize: '0.75rem',
      fontWeight: '500',
      lineHeight: '1rem',
      letterSpacing: '-0.2px',
      fontFamily: 'Poppins',
      textTransform: 'none',
    },
  },
  deleteBtn: {
    backgroundColor: 'var(--util-red-300) !important',
    cursor: 'pointer',
    '& svg': {
      width: '1rem',
      height: '1rem',
      marginRight: '0.5rem',
      marginTop: '-3px',
    },
    '&:hover': {
      backgroundColor: 'var(--util-red-500) !important',
    },
  },
  cancelBtn: {
    backgroundColor: 'var(--gray-normal) !important',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'var(--text-normal) !important',
    },
  },
}));
