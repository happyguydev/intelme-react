import { Chip, IconButton, TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { format, parseISO } from 'date-fns';
import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';

import { ReactComponent as CalendarIcon } from '../../icons/blackCalendar.svg';
import { ReactComponent as ChevronDown } from '../../icons/chevronDown.svg';

import formStyles from './styles';

const CustomDateInput = forwardRef(
  ({ value, onClick, style, iconStyle, options, handleDateChange }, ref) => (
    <Autocomplete
      ref={ref}
      options={options}
      disableClearable
      getOptionLabel={(date) =>
        options?.length > 0 ? format(new Date(date), 'dd/MM/yyyy') : date
      }
      forcePopupIcon
      freeSolo
      getOptionSelected={(option, value) =>
        options?.length > 0
          ? format(option, 'MM/dd/yyyy') === value
          : option === value
      }
      onChange={(date, value) => handleDateChange(value)}
      popupIcon={
        <IconButton onClick={onClick} className={iconStyle} disableRipple>
          <CalendarIcon />
        </IconButton>
      }
      InputLabelProps={undefined}
      fullWidth
      value={value}
      placeholder="Revision Date"
      classes={{
        root: style,
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          InputLabelProps={undefined}
          variant="standard"
          name="documentNumber"
          placeholder="Document Number"
        />
      )}
    />
  )
);

const FileConfirmationForm = (props) => {
  const styles = formStyles();
  const {
    predictionData,
    docNumber,
    docTitle,
    docRevision,
    revisionDate,
    disciplines,
    revisionDescription,
    level,
    zone,
    dateOptions,
    handleInputChange,
    handleDateChange,
    handleDisciplineChange,
    handleTitleChange,
    zoneOptions,
    disciplineOptions,
    levelOptions,
  } = props;

  return (
    <>
      <div>
        <Typography classes={{ root: styles.label }}>
          Document Number
        </Typography>
        <Autocomplete
          options={predictionData?.documentDrawing || []}
          disableClearable
          value={docNumber || ''}
          forcePopupIcon
          freeSolo
          onInputChange={(e) => handleInputChange(e)}
          popupIcon={<ChevronDown />}
          renderInput={(params) => (
            <TextField
              {...params}
              InputLabelProps={undefined}
              variant="standard"
              name="documentNumber"
              placeholder="Document Number"
              classes={{
                root: styles.inputContainer,
              }}
            />
          )}
        />
      </div>
      <div>
        <Typography classes={{ root: styles.requiredField }}>
          Document Title
        </Typography>
        <Autocomplete
          options={predictionData?.title || []}
          disableClearable
          value={docTitle}
          forcePopupIcon
          freeSolo
          onBlur={() => handleTitleChange(docTitle)}
          onInputChange={(e, value) => handleInputChange(e)}
          popupIcon={<ChevronDown />}
          renderInput={(params) => (
            <TextField
              {...params}
              InputLabelProps={undefined}
              variant="standard"
              name="title"
              placeholder="Document Title"
              classes={{
                root: styles.inputContainer,
              }}
            />
          )}
        />
      </div>
      <div>
        <Typography classes={{ root: styles.requiredField }}>
          Document Revision
        </Typography>
        <Autocomplete
          options={predictionData?.revision || []}
          disableClearable
          forcePopupIcon
          value={docRevision}
          freeSolo
          onInputChange={(e, value) => handleInputChange(e)}
          popupIcon={<ChevronDown />}
          renderInput={(params) => (
            <TextField
              {...params}
              InputLabelProps={undefined}
              variant="standard"
              name="revision"
              placeholder="Document Revision"
              classes={{
                root: styles.inputContainer,
              }}
            />
          )}
        />
      </div>
      <div>
        <Typography classes={{ root: styles.label }}>Revision Date</Typography>
        <DatePicker
          selected={revisionDate}
          name="revisionDate"
          popperPlacement="bottom"
          onChange={(date) => {
            handleDateChange(date);
          }}
          customInput={
            <CustomDateInput
              style={styles.datePicker}
              options={dateOptions}
              handleDateChange={handleDateChange}
              iconStyle={styles.iconStyle}
            />
          }
        />
      </div>
      <div>
        <Typography classes={{ root: styles.label }}>
          Revision Description
        </Typography>
        <Autocomplete
          options={predictionData?.description || []}
          disableClearable
          forcePopupIcon
          value={revisionDescription}
          freeSolo
          onInputChange={(e) => handleInputChange(e)}
          popupIcon={<ChevronDown />}
          renderInput={(params) => (
            <TextField
              {...params}
              InputLabelProps={undefined}
              variant="standard"
              name="description"
              placeholder="Revision Description"
              classes={{
                root: styles.inputContainer,
              }}
            />
          )}
        />
      </div>
      <div>
        <Typography classes={{ root: styles.label }}>Discipline</Typography>
        <Autocomplete
          multiple
          options={disciplineOptions || []}
          getOptionLabel={(option) => option}
          value={disciplines}
          disableClearable
          forcePopupIcon
          freeSolo
          autoSelect
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                deleteIcon={<></>}
                classes={{
                  root: styles.disciplineTags,
                }}
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          onChange={(event, value) => handleDisciplineChange(value)}
          onInputChange={(event, newValue) => {
            if (newValue.endsWith(',')) {
              event.target.blur();
              event.target.focus();
            }
          }}
          popupIcon={<ChevronDown />}
          renderInput={(params) => (
            <TextField
              {...params}
              InputLabelProps={undefined}
              variant="standard"
              name="discipline"
              InputProps={{ ...params.InputProps }}
              classes={{
                root: styles.disciplinesContainer,
              }}
            />
          )}
        />
      </div>
      <div>
        <Typography classes={{ root: styles.label }}>Level</Typography>
        <Autocomplete
          disableClearable
          options={levelOptions || []}
          forcePopupIcon
          freeSolo
          onInputChange={(e) => handleInputChange(e)}
          value={level}
          popupIcon={<ChevronDown />}
          renderInput={(params) => (
            <TextField
              {...params}
              InputLabelProps={undefined}
              variant="standard"
              placeholder="Level"
              name="level"
              classes={{
                root: styles.inputContainer,
              }}
            />
          )}
        />
      </div>
      <div>
        <Typography classes={{ root: styles.label }}>Zone</Typography>
        <Autocomplete
          options={zoneOptions || []}
          disableClearable
          value={zone}
          forcePopupIcon
          freeSolo
          onInputChange={(e) => handleInputChange(e)}
          popupIcon={<ChevronDown />}
          renderInput={(params) => (
            <TextField
              {...params}
              InputLabelProps={undefined}
              variant="standard"
              placeholder="Zone"
              name="zone"
              classes={{
                root: styles.inputContainer,
              }}
            />
          )}
        />
      </div>
    </>
  );
};

export default FileConfirmationForm;
