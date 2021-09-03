import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const projectStyles = makeStyles({
  chartWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '2rem',
  },
  headerContainer: {
    display: 'flex',
    '& .avatar-content': {
      marginLeft: '58px',
      marginTop: '7px',
    },
  },
  healthMeter: {
    background: 'var(--white)',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
    borderRadius: '10px',
    width: '33%',
    height: '15.5rem',
    maxHeight: '15.5rem',
    marginRight: '32px',

    '& h3': {
      margin: '1.5rem  0 1.5rem 1.5rem',
      color: 'var(--teal-primary)',
    },
    '& p': {
      fontFamily: 'Poppins',
      marginTop: '4rem',
      textAlign: 'center',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '0.75rem',
      lineHeight: '1rem',
      letterSpacing: '-0.2px',
      color: 'var(--text-normal)',
    },
  },
  filesToReview: {
    background: 'var(--white)',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
    borderRadius: '10px',
    width: '33%',
    height: '15.5rem',
    maxHeight: '15.5rem',
    marginRight: '32px',
    '& h3': {
      margin: '1.5rem  0 1.5rem 1.5rem',
      color: 'var(--teal-primary)',
    },
    '& p': {
      fontFamily: 'Poppins',

      marginTop: '4rem',
      textAlign: 'center',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '0.75rem',
      lineHeight: '1rem',
      letterSpacing: '-0.2px',
      color: 'var(--text-normal)',
    },
  },
  priorityFiles: {
    background: 'var(--white)',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
    borderRadius: '10px',
    width: '33%',
    height: '15.5rem',
    maxHeight: '15.5rem',
    '& h3': {
      margin: '1.5rem  0 1.5rem 1.5rem',
      color: 'var(--teal-primary)',
    },
    '& p': {
      fontFamily: 'Poppins',

      marginTop: '4rem',
      textAlign: 'center',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '0.75rem',
      lineHeight: '1rem',
      letterSpacing: '-0.2px',
      color: 'var(--text-normal)',
    },
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& h1': {
      color: 'var(--teal-primary)',
    },
  },
  empty: {
    background: 'var(--gray-lighter)',
    borderRadius: '10px',
    padding: '1rem 0',
    marginTop: '1.5rem',
    textAlign: 'center',
    '& span': {
      margin: '0 auto',
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '0.75rem',
      lineHeight: '1rem',
      letterSpacing: '-0.2px',
      color: 'var(--text-normal)',
    },
  },
  nameLink: {
    '& a': {
      transition: '0.3s ease',
      fontWeight: 'normal',
      '&:hover': {
        color: 'var(--teal-primary)',
      },
      '&:focus': {
        color: 'var(--teal-primary)',
      },
    },
  },

  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '90%',
    '& div': {
      color: 'var(--teal-primary)',
    },
  },
  backToProject: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    marginBottom: '2rem',
    '& svg, & h3': {
      color: 'var(--teal-primary)',
    },
    '& svg': {
      marginRight: '1rem',
      width: '1.5rem',
      height: '1.5rem',
    },
  },
  arrow: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // PROJECT SECTION
  projectInfo: {
    display: 'flex',
    alignItems: 'baseline',
    color: 'var(--teal-primary)',
    marginBottom: '1.6525rem',
    '& h1': {
      marginRight: '0.5rem',
    },
    '& span': {
      fontFamily: 'Montserrat, sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '1.25rem',
      lineHeight: '1.5rem',
    },
  },
  fileType: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    // height: '100%',
  },

  searchAndFilters: {
    marginTop: '1.875rem',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& div': {
      marginRight: '1rem',
    },
    '& div:last-child': {
      marginRight: 0,
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
      width: '65%',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: '1rem',
    },
  },
  editorSkeleton: {
    paddingLeft: '2rem',
    paddingRight: '40%',
  },
  icons: {
    fontSize: '1rem',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
});

export default projectStyles;

export const FileViewContainer = styled.div`
  width: 100%;
  white-space: normal;
  font-family: Poppins, serif;
  padding: 16px 24px 24px 20px;
  border: 1px solid var(--gray-lighter);
  display: flex;
  justify-content: space-between;
  .detail-content {
    flex: 0 0 calc(100% - 277px);
    .row-content {
      display: flex;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: -0.2px;
      margin-bottom: 15px;
      .title {
        flex: 0 0 80px;
        color: var(--gray-normal);
        font-weight: 300;
        text-align: right;
        margin-right: 16px;
      }
      .content {
        flex: 0 0 calc(100% - 96px);
        color: var(--text-normal);
        font-weight: 400;
        display: flex;
        .sub-content {
          display: flex;
          margin-left: 32px;
          .sub-title {
            color: var(--gray-normal);
            font-weight: 300;
            margin-right: 16px;
          }
          .sub-content-detail {
            display: flex;
            svg {
              width: 16px;
              height: 16px;
              margin-right: 8px;
            }
          }
        }
        .creator-avatar {
          display: inline-flex;
          align-items: center;
          margin-top: -4px;
          span {
            margin-left: 8px;
          }
        }
      }
    }
    .row-content:last-child {
      margin-bottom: 0;
    }
  }
  .files-action-content {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    flex: 0 0 277px;

    .files-action-icons {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .files-action-btns {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
      text-align: right;
      .files-action-goto-file {
        font-size: 12px !important;
        line-height: 16px !important;
        font-weight: 600 !important;
        letter-spacing: -0.2px !important;
        color: var(--util-orange-normal);
        margin-right: 24px;
        text-decoration: none;
        cursor: pointer;
      }
      .files-action-goto-file:hover {
        color: #df7131;
      }
      .files-action-see-summary {
        display: inline-block;
        button {
          border-radius: 0.625rem;
          padding: 0.625rem 1rem;
        }
      }
    }
  }
`;

export const ProjectViewContainer = styled.div`
  width: 100%;
  white-space: normal;
  font-family: Poppins, serif;
  padding: 12px 16px 24px 20px;
  border: 1px solid var(--gray-lighter);
  display: flex;
  justify-content: space-between;
  .detail-content {
    flex: 0 0 calc(100% - 245px);
    .row-content {
      display: flex;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: -0.2px;
      margin-bottom: 15px;
      .title {
        flex: 0 0 67px;
        color: var(--gray-normal);
        font-weight: 300;
        text-align: right;
        margin-right: 16px;
      }
      .content {
        flex: 0 0 calc(100% - 83px);
        color: var(--text-normal);
        font-weight: 400;
        display: flex;
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
    flex: 0 0 245px;
    .action-icons {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .avatar-content {
        position: relative;
        padding-left: 8px;
        cursor: pointer;
        z-index: 1;
        .avatar-group {
          > div {
            margin-left: -8px;
          }
        }
        .avatar-list {
          position: absolute;
          top: 1.75rem;
          left: -50px;
          width: 8rem;
          background-color: var(--white);
          border: 1px solid #f0f0f0;
          box-shadow: 0 1px 10px rgb(0 0 0 / 10%);
          li {
            cursor: pointer;
            padding: 4px 8px;
          }
        }
        .avatar-name {
          flex: 1 1 auto;
          margin-left: 0.5rem;
        }
      }
      .avatar-more-count {
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1rem;
        color: #4d4d4d;
        letter-spacing: -0.2px;
        margin-left: 4px;
      }
    }
    .action-btns {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
      .action-see-project-files {
        display: inline-block;
        button {
          border-radius: 0.625rem;
          padding: 0.625rem 1rem;
        }
      }
    }
  }
`;
