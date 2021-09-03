import { makeStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';

export const CommentsViewContainer = styled.div`
  width: 100%;
  .comment-no {
    margin-bottom: 15px;
  }
  .comment-see-all {
    font-family: 'Poppins';
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
    margin: 26px 0 8px;
    color: #a5a5a5;
    letter-spacing: -0.2px;
    text-align: right;
    span {
      cursor: pointer;
    }
    span:hover {
      color: #089bab;
    }
  }
`;

export default CommentsViewContainer;

const titleStyles = () => ({
  root: {
    padding: '0',
    '& > div': {
      '& > p': {
        fontFamily: 'Montserrat',
        fontWeight: '500',
        fontSize: '20px',
        lineHeight: '24px',
        color: '#4D4D4D',
        marginBottom: '8px',
      },
      '& > p > .comments-name': {
        color: '#089BAB',
      },
      marginBottom: '14px',
    },
  },
  closeButton: {
    position: 'absolute',
    right: '12px',
    top: '12px',
  },
});

const DialogTitle = withStyles(titleStyles)((props) => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <div>{children}</div>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const modalStyles = makeStyles((theme) => ({
  modalContent: {
    padding: '0',
    marginBottom: '128px',
    width: '594px',
  },
  modalOption: {
    margin: '8px 0 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  total: {
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '18px',
    color: '#858383',
  },
  options: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: '-8px',
    '& > button:first-child': {
      marginRight: '8px',
    },
  },
  modalWysiwyg: {
    position: 'absolute',
    left: '95px',
    bottom: '24px',
    width: '594px',
    height: '104px',
  },
}));

const CommentItemViewContainer = styled.div`
  .comment-item {
    display: flex;
    margin-bottom: 12px;
    .comment-avatar {
      margin-right: 8px;
    }
    .comment-username {
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      color: #4D4D4D;
      margin-bottom: 4px;
    }
    .comment-html {
      margin-top: -2px;
      margin-bottom: 4px;
      font-size: 12px;
      line-height: 16px;
      font-weight: 400;
      overflow-wrap: anywhere;
      a {
        color: #089BAB;
      }
    }
    .comment-html-showall {
      margin-bottom: 4px;
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
      color: #4D4D4D;
      overflow-wrap: anywhere;
      a {
        color: #089BAB;
      }
    }
    .comment-file {
      color: #089BAB;
      font-size: 12px;
      line-height: 16px;
      font-weight: 500;
      padding-left: 24px;
      position: relative;
      svg {
        position: absolute;
        left: 0;
      }
    }
    .comment-time {
      font-weight: 400;
      font-size: 10px;
      line-height: 16px;
      margin-bottom: 4px;
      color: #858383;
    }
    .comment-line {
      width: 502px;
    }
  }
  .comment-item-all {
    position: relative;
    margin-bottom: 0;
    padding: 8px;
    .comment-delete {
      display: none;
      position: absolute;
      right: 8px;
      top: 8px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: -0.2px;
      color: #DE6262;
      justify-content: center;
      align-items: center;
      svg {
        width: 16px;
        height: 16px;
      }
    }
    &:hover {
      background-color: #F7F7F7;
      border-radius: 4px;
      .comment-delete {
        display: flex !important;
      }
    }
  }
`;

export { CommentItemViewContainer, modalStyles, DialogTitle };