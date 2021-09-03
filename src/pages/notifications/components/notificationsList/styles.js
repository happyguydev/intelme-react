import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const listStyles = makeStyles({
  list: {
    marginLeft: 'auto',
    width: '100%',
    paddingRight: '0.625rem',
    transition: '0.3s all',
    height: '600px',
    overflowY: 'hidden',
    '&:hover': {
      overflowY: 'overlay',
    },
  },
  emptyText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    marginTop: '1rem',
  },
  textContainer: {
    marginLeft: '1rem',
    '& span': {
      display: '-webkit-box',
      '-webkit-line-clamp': 2,
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
    },
  },
  selectedItem: {
    height: '5rem ',
    display: 'flex',
    paddingRight: '0.5rem',
    alignItems: 'center',
    whiteSpace: 'wrap',
    marginBottom: '0.375rem',
    transition: 'background 0.3s ease-in-out',
    borderRadius: '0.25rem',
    background: 'var(--white)',
    cursor: 'pointer',
  },

  Item: {
    height: '5rem ',
    display: 'flex',
    paddingRight: '0.5rem',
    alignItems: 'center',
    whiteSpace: 'wrap',
    marginBottom: '0.375rem',
    transition: 'background 0.3s ease-in-out',
    borderRadius: '0.25rem',
    background: 'transparent',
    cursor: 'pointer',
    '&:hover': {
      background: 'var(--gray-lighter)',
    },
  },
  unreadItem: {
    height: '4.5rem',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.375rem',
    background: 'var(--teal-light)',
    cursor: 'pointer',
    borderRadius: '0.25rem',

    padding: '2.75rem 0',
    transition: '0.3s ease-in-out',
    '&:hover': {
      background: 'var(--gray-lighter)',
    },
    '&:active': {
      background: 'var(--white)',
    },
  },
  emptyList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  senderTitle: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: '1rem',
    letterSpacing: '-0.2px',
    color: 'var(--text-normal)',
  },
  senderBody: {
    fontFamily: 'Poppins, sans-serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    marginBottom: '0.25rem',
    letterSpacing: '-0.2px',
    color: '(var--text-normal)',
  },
  createdDate: {
    fontFamily: 'Poppins, sans-serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '0.875rem',
    marginBottom: '0.25rem',
    lineHeight: '1rem',
    color: 'var(--gray-normal)',
  },
  newMessagePlaceholder: {
    borderRadius: '4px',
    background: 'var(--white)',
    padding: '1.25rem 0.75rem',
    marginBottom: '0.25rem',
    display: 'flex',
    alignItems: 'center',
    '& div': {
      margin: 0,
    },
    '& span': {
      marginLeft: '0.5rem',
    },
  },
  avatarPlaceholder: {
    marginRight: '0.875rem',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    '& div': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
});

export const Button = styled.button`
  background: var(--teal-primary);
  border-radius: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem 0.5rem 1rem;
  font-family: Poppins, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--white);
  outline: none;

  svg {
    font-size: 1.5rem;
    margin-left: 0.5rem;
    &.onStart {
      margin-left: 0;
      margin-right: 0.5rem;
    }
  }
`;

export const ListContainer = styled.div`
  background: transparent;
  font-family: Poppins;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.3125rem;
  letter-spacing: -0.2px;
  height: 672px;
  color: var(--text-normal);

  .MuiTypography-body1 {
    font-weight: normal;
    font-family: Poppins;
    font-style: normal;
    line-height: 1.3125rem;
    color: var(--text-normal);
    letter-spacing: -0.2px;
    transition: 0.3s ease-in-out;
    div {
      h3 {
        font-weight: 500;
      }
      a {
        font-weight: 500;
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

export default listStyles;
