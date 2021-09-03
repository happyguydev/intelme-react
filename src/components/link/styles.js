import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

export const linkStyles = makeStyles({
  primary: {
    display: 'flex',
    alignItems: 'center',
    color: (props) => (props.disabled ? '#DBDBDB' : '#FF8A47'),
    outline: 'none !important',
    cursor: (props) => (props.disabled ? 'not-allowed' : 'pointer'),
    flexDirection: (props) =>
      !props.iconPosition || props.iconPosition === 'left'
        ? 'row'
        : 'row-reverse',
    fontFamily: 'Poppins',
    fontWeight: '600',
    // fontSize: '1.25rem',
    fontSize: '12px',
    lineHeight: '1rem',
    letterSpacing: '-0.2px',
    '&:hover': {
      color: (props) => (props.disabled ? '#DBDBDB' : '#DF7131'),
      '& svg': {
        color: (props) => (props.disabled ? '#DBDBDB' : '#DF7131'),
      },
    },
  },
  iconStyle: {
    color: (props) => (props.disabled ? '#DBDBDB' : '#FF8A47'),
    fontSize: (props) => (props.children ? '0.875rem' : '1.25rem'),
    width: (props) => (props.children ? '0.875rem' : '1.25rem'),
    height: (props) => (props.children ? '0.875rem' : '1.25rem'),
    cursor: (props) => (props.disabled ? 'not-allowed' : 'pointer'),
  },
  linkText: {
    marginLeft: (props) =>
      !props.iconPosition || props.iconPosition === 'left' ? '0.625rem' : '0',
    paddingRight: (props) =>
      props.iconPosition === 'right' ? '0.625rem' : '0',
  },
});

export const LinkComponent = styled.div``;
