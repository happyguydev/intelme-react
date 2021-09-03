import React from 'react';

import fieldContainerStyles from './styles';

const FieldContainer = ({ children }) => {
  const styles = fieldContainerStyles();

  return <div className={styles.container}>{children}</div>;
};

export default FieldContainer;
