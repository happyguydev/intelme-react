import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const drawerWidth = '13rem';

const menuStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& *': {
      overflow: 'hidden',
    },
    '& a': {
      color: 'none',
    },
    '& svg': {
      fontSize: '1.25rem',
      flexShrink: 0,
    },
  },

  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    position: 'auto',
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: 'var(--teal-primary)',
    borderRight: 'none',
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: 'var(--teal-primary)',
    overflowX: 'hidden',
    '& p': {
      display: 'none',
    },
    '& div': {
      '& div': {
        '& div': {
          display: 'none',
        },
      },
    },
    width: '5.5rem',
    [theme.breakpoints.up('sm')]: {
      width: '5.5rem',
    },
    borderRight: 'none',
  },
  toolbarClose: {
    height: '5.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    paddingTop: '1.5rem',
    paddingBottom: '2rem',
    paddingRight: 0,

    '& p': {
      marginLeft: '0.25rem',
      fontFamily: 'Poppins, sans-serif',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: '1.125rem',
      lineHeight: '1.6875rem',
      color: 'var(--white)',
    },
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    '& button': {
      color: 'var(--white)',
      padding: '0.75rem 0 0.75rem 0',
      backgroundColor: 'transparent',
      '& svg': {
        marginLeft: '0.5rem',
      },
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    paddingTop: '1.5rem',
    paddingBottom: '2rem',
    minHeight: '2rem',
    '& p': {
      marginLeft: '0.25rem',
      fontFamily: 'Poppins, sans-serif',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: '1.125rem',
      lineHeight: '1.6875rem',
      color: 'var(--white)',
    },
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    '& button': {
      color: 'var(--white)',
      padding: 0,
      marginLeft: '1.6875rem',
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  divider: {
    margin: '0 2rem',
    background: 'var(--white)',
  },
  dividerClosed: {
    marginLeft: '1.5rem',
    marginRight: '1.8rem',
    background: 'var(--white)',
  },
  list: {
    overflow: 'initial',
  },
}));

export default menuStyles;

export const Item = styled.div`
  margin-left: 1.125rem;
  margin-bottom: 2rem;
  height: 2.78125rem;
  padding: 0.75rem 0.875rem;
  color: var(--teal-light);
  cursor: pointer;
  font-weight: normal;
  font-family: Poppins;
  font-size: 1rem;
  line-height: 1.5rem;
  border-radius: 25px 0px 0px 25px;
  transition: 0.5s all;
  display: flex;
  align-items: center;
  svg {
    color: var(--teal-light);
    margin-right: 0.5rem;
  }
  &:hover {
    color: var(--white);
    svg {
      color: var(--white);
    }
  }
`;

export const SelectedItem = styled.div`
  color: var(--teal-primary);
  background: var(--teal-light);
  padding: 0.75rem 0.875rem;
  border-radius: 25px 0px 0px 25px;
  font-family: Poppins;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;
  height: 2.78125rem;

  overflow: initial;
  justify-content: flex-start;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 1.25rem;
  margin-bottom: 2rem;
  position: relative;
  svg {
    margin-right: 0.5rem;
    z-index: 1000;
  }

  &::after {
    content: '';
    position: absolute;
    background-color: transparent;
    height: 1.875rem;
    width: 1.875rem;
    bottom: -1.875rem;
    background: radial-gradient(
      circle at bottom left,
      #089bab 30px,
      #edf5f6 31px
    );
    right: 0rem;
    box-shadow: 0.1875rem -1.5625rem 0px 0px #edf5f6;
  }
  &::before {
    cursor: default;
    content: '';
    position: absolute;
    height: 1.875rem;
    width: 1.875rem;
    right: 0;
    bottom: 2.78rem;
    background-color: transparent;
    background: radial-gradient(circle at top left, #089bab 30px, #edf5f6 31px);
    box-shadow: 0.1875rem 1.56265rem 0px 0px #edf5f6;
  }
`;

export const MenuHeader = styled.div`
  padding: 1.5rem 2em;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

export const BottomOptions = styled.div`
  padding-top: 10rem;
  @media (max-height: 800px) {
    padding-top: 0px;
  }
  div {
    padding-bottom: 3px;
  }
`;
