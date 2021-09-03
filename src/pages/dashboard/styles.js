import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const dashboardStyles = makeStyles({
  dashboardContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  tasksAndProjects: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '46rem',
    marginRight: '2rem',
    height: 'fit-content',
  },
  tasks: {
    background: 'rgba(255, 255, 255, 0.5)',
    marginBottom: '2rem',
    borderRadius: '0.625rem',
    backgroundImage: `url(${process.env.REACT_APP_PATH}/person-chart.svg)`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: 'auto',
    height: '24rem',
    maxHeight: '24rem',
    maxWidth: '46rem',
    ' & h2': {
      color: 'var(--teal-primary)',
      lineHeight: '1.5rem',
      margin: '1.5rem',
    },
  },
  projects: {
    width: 'auto',
    height: '24rem',
    maxHeight: '24rem',
    maxWidth: '46rem',
    background: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '0.625rem',
    backgroundImage: `url(${process.env.REACT_APP_PATH}/person-chart.svg)`,
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
  healthAndPeople: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '22rem',
    height: 'fit-content',
  },

  health: {
    width: 'auto',
    height: '27.75rem',
    maxWidth: '22rem',
    maxHeight: '15.5rem',
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(255, 255, 255, 0.5)',
    marginBottom: '2rem',
    borderRadius: '0.625rem',
    '& h2': {
      margin: '1.5rem 0 0 1.5rem',
      lineHeight: '1.5rem',
      color: 'var(--teal-primary)',
    },
    '& p': {
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '0.75rem',
      margin: '4.1875rem 0 auto 0',
      lineHeight: '1.125rem',
      textAlign: 'center',
      padding: '1rem',
      letterSpacing: '0.01em',
      color: 'var(--gray-super-light)',
    },
  },

  people: {
    width: 'auto',
    height: '27.75rem',
    maxHeight: '27.75rem',
    maxWidth: '22rem',
    background: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '0.625rem',
    backgroundImage: `url(${process.env.REACT_APP_PATH}/people.svg)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'bottom',

    '& h3': {
      fontSize: '1.5rem',
      margin: '1.5rem',
      lineHeight: '1.5rem',
      color: 'var(--teal-primary)',
    },
    '& p': {
      fontSize: '0.75rem',
      margin: '1.5rem',
      width: '70%',
      lineHeight: '1.25rem',
      letterSpacing: '-0.2px',
      fontFamily: 'Poppins, sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      color: 'var(--text-normal)',
    },
  },
});

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

export default dashboardStyles;
