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
      fontSize: '40px',
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
    padding: '0',
    '& div': {
      padding: '12px 40px 12px 16px',
      fontSize: '14px',
      lineHeight: '16px',
      fontFamily: 'Poppins',
      fontWeight: '400',
      color: '#4D4D4D',
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
    margin-left: 24px;
  }
`;

export default MoreMenuViewContainer;
