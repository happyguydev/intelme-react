import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';
import { GoPlus } from 'react-icons/go';

import RelativeDate from '../../utils/relativeDate';
import { searchForProjects } from '../../store/actions/projects';
import {
  getProjectFilters,
  getProjectMembers,
  deleteProject,
} from '../../services/projects';
import { getAllComments } from '../../services/tasks';

import { ReactComponent as ArrowUp } from '../../components/icons/arrowUp.svg';
import { ReactComponent as CheckedFilterIcon } from '../../components/icons/checkedFilter.svg';
import { ReactComponent as SenderFilterIcon } from '../../components/icons/senderFilter.svg';
import { ReactComponent as ChevronUp } from '../../components/icons/chevronUp.svg';
import { ReactComponent as ChevronDown } from '../../components/icons/chevronDown.svg';

import Table from '../../components/table';
import Button from '../../components/button';
import Card from '../../components/card';
import Avatar from '../../components/avatar';
import Breadcrumb from '../../components/breadcrumb';
import Status from '../../components/status';
import NewProjectModal from '../../components/projectsModal/newProjectModal';
import TableSearch from '../../components/tableFilters/searchInput/searchInput';
import DateFilter from '../../components/projectTableFilters/dateFilter';
import StatusFilter from '../../components/projectTableFilters/statusFilter';
import SenderFilter from '../../components/projectTableFilters/senderFilter';
import TextDisplay from '../../components/textDisplay';
import TaskComments from '../../components/comment';
import MemberList from '../../components/projectsModal/function/member-list';
import MoreMenu from '../../components/projectsModal/function/more-menu';

import projectStyles, { ProjectViewContainer } from './styles';

const Projects = () => {
  const styles = projectStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [filteredProjects, setFilteredProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [senders, setSenders] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [inCharge, setInCharge] = useState([]);

  const [getFilters, setGetFilters] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [onLoad, setOnLoad] = useState(false);

  const [rangeDate, setRangeDate] = useState([null, null]);
  const [formatedRange, setFormatedRange] = useState([null, null]);
  const [startDate, endDate] = rangeDate;
  const [formatedStartDate, formatedEndDate] = formatedRange;

  const [searchValue, setSearchValue] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedSender, setSelectedSender] = useState('');

  const onSelectRange = (update) => {
    let formatedStartDate = update[0].toLocaleDateString('en-CA');
    let formatedEndDate;
    if (update[1] !== undefined || null) {
      formatedEndDate = update[1]?.toLocaleDateString('en-CA');
    }

    console.log(formatedStartDate, formatedEndDate);
    setFormatedRange([formatedStartDate, formatedEndDate]);
    if (formatedRange[0] !== null && formatedRange[1] !== null) {
      setLoading(true);
    }
    setRangeDate(update);
  };

  const unselectRange = () => {
    setRangeDate([null, null]);
    setFormatedRange([null, null]);
    setLoading(true);
  };

  const selectStatus = (status) => {
    setSelectedStatus(status);
    setLoading(true);
  };

  const unselectStatus = () => {
    setSelectedStatus(undefined);
    setLoading(true);
  };

  const onSelectSuggestion = (event, { suggestion }) => {
    setSearchValue(suggestion);
    unselectSender(undefined);
    unselectStatus(undefined);
    setRangeDate([null, null]);
    setFormatedRange([null, null]);
    setLoading(true);
  };
  const selectSender = (sender) => {
    setSelectedSender(sender);
    setLoading(true);
  };

  const unselectSender = () => {
    setSelectedSender(undefined);
    setLoading(true);
  };

  const handleModalClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = (clearProjectfields) => {
    setIsModalOpen(false);
    clearProjectfields();
  };

  const onNewProject = (res) => {
    setFilteredProjects((previous) => [res].concat(previous));
  };

  useEffect(() => {
    setOnLoad(true);

    dispatch(
      searchForProjects({
        search: `${
          searchValue
            ? `name=%${searchValue}%,description=%${searchValue}%`
            : ''
        }`,
        filters: `${selectedStatus ? `status=${selectedStatus}` : ''},${
          selectedSender ? `sender=${selectedSender}` : ''
        },${
          formatedRange[0] !== null && formatedRange[1] !== null
            ? `createdAt=[${formatedStartDate}--${formatedEndDate}]`
            : ''
        }`,
        limit: 100,
      })
    ).then(async (res) => {
      setFilteredProjects(res.result);
      if (getFilters) {
        setProjects(res.result);
        await getProjectFilters().then((filters) => {
          setSenders(filters.senders);
          setStatusOptions(filters.status);
          setInCharge(filters.inCharge);
        });
        setGetFilters(false);
      }
      setLoading(false);
      setOnLoad(false);
    });
  }, [loading]);

  const onSearchChange = (event, { newValue }) => {
    setSearchValue(newValue);
    unselectSender(undefined);
    unselectStatus(undefined);
    setRangeDate([null, null]);
    setFormatedRange([null, null]);
    setTimeout(() => {
      setLoading(true);
    }, 1200);
  };

  const columns = useMemo(
    () => [
      {
        Header: () => (
          <span className={styles.dueHeader}>
            Updated <ArrowUp />
          </span>
        ),
        accessor: 'updatedAt',
        collapse: true,
        Cell: ({ cell: { value } }) => <RelativeDate date={value} />,
      },
      {
        Header: 'No',
        accessor: 'number',
        collapse: true,
      },
      {
        Header: 'Project',
        accessor: (row) => row,
        Cell: ({ cell: { value } }) => (
          <span className={styles.nameLink}>
            <Link to={`/projects/${encodeURIComponent(value.id)}`}>
              {value.name}
            </Link>
          </span>
        ),
      },
      {
        Header: 'Sender',
        accessor: 'sender',
        Cell: ({ cell: { value } }) => (
          <TextDisplay charNumber={10} text={value} />
        ),
      },
      {
        Header: 'Description',
        accessor: 'description',
        Cell: ({ cell: { value } }) => (
          <TextDisplay charNumber={37} text={value} />
        ),
      },
      {
        Header: 'In Charge',
        accessor: 'inChargeDetails',
        collapse: true,
        Cell: ({ cell: { value } }) => (
          <Avatar userDetails={value} height={24} width={24} />
        ),
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ cell: { value } }) => <Status status={value} />,
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

  const onExpandClick = async (row) => {
    const projectId = row.original.id;
    const commentOn = 'project';
    const commentOnId = row.original.id;
    const total = 3;

    if (!row.isExpanded) {
      await getProjectMembers({ projectId }).then(async (members) => {
        await getAllComments({
          projectId,
          commentOn,
          commentOnId,
          total,
        }).then((comments) => {
          setFilteredProjects((previous) =>
            previous.map((project) => {
              if (project.id === row.original.id) {
                project.members = members.users;
                project.comments = comments;
              }
              project.projectId = project.id;
              return project;
            })
          );
          row.toggleRowExpanded();
        });
      });
    } else {
      setFilteredProjects((previous) =>
        previous.map((project) => {
          if (project.id === row.original.id && project.comments) {
            ject.comments;
          }
          return project;
        })
      );
    }
  };

  const gotoProjectFile = (projectId) => {
    history.push(`/projects/${encodeURIComponent(projectId)}`);
  };

  const handleProjectDelete = async (projectId) => {
    try {
      await deleteProject({ projectId: projectId }).then((res) => {
        setFilteredProjects((previous) => {
          return previous.filter((item) => {
            return item.projectId !== projectId;
          });
        });
      });
    } catch (e) {
      alert('Unable to delete project\n' + e);
    }
  };

  const renderSubRowComponent = useCallback(({ row }) => {
    return (
      <ProjectViewContainer>
        {row.original.comments ? (
          <>
            <div className="detail-content">
              {row.original.description && (
                <div className="row-content">
                  <div className="title">Description:</div>
                  <div className="content">{row.original.description}</div>
                </div>
              )}
              {row.original.address && (
                <div className="row-content">
                  <div className="title">Address:</div>
                  <div className="content">{row.original.address}</div>
                </div>
              )}
              {row.original.contacts && (
                <div className="row-content">
                  <div className="title">Contacts:</div>
                  <div className="content">{row.original.contacts}</div>
                </div>
              )}
              <div className="row-content">
                <div className="title">Comments:</div>
                <div className="content">
                  <TaskComments row={row.original} />
                </div>
              </div>
            </div>
            <div className="action-content">
              <div className="action-icons">
                <MemberList members={row.original.members} />
                <MoreMenu
                  row={row.original}
                  onProjectEdit={() => {}}
                  onProjectDelete={() => handleProjectDelete(row.original.id)}
                />
              </div>
              <div className="action-btns">
                <div
                  className="action-see-project-files"
                  onClick={() => {
                    gotoProjectFile(row.original.id);
                  }}
                >
                  <Button background="#FF8A47" primarySmall color="#ffffff">
                    See project files
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
                height="2rem"
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
            <Skeleton
              width="100%"
              height="2rem"
              animation="wave"
              variant="text"
            />
            <div className={styles.editorSkeleton}>
              <Skeleton height="6.6875rem" animation="wave" variant="rect" />
            </div>
          </div>
        )}
      </ProjectViewContainer>
    );
  }, []);

  return (
    <>
      <Breadcrumb firstLink="/projects" firstLinkText="My Projects" />
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
      <Card>
        <div className={styles.topRow}>
          <h1>My Projects</h1>
          <Button primarySmall background="#FF8A47" onClick={handleModalClick}>
            <GoPlus /> Add Project
          </Button>

          <NewProjectModal
            open={isModalOpen}
            onNewProject={onNewProject}
            handleModalClose={handleModalClose}
          />
        </div>
        {projects.length > 0 ? (
          <div className={styles.searchAndFilters}>
            <TableSearch
              onSelectSuggestion={onSelectSuggestion}
              data={projects}
              placeholder="Search for projects..."
              searchValue={searchValue}
              onChange={onSearchChange}
            />
            <DateFilter
              onSelectRange={onSelectRange}
              startRange={startDate}
              endRange={endDate}
              selectedRange={rangeDate}
              unselectRange={unselectRange}
            />
            <StatusFilter
              options={statusOptions}
              onClick={selectStatus}
              selectedStatus={selectedStatus}
              unselectStatus={unselectStatus}
              current="Status"
              icon={<CheckedFilterIcon />}
            />
            <SenderFilter
              options={senders}
              onClick={selectSender}
              selectedSender={selectedSender}
              unselectSender={unselectSender}
              current="Sender"
              align="end"
              icon={<SenderFilterIcon />}
            />
            {/* <OtherFilters
            align="end"
            current="Other filters"
            icon={<FilteringIcon />}
          /> */}
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
        ) : filteredProjects.length === 0 ? (
          <div className={styles.empty}>
            <span>You have no Projects.</span>
          </div>
        ) : (
          <Table
            columns={columns}
            data={filteredProjects}
            getTrProps={(row) => {
              return {
                className:
                  row.isSelected === true || row.original.status === 'Completed'
                    ? 'completedRow'
                    : row.index % 2 === 0
                    ? 'standardRow'
                    : 'whiteRow',
              };
            }}
            renderSubRowComponent={renderSubRowComponent}
          />
        )}
      </Card>
    </>
  );
};

export default Projects;
