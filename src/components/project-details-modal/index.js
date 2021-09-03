import React, { useState } from 'react';
import ProjectDetailsModalStyle from './styles';
import { IconContext } from 'react-icons';
import { RiCloseLine } from 'react-icons/ri';
import { BsThreeDotsVertical } from 'react-icons/bs';
import moment from 'moment';

const ProjectDetailsModal = ({ row }) => {
  const styles = ProjectDetailsModalStyle();
  const [show, setShow] = useState(false);

  return (
    <div className={styles.projectDetails}>
      <button
        className={styles.dots}
        onBlur={() => setShow(false)}
        onClick={() => {
          setShow(true);
        }}
      >
        <IconContext.Provider value={{ color: '#858383', size: '18px' }}>
          <BsThreeDotsVertical style={{ marginLeft: '14px' }} />
        </IconContext.Provider>
      </button>
      {show && (
        <div className={styles.container}>
          <div className={styles.iconWrapper}>
            <IconContext.Provider
              value={{
                color: '#404040',
                size: '16px',
              }}
            >
              <RiCloseLine
                onClick={() => {
                  setShow(false);
                }}
                style={{ marginLeft: 'auto', width: '22px', height: '22px' }}
              />
            </IconContext.Provider>
          </div>
          {row?.description && (
            <div>
              <p className={styles.description}>{row.description}</p>
            </div>
          )}
          <div className={styles.wrapper}>
            <div>
              {row?.sender && (
                <div className={styles.wrapperText}>
                  <p className={styles.title}>Sender:</p>
                  <p className={styles.descriptionTitle}>{row.sender}</p>
                </div>
              )}
              <div className={styles.wrapperText}>
                <p className={styles.title}>In charge:</p>
                <p className={styles.descriptionTitle}>{row.ownerId} </p>
              </div>
              {row.updatedAt && (
                <div className={styles.wrapperText}>
                  <p className={styles.title}>Last updated:</p>
                  <p className={styles.descriptionTitle}>
                    {moment(row.updatedAt).format('MMM Do YY')}
                  </p>
                </div>
              )}
              <div className={styles.wrapperText}>
                <p className={styles.title}>Status:</p>
                <p className={styles.descriptionTitle}>{row.status}</p>
              </div>
              {row.address && (
                <div className={styles.wrapperText}>
                  <p className={styles.title}>Address:</p>
                  <p className={styles.descriptionTitle}>
                    <p>{row.address}</p>
                  </p>
                </div>
              )}
            </div>
            {row?.contacts && (
              <div>
                <p className={styles.titleContects}>Contacts:</p>
                <div className={styles.wrapperText}>
                  <p
                    className={styles.descriptionTitle}
                    style={{ width: '144px' }}
                  >
                    Ana Frankead:
                  </p>
                  <p className={styles.descriptionTitle}>
                    ana.frankead@gmail.com{' '}
                  </p>
                </div>
                <div className={styles.wrapperText}>
                  <p
                    className={styles.descriptionTitle}
                    style={{ width: '144px' }}
                  >
                    Deni Moore:
                  </p>
                  <p className={styles.descriptionTitle}>d.moore@gmail.com</p>
                </div>

                <div className={styles.wrapperText}>
                  <p
                    className={styles.descriptionTitle}
                    style={{ width: '144px' }}
                  >
                    Alan Patridge:
                  </p>
                  <p className={styles.descriptionTitle}>
                    alan.partridge@gmail.com{' '}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default ProjectDetailsModal;
