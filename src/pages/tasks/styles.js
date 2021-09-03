import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const MyTasksStyles = makeStyles({
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkbox: {
    '&:hover': {
      '& svg.empty': {
        '& circle': {
          stroke: 'var(--text-normal)!important',
        },
        '& path': {
          fill: 'var(--text-normal)!important',
        },
      },
    },
  },
  dueHeader: {
    display: 'flex',
    '& svg': {
      marginLeft: '0.25rem',
    },
  },
  searchAndFilters: {
    marginTop: '1.5rem',
    marginBottom: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',

    '& div': {
      marginRight: '1rem',
    },
    '& div:last-child': {
      marginRight: 0,
    },
  },
  arrow: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--teal-primary)',
    marginTop: '4rem',
    width: '100% !important',
    '& svg': {
      width: '2.5rem',
    },
  },
  empty: {
    background: 'var(--gray-lighter)',
    borderRadius: '10px',
    padding: '1rem',
    marginTop: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    letterSpacing: '-0.2px',
    fontFamily: 'Poppins, sans-serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '0.75rem',
    lineHeight: '1rem',
    color: 'var(--text-normal)',
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

export default MyTasksStyles;

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
        color: #FF8A47;
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
