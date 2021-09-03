import React, { useState } from 'react';
import moment from 'moment';
import CloseIcon from '@material-ui/icons/Close';

import { deleteComment } from '../../services/tasks';

import Avatar from '../avatar';
import Line from '../line';
import { ReactComponent as AttachFile } from '../icons/attach.svg';
import { CommentItemViewContainer } from './styles';

const CommentItem = ({ comment, showAll, onDeleteComment, username }) => {

  const [deleteStatus, setDeleteStatus] = useState(false);

  const handleDeleteComment = async () => {
    const projectId = comment.projectId;
    const commentOnId = comment.commentOnId;
    const commentId = comment.id;
    setDeleteStatus(true);
    try {
      await deleteComment({ projectId, commentOnId, commentId }).then(() => {
        onDeleteComment();
        setDeleteStatus(false);
      });
    } catch (e) {
      alert('Unable delete comment');
      setDeleteStatus(false);
    }
  }

  return (
    <CommentItemViewContainer>
      {
        !showAll ?
          (
            <div className="comment-item">
              <div className="comment-avatar">
                <Avatar userDetails={comment.creatorDetails} width={24} height={24} />
              </div>
              <div className="comment-detail" >
                <div className="comment-html" dangerouslySetInnerHTML={{__html: comment.html}} />
                {comment.attachedfile &&
                <a href={comment.attachedfile.url} className="comment-file">
                  <AttachFile />
                  {comment.attachedfile.fileName}
                </a>
                }
                <div className="comment-time">{moment(comment.createdAt).format("DD MMM YY")} • {moment(comment.createdAt).format("HH:MM LT")}</div>
              </div>
            </div>
          ) : (
            <div className="comment-item comment-item-all" style={{opacity: deleteStatus ? '0.5' : '1'}}>
              <div className="comment-avatar">
                <Avatar userDetails={comment.creatorDetails} width={40} height={40} />
              </div>
              <div className="comment-detail" >
                <div className="comment-username">
                  {comment.creatorDetails.firstName} {comment.creatorDetails.lastName}
                </div>
                <div className="comment-html-showall" dangerouslySetInnerHTML={{__html: comment.html}} />
                {comment.attachedfile &&
                <a href={comment.attachedfile.url} className="comment-file">
                  <AttachFile />
                  {comment.attachedfile.fileName}
                </a>
                }
                <div className="comment-time">{moment(comment.createdAt).format("DD MMM YY")} • {moment(comment.createdAt).format("HH:MM LT")}</div>
                <div className="comment-line">
                  <Line />
                </div>
              </div>
              {
                username === comment.ownerId &&
                <div className="comment-delete" onClick={handleDeleteComment} style={{display: deleteStatus ? 'flex' : 'none'}}>
                  <CloseIcon /> Delete
                </div>
              }
            </div>
          )
      }
    </CommentItemViewContainer>
  );
};

export default CommentItem;
