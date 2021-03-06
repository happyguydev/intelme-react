import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  reviewedAndActive: {
    background: 'var(--util-green-lighter)',
    borderRadius: '16px',
    padding: '0.25rem 0.75rem',
    display: 'inline-block',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '0.75rem',
    lineHeight: '1rem',
    letterSpacing: '-0.2px',
    color: 'var(--util-green-normal)',
  },
  forReview: {
    background: 'var(--util-orange-light)',
    borderRadius: '16px',
    padding: '0.25rem 0.75rem',
    display: 'inline-block',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins, sans-serif',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '0.75rem',
    lineHeight: '1rem',
    letterSpacing: '-0.2px',
    color: 'var(--util-orange-normal)',
  },
  onHold: {
    background: '#FFF2CA',
    borderRadius: '10px',
    padding: '0.125rem 0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '0.625rem',
    lineHeight: '1rem',
    letterSpacing: '-0.2px',
    color: '#A88619',
  },
  confirmData: {
    background: 'var(--teal-primary)',
    borderRadius: '16px',
    padding: '0.25rem 0.75rem',
    display: 'inline-block',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins, sans-serif',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '0.75rem',
    lineHeight: '1rem',
    letterSpacing: '-0.2px',
    color: 'var(--white)',
    cursor: 'pointer',
  },
  processing: {
    background: 'var(--teal-light)',
    borderRadius: '16px',
    padding: '0.25rem 0.75rem',
    display: 'inline-block',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins, sans-serif',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '0.75rem',
    lineHeight: '1rem',
    letterSpacing: '-0.2px',
    color: 'var(--teal-primary)',
  },
  rejected: {
    background: 'var(--util-red-100)',
    borderRadius: '16px',
    padding: '0.25rem 0.75rem',
    display: 'inline-block',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins, sans-serif',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '0.75rem',
    lineHeight: '1rem',
    letterSpacing: '-0.2px',
    color: 'var(--util-red-300)',
  },
});

export default useStyles;
