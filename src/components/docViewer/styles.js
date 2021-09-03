import { makeStyles } from '@material-ui/core/styles';

const docViewerStyles = makeStyles({
  loader: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    '& div': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: ' center',
      '& svg': {
        color: 'var(--teal-primary)',
      },
    },
  },
});

export default docViewerStyles;
