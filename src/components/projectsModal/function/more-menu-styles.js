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
      color: 'var(--white)',
      fontSize: '40px',
      position: 'absolute',
      bottom: '82%',
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
    padding: '0',
    '& div': {
      padding: '12px 40px 12px 16px',
      fontSize: '14px',
      lineHeight: '16px',
      fontFamily: 'Poppins',
      fontWeight: '400',
      color: 'var(--text-normal)',
      width: '100%',
    },
    '&:last-child > div': {
      color: '#DE6262',
    },
  },
}))(MenuItem);

export const MoreMenuViewContainer = styled.div`
  .more-icon {
    padding: 0;
    margin-left: 16px;
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
      fontSize: '18px',
      lineHeight: '16px',
      letterSpacing: '-0.2px',
    },
  },
  content: {
    padding: '20px 0 20px 0',
    '& > p': {
      fontFamily: 'Poppins',
      fontWeight: '500',
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '-0.2px',
    },
  },
  contentTitle: {
    color: 'var(--text-normal)',
  },
  dangerText: {
    color: 'var(--util-red-300)',
  },
  contentName: {
    color: 'var(--teal-primary)',
  },
  action: {
    padding: 0,
    '& button': {
      color: 'var(--white)',
      borderRadius: '10px',
      padding: '10px 16px',
      fontSize: '12px',
      fontWeight: '500',
      lineHeight: '16px',
      letterSpacing: '-0.2px',
      fontFamily: 'Poppins',
      textTransform: 'none',
    },
  },
  deleteBtn: {
    backgroundColor: '#DE6262 !important',
    cursor: 'pointer',
    '& svg': {
      width: '16px',
      height: '16px',
      marginRight: '8px',
      marginTop: '-3px',
    },
    '&:hover': {
      backgroundColor: '#C05656 !important',
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
