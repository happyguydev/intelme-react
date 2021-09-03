import React  from 'react';
import MultiSelectOptionsStyles from './styles';
import { IconContext } from 'react-icons';
import { RiCloseLine } from 'react-icons/ri';
const MultiSelectOptions = (props) => {
  const styles = MultiSelectOptionsStyles();

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <div className={styles.wrapper}>
          <div className={styles.iconWrapper}>
            <IconContext.Provider
              value={{
                color: '#404040',
                size: '1rem',
              }}
            >
              <RiCloseLine onClick={() => props.cancelAll()} />
            </IconContext.Provider>
          </div>
          <p className={styles.title}>
            {`${props.items.length} item${props.items.length > 1 ? 's' : ''} selected`}
          </p>
        </div>
      </div>
      <div className={styles.listBtn}>
        {props.type === 'file' ? (
          <>
            <button className={styles.orangeBtn} onClick={() => props.onDownload()}>
              {props.items.length > 1 ? 'Download binder' : 'Download file'}
            </button>
            <button className={styles.orangeBtn}  onClick={() => props.onDelete()}>Delete</button>
          </>
        ) : (
          <>
            <button className={styles.orangeBtn}>Download</button>
            <button className={styles.orangeBtn}>View</button>
            <button className={styles.orangeBtn}>Delete</button>
            <button className={styles.orangeBtn}>Set Status</button>
          </>
        )}
      </div>
    </div>
  );
};
export default MultiSelectOptions;
