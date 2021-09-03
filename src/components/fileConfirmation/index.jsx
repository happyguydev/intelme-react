import { Dialog, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React, { useEffect, useState } from 'react';
import FileConfirmationStyles from './styles';
import FileConfirmationForm from './form';
import {
  confirmFile,
  deleteFile,
  extractTitleData,
} from '../../services/files';
import Dialogs from '../fileDialogs';
import { toast } from 'react-toastify';
import { format, parse, parseISO } from 'date-fns';
import { enAU } from 'date-fns/locale';
import DocViewer from '../docViewer';
import { useSelector } from 'react-redux';

import fileDataIcons from '../../utils/fileDataIcons';

const FileConfirmation = (props) => {
  const {
    open,
    handleModalClose,
    projectId,
    fileData,
    aiPrediction,
    fileNotOverwrittable,
    updateConfirmedFile,
    updateDeletedFile,
    projectManager,
  } = props;

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
  const [predictionDates, setPredictionDates] = useState([]);

  const [confirmationFields, setConfirmationFields] = useState({
    documentNumber: aiPrediction?.documentDrawing
      ? aiPrediction?.documentDrawing[0]
      : '',
    title: aiPrediction?.title ? aiPrediction?.title[0] : '',
    revision: aiPrediction?.revision ? aiPrediction?.revision[0] : '',
    revisionDate: null,
    description: aiPrediction?.description ? aiPrediction?.description[0] : '',
    discipline: disciplineOptions ? disciplineOptions : [],
    level: levelOptions ? levelOptions[0] : '',
    zone: zoneOptions ? zoneOptions[0] : '',
  });
  const [sendFormattedDate, setFormattedSendDate] = useState();
  const styles = FileConfirmationStyles();

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
      let formatted = displayDates.map((date) => parseISO(date));
      console.log(format(parseISO(displayDates[0]), 'dd/MM/yyyy'));
      setDateOptions(formatted);
      setPredictionDates(indexDates);

      if (displayDates[0]?.length === 10) {
        parsedDate = parse(displayDates[0], 'yyyy-MM-dd', new Date(), {
          locale: enAU,
        });
      }
      if (displayDates[0]?.length === 7) {
        parsedDate = parse(displayDates[0], 'yy-MM-d', new Date(), {
          locale: enAU,
        });
      }
      if (displayDates[0]?.length === 8) {
        parsedDate = parse(displayDates[0], 'yy-MM-dd', new Date(), {
          locale: enAU,
        });
      }
      if (displayDates[0]?.length === 9) {
        parsedDate = parse(displayDates[0], 'yyyy-MM-d', new Date(), {
          locale: enAU,
        });
      }
      const formattedSendDate = format(parsedDate, 'yyyy-MM-dd');
      setConfirmationFields((previous) => {
        return {
          ...previous,
          revisionDate: formatted[0],
        };
      });
      setFormattedSendDate(formattedSendDate);
    }
  }, []);

  const handleInputChange = (e) => {
    let value = e?.target?.value;
    let fieldName = e?.target?.name;
    setConfirmationFields((previous) => {
      return { ...previous, [fieldName]: value };
    });
  };

  const handleTitleChange = async (value) => {
    setDisciplineOptions([]);
    setZoneOptions([]);
    setLevelOptions([]);
    setConfirmationFields((previous) => {
      return { ...previous, title: value };
    });
    await extractTitleData({ title: value }).then((res) => {
      setConfirmationFields((previous) => {
        return {
          ...previous,
          discipline: res.discipline,
          zone: res.zone[0],
          level: res.level[0],
        };
      });
      setDisciplineOptions(res.discipline);
      setZoneOptions(res.zone);
      setLevelOptions(res.level);
    });
  };

  const handleDisciplineChange = (value) => {
    setConfirmationFields((previous) => {
      return { ...previous, discipline: value };
    });
  };
  const handleDateChange = (date) => {
    const formatDate = format(date, 'yyyy-MM-dd');
    setFormattedSendDate(formatDate);
    setConfirmationFields((previous) => {
      return { ...previous, revisionDate: date };
    });
  };

  const handleOverwriteConfirm = async () => {
    let docId = aiPrediction?.docId || aiPrediction?.documentName;
    const { revisionDate, ...data } = confirmationFields;

    setLoading(true);
    try {
      await confirmFile({
        projectId,
        id: encodeURIComponent(docId),
        overwrite: 'yes',
        values: {
          revisionDate: sendFormattedDate,
          ...data,
        },
      }).then((res) => {
        updateConfirmedFile(res);
        setOpenOverwrite(false);
        setLoading(false);
        handleModalClose();
        toast.success('File overwritted succesfully.');
      });
    } catch (error) {
      setLoading(false);
      toast.error('Something went wrong.');
    }
  };

  const handleConfirmChange = async () => {
    let docId = aiPrediction?.docId || aiPrediction?.documentName;
    const { revisionDate, ...data } = confirmationFields;
    setLoading(true);
    try {
      await confirmFile({
        projectId,
        id: encodeURIComponent(docId),
        values: {
          revisionDate: sendFormattedDate,
          ...data,
        },
      }).then((res) => {
        console.log(res);
        updateConfirmedFile(res);
        setLoading(false);
        setConfirmChange(false);
        handleModalClose();
      });
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.type === 'warning') {
        setOpenOverwrite(true);
        setConfirmChange(false);
      } else if (error?.response?.data?.type === 'error') {
        setNotOverwrite(true);
        setConfirmChange(false);
      }
    }
  };

  const onManagerConfirmInformation = async () => {
    let docId = aiPrediction?.docId || aiPrediction?.documentName;

    const { revisionDate, ...data } = confirmationFields;

    setLoading(true);

    try {
      await confirmFile({
        projectId,
        id: encodeURIComponent(docId),
        values: {
          revisionDate: sendFormattedDate,
          status: 'Reviewed',
          ...data,
        },
      }).then((res) => {
        console.log(res);
        updateConfirmedFile(res);
        setManagerIsConfirming(false);
        setLoading(false);
        handleModalClose();
      });
    } catch (error) {
      console.log(error.response);
      if (error?.response?.data?.type === 'warning') {
        setOpenOverwrite(true);
        setManagerIsConfirming(false);
      } else if (error?.response?.data?.type === 'error') {
        setNotOverwrite(true);
        setManagerIsConfirming(false);
      }
      setLoading(false);
    }
  };

  const handleOnReject = async () => {
    let docId = aiPrediction?.docId || aiPrediction?.documentName;

    const { revisionDate, ...data } = confirmationFields;
    console.log({ ...data }, sendFormattedDate);

    setLoading(true);

    try {
      await confirmFile({
        projectId,
        id: encodeURIComponent(docId),
        values: {
          revisionDate: sendFormattedDate,
          status: 'Rejected',
          ...data,
        },
      }).then((res) => {
        console.log(res);
        updateConfirmedFile(res);
        setIsBeingRejected(false);
        handleModalClose();
        setLoading(false);
      });
    } catch (error) {
      if (error?.response?.data?.type === 'warning') {
        setOpenOverwrite(true);
        setIsBeingRejected(false);
      } else if (error?.response?.data?.type === 'error') {
        setNotOverwrite(true);
        setIsBeingRejected(false);
      }
      setLoading(false);
    }
  };

  const handleDeleteFile = async () => {
    let docId = encodeURIComponent(fileData?.docId || fileData?.documentName);

    setLoading(true);

    try {
      await deleteFile({ docName: docId, projectId }).then((res) => {
        console.log(res);
        setIsBeingDeleted(false);
        updateDeletedFile(docId);
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

  const closeIsBeingDeleted = () => {
    setIsBeingDeleted(true);
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
        <CloseIcon />
      </IconButton>
      <div className={styles.container}>
        <div className={styles.docViewer}>
          <DocViewer
            projectId={projectId}
            prediction={aiPrediction?.prediction}
            doc={aiPrediction?.documentName || aiPrediction?.docId}
          />
        </div>

        <div className={styles.form}>
          <form action="">
            <FileConfirmationForm
              zoneOptions={zoneOptions}
              levelOptions={levelOptions}
              disciplineOptions={disciplineOptions}
              dateOptions={dateOptions}
              handleTitleChange={handleTitleChange}
              disciplines={confirmationFields.discipline}
              handleInputChange={handleInputChange}
              handleDisciplineChange={handleDisciplineChange}
              handleDateChange={handleDateChange}
              docNumber={confirmationFields.documentNumber}
              docTitle={confirmationFields.title}
              docRevision={confirmationFields.revision}
              revisionDate={confirmationFields.revisionDate}
              revisionDescription={confirmationFields.description}
              level={confirmationFields.level}
              zone={confirmationFields.zone}
              discipline={confirmationFields.discipline}
              predictionData={aiPrediction}
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
        isBeingDeleted={isBeingDeleted}
        closeIsBeingDeleted={closeIsBeingDeleted}
        handleDeleteFile={handleDeleteFile}
        title={aiPrediction?.title ? aiPrediction?.title[0] : fileData?.title}
        revision={
          aiPrediction?.revision
            ? aiPrediction?.revision[0]
            : fileData?.revision
        }
        newFile={newFile}
        handleOverwriteConfirm={handleOverwriteConfirm}
        confirmChange={confirmChange}
        handleConfirmChange={handleConfirmChange}
        handleNotOverwrittable={handleNotOverwrittable}
        handleConfirmClose={handleConfirmClose}
        loading={loading}
        confirmCloseModal={confirmClose}
        onClose={confirmCloseModal}
        keepOnWindow={() => setConfirmCloseModal(false)}
        onCloseWindow={onExit}
        managerIsConfirming={managerIsConfirming}
        onManagerConfirmInformation={onManagerConfirmInformation}
        closeManagerConfirm={closeManagerConfirm}
      />
    </Dialog>
  );
};

export default FileConfirmation;
