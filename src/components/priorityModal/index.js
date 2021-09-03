import React, { useState, useEffect } from 'react';
import PriorityStarsStyle from './styles';
import { IconContext } from 'react-icons';
import { BsStar, BsStarHalf, BsStarFill } from 'react-icons/bs';
const PriorityStars = () => {
  const styles = PriorityStarsStyle();

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <li className={styles.item}>
          <IconContext.Provider
            value={{
              color: '#D4AF37',
              size: '1.5rem',
            }}
          >
            <BsStarFill className={styles.icon} />
          </IconContext.Provider>
          High Priority
        </li>
        <li className={styles.item}>
          <IconContext.Provider
            value={{
              color: '#D4AF37',
              size: '1.5rem',
            }}
          >
            <BsStarHalf className={styles.icon} />
          </IconContext.Provider>
          Medium Priority
        </li>
        <li className={styles.item}>
          <IconContext.Provider
            value={{
              color: '#D4AF37',
              size: '1.5rem',
            }}
          >
            <BsStar className={styles.icon} />
          </IconContext.Provider>
          Low Priority
        </li>
        <li className={styles.item}>
          <IconContext.Provider
            value={{
              color: '#DBDBDB',
              size: '1.5rem',
            }}
          >
            <BsStar className={styles.icon} />
          </IconContext.Provider>
          Not set
        </li>
      </div>
    </div>
  );
};
export default PriorityStars;
