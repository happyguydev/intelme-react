import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export const listStyles = makeStyles({
  arrow: {
    position: 'fixed',
    color: 'var(--white)',
    left: '92.5%',
    fontSize: '2.625rem',
    bottom: '96%',
    transform: 'translateX(-50%)',
  },
  arrowWithHeader: {
    position: 'fixed',
    color: 'var(--white)',
    left: '92.5%',
    fontSize: '2.625rem',
    bottom: '90%',
    transform: 'translateX(-50%)',
  },
  avatarWrapper: {
    width: '40px',
    height: '40px',
  },
  outlinedStar: {
    '& path': {
      stroke: 'var(--util-gold)',
    },
  },
  headerButton: {
    height: '1.5rem',
    background: 'var(--util-orange-normal)',
    borderRadius: '4px',
    lineHeight: '1rem',
    fontSize: '0.75rem',
    color: 'var(--white)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem',
    transition: 'background 0.3s',
    cursor: 'pointer',
    '&:hover': {
      background: 'var(--util-orange-dark)',
    },
  },
  list: {
    overflowY: 'auto',
    maxHeight: '24.375rem',
  },
  senderBody: {
    '& div': {
      fontFamily: 'Poppins, sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      marginBottom: '0.25rem',
      letterSpacing: '-0.2px',
      whiteSpace: 'normal',
      '& *': {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      },
      color: '(var--text-normal)',
    },
  },
});

export default listStyles;

export const EmptyContainer = styled.div`
  height: 4.5rem;
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
  border-radius: 4px;
  background: var(--gray-lighter);
`;

export const ListContainer = styled.div`
  width: 530px;
  max-height: 524px;
  background: var(--white);
  border-radius: 10px;
  filter: drop-shadow(0px 1px 10px rgba(0, 0, 0, 0.1));
  position: absolute;
  transition: 1s all;
  z-index: 9999;
  right: 0;
  transform: translateX(5%);
  top: 130%;
  padding: 1.5rem;
  text-transform: none;
  color: var(--text-normal);
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  line-height: 1.3125rem;
  align-items: center;
  letter-spacing: -0.2px;
  &::before {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-200%, -100%);
    border-top: 2rem solid transparent;
    border-left: 0.5rem solid transparent;
    border-right: 0.5rem solid transparent;
    border-bottom: 0.5rem solid var(--white);
  }
  cursor: default;

  .MuiTypography-body1 {
    font-weight: normal;
    font-family: Poppins;
    font-style: normal;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--text-normal);
    letter-spacing: -0.2px;
    transition: 0.3s ease-in-out;
    div {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 16px;

      h3 {
        font-size: 1rem;
        font-weight: 500;
        font-family: Poppins, sans-serif;
        max-width: 90%;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      a {
        font-weight: 500;
        color: var(--text-normal);
        transition: color 0.3s;
        &:hover {
          color: var(--teal-primary);
        }
      }
    }
  }

  .MuiTypography-body2 {
    font-weight: normal;
    font-family: Poppins;
    font-style: normal;
    font-size: 0.875rem;
    line-height: 1.25rem;
    letter-spacing: -0.2px;
  }

  .MuiListItemIcon-root {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.625rem;
    color: var(--gray-normal);
  }
  .MuiListItemText-multiline {
    margin: 0;
  }
`;

export const ActionButton = styled.div`
  cursor: pointer;
  color: var(--util-gold);
  border-radius: 50%;
  transition: 0.5s all;
  font-size: 0.75rem;
  line-height: 1rem;
  &:hover,
  &:active {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const ListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
  svg {
    width: 1rem;
    height: 1rem;
    margin-right: 0.25rem;
  }
`;

export const ListFooter = styled.div`
  float: right;
  margin-right: 0.375rem;
  color: var(--util-orange-normal);
  font-size: 0.75rem;
  line-height: 1rem;
  margin-top: 0.5rem;
  transition: 0.2s all;
  &:hover {
    color: var(--util-orange-dark);
  }
`;
