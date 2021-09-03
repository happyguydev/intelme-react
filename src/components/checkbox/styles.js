import { makeStyles } from '@material-ui/core/styles';

const CheckboxStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  labelStyle: {
    fontFamily: 'Poppins, sans-seriff',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '0.750rem',
    lineHeight: '1rem',
    color: 'var(--text-normal)',
  },
  root: {
    padding: '0',
    paddingRight: '0.5rem',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: 4,
    width: 16,
    height: 16,

    boxShadow:
      'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26, 0.1)',
    backgroundColor: 'var(--white)',
    transition: 'box-shadow 0.3s',
    'input:hover ~ &': {
      boxShadow:
        'inset 0 0 0 1px var(--teal-primary), inset 0 -1px 0 rgba(16,22,26, 0.1)',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: 'var(--teal-primary)',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    boxShadow: 'none',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    'input:hover ~ &': {},
  },
});

export default CheckboxStyles;
