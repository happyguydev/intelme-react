import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Typography } from '@material-ui/core';

import { getPriority, getAllComments } from '../../services/tasks';

import Wysiwyg from '../wysiwyg';

import CommentItem from './comment-item';
import AllComments from './all-comments';

import { CommentsViewContainer } from './styles';

const TaskComments = ({ row }) => {
  const [comments, setComments] = useState(row.comments);
  const [showOpen, setShowOpen] = useState(false);
  const [allComments, setAllComments] = useState({});
  const [searchValue, setSearchValue] = useState({ filter: '', direction: '' });
  const [username, setUsername] = useState('');

  const [cookies] = useCookies(['intelme']);

  useEffect(() => {
    const { username } = cookies;
    setUsername(username);
  }, []);

  const onHandlePostedComment = async () => {
    const projectId = row.projectId;

    if (row.projectId !== row.id) {
      // Project File comment get
      if (row.docId || row.documentName) {
        const commentOn = 'file';
        const commentOnId = row.docId ? row.docId : row.documentName;
        const total = 2;
        await getAllComments({
          projectId,
          commentOn,
          commentOnId,
          total
        }).then(res => {
          setComments(res);
        });

        return;
      }

      // Task comment get
      const taskId = row.id;
      const taskType = row.type;

      await getPriority({ projectId, taskId, taskType }).then((res) => {
        setComments(res.comments);
      });

      return;
    }

    // Project comment get
    const commentOn = 'project';
    const commentOnId = row.id;
    const total = 3;
    await getAllComments({
      projectId,
      commentOn,
      commentOnId,
      total
    }).then(res => {
      setComments(res);
    });
  };

  const showAllComments = async (searchValue) => {
    try {
      const projectId = row.projectId;
      let commentOn;
      let commentOnId;
      let filter = searchValue.filter;
      let direction = searchValue.direction;

      if (projectId !== row.id) {
        // File
        if (row.docId || row.documentName) {
          commentOn = 'file';
          commentOnId = row.docId ? row.docId : row.documentName;
        } else {
          // Task
          commentOn = 'activity';
          commentOnId = row.id;
        }
      } else {
        // Project
        commentOn = 'project';
        commentOnId = row.id;
      }

      setSearchValue(searchValue);

      switch (filter) {
        case 'All':
          filter = '';
          break;
        case 'Mentions you':
          filter = 'tagged=' + username;
          break;
        case 'With Attachment':
          filter = 'attachment';
          break;
        default:
          break;
      }

      if (direction === 'Most recent' || direction === undefined) {
        direction = 'desc';
      } else {
        direction = 'asc';
      }

      const total = comments.total + 1;
      await getAllComments({
        projectId,
        commentOn,
        commentOnId,
        filter,
        direction,
        total,
      }).then((res) => {
        setAllComments(res);
        setShowOpen(true);
      });
    } catch (error) {
      console.log(error);
      alert('Unable to get all comments');
    }
  };

  const onHandlePostedOnAllComment = async () => {
    await Promise.all([onHandlePostedComment(), showAllComments(searchValue)]);
  };

  const onClose = () => {
    setShowOpen(false);
  };

  return (
    <CommentsViewContainer>
      {comments.total === 0 ? (
        <div className="comment-no">No Comment</div>
      ) : (
        <>
          {comments.result.map((item) => {
            return <CommentItem key={item.id} comment={item} />;
          })}
          <Typography className="comment-see-all">
            <span onClick={showAllComments}>
              See all {comments.total} comments
            </span>
          </Typography>
        </>
      )}
      <Wysiwyg
        onPost={onHandlePostedComment}
        projectId={row.projectId}
        activityType={row.type}
        activityId={row.id}
        docName={row.docId ? row.docId : row.documentName}
      />
      <AllComments
        onHandlePostedAllComments={onHandlePostedOnAllComment}
        onShow={showOpen}
        onClose={onClose}
        row={row}
        comments={allComments}
        search={showAllComments}
        username={username}
      />
    </CommentsViewContainer>
  );
};

export default TaskComments;
