import React, { useState } from 'react';
import { ArrowDropUp } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';

import { ReactComponent as MoreVert } from '../../icons/three-vertical-dots.svg';

import {
  MoreMenuViewContainer,
  StyledMenu,
  StyledMenuItem,
  ModalStyles,
} from './more-menu-styles';

const MoreMenu = ({ row, onProjectDelete , showEditTaskModal}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteTaskOpen, setDeleteTaskOpen] = useState(false);

  const modalStyle = ModalStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onProjectOpen = () => {
    setDeleteTaskOpen(true);
  };

  const onProjectClose = () => {
    setDeleteTaskOpen(false);
  };

  return (
    <>
      <MoreMenuViewContainer>
        <IconButton
          className="more-icon"
          aria-label="more"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVert />
        </IconButton>
        <StyledMenu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <ArrowDropUp />
          <StyledMenuItem onClick={() => showEditTaskModal(row)}>Edit this task</StyledMenuItem>
          <StyledMenuItem>See activities</StyledMenuItem>
          <div onClick={onProjectOpen}>
            <StyledMenuItem>Delete</StyledMenuItem>
          </div>
        </StyledMenu>
      </MoreMenuViewContainer>
      <Dialog
        PaperProps={{
          style: { borderRadius: 10, maxWidth: 400, padding: '16px 20px' },
        }}
        open={deleteTaskOpen}
        onClose={onProjectClose}
        keepMounted
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={modalStyle.title}>
          {'Confirm'}
        </DialogTitle>
        <DialogContent
          id="alert-dialog-description"
          className={modalStyle.content}
        >
          <DialogContentText>
            <span className={modalStyle.contentTitle}>
              Are you sure you want to delete this task?
            </span>{' '}
            <span className={modalStyle.contentName}>{row.name}</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions className={modalStyle.action}>
          <Button className={modalStyle.deleteBtn} onClick={onProjectDelete}>
            <CloseIcon />
            Delete
          </Button>
          <Button className={modalStyle.cancelBtn} onClick={onProjectClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MoreMenu;
