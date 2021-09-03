import React, { useEffect, useState } from 'react';
import { Dialog, IconButton } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Close from '@material-ui/icons/Close';

import editFileStyles from './styles';
import Dialogs from '../fileDialogs';
import fileDataIcons from '../../utils/fileDataIcons';
import DocViewer from '../docViewer';
import EditFileForm from './form';
import { format, parse } from 'date-fns';
import { enAU } from 'date-fns/locale';
import { deleteFile, extractTitleData, updateFile } from '../../services/files';
import { toast } from 'react-toastify';

const EditFile = (props) => {
  const {
    open,
    handleModalClose,
    projectId,
    fileData,
    aiPrediction,
    fileNotOverwrittable,
    updateEditedFile,
    updateDeletedFile,
    projectManager,
  } = props;

  const styles = editFileStyles();
  const { profile } = useSelector((state) => state.auth);

  const [openOverwrite, setOpenOverwrite] = useState(false);
  const [confirmChange, setConfirmChange] = useState(false);
  const [notOverwrite, setNotOverwrite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmCloseModal, setConfirmCloseModal] = useState(false);
  const [isBeingRejected, setIsBeingRejected] = useState(false);
  const [isBeingDeleted, setIsBeingDeleted] = useState(false);
  const [managerIsConfirming, setManagerIsConfirming] = useState(false);
  const [disciplineOptions, setDisciplineOptions] = useState(
    aiPrediction?.discipline || []
  );
  const [levelOptions, setLevelOptions] = useState(aiPrediction?.level || []);
  const [zoneOptions, setZoneOptions] = useState(aiPrediction?.zone || []);
  const [dateOptions, setDateOptions] = useState();
  const [predictionDates, setPredictionDates] = useState();

  const [editFields, setEditFields] = useState({
    documentNumber: fileData?.documentNumber,
    title: fileData?.title || '',
    revision: fileData?.revision,
    revisionDate: null,
    description: fileData?.description || '',
    discipline: fileData?.discipline || '',
    level: fileData?.level || '',
    zone: fileData?.zone || '',
  });
  const [sendFormattedDate, setSendFormattedDate] = useState();

  useEffect(() => {
    let parsedDate;
    let indexDates;
    let displayDates;
    console.log(aiPrediction);

    const dates = aiPrediction?.revisionDate?.map((date) => date);

    if (dates !== undefined && dates !== [] && dates.length > 0) {
      const getIndexes = dates.map((value) => value);
      indexDates = getIndexes.map((date) => Object.keys(date)).flat(2);
      displayDates = getIndexes.map((dates) => Object.values(dates)).flat(2);
      let formatted = displayDates.map((date) => new Date(date));
      console.log(formatted);
      setDateOptions(formatted);
      setPredictionDates(indexDates);

      if (fileData?.revisionDate?.length === 10) {
        parsedDate = parse(fileData.revisionDate, 'yyyy-MM-dd', new Date(), {
          locale: enAU,
        });
      }
      if (fileData?.revisionDate?.length === 7) {
        parsedDate = parse(displayDates[0], 'yy-MM-d', new Date(), {
          locale: enAU,
        });
      }
      if (fileData?.revisionDate?.length === 8) {
        parsedDate = parse(displayDates[0], 'yy-MM-dd', new Date(), {
          locale: enAU,
        });
      }
      if (fileData?.revisionDate?.length === 9) {
        parsedDate = parse(displayDates[0], 'yyyy-MM-d', new Date(), {
          locale: enAU,
        });
      }
      const formattedSendDate = format(parsedDate, 'yyyy-MM-dd');
      setEditFields((previous) => {
        return {
          ...previous,
          revisionDate: parsedDate,
        };
      });
      setSendFormattedDate(formattedSendDate);
    }
  }, []);

  const handleInputChange = (e) => {
    let value = e?.target?.value;
    let fieldName = e?.target?.name;
    setEditFields((previous) => {
      return { ...previous, [fieldName]: value };
    });
  };

  const handleTitleChange = async (value) => {
    setDisciplineOptions([]);
    setZoneOptions([]);
    setLevelOptions([]);
    setEditFields((previous) => {
      return { ...previous, title: value };
    });
    await extractTitleData({ title: value }).then((res) => {
      setEditFields((previous) => {
        return { ...previous, discipline: res.discipline };
      });
      setDisciplineOptions(res.discipline);
      setZoneOptions(res.zone);
      setLevelOptions(res.level);
    });
  };

  const handleDisciplineChange = (value) => {
    setEditFields((previous) => {
      return { ...previous, discipline: value };
    });
  };
  const handleDateChange = (date) => {
    const formatDate = format(date, 'yyyy-MM-dd');
    setSendFormattedDate(formatDate);
    setEditFields((previous) => {
      return { ...previous, revisionDate: date };
    });
  };

  const handleDeleteFile = async () => {
    let docId = encodeURIComponent(fileData?.docId || fileData?.documentName);

    setLoading(true);

    try {
      await deleteFile({ docName: docId, projectId }).then((res) => {
        console.log(res);
        updateDeletedFile(docId);
        setIsBeingDeleted(false);
        handleModalClose();
        toast.success('File deleted succesfully!');
        setLoading(false);
      });
    } catch (error) {
      setIsBeingDeleted(false);
      if (error?.response?.status !== 500) {
        toast.error('Something went wrong when deleting the file');
      } else {
        toast.error(
          'An error has occurred in the platform, please try again later or contact your manager.'
        );
      }
    }
  };

  const handleOnReject = async () => {
    let docId = encodeURIComponent(fileData?.docId || fileData?.documentName);
    const { revisionDate, ...data } = editFields;

    setLoading(true);
    try {
      await updateFile({
        docName: docId,
        projectId,
        values: {
          revisionDate: sendFormattedDate,
          status: 'Rejected',
          ...data,
        },
      }).then((res) => {
        updateEditedFile(res);
        setIsBeingRejected(false);
        toast.success('File Edited succesfully');
        handleModalClose();
        setLoading(false);
      });
    } catch (error) {
      if (error?.response.status !== 500) {
        toast.error('An error has occured when trying to update the file.');
      } else {
        toast.error(
          'An error has occurred in the platform, please try again later or contact your manager.'
        );
      }
    }
  };

  const handleManagerApprove = async () => {
    let docId = encodeURIComponent(fileData?.docId || fileData?.documentName);

    console.log(docId);
    const { revisionDate, ...data } = editFields;

    setLoading(true);

    try {
      await updateFile({
        projectId,
        docName: docId,
        values: {
          revisionDate: sendFormattedDate,
          status: 'Reviewed',
          ...data,
        },
      }).then((res) => {
        updateEditedFile(res);
        setManagerIsConfirming(false);
        setLoading(false);
        handleModalClose();
        toast.success('File Approved succesfully!');
      });
    } catch (error) {
      console.log(error.response);
      toast.error(
        'An error has occurred in the platform, please try again later or contact your maanager.'
      );
      setManagerIsConfirming(false);
      setLoading(false);
    }
  };

  const handleEditFile = async () => {
    let docId = aiPrediction?.docId || aiPrediction?.documentName;
    const { revisionDate, ...data } = editFields;
    setLoading(true);
    try {
      await updateFile({
        projectId,
        docName: encodeURIComponent(docId),
        values: {
          revisionDate: sendFormattedDate,
          status: 'Pending for Review',
          ...data,
        },
      }).then((res) => {
        console.log(res);
        updateEditedFile(res);
        setLoading(false);
        toast.success('File updated succesfully!');
        setConfirmChange(false);
        handleModalClose();
      });
    } catch (error) {
      toast.error(
        'An error has occured in the platform, please try again later or contact your manager.'
      );
      setLoading(false);
    }
  };

  const handleOverwriteClose = () => {
    setOpenOverwrite(false);
  };

  const handleNotOverwrittable = () => {
    setNotOverwrite(false);
  };

  const handleConfirmClose = () => {
    setConfirmChange(false);
  };

  const newFile = async () => {
    fileNotOverwrittable();
  };
  const confirmClose = () => {
    setConfirmCloseModal(true);
  };

  const onExit = () => {
    setConfirmCloseModal(false);
    handleModalClose();
  };

  const closeIsBeingRejected = () => {
    setIsBeingRejected(false);
  };

  const closeIsBeingDeleted = () => {
    setIsBeingDeleted(false);
  };

  const onManagerConfirm = async (e) => {
    e.preventDefault();
    setManagerIsConfirming(true);
  };

  const onConfirmInformation = async (e) => {
    e.preventDefault();
    setConfirmChange(true);
  };

  const onRejectInformation = async (e) => {
    e.preventDefault();
    setIsBeingRejected(true);
  };

  const closeManagerConfirm = async () => {
    setManagerIsConfirming(false);
  };

  const onDeleteFile = async (e) => {
    e.preventDefault();
    setIsBeingDeleted(true);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      classes={{
        paper: styles.root,
      }}
      onClose={() => handleModalClose()}
      aria-labelledby="max-width-dialog-title"
    >
      <h1 className={styles.title}>{aiPrediction?.title || fileData?.title}</h1>
      <div className={styles.fileInfo}>
        <span className={styles.declaration}>File:</span>
        <span>{fileData?.fileName}</span>
        <span className={styles.declaration}>Type: </span>
        <span className={styles.fileType}>
          {fileDataIcons(fileData?.type)} {fileData?.type}
        </span>
      </div>
      <IconButton
        arial-label="close"
        className={styles.closeButton}
        onClick={() => confirmClose()}
      >
        <Close />
      </IconButton>
      <div className={styles.container}>
        <div className={styles.docViewer}>
          <DocViewer
            projectId={projectId}
            prediction={aiPrediction?.prediction}
            doc={fileData?.docId || fileData?.documentName}
          />
        </div>

        <div className={styles.form}>
          <form>
            <EditFileForm
              predictionData={aiPrediction}
              zoneOptions={zoneOptions}
              levelOptions={levelOptions}
              dateOptions={dateOptions}
              disciplineOptions={disciplineOptions}
              docNumber={editFields.documentNumber}
              docTitle={editFields.title}
              docRevision={editFields.revision}
              revisionDate={editFields.revisionDate}
              revisionDescription={editFields.description}
              discipline={editFields.discipline}
              level={editFields.level}
              zone={editFields.zone}
              handleInputChange={handleInputChange}
              handleDisciplineChange={handleDisciplineChange}
              handleDateChange={handleDateChange}
              handleTitleChange={handleTitleChange}
            />
            <div className={styles.bottomActions}>
              {profile?.username === projectManager ? (
                <div className={styles.actions}>
                  <button onClick={onDeleteFile} className={styles.deleteFile}>
                    Delete File
                  </button>
                  <button
                    onClick={onRejectInformation}
                    className={styles.managerReject}
                  >
                    Reject
                  </button>
                  <button
                    onClick={onManagerConfirm}
                    className={styles.managerApprove}
                  >
                    Approve
                  </button>
                </div>
              ) : (
                <div className={styles.actions}>
                  <button onClick={onDeleteFile} className={styles.deleteFile}>
                    Delete File
                  </button>
                  <button
                    onClick={onConfirmInformation}
                    className={styles.confirmButton}
                  >
                    Confirm Information
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
      <Dialogs
        openOverwrite={openOverwrite}
        handleOverwriteClose={handleOverwriteClose}
        notOverwrite={notOverwrite}
        isBeingRejected={isBeingRejected}
        closeIsBeingRejected={closeIsBeingRejected}
        handleOnReject={handleOnReject}
        title={fileData?.title}
        revision={fileData?.revision}
        newFile={newFile}
        handleConfirmClose={handleConfirmClose}
        confirmChange={confirmChange}
        handleConfirmChange={handleEditFile}
        handleNotOverwrittable={handleNotOverwrittable}
        loading={loading}
        isBeingDeleted={isBeingDeleted}
        closeIsBeingDeleted={closeIsBeingDeleted}
        handleDeleteFile={handleDeleteFile}
        managerIsConfirming={managerIsConfirming}
        onManagerConfirmInformation={handleManagerApprove}
        closeManagerConfirm={closeManagerConfirm}
        keepOnWindow={() => setConfirmCloseModal(false)}
        onClose={confirmCloseModal}
        confirmCloseModal={confirmClose}
        onCloseWindow={onExit}
      />
    </Dialog>
  );
};

export default EditFile;
