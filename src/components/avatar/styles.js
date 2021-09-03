import { makeStyles } from '@material-ui/core/styles';

const userStyles = makeStyles({
  fatAvatar: {
    width: '2.5rem',
    height: '2.5rem',
    border: (props) => props.border,
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: (props) => props.background,
    color: '#ffff',
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: '0.875rem',
    lineHeight: '1rem',
    letterSpacing: '-0.2px',
  },

  avatar: {
    width: (props) => props.width,
    height: (props) => props.height,

    border: (props) => props.border,
    borderRadius: '50%',
    fontFamily: 'Poppins',
    fontWeight: ' 600 !important',
    fontSize: (props) => props.fontSize,
    lineHeight: '-0.2px',
    color: 'var(--white)',
    display: 'flex',
    alignItems: 'center',
    textTransform: 'uppercase',
    justifyContent: 'center',
    background: (props) => props.background,
    margin: '0px auto',
    '& img': {
      width: (props) => props.width,
      height: (props) => props.height,
      objectFit: 'cover',
      borderRadius: '50%',
      // border: '2px solid',
      // borderColor: (props) => props.background,
    },
  },
  avatarWithName: {
    display: 'flex',
  },
  avatarOnlyIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '0.75rem',
    lineHeight: '1rem',
    letterSpacing: '-0.2px',
    color: 'var(--text-normal)',
  },
});

export default userStyles;
