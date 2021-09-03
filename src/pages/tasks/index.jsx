import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Checkbox } from '@material-ui/core';
import { FiFile } from 'react-icons/fi';
import { GoPlus } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

import Card from '../../components/card';
import Dropdown from '../../components/dropdown';
import Button from '../../components/button';

import { ReactComponent as CheckedCheckBox } from '../../components/icons/tasksCheckboxChecked.svg';
import { ReactComponent as EmptyCheckbox } from '../../components/icons/tasksCheckboxUnchecked.svg';
import { ReactComponent as ArrowUp } from '../../components/icons/arrowUp.svg';
import { ReactComponent as AssigneeIcon } from '../../components/icons/assigneesFilter.svg';
import {
  addTask,
  getAssignees,
  searchForTasks,
  updateSummaryTask,
  updateTask,
} from '../../store/actions/tasks';
import { getPriorities } from '../../store/actions/priorities';
import { getPriority, getSummary, deleteTask } from '../../services/tasks';

import RelativeDate from '../../utils/relativeDate';

import { ReactComponent as ChevronUp } from '../../components/icons/chevronUp.svg';
import { ReactComponent as ChevronDown } from '../../components/icons/chevronDown.svg';

import Table from '../../components/table';
import StarsAction from '../../components/starsAction';
import Avatar from '../../components/avatar';
import Breadcrumb from '../../components/breadcrumb';
import FilterButton from '../../components/tableFilters/filterButton/filterButton';
import TableSearch from '../../components/tableFilters/searchInput/searchInput';
import PriorityButton from '../../components/tableFilters/filterButton/priorityButton';
import TaskComments from '../../components/comment';
import SummaryDetail from '../../components/tasks/summary';
import BellFollow from '../../components/tasks/function/bell-follow';
import MoreMenu from '../../components/tasks/function/more-menu';

import MyTasksStyles, { TaskViewContainer } from './styles';
import { Skeleton } from '@material-ui/lab';
import Labels from '../../components/labels';
import NewTaskModal from '../../components/taskModal/NewTaskModal';
import TextDisplay from '../../components/textDisplay';
import { toast } from 'react-toastify';
import { CLEAR_FILTERED_TASKS, CLEAR_LABELS } from '../../store/types';

const MyTasks = () => {
  const { priorities } = useSelector((state) => state.priorities);
  const { assignees } = useSelector((state) => state.tasks);
  // const { username } = useSelector((state) => state.auth.profile);
  const [cookies] = useCookies(['intelme']);
  const { username } = cookies;
  const [summaryContent, setSummaryContent] = useState({});
  const [summaryContentKeywords, setSummaryContentKeywords] = useState([]);
  const dropdownValues = [
    { value: 'My Tasks' },
    { value: 'Tasks I Follow' },
    { value: 'Tasks I Created' },
    { value: 'Completed' },
  ];

  const styles = MyTasksStyles();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [onLoad, setOnLoad] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssignee, setSelectedAssignee] = useState();
  const [selectedProject, setSelectedProject] = useState();
  const [selectedPriority, setSelectedPriority] = useState();
  const [docId, setDocId] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [dropdownCurrent, setDropdownCurrent] = useState(
    dropdownValues[0].value
  );
  const [taskEditData, setTaskEditData] = useState({});

  const taskProjects = priorities?.map((item) => item.project[0]);

  const projectOptions = taskProjects.filter(
    (v, i, a) => a.findIndex((t) => t.id === v.id) === i
  );

  const otherFilterOptions = [
    { value: 'Assigner' },
    { value: 'Due' },
    { value: 'Updated' },
  ];

  const selectProject = (project) => {
    setSelectedProject(project);
    setLoading(true);
  };

  const selectAssignee = (assignee) => {
    setSelectedAssignee(assignee);
    setLoading(true);
  };

  const selectPriority = (priority) => {
    setSelectedPriority(priority);
    setLoading(true);
  };

  const onSelectSuggestion = (event, { suggestion }) => {
    setSearchValue(suggestion);
    unselectProject();
    unselectAssignee();
    unselectPriority();

    setLoading(true);
  };

  const unselectProject = () => {
    setSelectedProject(undefined);
    setLoading(true);
  };

  const unselectAssignee = () => {
    setSelectedAssignee();
    setLoading(true);
  };

  const unselectPriority = () => {
    setSelectedPriority(null);
    setLoading(true);
  };

  const changeDropdown = (value) => {
    setDropdownCurrent(value);
    if (value === 'My Tasks') {
      setSelectedAssignee();
    }
    setLoading(true);
  };

  const onChange = (event, { newValue }) => {
    setSearchValue(newValue);
  };

  const handleModalClick = () => {
    setTaskEditData({});
    setIsModalOpen(true);
  };

  const handleEditModalClick = (row) => {
    setTaskEditData(row);
    setIsModalOpen(true);
  };

  const handleModalClose = (clearTheNewTaskField) => {
    setIsModalOpen(false);
    clearTheNewTaskField();
  };

  //Repeated API Calls for the same user
  // FETCH ONLY ON OPEN FIELDS
  // Add Include in project Call to get
  // Fetch Projects from the API, not from Tasks
  // CHANGE fetchs to only when the user opens the component

  useEffect(() => {
    setOnLoad(true);
    dispatch(getPriorities());
    dispatch(getAssignees()).then(() => {
      dispatch(
        searchForTasks({
          search: `${
            searchValue
              ? `name=%${searchValue}%,description=%${searchValue}%`
              : ''
          }`,
          filters: `projectId=${selectedProject?.id || '!='},${
            selectedAssignee
              ? `assignedTo=${selectedAssignee?.username}`
              : !selectedAssignee &&
                !searchValue &&
                dropdownCurrent !== 'Tasks I Created'
              ? `assignedTo=${username}`
              : ''
          },${selectedPriority ? `priority=${selectedPriority}` : ''},${
            !searchValue && dropdownCurrent === 'Completed'
              ? `status=${dropdownCurrent}`
              : ''
          },${
            !searchValue && dropdownCurrent === 'Tasks I Created'
              ? `ownerId=${username}`
              : ''
          },${
            !searchValue && dropdownCurrent === 'Tasks I Follow'
              ? `followed=${username}`
              : ''
          }`,
          sort: 'createdAt=desc',
        })
      ).then((res) => {
        setFilteredTasks(res);
        setLoading(false);
        setOnLoad(false);
      });
    });
  }, [searchValue, loading]);

  const handleIsRowChecked = (task) => {
    return task.status === 'Completed';
  };

  const onAddLabelSuccess = () => {
    console.log('SUCCESS BABY');
  };

  const onClickStatus = async ({ type, projectId, taskId }) => {
    setFilteredTasks((previous) =>
      previous.map((task) =>
        task.id === taskId ? { ...task, status: 'Completed' } : task
      )
    );
    if (type === 'task') {
      dispatch(updateTask({ projectId, taskId })).then((res) => {
        toast.success('Task Status updated Successfully!');
        setTimeout(() => {
          setFilteredTasks((list) => list.filter((task) => task.id !== taskId));
        }, 3000);
      });
    } else if (type === 'summary') {
      dispatch(updateSummaryTask({ projectId, taskId })).then(() => {
        toast.success('Task Status updated Successfully!');
        setTimeout(() => {
          setFilteredTasks((list) => list.filter((task) => task.id !== taskId));
        }, 3000);

        toast.success('Task Status updated Successfully!');
      });
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: () => (
          <span className={styles.dueHeader}>
            Due <ArrowUp />
          </span>
        ),
        accessor: 'dueDate',
        collapse: true,
        Cell: ({ cell: { value } }) => <RelativeDate date={value} />,
      },
      {
        id: 'selection',
        Header: 'Status',
        accessor: 'status',
        collapse: true,
        Cell: ({ cell: { row } }) => {
          return (
            <div className={styles.checkboxContainer}>
              <Checkbox
                {...row.getToggleRowSelectedProps()}
                icon={<EmptyCheckbox className="empty" />}
                checkedIcon={<CheckedCheckBox className="checked" />}
                checked={handleIsRowChecked(row.original)}
                onClick={(e) => {
                  onClickStatus({
                    projectId: row.original.projectId,
                    taskId: row?.original?.id,
                    type: row?.original?.type,
                  });
                }}
              />
            </div>
          );
        },
      },
      {
        Header: 'Title',
        accessor: 'name',
        Cell: ({ cell: { value } }) => (
          <TextDisplay charNumber={43} text={value} />
        ),
      },
      {
        Header: 'Project',
        accessor: 'project[0].name',
      },
      {
        Header: 'Label',
        accessor: 'labels.labelsObj',
        collapse: true,
        Cell: ({ cell: { row } }) => {
          return (
            <Labels
              projectId={row.original?.projectId}
              taskId={row.original?.id}
              taskType={row.original?.type}
              labelsObj={row.original?.labels.labelsObj}
              addSuccess={onAddLabelSuccess}
            />
          );
        },
      },
      {
        Header: 'Priority',
        accessor: 'priority',
        collapse: true,
        Cell: ({ cell: { value, row } }) => {
          return (
            <StarsAction
              priority={value}
              projectId={row.original?.projectId}
              taskType={row.original?.type}
              taskId={row.original?.id}
            />
          );
        },
      },
      {
        Header: 'Assignee',
        accessor: 'assignedToDetails',
        collapse: true,
        Cell: ({ row }) => (
          <Avatar
            hasOverlay
            userDetails={
              row.original?.assignedToDetails || row.original?.assignedDetails
            }
            onlyIcon
            height={24}
            width={24}
          />
        ),
      },
      {
        accessor: 'summary',
      },
      {
        Header: () => null,
        collapse: true,
        id: 'expander',
        Cell: ({ row }) => (
          <button className="table-expand" onClick={() => onExpandClick(row)}>
            <span className="table-arrow" {...row.getToggleRowExpandedProps()}>
              {row.isExpanded ? <ChevronUp /> : <ChevronDown />}
            </span>
          </button>
        ),
      },
    ],
    []
  );

  const handleOpenSummary = async (fileSummaryUrl, keywords, docId) => {
    await getSummary({ fileSummaryUrl }).then((res) => {
      setSummaryContent(res);
      setSummaryContentKeywords(keywords);
      setDocId(docId);
    });
  };

  const handleCloseSummary = () => {
    setSummaryContent({});
    setSummaryContentKeywords([]);
  };

  const onProjectDelete = async (projectId, taskId, type) => {
    try {
      await deleteTask({ projectId, taskId, type }).then(() => {
        toast.success('Task deleted');
        setFilteredTasks((previous) =>
          previous.filter((task) => task.id !== taskId)
        );
      });
    } catch (err) {
      alert('Unable to delete task');
    }
  };

  const handleSubmit = (newtask, update, clearTheNewTaskField) => {
    console.log(newtask);
    setIsModalLoading(true);
    if (!update) {
      dispatch(addTask(newtask))
        .then((res) => {
          toast.success('Task added successfully!');
          res['project'] = [
            {
              name: newtask.projectName,
              id: newtask.projectId,
            },
          ];
          setFilteredTasks((previous) => [res].concat(previous));
          handleModalClose(clearTheNewTaskField);
          setIsModalLoading(false);
        })
        .catch((err) => {
          setIsModalLoading(false);
          if (err?.response?.status === 400) {
            toast.error('Some required fields are missing');
          } else if (err?.response?.status === 409) {
            toast.error('This task name already exists. Please try again.');
          } else if (err?.response?.status === 403) {
            toast.error(
              'Unauthorized! Only a member of the project can create new'
            );
          } else if (err?.response?.status === 500) {
            toast.error(
              'An error has occured in the platform, please contact your manager or try again later.'
            );
          }
        });
    } else {
      dispatch(
        updateTask({
          projectId: newtask.projectId,
          taskId: newtask.id,
          updateData: newtask,
        })
      )
        .then((res) => {
          toast.success('Task updated successfully!');
          setFilteredTasks((previous) =>
            previous.map((task) =>
              task.id === newtask.id
                ? {
                    ...task,
                    description: newtask.description,
                    dueDate: newtask.dueDate,
                    name: newtask.name,
                    priority: newtask.priority,
                  }
                : task
            )
          );
          handleModalClose(clearTheNewTaskField);
          setIsModalLoading(false);
        })
        .catch((err) => {
          setIsModalLoading(false);
          if (err?.response?.status === 400) {
            toast.error('Some required fields are missing');
          } else if (err?.response?.status === 404) {
            toast.error('This task is not exist');
          } else if (err?.response?.status === 409) {
            toast.error('This task name already exists. Please try again.');
          } else if (err?.response?.status === 403) {
            toast.error(
              'Unauthorized! Only a member of the project can create new'
            );
          } else if (err?.response?.status === 500) {
            toast.error(
              'An error has occured in the platform, please contact your manager or try again later.'
            );
          }
        });
    }
  };

  const onExpandClick = async (row) => {
    const projectId = row.original.projectId;
    const taskId = row.original.id;
    const taskType = row.original.type;
    const projectName = row.original.project[0];
    if (!row.isExpanded) {
      await getPriority({
        projectId,
        taskId,
        taskType,
      }).then((res) => {
        res.project = [projectName];
        setFilteredTasks((previous) =>
          previous.map((task) => (res.id === task.id ? res : task))
        );
        row.toggleRowExpanded();
      });
    } else {
      setFilteredTasks((previous) =>
        previous.map((task) => {
          if (task.id === row.original.id && task.comments) {
            delete task.comments;
          }
          return task;
        })
      );
    }
  };

  const renderSubRowComponent = useCallback(({ row }) => {
    return (
      <TaskViewContainer>
        {row.original.comments ? (
          <>
            <div className="detail-content">
              <div className="row-content">
                <div
                  className={
                    row.original.type === 'summary'
                      ? 'title'
                      : 'title title-task'
                  }
                >
                  Creator:
                </div>
                <div className="content">
                  {row.original.type === 'summary' ? (
                    <div className="system-content">System</div>
                  ) : (
                    <div className="creator-avatar">
                      <Avatar
                        userDetails={row.original.creatorDetails}
                        width={24}
                        height={24}
                        fontSize="0.75rem"
                      />
                      <span>
                        {row.original.creatorDetails?.firstName}{' '}
                        {row.original.creatorDetails?.lastName}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {row.original.type === 'summary' && (
                <div className="row-content">
                  <div className="title">Keywords:</div>
                  <div className="content">
                    {row.original.disciplineKeywords?.map((item, index) => {
                      if (index < row.original.disciplineKeywords?.length - 1) {
                        return item + ', ';
                      } else {
                        return item;
                      }
                    })}
                  </div>
                </div>
              )}
              <div className="row-content">
                <div className="title">Description:</div>
                <div className="content">{row.original.description}</div>
              </div>
              <div className="row-content">
                <div className="title">Comments:</div>
                <div className="content">
                  <TaskComments row={row.original} />
                </div>
              </div>
            </div>
            <div className="action-content">
              <div className="action-icons">
                <BellFollow row={row.original} />
                {/*<DownloadFunction row={row} />*/}
                <MoreMenu
                  row={row.original}
                  showEditTaskModal={handleEditModalClick}
                  onProjectDelete={() =>
                    onProjectDelete(
                      row.original.projectId,
                      row.original.id,
                      row.original.type
                    )
                  }
                />
              </div>
              {row.original.type === 'summary' && (
                <div className="action-btns">
                  <Link
                    to={{
                      pathname: `/projects/${encodeURIComponent(
                        row.original.projectId
                      )}`,
                      search: `docId=${encodeURIComponent(row.original.docId)}`,
                    }}
                    className="action-goto-file"
                  >
                    Go to file
                  </Link>
                  <div
                    className="action-see-summary"
                    onClick={() => {
                      handleOpenSummary(
                        row.original.fileSummaryUrl,
                        row.original.disciplineKeywords,
                        row.original.docId
                      );
                    }}
                  >
                    <Button background="#FF8A47" primarySmall color="#ffffff">
                      See my summary
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className={styles.skeletonContainer}>
            <div className={styles.topSkeleton}>
              <Skeleton
                width="2rem"
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
              <div>
                <Skeleton
                  width="1.5rem"
                  height="1.5rem"
                  animation="wave"
                  variant="circle"
                />

                <Skeleton
                  width="1.5rem"
                  height="1.5rem"
                  animation="wave"
                  variant="circle"
                />
              </div>
            </div>
            <Skeleton animation="wave" variant="text" />
            <Skeleton animation="wave" variant="text" />
            <div className={styles.editorSkeleton}>
              <Skeleton height="6.6875rem" animation="wave" variant="rect" />
            </div>
          </div>
        )}
      </TaskViewContainer>
    );
  }, []);

  return (
    <>
      <Breadcrumb firstLink="/tasks" firstLinkText="My tasks" />
      <Card>
        {priorities.length >= 0 ? (
          <>
            <div className={styles.topRow}>
              <Dropdown
                current={dropdownCurrent}
                options={dropdownValues}
                onClick={changeDropdown}
              />
              <Button
                background="#FF8A47"
                primarySmall
                color="#ffff"
                onClick={handleModalClick}
              >
                <GoPlus /> Add Task
              </Button>

              {isModalOpen && (
                <NewTaskModal
                  open={isModalOpen}
                  handleSubmit={handleSubmit}
                  loading={isModalLoading}
                  handleModalClose={handleModalClose}
                  editData={taskEditData}
                />
              )}
            </div>
            <div className={styles.searchAndFilters}>
              <TableSearch
                placeholder="Search for tasks..."
                onChange={onChange}
                searchValue={searchValue}
                data={priorities}
                onSelectSuggestion={onSelectSuggestion}
              />

              <FilterButton
                projectOptions={projectOptions}
                hasFilter
                current="Project"
                selectedProject={selectedProject}
                onClick={selectProject}
                unselectProject={unselectProject}
                icon={<FiFile />}
              />

              <FilterButton
                assigneeOptions={assignees}
                hasFilter
                current="Assignees"
                selectedAssignee={selectedAssignee}
                onClick={selectAssignee}
                unselectAssignee={unselectAssignee}
                icon={<AssigneeIcon />}
              />
              <PriorityButton
                current="Priority"
                align="end"
                selectPriority={selectPriority}
                selectedPriority={selectedPriority}
                unselectPriority={unselectPriority}
              />
              {/* <FilterButton
                align="end"
                current="Other Filters"
                options={otherFilterOptions}
                icon={<BsFilter />}
              /> */}
            </div>
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
            ) : filteredTasks.length > 0 ? (
              <>
                <Table
                  columns={columns}
                  data={filteredTasks}
                  getTrProps={(row) => {
                    return {
                      className:
                        row.isSelected === true ||
                        row.original.status === 'Completed'
                          ? 'completedRow'
                          : row.index % 2 === 0
                          ? 'standardRow'
                          : 'whiteRow',
                    };
                  }}
                  renderSubRowComponent={renderSubRowComponent}
                />
                {Object.keys(summaryContent).length > 0 && (
                  <SummaryDetail
                    onClose={handleCloseSummary}
                    keywords={summaryContentKeywords}
                    docId={docId}
                    detail={summaryContent}
                  />
                )}
              </>
            ) : (
              <div className={styles.empty}>There are no tasks.</div>
            )}
          </>
        ) : (
          <div className={styles.empty}>You have no Tasks.</div>
        )}
      </Card>
    </>
  );
};

export default MyTasks;
