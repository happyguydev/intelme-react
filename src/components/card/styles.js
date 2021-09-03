import { makeStyles } from '@material-ui/core/styles';

const CardStyles = makeStyles({
  cardContainer: {
    minHeight: '30rem',
    maxWidth: '100%',
    background: 'var(--white)',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
    padding: '24px 24px 32px 24px',
  },
});

export default CardStyles;
