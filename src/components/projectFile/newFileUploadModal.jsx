import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { CgFileDocument } from 'react-icons/cg';
import { FiFile, FiUpload } from 'react-icons/fi';
import ReactTooltip from 'react-tooltip';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import axios from 'axios';
import moment from 'moment';

import { searchDocumentMetaData, uploadFile } from '../../services/files';

import Button from '../../components/button';

import Dropdown from './dropdown';

import {
  fileUploadModalStyles,
  FileUploadContainer,
  acceptStyle,
  activeStyle
} from './uploadmodal-style';

function NewFileUploadDialog(props) {
  const classes = fileUploadModalStyles();
  const [status, setStatus] = useState('');
  const [conflictCount, setConflictCount] = useState(0);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0)

  const currentUser = useSelector((state) => state.auth.profile);
  const [files, setFiles] = useState([]);

  const docTypeValues = [
    {
      icon: <AiOutlineFilePdf />,
      text: 'Engineering Drawing',
      value: 'Drawing',
    },
    { icon: <CgFileDocument />, text: 'Engineering Report', value: 'Document' },
    { icon: <FiFile />, text: 'Other', value: 'Other' },
  ];

  const { id } = useParams();

  const preparingDisable = Boolean(
    status !== 'ready' ||
    conflictCount !== 0
  );

  const doneDisable = Boolean(
    status !== 'done' ||
    failedCount !== 0
  );

  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      file.status = 'preparing';
      file.doctype = {};
      file.overwrite = false;
      file.checked = false;
    });

    if (status !== '') {
      acceptedFiles = acceptedFiles.filter(file => {
        let pos = files.findIndex(item => item.name === file.name);
        if (pos !== -1) toast.error(file.name + ' exist!');
        return pos === -1;
      });
      setFiles(prev => [...prev, ...acceptedFiles]);
    } else {
      setFiles(acceptedFiles);
    }

    setStatus('preparing');

    const callExisting = async () => {
      for (let i = 0; i < acceptedFiles.length; i++) {
        await handleFileExisting(acceptedFiles[i]);
      }
    };

    callExisting().then(() => {
      setStatus('ready');
    });
  };

  const handleFileExisting = async (file) => {
    const projectId = id;
    const docName = encodeURIComponent(
      projectId + '/' + file.name.replace(/ /g, '_')
    );

    await searchDocumentMetaData({ projectId, docName }).then(() => {
      setFiles((previous) =>
        previous.map((val) => {
          if (val.name === file.name) val.status = 'exist';
          return val;
        })
      );
      setConflictCount(prev => prev + 1);
    }).catch((err) => {
      if (err.response.status === 404) {
        setFiles((previous) =>
          previous.map((val) => {
            if (val.name === file.name) val.status = 'ready';
            return val;
          })
        );
      } else {
        setFiles((prev) =>
          prev.map((val) => {
            if (val.name === file.name) val.status = 'exist_error';
            return val;
          })
        );
        setConflictCount(prev => prev + 1);
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error(err.message);
        }
      }
    });
  };

  const handleUploadFile = async (file) => {
    const projectId = id;
    const type = file.doctype.value ? file.doctype.value : '';
    const overwrite = file.overwrite ? 'yes' : 'no';

    let cancelTokenSource = axios.CancelToken.source();
    setFiles((prev) =>{
      return prev.map((item) => {
        if (item.name === file.name) item.cancelToken = cancelTokenSource;
        file.status = 'uploading';
        return item;
      });
    });

    return await uploadFile(
      { projectId, file, type, overwrite },
      (event) => {
        setFiles((prev) =>{
          return prev.map((item) => {
            if (item.name === file.name) item.progress = Math.round((100 * event.loaded) / event.total);
            return item;
          });
        });
      },
      cancelTokenSource
    ).then((res) => {
      res['creationTime'] = moment().toISOString();
      res['updationTime'] = moment().toISOString();
      res['uploadedBy'] = currentUser.username;
      res['uploadedByDetails'] = currentUser;

      setUploadedCount(prev => prev + 1);
      setFiles((prev) =>{
        return prev.map((item) => {
          if (item.name === file.name) {
            item.status = 'done'
          }
          return item;
        });
      });
      toast.success('File upload success.');
      props.handleUploadSuccess(res);
    }).catch((err) => {
      if (!err.response) {
        toast.error(err.message);
        return 'cancel';
      }
      if (err.response.status === 500) {
        setFailedCount(prev => prev + 1);
        setFiles((prev) =>{
          return prev.map((item) => {
            if (item.name === file.name) {
              item.status = 'fail';
              item.progress = 0;
            }
            return item;
          });
        });
        toast.success('Document is not ready yet!');
      }
    });
  };

  const handleUploadFiles = () => {
    setStatus('uploading');
    const callUpload = async () => {
      for (let i = 0; i < files.length; i++) {
        if (files[i].status !== 'done')
          await handleUploadFile(files[i]);
      }
    };
    callUpload().then(() => {
      setStatus('done');
    });
  };

  const handleUploadCancel = (file) => {
    if (file.cancelToken) {
      file.cancelToken.cancel('Upload Cancel');
      setFiles((prev) =>{
        return prev.map((item) => {
          if (item.name === file.name) {
            item.progress = 0;
            item.status = 'ready';
          }
          return item;
        });
      });

      return;
    }

    if (status === 'preparing' || status === 'uploading') {
      toast.error("Can't delete during processing!");
      return;
    }

    if (file.status === 'exist') setConflictCount(prev => prev - 1);
    if (file.status === 'fail') setFailedCount(prev => prev - 1);
    setFiles(prev => prev.filter((item) => item.name !== file.name));
  };

  const changeSetAll = (item) => {
    if (item.checked) {
      setFiles(prev =>
        prev.map((file) => {
          file.checked = false;
          return file;
        })
      )
    } else {
      setFiles(prev =>
        prev.map((file) => {
          item.name !== file.name ? file.checked = false : file.checked = true;
          file.doctype = item.doctype;
          return file;
        })
      )
    }
  }

  const changeDropdown = (item, file) => {
    setFiles((previous) =>
      previous.map((val) => {
        if (file.checked || (!file.checked && val.name === file.name)) {
          val.doctype = item;
        }

        return val;
      })
    );
  }

  const handleFileOverwrite = (file) => {
    setFiles((prev) =>
      prev.map((val) => {
        if (val.name === file.name) {
          val.status = 'ready';
          val.overwrite = true;
        }
        return val;
      })
    );
    setConflictCount(prev => prev - 1);
  }

  const handleFileUploadRetry = async (file) => {
    setStatus('uploading');
    await handleUploadFile(file);
    setFailedCount(prev => prev - 1);
    setStatus('done');
  }

  const handleUploadFilesRetryAll = () => {
    setStatus('uploading');

    const failedFiles = files.filter((item) => {
      return item.status === 'fail';
    });

    const callUpload = async () => {
      for (let i = 0; i < failedFiles.length; i++) {
        await handleUploadFile(failedFiles[i]);
        setFailedCount(prev => prev - 1);
      }
    };
    callUpload().then(() => {
      setStatus('done');
    });
  }

  const acceptedFileItems = files.map((file, index) => (
    <div className="item" key={index}>
      <div className={`progress ${(file.status === 'uploading' || file.status === 'done') ? 'progress-active' : file.status === 'exist' ? 'progress-exist' : file.status === 'fail' ? 'progress-fail' : ''}`}>
        <div className="status" style={{width : file.progress + '%'}}>
          <div className="info">
            <span>
              {file.path.length <= 20 ?
                file.path
                : file.path.substring(0, 16) + '·····.' + file.path.substring(file.path.lastIndexOf('.') + 1)
              }
            </span>
            {file.status === 'preparing' && (
              <span className="preparing">Preparing file for upload...</span>
            )}
            {file.status === 'exist' && (
              <div>
                <span>File already exists.</span>
                <button className="action-button" type="button" onClick={() => handleFileOverwrite(file)}>
                  Overwrite
                </button>
              </div>
            )}
            {file.status === 'fail' && (
              <div>
                <span>Failed to upload file.</span>
                <button className="action-button" type="button" onClick={() => handleFileUploadRetry(file)}>
                  Retry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="action">
        {file.status === 'done' ? (
          <div className="icon check">
            <CheckIcon />
          </div>
        ) :
        file.status === 'preparing' ? (
          <div className="icon disable">
            <CloseIcon />
          </div>
        ) : (
          <div data-tip="Cancel upload" className="icon close" onClick={() => handleUploadCancel(file)}>
            <CloseIcon />
            <ReactTooltip className="cancel-tooltip" />
          </div>
          )}
      </div>
      {(file.status === 'ready' ||
        file.status === 'uploading' ||
        file.status === 'done'
      ) && (
        <div className="dropdown">
          <Dropdown
            onSetAll={(e) => changeSetAll(e)}
            current={file}
            options={docTypeValues}
            onClick={(e) => changeDropdown(e, file)}
          />
        </div>
      )}
    </div>
  ));

  const { getRootProps, getInputProps, isDragActive, isDragAccept, open } =
    useDropzone({
      onDrop,
      noClick: true,
      noKeyboard: true,
      multiple: true
    });

  const style = useMemo(
    () => ({
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
    }),
    [isDragActive, isDragAccept]
  );

  useEffect(() => {
    if (files.length === 0) setStatus('');
  }, [files]);

  return (
    <Dialog
      open={props.open}
      onClose={props.handleFileModalClose}
      classes={{ paper: classes.dialog }}
      disableEnforceFocus
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogTitle className={classes.title}>Upload files</DialogTitle>

      <DialogContent className={classes.content}>
        <FileUploadContainer>
          <input {...getInputProps()} />
          {files.length === 0 ? (
            <div className="file-upload" {...getRootProps({ style })}>
              <div className="label-content">
                <FiUpload
                  className={
                    isDragActive ? 'label-icon label-icon-active' : 'label-icon'
                  }
                />
                <span
                  className={
                    isDragActive ? 'label-text label-text-active' : 'label-text'
                  }
                >
                  Drag and drop a file or
                </span>
                <button className="label-button" type="button" onClick={open}>
                  Browse
                </button>
              </div>
            </div>
          ) : (
            <div className="file-upload-list" style={{minHeight: status === '' ? 'auto' : 220}}>
              {failedCount !== 0 && (
                <button className="retry-all" type="button" onClick={handleUploadFilesRetryAll}>
                  Retry All
                </button>
              )}

              <button className="add-more-button" type="button" onClick={open}>
                Add more files
              </button>
              {acceptedFileItems}
            </div>
          )}
        </FileUploadContainer>
      </DialogContent>

      <DialogActions className={classes.action}>
        {(status === 'preparing' || (status === 'ready' && conflictCount === 0)) && (
          <p className={classes.status}>
            {`${files.length} ${files.length > 1 ? 'files' : 'file'}`}
          </p>
        )}
        {(status === 'ready' && conflictCount !== 0) && (
          <p className={classes.status}>
            {`${conflictCount} ${conflictCount > 1 ? 'conflicts' : 'conflict'} found`}
          </p>
        )}
        {(status === 'uploading' || status === 'done') && (
          <p className={classes.status}>
            {`${uploadedCount} of ${files.length} ${files.length > 1 ? 'files ' : 'file'} uploaded`}{failedCount > 0 && `, ${failedCount} ${failedCount > 1 ? 'conflicts' : 'conflict' } found`}
          </p>
        )}
        {status !== 'done' && (
          <Button onClick={props.handleFileModalClose} textButton>
            Cancel
          </Button>
        )}
        {status === 'uploading' ?
          <Button
            disabled="true"
            primarySmall
            background="#FF8A47"
          >
            Uploading...
          </Button> :
          status === 'done' ?
            <Button
              disabled={doneDisable}
              primarySmall
              background="#FF8A47"
              onClick={() => props.handleFileModalClose()}
            >
              Done
            </Button> :
            <Button
              disabled={preparingDisable}
              primarySmall
              background="#FF8A47"
              onClick={handleUploadFiles}
            >
              Upload
            </Button>
        }
      </DialogActions>
    </Dialog>
  );
}

export default NewFileUploadDialog;
