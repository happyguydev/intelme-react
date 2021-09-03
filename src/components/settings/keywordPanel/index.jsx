import React, { useState, forwardRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import ChipInput from 'material-ui-chip-input';

import { getProfile, updateSettings } from '../../../store/actions/auth';

import passwordPanelStyles from './styles';
// import { toast } from 'react-toastify';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const KeywordPanel = ({ userDetails, disciplines }) => {
  const passwordPanelStyle = passwordPanelStyles();

  const dispatch = useDispatch();

  const [userKeywords, setKeywords] = useState([]);
  const [deleteKeywordOpen, setDeleteKeywordOpen] = useState(false);
  const [deletingKeyword, setDeletingKeyword] = useState('');
  const [addKeywordOpen, setAddKeywordOpen] = useState(false);
  const [addedChips, setAddedChips] = useState([]);
  const [addKeywordInputVal, setAddKeywordInputVal] = useState('');

  useEffect(() => {
    setKeywords(
      userDetails.settings.keywords.map((keyword) => {
        return { key: keyword };
      })
    );

    const username = userDetails.username;
    dispatch(getProfile({ username }));
  }, []);

  const handleDeleteKeyword = async () => {
    let deletedKeywords = userKeywords.filter(
      (keyword) => keyword.key !== deletingKeyword.key
    );

    try {
      let tmp = deletedKeywords;
      tmp = tmp.map((item) => {
        return item.key;
      });

      const userData = {
        jobTitle: userDetails.settings.jobTitle,
        mobileNo: userDetails.settings.mobileNo,
        location: userDetails.settings.location,
        keywords: tmp,
      };

      await dispatch(updateSettings(userData));

      const username = userDetails.username;

      await dispatch(getProfile({ username }));

      setKeywords(deletedKeywords);

      // toast.success(
      //   'You have successfully deleted your keywords.!',
      //   toastConfig
      // );
      console.log('You have successfully deleted your keywords!');
    } catch (error) {
      // toast.error('Unable to delete user keywords.', toastConfig);
      console.log('Unable to delete user keywords.');
    }

    handleDeleteClose();
  };

  const handleDeleteClose = () => {
    setDeleteKeywordOpen(false);
    setDeletingKeyword('');
  };

  const handleKeywordDelete = (keywordToDelete) => () => {
    setDeletingKeyword(keywordToDelete);
    setDeleteKeywordOpen(true);
  };

  const handleAddClose = async () => {
    let userKeywordTmp = userKeywords;
    addedChips.map(function (value) {
      userKeywordTmp.push({ key: value });
    });

    if (addKeywordInputVal !== '') {
      userKeywordTmp.push({ key: addKeywordInputVal });
    }

    if (addedChips.length > 0) {
      try {
        let updateTmp = userKeywordTmp;
        updateTmp = updateTmp.map((item) => {
          return item.key;
        });

        const userData = {
          jobTitle: userDetails.settings.jobTitle,
          mobileNo: userDetails.settings.mobileNo,
          location: userDetails.settings.location,
          keywords: updateTmp,
        };

        await dispatch(updateSettings(userData));

        const username = userDetails.username;

        dispatch(getProfile({ username }));

        console.log('You have successfully added your keyword!');

        setKeywords(userKeywordTmp);
        // toast.success(
        //   'You have successfully added your keyword!',
        //   toastConfig
        // );
      } catch (error) {
        // toast.error('Unable to add user keywords.', toastConfig);

        console.log('Unable to add user keywords!');
      }
    }

    handleAddModalClose();
  };

  const handleAddModalClose = () => {
    setAddKeywordInputVal('');
    setAddedChips([]);
    setAddKeywordOpen(false);
  };

  const handleAddKeywordClick = () => {
    setAddKeywordOpen(true);
  };

  const handleAddKeywordChange = (chip) => {
    const result = addedChips.filter((item) => item === chip);

    if (result.length > 0) {
      setAddKeywordInputVal('');
    } else {
      let tmp = addedChips;
      tmp.push(chip);
      setAddedChips(tmp);
    }
  };

  const handleAddingDelete = (chip) => {
    setAddedChips(addedChips.filter((keyword) => keyword !== chip));
  };

  const handleAddKeywordUpdateInput = (v) => {
    const lastKey = v.target.value
      .toString()
      .charAt(v.target.value.toString().length - 1);
    if (lastKey === ',') {
      if (v.target.value.toString().trim().length !== 1) {
        handleAddKeywordChange(addKeywordInputVal);
        setAddKeywordInputVal('');
      } else {
        setAddKeywordInputVal('');
      }
    } else {
      setAddKeywordInputVal(v.target.value);
    }
  };

  return (
    <>
      <Typography className={passwordPanelStyle.disciplineTitleStyle}>
        Discipline keywords
      </Typography>
      <div className={passwordPanelStyle.disciplineStyle}>
        {disciplines &&
          disciplines.map((discipline, index) => {
            return (
              <Chip
                key={index}
                label={discipline}
                className={passwordPanelStyle.keywordStyle}
              />
            );
          })}
      </div>
      <Typography className={passwordPanelStyle.disciplineTitleStyle}>
        My keywords
      </Typography>
      <div className={passwordPanelStyle.disciplineStyle}>
        {userKeywords &&
          userKeywords.map((keyword, index) => {
            return (
              <Chip
                clickable
                key={index}
                label={keyword.key}
                onDelete={handleKeywordDelete(keyword)}
                className={passwordPanelStyle.keywordStyle}
                deleteIcon={<CloseIcon />}
              />
            );
          })}
        <Chip
          variant="outlined"
          avatar={<AddIcon />}
          label="Add Keyword"
          onClick={handleAddKeywordClick}
          className={passwordPanelStyle.addKeywordStyle}
        />
      </div>
      <Dialog
        PaperProps={{
          style: { borderRadius: 10, maxWidth: 440 },
        }}
        open={deleteKeywordOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-delete-keyword-title"
        aria-describedby="alert-dialog-delete-keyword"
      >
        <DialogTitle
          id="alert-dialog-delete-keyword-title"
          className={passwordPanelStyle.modalTitle}
        >
          {'Confirm'}
        </DialogTitle>
        <DialogContent className={passwordPanelStyle.modalContent}>
          <DialogContentText id="alert-dialog-delete-keyword">
            Are you sure you want to delete this keyword from your profile?
          </DialogContentText>
        </DialogContent>
        <DialogActions className={passwordPanelStyle.modalAction}>
          <Button
            onClick={handleDeleteKeyword}
            className={passwordPanelStyle.deleteKeywordButton}
          >
            <CloseIcon />
            Delete
          </Button>
          <Button
            onClick={handleDeleteClose}
            className={passwordPanelStyle.deleteCancelKeywordButton}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        PaperProps={{
          style: { borderRadius: 10, maxWidth: 440, width: 440 },
        }}
        open={addKeywordOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleAddModalClose}
        aria-labelledby="alert-dialog-keyword-add-title"
        aria-describedby="alert-dialog-keyword-add"
      >
        <DialogTitle
          id="alert-dialog-keyword-add-title"
          className={passwordPanelStyle.modalTitle}
        >
          {'Add a keyword'}
        </DialogTitle>
        <DialogContent className={passwordPanelStyle.modalContent}>
          <img
            alt="Tag"
            className={passwordPanelStyle.chipIcon}
            src="tag.svg"
            width="20px"
            height="20px"
          />
          <ChipInput
            className={passwordPanelStyle.chipStyle}
            fullWidth
            value={addedChips}
            onDelete={(deletedChip) => handleAddingDelete(deletedChip)}
            onUpdateInput={(v) => handleAddKeywordUpdateInput(v)}
            inputValue={addKeywordInputVal}
            placeholder={
              addedChips.length > 0
                ? ''
                : 'Type your keywords separated by a comma.'
            }
            chipRenderer={({ chip, handleDelete }, key) => (
              <Chip
                className={passwordPanelStyle.chipAddItemStyle}
                key={key}
                label={chip}
                onDelete={handleDelete}
                deleteIcon={<CloseIcon />}
              />
            )}
          />
        </DialogContent>
        <DialogActions className={passwordPanelStyle.modalAction}>
          <Button
            onClick={handleAddClose}
            className={passwordPanelStyle.addKeywordButton}
          >
            <AddIcon />
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default KeywordPanel;
