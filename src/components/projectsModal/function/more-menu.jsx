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

const MoreMenu = ({ row, onProjectEdit, onProjectDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteProjectOpen, setDeleteTaskProjectOpen] = useState(false);

  const modalStyle = ModalStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onProjectDeleteOpen = () => {
    setDeleteTaskProjectOpen(true);
  };

  const onProjectDeleteClose = () => {
    setDeleteTaskProjectOpen(false);
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
          <StyledMenuItem>
            <div onClick={onProjectEdit}>
              Edit this project
            </div>
          </StyledMenuItem>
          <StyledMenuItem>
            <div onClick={onProjectDeleteOpen}>
              Delete
            </div>
          </StyledMenuItem>
        </StyledMenu>
      </MoreMenuViewContainer>
      <Dialog
        PaperProps={{
          style: { borderRadius: 10, maxWidth: 400, padding: '16px 20px' },
        }}
        open={deleteProjectOpen}
        onClose={onProjectDeleteClose}
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
              Are you sure you want to delete this project?
            </span>
            <br/>
            <span className={modalStyle.dangerText}>
              This action is irreversible.
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions className={modalStyle.action}>
          <Button className={modalStyle.deleteBtn} onClick={onProjectDelete}>
            <CloseIcon />
            Delete
          </Button>
          <Button className={modalStyle.cancelBtn} onClick={onProjectDeleteClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MoreMenu;
