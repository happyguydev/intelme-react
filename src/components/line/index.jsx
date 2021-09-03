import React from 'react';

import { lineStyles, LineComponent } from './styles';

const Line = ({ text, color }) => {
  const props = {
    text,
    color,
  };

  const styles = lineStyles(props);

  return (
    <>
      <LineComponent className={styles.labelContainer}>
        <span className={styles.labelText}>{text}</span>
      </LineComponent>
    </>
  );
};

export default Line;
