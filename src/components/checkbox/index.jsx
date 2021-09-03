import { Checkbox, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

import CheckboxStyles from './styles';

const CustomCheckbox = ({ handleChange, value, label, checked }) => {
  const styles = CheckboxStyles();
  return (
    <div className={styles.container}>
      <Checkbox
        className={styles.root}
        disableRipple
        color="default"
        inputProps={{ 'arial-label': 'standard-checkbox' }}
        value={value}
        onClick={(e) => handleChange(e)}
        checkedIcon={<span className={clsx(styles.icon, styles.checkedIcon)} />}
        icon={<span className={styles.icon} />}
        checked={checked}
      />
      {label ? (
        <Typography className={styles.labelStyle}>{label}</Typography>
      ) : null}
    </div>
  );
};

export default CustomCheckbox;
