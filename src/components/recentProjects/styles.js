import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const ToReviewStyles = makeStyles({
  tasksContainer: {
    marginBottom: '2rem',
    position: 'relative',
    width: 'auto',
    '& h1': {
      color: 'var(--teal-primary)',
      lineHeight: '24px',
      fontSize: '24px',
      marginBottom: '16px',
    },
    '& span.MuiSkeleton-wave': {
      borderRadius: '5px',
      backgroundColor: 'var(--gray-lighter)',
    },
    '& a.primary-text': {
      color: 'var(--teal-primary)',
      fontWeight: 500,
      position: 'absolute',
      bottom: '-14px',
      right: '24px',
      '&:hover': {
        color: 'var(--teal-dark)',
      },
    },
  },

  projects: {
    width: 'auto',
    height: '24rem',
    maxHeight: '24rem',
    maxWidth: '46rem',
    background: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '0.625rem',
    backgroundImage: 'url(/person-chart.svg)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '70% 50%',

    '& h2': {
      color: 'var(--teal-primary)',
      lineHeight: '1.5rem',
      margin: '2.125rem 0 0 2.4375rem',
    },
    '& p': {
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '0.75rem',
      lineHeight: '1rem',
      letterSpacing: '-0.2px',
      color: 'var(--text-normal)',
      margin: '1rem 0 0 2.4375rem',
    },
  },
  singleProject: {
    background: '#fff',
    borderRadius: '5px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
    padding: '16px',
    width: '160px',
    height: '176px',
    marginBottom: '20px',
    position: 'relative',
    '& h2': {
      marginBottom: '16px',
    },
    '& p': {
      color: '#858383',
      marginBottom: '8px',
    },
    '& span': {
      fontSize: '10px',
      position: 'absolute',
      bottom: '16px',
      right: '16px',
    },
  },
  projectWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4,1fr)',
  },
  topSkeleton: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    '& div:last-child': {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: '1rem',
    },
  },
  editorSkeleton: {
    paddingLeft: '2rem',
    paddingRight: '40%',
  },
  skeletonContainer: {
    display: 'flex',
    alginItems: 'center',
    justifyContent: 'space-between',
  },
});

export default ToReviewStyles;

export const AddProject = styled.button`
  margin: 2.375rem 0 2rem 3.375rem;

  background: var(--white);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  border: none;
  padding: 1.25rem;
  color: var(--teal-primary);
  cursor: pointer;

  padding-bottom: 0.625rem;
  div {
    border: 1.5px dashed var(--teal-primary);
    border-radius: 5px;
    display: flex;
    padding: 2rem;
    align-items: center;
    justify-content: center;
    font-size: 0;
    svg {
      font-size: 1.5rem;
    }
  }
  p {
    margin: 0;
    font-family: Poppins, sans-serif;
    font-size: 0.75rem;
    line-height: 1rem;
    letter-spacing: -0.2px;
    color: var(--teal-primary);
    margin-top: 0.625rem;
  }
  &:hover {
    * {
      border-color: var(--teal-dark);
      color: var(--teal-dark);
    }
  }
`;
