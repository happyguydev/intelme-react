import React from 'react';
import moreOptionsStyles from './styles';

const MoreOptions = ({ editAction, seeAction, deleteAction }) => {
  const styles = moreOptionsStyles();

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <li onClick={editAction} className={styles.item}>
          Edit this task
        </li>
        <li onClick={seeAction} className={styles.item}>
          See Activities
        </li>
        <li onClick={deleteAction} className={styles.itemDelete}>
          Delete
        </li>
      </div>
    </div>
  );
};
export default MoreOptions;
