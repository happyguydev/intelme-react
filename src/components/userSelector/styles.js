import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export const listStyles = makeStyles({
  avatarWrapper: {
    width: '24px',
    height: '24px',
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
    overflowY: 'scroll',
    maxHeight: '14.375rem',
  },
  listItemAvatar: {
    minWidth: '30px',
  },
  noResults: {
    fontSize: '0.75rem',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '18px !important',
    height: '24px !important',
    margin: '10px auto',
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
`;

export const ListContainer = styled.div`
  /* width: 20.3125rem; */
  max-height: 470px;
  background: var(--white);
  border-radius: 10px;
  border: 1px solid #f0f0f0;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  transition: 1s all;
  z-index: 9999;
  padding: 1.5rem;
  text-transform: none;
  color: var(--text-normal);
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  bottom: 33px;
  line-height: 1.3125rem;
  align-items: center;
  letter-spacing: -0.2px;
  margin-bottom: 1rem;
  min-width: 300px;
  transform: ${(props) => props.transform};
  // &::before {
  //   content: '';
  //   width: 0;
  //   height: 0;
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   transform: translate(190%, -95%);
  //   border-top: 0.5rem solid transparent;
  //   border-left: 0.5rem solid transparent;
  //   border-right: 0.5rem solid transparent;
  //   border-bottom: 0.5rem solid var(--white);
  // }
  &::after {
    content: '';
    width: 100%;
    height: 3rem;
    background: transparent;
    position: absolute;
  }
  cursor: default;
  .hasMargin {
    .MuiTypography-body1 {
      margin-left: 1rem;
    }
  }
  .teamTitle {
    background: var(--teal-light);
    border-radius: 5px;
    &:hover {
      background: var(--teal-light);
    }
    margin-bottom: 1.5rem;
    &:last-child {
      margin-bottom: 0;
    }
    .MuiTypography-body1 {
      font-size: 1rem;
      line-height: 1rem;
      font-weight: 500;
      color: var(--text-normal);
    }
    svg {
      color: #089bab;
    }
  }
  .collapsedTeamTitle {
    background: var(--teal-light);
    border-radius: 5px;
    &:hover {
      background: var(--teal-light);
    }
    margin-bottom: 0.5rem;
    &:last-child {
      margin-bottom: 0;
    }
    .MuiTypography-body1 {
      font-size: 1rem;
      line-height: 1rem;
      font-weight: 500;
      color: var(--text-normal);
    }
  }
  .MuiTypography-body1 {
    font-weight: normal;

    font-family: Poppins;
    font-style: normal;
    font-size: 16px;
    line-height: 1.25rem;
    color: var(--text-normal);
    letter-spacing: -0.2px;
    transition: 0.3s ease-in-out;
    margin-left: 8px;
    div {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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
  margin-bottom: 1.5rem;
  svg {
    font-size: 1.5rem;
    margin-right: 0.5rem;
  }
  width: 100%;
  padding: 0;
  .MuiInput-root {
    margin-bottom: 0.6875rem;
  }
  input {
    &::placeholder {
      color: var(--text-normal);
      opacity: 1;
      font-size: 0.75rem;
      line-height: 1rem;
    }
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

export const TabContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  font-family: Poppins, sans-serif;
  font-size: normal;
  font-weight: normal;
  font-size: 1rem;
  line-height: 1rem;
  margin-bottom: 1rem;
  .active {
    background: var(--teal-primary);
    color: var(--white);
  }
  button {
    padding: 0.5rem 1rem;
    border-radius: 5px;
    letter-spacing: -0.2px;
    background: var(--teal-light);
    color: var(--teal-primary);
    cursor: pointer;
    font-size: 16px;
    width: 130px;
  }
`;
