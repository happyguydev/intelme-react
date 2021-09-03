import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

export const fileUploadModalStyles = makeStyles({
  dialog: {
    padding: '1.5rem',
    width: 620,
    maxWidth: 620,
    maxHeight: 720,
    borderRadius: 10,

    '& .MuiDialogActions-spacing button': {
      fontSize: '0.75rem',
      padding: '0.625rem 1rem',
      borderRadius: '0.625rem',
    },
    '& .MuiDialogActions-spacing button:disabled': {
      background: 'var(--gray-light)',
    },
  },
  title: {
    padding: '0',
    '& > h2': {
      color: 'var(--teal-primary)',
      fontFamily: 'Montserrat',
      fontSize: '1.25rem',
      fontWeight: '500',
      lineHeight: '1.5rem',
    },
  },
  content: {
    padding: '1.5rem 0',
    overflow: 'initial',
    '& p': {
      fontFamily: 'Poppins',
      fontWeight: '400',
      fontSize: '0.75rem',
      lineHeight: '1.25rem',
      marginBottom: '0.5rem',
      color: 'var(--gray-darker)',
    },
  },
  status: {
    flex: 1,
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    color: 'var(--text-normal)',
  },
  action: {
    justifyContent: 'flex-end',
    padding: '0',
  },
});

export default fileUploadModalStyles;

const FileUploadContainer = styled.div`
  position: relative;
  .file-upload {
    position: relative;
    background-color: var(--gray-lighter);
    color: var(--gray-normal);
    border: 1.5px dashed var(--gray-normal);
    transition: border 0.3s ease-in-out;
    border-radius: 5px;
    width: 100%;
    height: 5rem;
    font-family: Poppins, sans-serif;
    font-weight: 400;
    font-size: 0.75rem;
    line-height: 1rem;
    .label-content {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      .label-icon {
        width: 1.5rem;
        height: 1.5rem;
      }
      .label-text {
        margin: 0 0.5rem;
        font-family: Poppins, sans-serif;
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1rem;
      }
      .label-button {
        font-family: Poppins, sans-serif;
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1rem;
        padding: 0.25rem 0.5rem;
        background-color: var(--teal-primary);
        color: var(--white);
        border-radius: 4px;
        cursor: pointer;
      }
      .label-button:hover {
        background-color: var(--teal-dark);
      }
    }
  }

  .file-upload-list {
    max-height: 556px;
    overflow: auto;
    .retry-all {
      font-family: Poppins, sans-serif;
      font-weight: 500;
      font-size: 0.75rem;
      line-height: 1rem;
      padding: 0.25rem 0.5rem;
      background-color: var(--teal-primary);
      color: var(--white);
      border-radius: 4px;
      cursor: pointer;
      position: absolute;
      top: -46px;
      right: 109px;
    }
    .add-more-button {
      font-family: Poppins, sans-serif;
      font-weight: 500;
      font-size: 0.75rem;
      line-height: 1rem;
      padding: 0.25rem 0.5rem;
      background-color: var(--teal-primary);
      color: var(--white);
      border-radius: 4px;
      cursor: pointer;
      position: absolute;
      top: -46px;
      right: 0;
    }
    .add-more-button:hover {
      background-color: #017d8a;
    }
    .item {
      position: relative;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      color: var(--teal-primary);
      font-size: 0.75rem;
      line-height: 1rem;
      &:last-child {
        margin-bottom: 0;
      }
      .progress {
        position: relative;
        background: var(--gray-lighter);
        border: 1px dashed var(--teal-primary);
        border-radius: 5px;
        width: 524px;
        height: 44px;
        .status {
          font-family: Poppins, sans-serif;
          font-weight: 400;
          font-size: 0.75rem;
          line-height: 1rem;
          background-color: var(--teal-light);
          width: 0;
          height: 100%;
          border-radius: 5px;
          .info {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.875rem 1.5rem;
            width: 100%;
            height: 100%;
            .preparing {
              font-style: italic;
            }
          }
        }
        &.progress-active {
          border: 1px solid var(--teal-primary);
        }
        &.progress-exist {
          border: 1px dashed var(--util-red-500);
          color: var(--util-red-500);
        }
        &.progress-fail {
          border: 1px solid var(--util-red-300);
          color: var(--util-red-500);
        }
        .action-button {
          background-color: var(--teal-primary);
          color: var(--white);
          padding: 2px 8px;
          border-radius: 19px;
          font-family: Poppins, sans-serif;
          font-size: 0.75rem;
          font-weight: 400;
          line-height: 1rem;
          margin-left: 0.5rem;
          cursor: pointer;
        }
        .action-button:hover {
          background-color: var(--teal-dark);
        }
      }
      .action {
        margin-left: 1.5rem;
        .icon {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          width: 1.5rem;
          height: 1.5rem;
          svg {
            width: 1rem;
            height: 1rem;
          }
          &.check {
            background-color: var(--util-green-lighter);
            svg {
              color: var(--util-green-dark);
            }
          }
          &.disable {
            background-color: var(--gray-lighter);
            svg {
              color: var(--text-darker);
            }
          }
          &.close {
            cursor: pointer;
            background-color: var(--util-red-100);
            &:hover {
              background-color: var(--util-red-300);
              svg {
                color: var(--white);
              }
            }
            svg {
              color: var(--util-red-300);
            }
          }
          .cancel-tooltip {
            font-family: Poppins, sans-serif;
            font-weight: 400;
            font-size: 0.75rem;
            line-height: 1rem;
          }
        }
      }
      .dropdown {
        position: absolute;
        right: 4.5rem;
      }
    }
  }
`;

const activeStyle = {
  border: '1.5px dashed var(--teal-primary)',
  backgroundColor: 'var(--teal-light)',
};

const acceptStyle = {
  border: '1.5px dashed var(--teal-primary)',
  backgroundColor: 'var(--teal-light)',
};

export { activeStyle, acceptStyle, FileUploadContainer };
