import React from 'react';

import CardStyles from './styles';

const Card = ({ children }) => {
  const styles = CardStyles();
  return <div className={styles.cardContainer}>{children}</div>;
};

export default Card;
