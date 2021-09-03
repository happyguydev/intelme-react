import React, { useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';

import Wysiwyg from '../wysiwyg';
import Line from '../line';
import Dropdown from '../dropdown';

import CommentItem from './comment-item';

import { DialogTitle, modalStyles } from './styles';

const AllComments = ({
  onHandlePostedAllComments,
  onShow,
  onClose,
  row,
  comments,
  search,
  username,
}) => {
  const styles = modalStyles();

  const dropdownFilterValues = [
    { value: 'All' },
    { value: 'Mentions you' },
    { value: 'With Attachment' },
  ];

  const dropdownDirectionValues = [
    { value: 'Most recent' },
    { value: 'Oldest' },
  ];

  const [dropdownFilterCurrent, setDropdownFilterCurrent] = useState(
    dropdownFilterValues[0].value
  );

  const [dropdownDirectionCurrent, setDropdownDirectionCurrent] = useState(
    dropdownDirectionValues[0].value
  );

  const changeFilterDropdown = (value) => {
    const searchValue = {
      filter: value,
      direction: dropdownDirectionCurrent,
    };
    search(searchValue);
    setDropdownFilterCurrent(value);
  };

  const changeDirectionDropdown = (value) => {
    const searchValue = {
      filter: dropdownFilterCurrent,
      direction: value,
    };
    search(searchValue);
    setDropdownDirectionCurrent(value);
  };

  return (
    <Dialog
      PaperProps={{
        style: {
          borderRadius: 8,
          maxWidth: 784,
          fontFamily: 'Poppins',
          fontWeight: 400,
          padding: '32px 95px 0',
        },
      }}
      open={onShow}
      keepMounted
      onClose={onClose}
    >
      <DialogTitle
        onClose={onClose}
        classes={{ root: 'modal-title', closeButton: 'modal-close-icon' }}
      >
        <p>
          All Comments on <span className="comments-name">{row.docId ? row.title : row.name}</span>
        </p>
        <Line />
        <div className={styles.modalOption}>
          <p className={styles.total}>{comments?.total} comments</p>
          <div className={styles.options}>
            <Dropdown
              current={dropdownFilterCurrent}
              options={dropdownFilterValues}
              onClick={changeFilterDropdown}
            />
            <Dropdown
              current={dropdownDirectionCurrent}
              options={dropdownDirectionValues}
              onClick={changeDirectionDropdown}
            />
          </div>
        </div>
      </DialogTitle>
      <DialogContent className={styles.modalContent}>
        <div className="modal-comments">
          {comments?.total === 0 ? (
            <div className="comment-no">No Comment</div>
          ) : (
            <>
              {comments.result?.map((item) => {
                return (
                  <CommentItem
                    key={item.id}
                    comment={item}
                    showAll={true}
                    onDeleteComment={onHandlePostedAllComments}
                    username={username}
                  />
                );
              })}
            </>
          )}
        </div>
        <div className={styles.modalWysiwyg}>
          <Wysiwyg
            onPost={onHandlePostedAllComments}
            projectId={row.projectId}
            activityType={row.type}
            activityId={row.id}
            docName={row.docId}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AllComments;
