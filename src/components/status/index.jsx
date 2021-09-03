import React from 'react';

import StatusStyles from './styles';

const Status = ({ status, openConfirmationModal, openEditFileModal }) => {
  const styles = StatusStyles();

  return (
    <>
      {status === 'Approved' ? (
        <span className={styles.reviewedAndActive}>{status}</span>
      ) : status === 'For Review' ? (
        <span className={styles.forReview}> {status} </span>
      ) : status === 'Confirm Data' ? (
        <button
          onClick={() => openConfirmationModal()}
          className={styles.confirmData}
        >
          {status}
        </button>
      ) : status === 'Pending for Review' ? (
        <span onClick={() => openEditFileModal()} className={styles.forReview}>
          {' '}
          {status}{' '}
        </span>
      ) : status === 'Processing' ? (
        <span className={styles.processing}>{status}...</span>
      ) : status === 'Active' ? (
        <span className={styles.reviewedAndActive}> {status} </span>
      ) : status === 'On Hold' ? (
        <span className={styles.forReview}> {status} </span>
      ) : status === 'Completed' ? (
        <span className={styles.reviewedAndActive}> {status} </span>
      ) : status === 'Reviewed' ? (
        <span
          onClick={() => openEditFileModal()}
          className={styles.reviewedAndActive}
        >
          {' '}
          {status}{' '}
        </span>
      ) : status === 'Rejected' ? (
        <span onClick={() => openEditFileModal()} className={styles.rejected}>
          {' '}
          {status}{' '}
        </span>
      ) : null}
    </>
  );
};

export default Status;
