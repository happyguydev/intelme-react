import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

const teamListItemStyles = makeStyles(() => ({
  teamColor: {
    backgroundColor: (props) => props.color,
    width: '1.25rem',
    height: '1.25rem',
    borderRadius: '4px',
    flex: '0 0 1.25rem',
  },
  teamName: {
    fontSize: '0.75rem',
    fontWeight: '400',
    lineHeight: '1rem',
    color: '#000000',
    letterSpacing: '-0.2px',
    flex: '0 0 248px',
    marginLeft: '1rem',
  },
  teamGroup: {
    marginLeft: '34px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    '& > p': {
      fontFamily: 'Poppins',
      fontSize: '0.75rem',
      lineHeight: '1rem',
      fontWeight: '400',
      marginLeft: '0.25rem',
      color: 'var(--text-darker)',
    },
  },
  avatarGroup: {
    '& > div:not(:first-child)': {
      marginLeft: '-0.5rem',
    },
  },
  teamAction: {
    flex: '0 0 79px',
    height: '1.5rem',
    position: 'absolute',
    right: '0',
  },
  teamActionBtnIcon: {
    width: '0.625rem',
    height: '0.625rem',
    marginRight: '0.3125rem',
  },
}));

export default teamListItemStyles;

export const TeamListItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 32px;
  position: relative;
`;
