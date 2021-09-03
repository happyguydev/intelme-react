import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withStyles,
} from '@material-ui/core';
import React from 'react';
import dialogStyles from './styles';
import CloseIcon from '@material-ui/icons/Close';

const spinnerStyles = {
  root: {
    marginLeft: 5,
  },
};

const SpinnerAdornment = withStyles(spinnerStyles)((props) => (
  <div className={props.styles.progressContainer}>
    <CircularProgress className={props.styles.spinner} size={12} />
  </div>
));

const Dialogs = (props) => {
  const {
    title,
    revision,
    openOverwrite,
    handleOverwriteClose,
    confirmChange,
    handleConfirmClose,
    loading,
    handleOverwriteConfirm,
    handleConfirmChange,
    notOverwrite,
    handleNotOverwrittable,
    isBeingRejected,
    newFile,
    onClose,
    onCloseWindow,
    keepOnWindow,
    closeIsBeingRejected,
    handleOnReject,
    managerIsConfirming,
    closeManagerConfirm,
    onManagerConfirmInformation,
    isBeingDeleted,
    closeIsBeingDeleted,
    handleDeleteFile,
    multipleDeleteLength,
    isBeingMultipleDeleted,
    closeIsBeingMultipleDeleted,
    handleDeleteMultipleFiles
  } = props;
  const styles = dialogStyles();
  return (
    <>
      <Dialog
        PaperProps={{
          style: {
            borderRadius: 10,
            maxWidth: 400,
            padding: '1rem 1.25rem',
            boxShadow: '0px 1px 10px rgb(0, 0, 0, 0.1)',
            background: '#fff',
          },
        }}
        open={notOverwrite}
        keepMounted
        onClose={handleNotOverwrittable}
      >
        <DialogTitle className={styles.modalTitle}>
          {'Existing Document'}
        </DialogTitle>
        <DialogContent className={styles.content}>
          <DialogContentText>
            <b>{title}</b> <b> revision {revision}</b> already exists. Verify
            and update the revision number or upload a new file.
          </DialogContentText>
        </DialogContent>
        <DialogActions classes={{ root: styles.actions }}>
          <Button onClick={newFile} className={styles.newFileOverwrite}>
            Upload a new File
          </Button>
          <Button
            onClick={handleNotOverwrittable}
            className={styles.keepEditing}
          >
            Continue Editing
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        PaperProps={{
          style: {
            borderRadius: 10,
            maxWidth: 400,
            padding: '1rem 1.25rem',
            boxShadow: '0px 1px 10px rgb(0, 0, 0, 0.1)',
            background: '#fff',
          },
        }}
        open={confirmChange}
        keepMounted
        onClose={handleConfirmClose}
      >
        <DialogTitle className={styles.modalTitle}>{'Confirm'}</DialogTitle>
        <DialogContent className={styles.content}>
          <DialogContentText>
            Do you want to apply your changes? A notice for review will be sent
            to your Manager.
          </DialogContentText>
        </DialogContent>
        <DialogActions classes={{ root: styles.actions }}>
          <Button onClick={handleConfirmClose} className={styles.blackEditing}>
            Continue Editing
          </Button>
          <Button onClick={handleConfirmChange} className={styles.keepEditing}>
            Save Changes {loading && <SpinnerAdornment styles={styles} />}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        PaperProps={{
          style: {
            borderRadius: 10,
            maxWidth: 400,
            padding: '1rem 1.25rem',
            boxShadow: '0px 1px 10px rgb(0, 0, 0, 0.1)',
            background: '#fff',
          },
        }}
        open={openOverwrite}
        keepMounted
        onClose={handleOverwriteClose}
      >
        <DialogTitle className={styles.modalTitle}>
          {'Existing Document'}
        </DialogTitle>
        <DialogContent className={styles.content}>
          <DialogContentText>
            <b>{title}</b> exists with a different revision, would you like to
            overwrite this file with your changes?
          </DialogContentText>
        </DialogContent>
        <DialogActions classes={{ root: styles.actions }}>
          <Button
            onClick={handleOverwriteClose}
            className={styles.blackEditing}
          >
            Continue Editing
          </Button>
          <Button
            onClick={handleOverwriteConfirm}
            className={styles.overwriteAction}
          >
            Ovewrite {loading && <SpinnerAdornment styles={styles} />}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        PaperProps={{
          style: {
            borderRadius: 10,
            maxWidth: 400,
            padding: '1rem 1.25rem',
            boxShadow: '0px 1px 10px rgb(0, 0, 0, 0.1)',
            background: '#fff',
          },
        }}
        open={onClose}
        keepMounted
        onClose={keepOnWindow}
      >
        <DialogTitle className={styles.modalTitle}>{'Confirm'}</DialogTitle>
        <DialogContent className={styles.content}>
          <DialogContentText>
            Do you want to save your changes before closing the window?
          </DialogContentText>
        </DialogContent>
        <DialogActions classes={{ root: styles.actions }}>
          <Button onClick={onCloseWindow} className={styles.blackEditing}>
            Close without saving
          </Button>
          <Button onClick={keepOnWindow} className={styles.keepEditing}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        PaperProps={{
          style: {
            borderRadius: 10,
            maxWidth: 400,
            padding: '1rem 1.25rem',
            boxShadow: '0px 1px 10px rgb(0, 0, 0, 0.1)',
            background: '#fff',
          },
        }}
        open={isBeingRejected}
        keepMounted
        onClose={keepOnWindow}
      >
        <DialogTitle className={styles.modalTitle}>{'Reject File'}</DialogTitle>
        <DialogContent className={styles.content}>
          <DialogContentText>
            Are you sure you want to reject <b>{title}?</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions classes={{ root: styles.actions }}>
          <Button
            onClick={closeIsBeingRejected}
            className={styles.newFileOverwrite}
          >
            No
          </Button>
          <Button onClick={handleOnReject} className={styles.overwriteAction}>
            Yes {loading && <SpinnerAdornment styles={styles} />}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        PaperProps={{
          style: {
            borderRadius: 10,
            maxWidth: 400,
            padding: '1rem 1.25rem',
            boxShadow: '0px 1px 10px rgb(0, 0, 0, 0.1)',
            background: '#fff',
          },
        }}
        open={managerIsConfirming}
        keepMounted
        onClose={keepOnWindow}
      >
        <DialogTitle className={styles.modalTitle}>
          {'Confirm File'}
        </DialogTitle>
        <DialogContent className={styles.content}>
          <DialogContentText>
            Are you sure you want to approve <b>{title}?</b>{' '}
          </DialogContentText>
        </DialogContent>
        <DialogActions classes={{ root: styles.actions }}>
          <Button
            onClick={closeManagerConfirm}
            className={styles.overwriteAction}
          >
            No
          </Button>
          <Button
            onClick={onManagerConfirmInformation}
            className={styles.newFileOverwrite}
          >
            Yes {loading && <SpinnerAdornment styles={styles} />}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        PaperProps={{
          style: {
            borderRadius: 10,
            maxWidth: 400,
            padding: '1rem 1.25rem',
            boxShadow: '0px 1px 10px rgb(0, 0, 0, 0.1)',
            background: '#fff',
          },
        }}
        open={isBeingDeleted}
        keepMounted
        onClose={closeIsBeingDeleted}
      >
        <DialogTitle className={styles.modalTitle}>{'Delete File'}</DialogTitle>
        <DialogContent className={styles.content}>
          <DialogContentText>
            Are you sure you want to delete <b>{title}?</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions classes={{ root: styles.actions }}>
          <Button
            onClick={closeIsBeingDeleted}
            className={styles.newFileOverwrite}
          >
            No
          </Button>
          <Button onClick={handleDeleteFile} className={styles.overwriteAction}>
            Yes {loading && <SpinnerAdornment styles={styles} />}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        PaperProps={{
          style: {
            borderRadius: 10,
            maxWidth: 400,
            padding: '1rem 1.25rem'
          }
        }}
        open={isBeingMultipleDeleted}
        onClose={closeIsBeingMultipleDeleted}
        keepMounted
      >
        <DialogTitle className={styles.modalTitle}>{'Confirm'}</DialogTitle>
        <DialogContent className={styles.content}>
          <DialogContentText>
            {`Are you sure you want to delete ${multipleDeleteLength > 1 ? 'these files' : 'this file'}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions className={styles.actions}>
          <Button className={styles.deleteAction} onClick={handleDeleteMultipleFiles}>
            {loading ? <SpinnerAdornment styles={styles} /> : <CloseIcon className={styles.closeSvg} />}
            <span>{`Delete${multipleDeleteLength > 1 ? ' (' + multipleDeleteLength + ')' : ''}`}</span>
          </Button>
          <Button className={styles.cancelAction} onClick={closeIsBeingMultipleDeleted}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Dialogs;
