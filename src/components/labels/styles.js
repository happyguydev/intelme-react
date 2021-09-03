import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export const LabelContainer = styled.div`
  font-family: Poppins, sans-serif;
  font-style: normal;
  font-weight: normal;
  letter-spacing: -0.2px;
  display: flex;
  align-items: center;
  color: var(--text-normal);
  flex-wrap: wrap;
  width: 5rem;
  min-height: 1.25rem;
  .more-label-count {
    display: block;
    margin-left: 0.5rem;
    color: var(--text-darker);
  }
  .add-label-button {
    display: none;
    font-size: 0;
    background: none;
    cursor: pointer;
    transition: fill 0.3s;
    margin-left: 0.5rem;
    svg {
      path {
        fill: var(--text-darker);
      }
    }
    &:hover, &.clicked {
      svg {
        path {
          fill: var(--teal-primary);
        }
      }
    }
  }
  &:hover .more-label-count,
  .more-label-count.clicked {
    display: none;
  }
  &:hover .add-label-button,
  .add-label-button.clicked {
    display: block;
  }
`;

export const useStyles = makeStyles((theme) => ({
  fontFamily: 'Poppins',
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    '& svg': {
      width: '2rem !important',
      height: '2rem !important',
    },
    '& *': {
      width: '2rem',
      fontSize: '2rem',
      height: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  labelItem: {
    cursor: 'pointer',
    padding: '0.25rem 0.25rem 0.25rem 0.75rem',
    height: '1.5rem',
    width: '3.4375rem',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    '& span': {
      fontFamily: 'Poppins',
      padding: 0,
      color: 'var(--white)',
      fontSize: '0.75rem',
      lineHeight: '1rem',
      fontWeight: 400,
    },
    '& svg': {
      margin: '0 !important',
      width: '0.75rem',
      height: '0.75rem',
    },
  },
  popper: {
    zIndex: 1300,
    padding: 16,
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 1px 10px rgb(0 0 0 / 10%)',
    fontSize: '0.75rem',
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.54)',
    width: 166,
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${theme.palette.background.paper} transparent`,
      },
    },
  },
  inputBase: {
    width: '100%',
    '& input': {
      fontFamily: 'Poppins',
      backgroundColor: 'var(--white)',
      padding: '0.5rem 0',
      fontSize: '0.75rem',
      borderBottom: '1px solid rgba(29, 32, 32, 0.1) !important',
    },
  },
  paper: {
    boxShadow: 'none !important',
    margin: '0 !important',
  },
  arrow: {
    position: 'absolute',
    fontSize: 7,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
  option: {
    minHeight: 'auto',
    alignItems: 'flex-start',
    padding: '0.25rem 0',
    cursor: 'initial',
    '&[aria-selected="true"]': {
      backgroundColor: 'transparent',
    },
    '&[data-focus="true"]': {
      backgroundColor: 'transparent',
    },
  },
  list: {
    overflow: 'initial',
    padding: '0.75rem 0 0',
  },
  noOption: {
    padding: '0.5rem 0 0',
    fontSize: '0.75rem',
  },
  popperDisablePortal: {
    position: 'relative',
  },
  chipItem: {
    cursor: 'pointer',
    padding: '0.25rem 0.75rem',
    height: '1.5rem',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    '& span': {
      fontFamily: 'Poppins',
      padding: 0,
      color: 'var(--white)',
      fontSize: '0.75rem',
      lineHeight: '1rem',
      fontWeight: 400,
    },
  },
  allpopper: {
    zIndex: 1300,
    padding: '12px 16px',
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 1px 10px rgb(0 0 0 / 10%)',
    fontSize: '0.75rem',
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.54)',
    width: 130,
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${theme.palette.background.paper} transparent`,
      },
    },
    '& ul': {
      listStyle: 'none',
    },
  },
  allchipItem: {
    position: 'relative',
    cursor: 'pointer',
    padding: '0.25rem 0.25rem 0.25rem 0.75rem',
    height: 24,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    margin: '0.25rem 0',
    maxWidth: 96,
    '& span': {
      fontFamily: 'Poppins',
      padding: 0,
      color: 'var(--white)',
      fontSize: '0.75rem',
      lineHeight: '1rem',
      fontWeight: 400,
    },
    '& svg': {
      width: '1rem',
      height: '1rem',
      margin: 0,
    },
  },
  nolabel: {
    textAlign: 'center',
  },
}));
