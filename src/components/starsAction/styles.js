import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export const Stars = makeStyles({
  emptyStar: {
    '& svg': {
      '& path': {
        stroke: 'var(--gray-light)',
      },
    },
  },
  listMneu: {
    left: '0px',
    background: '#fff',
    borderRadius: '10px',
    padding: '12px 0px',
    position: 'relative',
    marginTop: '15px',
    zIndex: 1000,
    marginLeft: '12px',
    filter: 'drop-shadow(0px 1px 10px rgba(0, 0, 0, 0.1))',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '-6px',
      background: '#fff',
      width: '16px',
      height: '16px',
      left: 'calc(50% - 16px)',
      borderRadius: '2px',
      transform: 'rotate(45deg)',
      zIndex: 1,
    },
    '& li': {
      listStyleType: 'none',
      padding: '6px 18px',
      display: 'flex',
      alignItems: 'center',
      fontFamily: 'Poppins',
      color: '#4D4D4D',
      '&:hover': {
        background: '#F7F7F7',
        cursor: 'pointer',
        color: '#4D4D4D',
      },
    },
  },
  popperContainr: {
    zIndex: 9999,
  },
});

export const PriorityComponent = styled.div`
  position: relative;
  color: #d4af37;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin: 0px auto;
    width: 24px;
    height: 24px;
  }
  .outlinedStar {
    path {
      stroke: var(--util-gold);
    }
  }
  .emptyStar {
    path {
      stroke: var(--gray-light);
    }
  }
`;

const Modal = styled.div`
  position: absolute;
`;
