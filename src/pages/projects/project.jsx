import { Checkbox, CircularProgress } from '@material-ui/core';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  FiChevronDown,
  FiChevronUp,
  FiUpload,
  FiArrowLeft,
} from 'react-icons/fi';
import { Skeleton } from '@material-ui/lab';

import MemberList from '../../components/projectsModal/function/member-list';
import { ReactComponent as CheckboxChecked } from '../../components/icons/projectCheckboxChecked.svg';
import { ReactComponent as CheckboxDefault } from '../../components/icons/projectCheckboxDefault.svg';
import { ReactComponent as PDFFile } from '../../components/icons/pdfFile.svg';
import { ReactComponent as FileTypeFilter } from '../../components/icons/typeFilter.svg';
import { ReactComponent as StatusIcon } from '../../components/icons/statusFilter.svg';
import { ReactComponent as DisciplineIcon } from '../../components/icons/disciplineIcon.svg';
import MoreDetails from '../../components/project-details-modal';
import { ReactComponent as ArrowUp } from '../../components/icons/arrowUp.svg';

import RelativeDate from '../../utils/relativeDate';
import { getProject } from '../../store/actions/projects';
import {
  searchProjectFiles,
  searchMatchingProjectFiles,
  searchProjectRivisionHistories,
} from '../../store/actions/files';
import { CLEAR_FILES } from '../../store/types';
import { getAllComments, getPriority } from '../../services/tasks';
import { deleteDocument, getProjectMembers } from '../../services/projects';

import StarsAction from '../../components/starsAction';
import Table from '../../components/table';
import Card from '../../components/card';
import Status from '../../components/status';
import Avatar from '../../components/avatar';
import TaskComments from '../../components/comment';
import MoreMenu from '../../components/projectFile/function/more-menu';
import NewFileUploadModal from '../../components/projectFile/newFileUploadModal';
import Button from '../../components/button';
import MultiSelectOptions from '../../components/multiSelectOptions';

import projectStyles, { FileViewContainer } from './styles';
import {
  downloadFile,
  getAIPrediction,
  getFileFilters,
  searchDocumentMetaData,
  searchFiles,
  searchMatchingFiles,
  searchOldDocumentMetaData,
} from '../../services/files';
import TableSearch from '../../components/tableFilters/searchInput/searchInput';
import TextDisplay from '../../components/textDisplay';
import { format } from 'date-fns';

import Breadcrumb from '../../components/breadcrumb';
import TypeFilter from '../../components/filesFilters/typeFilter';
import DateFilter from '../../components/projectTableFilters/dateFilter';
import PriorityButton from '../../components/tableFilters/filterButton/priorityButton';
import StatusFilter from '../../components/projectTableFilters/statusFilter';
import DisciplineFilter from '../../components/filesFilters/disciplineFilter';
import { toast } from 'react-toastify';
import Dialog from '../../components/fileDialogs';
import FileConfirmation from '../../components/fileConfirmation';
import Labels from '../../components/labels';
import EditFile from '../../components/editFile';
import fileDataIcons from '../../utils/fileDataIcons';

// import Labels from '../../components/labels';

const Project = () => {
  const dispatch = useDispatch();
  const { project } = useSelector((state) => state.projects);
  const [files, setFiles] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [members, setMembers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [onLoad, setOnLoad] = useState(false);
  const [expanded, setExpanded] = useState({});

  const [status, setStatus] = useState('');
  const [fileTitle, setFileTitle] = useState('');
  const [getFilters, setGetFilters] = useState(true);
  const [statusOptions, setStatusOptions] = useState([]);
  const [disciplineOptions, setDisciplineOptions] = useState([]);
  const [fileTypeOptions, setFileTypeOptions] = useState([]);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [openEditFileModal, setOpenEditFileModal] = useState(false);
  const [confirmationFileId, setConfirmationFileId] = useState();
  const [fileData, setFileData] = useState();
  const [aiPrediction, setAiPrediction] = useState();
  const [projectManager, setProjectManager] = useState('');

  const [searchValue, setSearchValue] = useState('');
  const [type, setType] = useState();
  const [revisionRange, setRevisionRange] = useState([null, null]);
  const [formatedRevisionRange, setFormatedRevisionRange] = useState([
    null,
    null,
  ]);
  const [revisionStartDate, revisionEndDate] = revisionRange;
  const [formatedStartRevisionDate, formatedEndRevisionDate] =
    formatedRevisionRange;
  const [priority, setPriority] = useState();
  const [searchStatus, setSearchStatus] = useState();
  const [discipline, setDiscipline] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowsResults, setSelectedRowsResults] = useState([]);
  const [multipleDeleteLoading, setMultipleDeleteLoading] = useState(false);
  const [isBeingMultipleDeleted, setIsBeingMultipleDeleted] = useState(false);

  const styles = projectStyles();
  const { id } = useParams();

  const onSelectSuggestion = (event, { suggestion }) => {
    setSearchValue(suggestion);
    setPriority();
    setType();
    setDiscipline();
    setLoading(true);
  };

  const onSelectRange = (update) => {
    let formatedStartDate = update[0].toLocaleDateString('en-CA');
    let formatedEndDate;
    if (update[1] !== undefined || null) {
      formatedEndDate = update[1]?.toLocaleDateString('en-CA');
    }
    setFormatedRevisionRange([formatedStartDate, formatedEndDate]);
    if (
      formatedRevisionRange[0] !== null &&
      formatedRevisionRange[1] !== null
    ) {
      setLoading(true);
    }
    setRevisionRange(update);
  };

  const unselectRange = () => {
    setRevisionRange([null, null]);
    setFormatedRevisionRange([null, null]);
    setLoading(true);
  };

  const onSelectFileType = (value) => {
    setType(value);
    setLoading(true);
  };

  const unselectFileType = () => {
    setType();
    setLoading(true);
  };

  const selectPriority = (priority) => {
    setPriority(priority);
    setLoading(true);
  };

  const unselectPriority = () => {
    setPriority();
    setLoading(true);
  };

  const selectStatus = (value) => {
    setSearchStatus(value);
    setLoading(true);
  };

  const unselectStatus = () => {
    setSearchStatus();
    setLoading(true);
  };

  const selectDiscipline = (value) => {
    setDiscipline(value);
    setLoading(true);
  };

  const unselectDiscipline = () => {
    setDiscipline();
    setLoading(true);
  };

  useEffect(() => {
    setOnLoad(true);

    let revisionDate;
    if (
      formatedStartRevisionDate !== null &&
      formatedEndRevisionDate !== null
    ) {
      revisionDate = `${formatedStartRevisionDate}--${formatedEndRevisionDate}`;
    }
    if (getFilters) {
      dispatch(getProject({ projectId: id }));
    }
    searchFiles({
      limit: 80,
      projectId: id,
      status: !searchStatus ? '!=' : searchStatus,
      discipline,
      priority,
      revisionDate,
      type,
      search: searchValue,
    })
      .then((res) => {
        setFiles(res);
        if (getFilters) {
          setAllFiles(res);
          getFileFilters({ projectId: id }).then((filters) => {
            setStatusOptions(filters.status);
            setDisciplineOptions(filters.discipline);
            setFileTypeOptions(filters.type);
            setGetFilters(false);
          });
        }
        setLoading(false);
        setOnLoad(false);
      })
      .catch((err) => {
        setOnLoad(false);
        setLoading(false);
        // toast.error(
        //   'An error has occured in the platform, please wait or contact your manager.'
        // );
      });
    // }
    getProjectMembers({ projectId: id }).then((res) => {
      setMembers(res.users);
    });
    return () => {
      dispatch({
        type: CLEAR_FILES,
      });
    };
  }, [loading]);

  const onSearchChange = (event, { newValue }) => {
    setSearchValue(newValue);
    setPriority();
    setType();
    setDiscipline();
    setTimeout(() => {
      setLoading(true);
    }, 1500);
  };

  const onOpenEditFileModal = async (docId, fileData, ownerId) => {
    await getAIPrediction({
      projectId: id,
      id: encodeURIComponent(fileData?.aiReference.nanonet),
    }).then((res) => {
      setAiPrediction(res);
      setFileData(fileData);
      setConfirmationFileId(docId);
      setProjectManager(ownerId);
      setOpenEditFileModal(true);
    });
  };

  const onOpenConfirmationModal = async (docId, fileData, ownerId) => {
    await getAIPrediction({
      projectId: id,
      id: encodeURIComponent(fileData?.aiReference.nanonet),
    }).then((res) => {
      setAiPrediction(res);
      setFileData(fileData);
      setConfirmationFileId(docId);
      setProjectManager(ownerId);
      setOpenConfirmationModal(true);
    });
  };

  const updateConfirmedFile = (res) => {
    setFiles((previous) =>
      previous.map((file) =>
        file.documentName === res.documentName ? res : file
      )
    );
  };

  const updateDeletedFile = (docId) => {
    setFiles((previous) =>
      previous.filter(
        (file) =>
          file.docId !== decodeURIComponent(docId) &&
          file.documentName !== decodeURIComponent(docId)
      )
    );
  };

  const handleModalClose = () => {
    setOpenConfirmationModal(false);
    setOpenEditFileModal(false);
  };

  const fileNotOverwrittable = () => {
    handleModalClose();
    setIsModalOpen(true);
  };

  const IndeterminateCheckbox = forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = useRef();
      const resolvedRef = ref || defaultRef;

      useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return (
        <>
          <Checkbox
            className={styles.checkbox}
            icon={<CheckboxDefault />}
            checkedIcon={<CheckboxChecked />}
            ref={resolvedRef}
            {...rest}
          />
        </>
      );
    }
  );

  const columns = useMemo(
    () => [
      {
        id: 'selection',
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <div>
            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
          </div>
        ),
        Cell: ({ row }) => (
          <div>
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          </div>
        ),
        collapse: true,
      },
      {
        Header: () => (
          <span className={styles.dueHeader}>
            Uploaded <ArrowUp />
          </span>
        ),
        accessor: 'creationTime',
        Cell: ({ cell: { value } }) => (
          <>{value ? <RelativeDate date={value} /> : null}</>
        ),
        collapse: true,
      },
      {
        Header: 'No',
        accessor: 'documentNumber',
        collapse: true,
        Cell: ({ cell: { value } }) => (
          <TextDisplay charNumber={6} text={value} />
        ),
      },
      {
        Header: 'Type',
        accessor: 'type',
        collapse: true,
        Cell: ({ cell: { value } }) => (
          <span className={styles.icons}> {fileDataIcons(value)} </span>
        ),
      },
      {
        Header: 'Title',
        accessor: 'title',
        Cell: ({ cell: { value } }) => (
          <TextDisplay charNumber={12} text={value} />
        ),
      },
      {
        Header: 'Revision',
        accessor: 'revision',
        collapse: true,
      },
      {
        Header: 'Revision Date',
        accessor: 'revisionDate',
        collapse: true,
        Cell: ({ cell: { value } }) => (
          <>
            {value ? (
              <span>{format(new Date(value), 'dd MMM yy')} </span>
            ) : (
              <span>-</span>
            )}
          </>
        ),
      },
      {
        Header: 'Revision Description',
        accessor: 'description',
        collapse: true,
        Cell: ({ cell: { value } }) => (
          <>
            {value ? (
              <TextDisplay charNumber={25} text={value} />
            ) : (
              <span>-</span>
            )}
          </>
        ),
      },
      {
        Header: 'Label',
        accessor: 'label',
        collapse: true,
        Cell: ({ cell: { row } }) => {
          return (
            <>
              {row.original?.status !== 'Confirm Data' &&
                row.original?.status !== 'Processing' && (
                  <Labels
                    projectId={row.original?.projectId}
                    docName={row.original?.docId || row.original?.documentName}
                    labelsObj={
                      row.original?.labels?.labelsObj
                        ? row.original?.labels?.labelsObj
                        : []
                    }
                  />
                )}
            </>
          );
        },
      },
      {
        Header: 'Priority',
        accessor: 'priority',
        collapse: true,
        Cell: ({ cell: { value, row } }) => {
          return (
            <>
              {row.original?.status !== 'Confirm Data' &&
                row.original?.status !== 'Processing' && (
                  <StarsAction
                    priority={value}
                    taskType={'file'}
                    projectId={row.original?.projectId}
                    docName={row.original?.docId || row.original?.documentName}
                  />
                )}
            </>
          );
        },
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ row }) => (
          <Status
            openConfirmationModal={() =>
              onOpenConfirmationModal(
                row.original?.title ||
                  row.original?.docId ||
                  row.original?.documentName,
                row.original,
                project?.ownerId
              )
            }
            openEditFileModal={() =>
              onOpenEditFileModal(
                row.original?.docId ||
                  row.original?.documentName ||
                  row.original?.title,
                row.original,
                project?.ownerId
              )
            }
            status={row.original?.status}
          />
        ),
        collapse: true,
      },
      {
        Header: () => null,
        collapse: true,
        id: 'expander',
        Cell: ({ row }) =>
          row.original?.status !== 'Confirm Data' &&
          row.original?.status !== 'Processing' ? (
            <button className="table-expand" onClick={() => onExpandClick(row)}>
              <span
                className="table-arrow"
                {...row.getToggleRowExpandedProps()}
              >
                {row.isExpanded ? <FiChevronUp /> : <FiChevronDown />}
              </span>
            </button>
          ) : null,
      },
    ],
    []
  );

  const onExpandClick = async (row) => {
    const projectId = row.original.projectId;
    const commentOn = 'file';
    const commentOnId = row.original.docId;
    const total = 2;

    const docName = row.original.docId
      ? row.original.docId
      : encodeURIComponent(row.original.documentName);

    if (!row.isExpanded) {
      await searchDocumentMetaData({
        projectId,
        docName,
      }).then(async (res) => {
        row.original = res;

        await getAllComments({
          projectId,
          commentOn,
          commentOnId,
          total,
        }).then((res) => {
          setFiles((previous) =>
            previous.map((file) => {
              if (row.original.docId) {
                if (file.docId === row.original.docId) file.comments = res;
              } else {
                if (file.documentName === row.original.documentName)
                  file.comments = res;
              }
              return file;
            })
          );
          row.toggleRowExpanded();
        });
      });
    } else {
      setFiles((previous) =>
        previous.map((file) => {
          if (row.original.docId) {
            if (file.docId === row.original.docId && file.comments)
              delete file.comments;
          } else {
            if (
              file.documentName === row.original.documentName &&
              file.comments
            )
              delete file.comments;
          }
          return file;
        })
      );
    }
  };

  const onHandleSearchMatchingFiles = async (row) => {
    if (!row.level && !row.zone) {
      setStatus('matching');
      setFiles([]);
      setFileTitle(row.title);
    } else {
      const level = row.level;
      const zone = row.zone;
      const projectId = row.projectId;
      const docId = row.docId;
      const documentName = row.documentName;
      await searchMatchingFiles({
        level,
        zone,
        projectId,
        docId,
        documentName,
      }).then((res) => {
        setStatus('matching');
        setFiles(
          res.filter((file) => {
            return file.documentName !== row.documentName;
          })
        );
        setFileTitle(row.title);
      });
    }
  };

  const onHandleSearchRivisionHistory = async (projectId, docName, title) => {
    try {
      await searchOldDocumentMetaData({ projectId, docName }).then((res) => {
        setStatus('rivision');
        setFiles(res);
        setFileTitle(title);
      });
    } catch (e) {
      setStatus('rivision');
      setFiles([]);
      setFileTitle(title);
    }
  };

  const onProjectDelete = (row) => {
    setIsBeingMultipleDeleted(true);
    setSelectedRowsResults([row]);
  };

  const onHandleFileDownload = async (projectId, docName, fileName) => {
    await downloadFile({ projectId, docName }).then((res) => {
      const downloadUrl = window.URL.createObjectURL(new Blob([res]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', fileName); //any other extension
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
  }

  const renderSubRowComponent = useCallback(({ row }) => {
    const docName = row.original.docId
      ? encodeURIComponent(row.original.docId)
      : encodeURIComponent(row.original.documentName);

    return (
      <FileViewContainer>
        {row.original.comments ? (
          <>
            <div className="detail-content">
              <div className="row-content">
                <div className="title">File:</div>
                <div className="content">
                  <span>{row.original.fileName}</span>
                  <div className="sub-content">
                    <div className="sub-title">Type:</div>
                    <div className="sub-content-detail">
                      <PDFFile className={styles.fileType} />
                      {row.original.type}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row-content">
                <div className="title">Level:</div>
                <div className="content">
                  <span>
                    {row.original.level ? row.original.level : 'No Level'}
                  </span>
                  <div className="sub-content">
                    <div className="sub-title">Area :</div>
                    <div className="sub-content-detail">
                      {row.original.zone ? row.original.zone : 'No Zone'}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row-content">
                <div className="title">Discipline:</div>
                <div className="content">
                  {row.original.discipline === undefined ||
                  row.original.discipline?.length === 0
                    ? 'No Disciplines'
                    : row.original.discipline?.map((item, index) => {
                        if (index < row.original.discipline?.length - 1) {
                          return item + ', ';
                        } else {
                          return item;
                        }
                      })}
                </div>
              </div>
              <div className="row-content">
                <div className="title">Uploaded by:</div>
                <div className="content">
                  <div className="creator-avatar">
                    {row.original.uploadedBy === 'system' ||
                    row.original.uploadedBy === undefined ? (
                      'System'
                    ) : row.original.uploadedByDetails === null ||
                      row.original.uploadedByDetails === undefined ? (
                      row.original.uploadedBy
                    ) : (
                      <>
                        <Avatar
                          userDetails={row.original.uploadedByDetails}
                          width={24}
                          height={24}
                          fontSize="0.75rem"
                        />
                        <span>
                          {row.original.uploadedByDetails.firstName}{' '}
                          {row.original.uploadedByDetails.lastName}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="row-content">
                <div className="title">Reviewed by:</div>
                <div className="content">
                  <div className="creator-avatar">
                    {row.original.status === undefined ||
                    row.original.status === 'Processing' ||
                    row.original.status === 'Confirm Data' ||
                    row.original.status === 'Pending for Review' ? (
                      ''
                    ) : row.original.reviewedByDetails === undefined ||
                      row.original.reviewedByDetails === null ? (
                      ''
                    ) : (
                      <>
                        <Avatar
                          userDetails={row.original.reviewedByDetails}
                          width={24}
                          height={24}
                          fontSize="0.75rem"
                        />
                        <span>
                          {row.original.reviewedByDetails.firstName}{' '}
                          {row.original.reviewedByDetails.lastName}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="row-content">
                <div className="title">Comments:</div>
                <div className="content">
                  <TaskComments row={row.original} />
                </div>
              </div>
            </div>
            <div className="files-action-content">
              <div className="files-action-icons">
                <MoreMenu
                  row={row.original}
                  onSearchMatchingFiles={() =>
                    onHandleSearchMatchingFiles(row.original)
                  }
                  onSearchRivisionHistory={() =>
                    onHandleSearchRivisionHistory(
                      row.original.projectId,
                      docName,
                      row.original.title
                    )
                  }
                  onProjectDelete={() =>
                    onProjectDelete(row.original)
                  }
                />
              </div>
              <div className="files-action-btns">
                <Link to="#" className="files-action-goto-file">
                  View in browser
                </Link>
                <div
                  className="files-action-see-summary"
                  onClick={() =>
                    onHandleFileDownload(
                      row.original.projectId,
                      docName,
                      row.original.fileName
                    )
                  }
                >
                  <Button background="#FF8A47" primarySmall color="#ffffff">
                    Download file
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.skeletonContainer}>
            <div className={styles.topSkeleton}>
              <Skeleton
                width="100%"
                height="1.5rem"
                animation="wave"
                variant="text"
              />
              <div>
                <Skeleton
                  width="1.5rem"
                  height="1.5rem"
                  animation="wave"
                  variant="circle"
                />
              </div>
            </div>
            <div className={styles.topSkeleton}>
              <Skeleton
                width="1.5rem"
                height="1.5rem"
                animation="wave"
                variant="circle"
              />
              <Skeleton
                width="20%"
                height="1.5rem"
                animation="wave"
                variant="text"
              />
            </div>
            <div className={styles.topSkeleton}>
              <Skeleton
                width="60%"
                height="1.5rem"
                animation="wave"
                variant="text"
              />
            </div>
            <div className={styles.editorSkeleton}>
              <Skeleton height="6.6875rem" animation="wave" variant="rect" />
            </div>
          </div>
        )}
      </FileViewContainer>
    );
  }, []);

  const handleUploadSuccess = (response) => {
    const index = files.findIndex(
      (file) => file.documentName === response.documentName
    );

    if (index !== -1) {
      setFiles(
        files.map((file, id) => {
          if (index === id) {
            return response;
          }
          return file;
        })
      );
    } else {
      setFiles((file) => [...file, response]);
    }
  };

  const handleBackToProject = () => {
    setStatus('');
    setFileTitle('');
    setLoading(true);
  };

  const handleSelectedItemsDownload = () => {
    const fetchRows = async () => {
      for (let i = 0; i < selectedRowsResults.length; i++) {
        const projectId = selectedRowsResults[i].projectId;
        const docName = selectedRowsResults[i].docId
          ? encodeURIComponent(selectedRowsResults[i].docId)
          : encodeURIComponent(selectedRowsResults[i].documentName);
        const title = selectedRowsResults[i].fileName;

        await onHandleFileDownload(projectId, docName, title);
      }
    }
    fetchRows().then(() => {
      tableRef.current.validate();
    });
  }

  const handleSelectedItemsDelete = () => {
    setIsBeingMultipleDeleted(true);
  }

  const closeIsBeingMultipleDeleted = () => {
    setIsBeingMultipleDeleted(false);
  }

  const handleDeleteMultipleFiles = () => {
    setMultipleDeleteLoading(true);
    const fetchDelete = async () => {
      for (let i = 0; i < selectedRowsResults.length; i++) {
        const projectId = selectedRowsResults[i].projectId;
        const docName = selectedRowsResults[i].docId
          ? encodeURIComponent(selectedRowsResults[i].docId)
          : encodeURIComponent(selectedRowsResults[i].documentName);

        await deleteDocument({ projectId, docName }).then(() => {
          updateDeletedFile(docName);
        }).catch((err) => {
          err.response.data.msg ? toast.error(err.response.data.msg) : toast.error(err.response.data);
        });
      }
    }

    fetchDelete().then(() => {
      setMultipleDeleteLoading(false);
      setIsBeingMultipleDeleted(false);
    });
  }

  const tableRef = useRef('');

  const handleMultipleSelectCancel = () => {
    tableRef.current.validate();
  }

  const handleSelectedRows = (rows) => {
    setSelectedRows(rows);
    setSelectedRowsResults(rows);
  }

  return (
    <>
      <>
        {status === '' ? (
          <>
            <Breadcrumb
              firstLink="/projects"
              firstLinkText="My Projects"
              secondLink="/projects"
              secondLinkText={project.name}
            />
            <div className={styles.headerContainer}>
              <div className={styles.projectInfo}>
                <h1>{project.name}</h1>
                <span>{project.number}</span>
              </div>
              <MoreDetails row={project} />
              <MemberList members={members} />
            </div>
            <div className={styles.chartWrapper}>
              <div className={styles.healthMeter}>
                <h3>Health Meter</h3>
                <p>No Data</p>
              </div>
              <div className={styles.filesToReview}>
                <h3>Files to Review</h3>
                <p>No Data</p>
              </div>
              <div className={styles.priorityFiles}>
                <h3>My Priority Files</h3>
                <p>No Data</p>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.backToProject} onClick={handleBackToProject}>
            <FiArrowLeft />
            <h3>Back to {project.name}</h3>
          </div>
        )}
        <Card>
          <div className={styles.topRow}>
            <h1>
              {status === 'matching' ? (
                <>Files matching with {fileTitle}</>
              ) : status === 'rivision' ? (
                <>Revisions of file {fileTitle}</>
              ) : (
                <>Project Files</>
              )}
            </h1>
            {status === '' && (
              <Button
                primarySmall
                background="#FF8A47"
                onClick={() => setIsModalOpen(true)}
              >
                <FiUpload /> Upload Files
              </Button>
            )}
          </div>
          {files.length > 0 ? (
            <div className={styles.searchAndFilters}>
              <TableSearch
                onSelectSuggestion={onSelectSuggestion}
                data={allFiles}
                placeholder="Search for Files..."
                searchValue={searchValue}
                onChange={onSearchChange}
              />
              <TypeFilter
                current="File Type"
                icon={<FileTypeFilter />}
                options={fileTypeOptions}
                onClick={onSelectFileType}
                unselectType={unselectFileType}
                selectedType={type}
              />

              <DateFilter
                onSelectRange={onSelectRange}
                startRange={revisionStartDate}
                endRange={revisionEndDate}
                selectedRange={revisionRange}
                unselectRange={unselectRange}
              />
              <PriorityButton
                current="Priority"
                selectPriority={selectPriority}
                selectedPriority={priority}
                unselectPriority={unselectPriority}
              />

              <StatusFilter
                selectedStatus={searchStatus}
                options={statusOptions}
                onClick={selectStatus}
                unselectStatus={unselectStatus}
                current="Status"
                icon={<StatusIcon />}
              />

              <DisciplineFilter
                align="end"
                current="Discipline"
                icon={<DisciplineIcon />}
                options={disciplineOptions}
                onClick={selectDiscipline}
                unselectDiscipline={unselectDiscipline}
                selectedDiscipline={discipline}
              />
            </div>
          ) : null}
          {onLoad ? (
            <div className={styles.skeletonContainer}>
              <Skeleton animation="wave" height="2.125rem" variant="text" />
              <Skeleton animation="wave" height="2.125rem" variant="text" />
              <Skeleton animation="wave" height="2.125rem" variant="text" />
              <Skeleton animation="wave" height="2.125rem" variant="text" />
              <Skeleton animation="wave" height="2.125rem" variant="text" />
              <Skeleton animation="wave" height="2.125rem" variant="text" />
              <Skeleton animation="wave" height="2.125rem" variant="text" />
              <Skeleton animation="wave" height="2.125rem" variant="text" />
            </div>
          ) : files.length === 0 ? (
            <div className={styles.empty}>
              <span> You have no Files </span>
            </div>
          ) : (
            <Table
              ref={tableRef}
              columns={columns}
              data={files}
              expanded={expanded}
              getTrProps={(row) => {
                return {
                  className:
                    row.isSelected === true ? 'selectedRow' :
                      row.original.status === 'Completed'
                        ? 'completedRow'
                        : row.index % 2 === 0
                        ? 'standardRow'
                        : 'whiteRow',
                };
              }}
              getSelectedRows={(rows) => handleSelectedRows(rows)}
              renderSubRowComponent={renderSubRowComponent}
            />
          )}
        </Card>
      </>

      {isModalOpen && (
        <NewFileUploadModal
          open={isModalOpen}
          handleFileModalClose={() => setIsModalOpen(false)}
          handleUploadSuccess={handleUploadSuccess}
          projectId={id}
        />
      )}
      {openEditFileModal && (
        <EditFile
          open={openEditFileModal}
          id={confirmationFileId}
          projectId={id}
          aiPrediction={aiPrediction}
          fileData={fileData}
          fileNotOverwrittable={fileNotOverwrittable}
          updateEditedFile={updateConfirmedFile}
          handleModalClose={handleModalClose}
          updateDeletedFile={updateDeletedFile}
          projectManager={projectManager}
        />
      )}
      {openConfirmationModal && (
        <FileConfirmation
          open={openConfirmationModal}
          id={confirmationFileId}
          projectId={id}
          aiPrediction={aiPrediction}
          fileData={fileData}
          fileNotOverwrittable={fileNotOverwrittable}
          updateConfirmedFile={updateConfirmedFile}
          handleModalClose={handleModalClose}
          updateDeletedFile={updateDeletedFile}
          projectManager={projectManager}
        />
      )}
      {selectedRows.length > 0 && (
        <MultiSelectOptions
          type="file"
          cancelAll={handleMultipleSelectCancel}
          onDownload={handleSelectedItemsDownload}
          onDelete={handleSelectedItemsDelete}
          items={selectedRows}
        />
      )}
      {isBeingMultipleDeleted && (
        <Dialog
          multipleDeleteLength={selectedRowsResults.length}
          loading={multipleDeleteLoading}
          isBeingMultipleDeleted={isBeingMultipleDeleted}
          closeIsBeingMultipleDeleted={closeIsBeingMultipleDeleted}
          handleDeleteMultipleFiles={handleDeleteMultipleFiles}
        />
      )}
    </>
  );
};

export default Project;
