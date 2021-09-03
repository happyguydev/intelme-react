import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const appBarStyles = makeStyles({
  appBarContainer: {
    paddingBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  actionBar: {
    display: 'flex',
    alignItems: 'center',
  },
  notifications: {
    position: 'absolute',
    borderRadius: '1.25rem',
    top: '-3px',
    right: '-4px',
    height: '1rem',
    padding: '0px 5px',
    background: 'var(--util-red-300)',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '0.6875rem',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '1.0625rem',
    letterSpacing: '0em',
    textAlign: 'center',
    color: 'var(--white)',
  },
  avatarOnlyIcon: {
    border: '0px !important',
  },
});

export const Button = styled.div`
  color: var(--gray-normal);
  cursor: pointer;
  transition: 0.3s all;
  position: relative;
  margin-right: 2.625rem;
  &:last-child {
    margin-right: 0;
  }
  &:hover,
  &:active,
  &:focus {
    .notificationIcon {
      path {
        fill: var(--teal-primary);
        transition: fill 0.3s;
      }
    }
    .messageIcon {
      path {
        transition: fill 0.3s;
        stroke: var(--teal-primary);
      }
    }
    .starIcon {
      path {
        transition: fill 0.3s;
        stroke: var(--teal-primary);
      }
    }
  }
  .notificationIconActive {
    path {
      fill: var(--teal-primary);
      transition: fill 0.3s;
    }
  }
  .messageIconActive {
    path {
      transition: fill 0.3s;
      stroke: var(--teal-primary);
    }
  }
  .starIconActive {
    path {
      transition: fill 0.3s;
      stroke: var(--teal-primary);
    }
  }
`;

export const AvatarIcon = styled.div`
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);
  outline: none;
  font-size: 1rem;
  font-family: Poppins;
  font-weight: 600;
  img {
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
    object-fit: cover;
    // border: 2px solid;
    // border-color: ${(props) => props.color};
  }
  border: 5px solid;
  border-color: ${(props) => props.color};
  background-color: ${(props) => props.color};
`;

export const Menu = styled.div`
  border-radius: 10px;
  width: 9.125rem;
  background: var(--white);
  position: absolute;
  font-family: Poppins, sans-serif;
  font-style: normal;
  font-weight: normal;
  cursor: default;
  font-size: 0.875rem;
  line-height: 1rem;
  letter-spacing: -0.2px;
  color: var(--text-normal);
  right: 0;
  transform: translate(0%, 15%);
  box-shadow: 0px 4px 20px rgb(0 0 0 / 5%);
  z-index: 100;

  .first {
    margin-top: 10px;
  }

  p:last-child {
    margin-bottom: 10px;
  }

  text-transform: none;
  text-align: left;
  svg {
    color: var(--white);

    font-size: 2.625rem;
    position: absolute;
    bottom: 80%;
    right: 0;
    transform: translateX(0%);
  }
`;

export const MenuItem = styled.p`
  padding: 10px 15px;
  cursor: pointer;
  transition: 0.5s all;
  &:hover,
  &:focus {
    background: #f7f7f7;
  }
`;

export default appBarStyles;
