import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const ToReviewStyles = makeStyles({
  tasksContainer: {
    background: '#FFFFFF',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
    borderRadius: '10px',
    padding: '24px',
    marginBottom: '2rem',
    height: '24rem',
    maxHeight: '24rem',
    maxWidth: '46rem',
    position: 'relative',
    width: 'auto',
    '& h1': {
      color: 'var(--teal-primary)',
      lineHeight: '24px',
      fontSize: '20px',
    },
    '& th span': {
      display: 'flex',
    },
    '& tbody': {
      maxHeight: '20rem',
      overflow: 'scroll',
    },
    '& a.primary-text': {
      color: 'var(--teal-primary)',
      fontWeight: 500,
      position: 'absolute',
      bottom: '24px',
      right: '24px',
      '&:hover': {
        color: 'var(--teal-dark)',
      },
    },
  },
  tasks: {
    background: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '0.625rem',
    zIndex: 99,
    backgroundImage: 'url(/person-chart.svg)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: 'auto',
    height: '24rem',
    maxHeight: '24rem',
    maxWidth: '46rem',
    marginBottom: '2rem',
    ' & h2': {
      color: 'var(--teal-primary)',
      lineHeight: '1.5rem',
      margin: '1.5rem',
    },
  },
  skeletonContainer: {
    width: '100%',

    '& span': {
      padding: '0.5rem 0',

      background: 'var(--gray-lighter)',
    },
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
});

export default ToReviewStyles;

export const TaskViewContainer = styled.div`
  width: 100%;
  white-space: normal;
  font-family: Poppins, serif;
  padding: 16px 16px 24px 20px;
  border: 1px solid #f7f7f7;
  display: flex;
  justify-content: space-between;
  overflow-y: auto;
  .detail-content {
    flex: 0 0 calc(100% - 213px);
    .row-content {
      display: flex;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: -0.2px;
      margin-bottom: 15px;
      .title {
        flex: 0 0 67px;
        color: #858383;
        font-weight: 300;
        text-align: right;
        margin-right: 16px;
      }
      .content {
        flex: 0 0 calc(100% - 83px);
        color: #4d4d4d;
        font-weight: 400;
        .creator-avatar {
          display: inline-flex;
          align-items: center;
          margin-top: -4px;
          span {
            margin-left: 8px;
          }
        }
        .system-content {
          font-size: 12px;
          line-height: 16px;
          color: #4d4d4d;
          font-style: italic;
        }
      }
    }
    .row-content:last-child {
      margin-bottom: 0;
    }
  }
  .action-content {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    flex: 0 0 213px;
    .action-icons {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .action-btns {
      display: flex;
      align-items: center;
      width: 100%;
      text-align: right;
      .action-goto-file {
        font-size: 12px !important;
        line-height: 16px !important;
        font-weight: 600 !important;
        letter-spacing: -0.2px !important;
        color: #ff8a47;
        margin-right: 24px;
        text-decoration: none;
        cursor: pointer;
      }
      .action-see-summary {
        display: inline-block;
        button {
          border-radius: 0.625rem;
          padding: 0.625rem 1rem;
        }
      }
    }
  }
`;
