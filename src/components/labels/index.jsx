import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Popper from '@material-ui/core/Popper';
import CloseIcon from '@material-ui/icons/Close';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { CircularProgress } from '@material-ui/core';

import { ReactComponent as AddLabelIcon } from '../icons/addLabel.svg';

import { addRemoveLabel, fetchLabelsForProject } from '../../services/labels';
import { GET_LABELS } from '../../store/types';

import { LabelContainer, useStyles } from './styles';

const Labels = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [values, setValues] = useState([]);
  const [labels, setLabels] = useState([]);
  const [newLabels, setNewLabels] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElAll, setAnchorElAll] = useState(null);
  const [arrowRef, setArrowRef] = useState(null);
  const [arrowRefAll, setArrowRefAll] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setNewLabels(props.labelsObj);
  }, []);

  const fetchLabels = async () => {
    const projectId = props.projectId;
    await fetchLabelsForProject({ projectId }).then((res) => {
      dispatch({
        type: GET_LABELS,
        payload: res.data.result,
      });

      const filterData = res.data.result.filter((item) => {
        let newLabel = newLabels.map((label) => label.label);
        return newLabel.indexOf(item.label) === -1;
      });

      setValues(filterData);
      setLabels(res.data.result);
    });
  };

  const handleAddClick = (event) => {
    setLoading(true);
    fetchLabels().then(() => setLoading(false));
    event.currentTarget.className += ' clicked';
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleAddClose = (event, reason) => {
    if (reason === 'toggleInput') {
      return;
    }

    if (anchorEl) {
      anchorEl.focus();
    }
    anchorEl.className = 'add-label-button';
    setAnchorEl(null);
  };

  const handleALLClick = (event) => {
    setAnchorElAll(anchorElAll ? null : event.currentTarget);
  };

  const handleAllClickAway = () => {
    setAnchorElAll(null);
  };

  const handleAddLabelItem = async (value) => {
    const index = labels.findIndex((label) => label.label === value);
    const indexNew = values.findIndex((label) => label.label === value);

    if (index !== -1 && indexNew === -1) {
      setAnchorEl(null);
      return;
    }

    if (index !== -1) {
      await handleAddRemoveLabel(labels[index], 'add', true);
    } else {
      const indexNewLabel = newLabels.findIndex(
        (label) => label.label === value
      );
      if (indexNewLabel === -1) {
        const labelItem = { label: value };
        await handleAddRemoveLabel(labelItem, 'add', false);
      }
    }

    setAnchorEl(null);
  };

  const handleAddRemoveLabel = async (labelItem, actionType, existing) => {
    let request;

    if (!props.docName) {
      request = {
        projectId: props.projectId,
        label: labelItem.label,
        type: 'task',
        action: actionType,
        taskId: props.taskId,
        taskType: props.taskType,
      };
    } else {
      request = {
        projectId: props.projectId,
        label: labelItem.label,
        type: 'file',
        action: actionType,
        docName: props.docName,
      };
    }
    setLoading(true);
    await addRemoveLabel(request).then((res) => {
      setLoading(false);
      setAnchorEl(null);
      setAnchorElAll(null);
      handleResponse(labelItem, actionType, existing, res);
    });
  };

  const handleResponse = (labelItem, actionType, existing, response) => {
    if (actionType === 'add') {
      setNewLabels((value) => [...value, response]);

      if (existing) {
        setValues(
          values.filter((item) => {
            return item.label !== response.label;
          })
        );
      }
    } else {
      const index = labels.findIndex(
        (label) => label.label === labelItem.label
      );

      if (index !== -1) {
        setValues((item) => [...item, labelItem]);
      }

      setNewLabels(
        newLabels.filter((label) => {
          return label.label !== labelItem.label;
        })
      );
    }
    props.addSuccess();
  };

  const handleDeleteLabelItem = (value) => {
    handleAddRemoveLabel(value, 'delete').then(() => {});
  };

  const openAdd = Boolean(anchorEl);
  const addId = openAdd ? 'intelme-add-label' : undefined;

  const openAll = Boolean(anchorElAll);
  const allId = openAll ? 'intelme-all-label' : undefined;

  return (
    <>
      <LabelContainer>
        {newLabels && newLabels.length > 0 && (
          <Chip
            key={newLabels[0]?.label}
            variant="default"
            className={classes.labelItem}
            style={{
              backgroundColor: newLabels[0]?.color
                ? '#' + newLabels[0]?.color
                : '#ffffff',
            }}
            label={newLabels[0]?.label}
            deleteIcon={<CloseIcon />}
            onDelete={() => handleDeleteLabelItem(newLabels[0])}
            onClick={handleALLClick}
            aria-describedby={allId}
          />
        )}
        {newLabels.length >= 2 && (
          <span className="more-label-count">
            + {newLabels.length - 1} {newLabels.length > 4 && 'more'}
          </span>
        )}
        <button
          className="add-label-button"
          aria-describedby={addId}
          onClick={handleAddClick}
        >
          <AddLabelIcon />
        </button>
      </LabelContainer>

      <Popper
        id={addId}
        open={openAdd}
        anchorEl={anchorEl}
        placement="bottom"
        disablePortal={false}
        modifiers={{
          flip: {
            enabled: false,
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: 'window',
          },
          arrow: {
            enabled: true,
            element: arrowRef,
          },
        }}
        className={classes.popper}
      >
        {loading ? (
          <div className={classes.loading}>
            <CircularProgress />
          </div>
        ) : (
          <>
            <span className={classes.arrow} ref={setArrowRef} />
            <Autocomplete
              open
              onClose={handleAddClose}
              classes={{
                paper: classes.paper,
                option: classes.option,
                listbox: classes.list,
                noOptions: classes.noOption,
                popperDisablePortal: classes.popperDisablePortal,
              }}
              onChange={(event, newValue) => {
                if (event.target.className.includes('MuiChip')) {
                  handleAddRemoveLabel(newValue, 'add', true).then(() => {});
                }
              }}
              disablePortal
              noOptionsText="No labels"
              renderOption={(option) => (
                <Chip
                  className={classes.chipItem}
                  style={{ backgroundColor: '#' + option.color }}
                  label={option.label}
                />
              )}
              options={values}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  autoFocus
                  ref={params.InputProps.ref}
                  inputProps={params.inputProps}
                  className={classes.inputBase}
                  placeholder="Add Label"
                  onKeyDown={(e) => {
                    if (e.keyCode === 13 && e.target.value) {
                      handleAddLabelItem(e.target.value).then();
                    }
                  }}
                />
              )}
            />
          </>
        )}
      </Popper>

      <Popper
        id={allId}
        open={openAll}
        anchorEl={anchorElAll}
        placement="bottom"
        disablePortal={false}
        modifiers={{
          flip: {
            enabled: false,
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: 'window',
          },
          arrow: {
            enabled: true,
            element: arrowRefAll,
          },
        }}
        className={classes.allpopper}
        transition
      >
        <ClickAwayListener onClickAway={handleAllClickAway}>
          {loading ? (
            <div className={classes.loading}>
              <CircularProgress />
            </div>
          ) : (
            <>
              <span className={classes.arrow} ref={setArrowRefAll} />
              {!newLabels && <p className={classes.nolabel}>No labels</p>}
              {newLabels && newLabels.length > 1 ? (
                <ul>
                  {newLabels.map(
                    (label, index) =>
                      index > 0 && (
                        <li key={index}>
                          <Chip
                            key={label.label}
                            variant={label.color ? 'default' : 'outlined'}
                            className={classes.allchipItem}
                            style={{
                              backgroundColor: label.color
                                ? '#' + label.color
                                : '#ffffff',
                            }}
                            label={label.label}
                            deleteIcon={<CloseIcon />}
                            onDelete={() => handleDeleteLabelItem(label)}
                          />
                        </li>
                      )
                  )}
                </ul>
              ) : (
                <p className={classes.nolabel}>No labels</p>
              )}
            </>
          )}
        </ClickAwayListener>
      </Popper>
    </>
  );
};

export default Labels;
