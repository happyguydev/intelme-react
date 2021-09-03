import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import inputStyles from './styles';
import { ReactComponent as RequiredMarker } from '../icons/requiredMarker.svg';

import { VisibilityOffOutlined, VisibilityOutlined } from '@material-ui/icons';

const FormField = ({
  placeholder,
  onChange,
  label,
  type,
  name,
  defaultValue,
  disabled,
  required,
  helperText = undefined,
  error = undefined,
}) => {
  const styles = inputStyles();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.wrapper}>
      <Typography classes={{ root: styles.labelStyle }}>
        {required ? <RequiredMarker /> : null} {label}
      </Typography>
      <TextField
        InputLabelProps={undefined}
        classes={{
          root:
            !error && !disabled
              ? styles.inputContainer
              : disabled
              ? styles.disabled
              : styles.inputContainerError,
        }}
        disabled={disabled}
        defaultValue={defaultValue}
        fullWidth
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <>
              {type === 'password' ? (
                <InputAdornment position="end" className={styles.passwordEye}>
                  <IconButton
                    disableRipple
                    aria-label="toggle visibility"
                    onClick={handleShowPassword}
                  >
                    {showPassword ? (
                      <VisibilityOutlined />
                    ) : (
                      <VisibilityOffOutlined />
                    )}
                  </IconButton>
                </InputAdornment>
              ) : null}
            </>
          ),
        }}
        inputProps={{
          className: styles.input,
          placeholder: `${placeholder}`,
        }}
        error={error}
        name={name}
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        onChange={onChange}
        size="small"
        FormHelperTextProps={undefined}
        helperText={undefined}
      />
      {error && (
        <Typography className={styles.helperText}> {helperText} </Typography>
      )}
    </div>
  );
};

export default FormField;
