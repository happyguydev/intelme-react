import React, { forwardRef, useEffect, useState } from 'react';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { Typography } from '@material-ui/core';

import Button from '../../button';

import SummaryViewStyles from './styles';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const SummaryDetail = ({ onClose, keywords, docId, detail }) => {
  const [showOpen, setShowOpen] = useState(false);

  const styles = SummaryViewStyles();

  useEffect(() => {
    if (Object.keys(detail).length > 0) setShowOpen(true);
  }, []);

  const handleViewFile = () => {
    setShowOpen(false);
    onClose();
    window.open(
      `http://dev.intelme.com.au/api/docstore/v1/documents/view/projects/${detail.props.projectId}/${docId}`,
      '_blank'
    );
  };

  return (
    <Dialog
      PaperProps={{
        style: {
          borderRadius: 10,
          minWidth: 784,
          fontFamily: 'Poppins',
          fontWeight: 400,
          padding: '32px 95px 36px',
        },
      }}
      open={showOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-labelledby="summary-title"
      aria-describedby="summary-content"
    >
      <DialogTitle id="summary-title" className={styles.title}>
        {/*{detail.props.title && <Typography className={styles.summaryTitle}>{detail.props.title}</Typography>}*/}
        <Typography className={styles.summaryTitle}>My Summary</Typography>
        {detail.props.creator && (
          <Typography className={styles.summaryCreator}>
            {detail.props.creator}, {detail.props.title}
          </Typography>
        )}
        {/*{detail.props.keywords && <Typography className={styles.summaryKeyword}>Keyword: {detail.props.keywords}</Typography>}*/}
        {keywords && (
          <Typography className={styles.summaryKeyword}>
            Keyword: {keywords.map((item) => item).join(', ')}
          </Typography>
        )}
      </DialogTitle>
      <DialogContent id="summary-content" className={styles.content}>
        {detail.highlight.map((item) => (
          <div
            className={styles.highlightConetnt}
            dangerouslySetInnerHTML={{ __html: item }}
          />
        ))}
      </DialogContent>
      <DialogActions className={styles.action}>
        <div onClick={handleViewFile}>
          <Button background="#FF8A47" primarySmall color="#ffffff">
            View file
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default SummaryDetail;
