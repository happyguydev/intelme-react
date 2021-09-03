import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ToReviewStyles from './style';
import { searchForTasks } from '../../store/actions/tasks';
import { Skeleton } from '@material-ui/lab';
import { ReactComponent as ArrowUp } from '../icons/arrowUp.svg';
import TextDisplay from '../textDisplay';
import { Link } from 'react-router-dom';
import RelativeDate from '../../utils/relativeDate';
import Table from '../table';
import { ReactComponent as ChevronUp } from '../icons/chevronUp.svg';
import { ReactComponent as ChevronDown } from '../icons/chevronDown.svg';
import StarsAction from '../starsAction';
import Avatar from '../avatar';
import Button from '../button';
import MyTasksStyles, { TaskViewContainer } from './style';
import { getPriority } from '../../services/tasks';
import { useCookies } from 'react-cookie';

const ToReview = (props) => {
  const styles = ToReviewStyles();
  const dispatch = useDispatch();
  const [cookies] = useCookies(['intelme']);
  const [onLoad, setOnLoad] = useState(false);
  const [tasks, setTasks] = useState([]);
  const { profile } = props;

  useEffect(() => {
    setOnLoad(true);
    dispatch(
      searchForTasks({
        filters: `assignedTo=${cookies.username}`,
        sort: 'createdAt=desc',
      })
    ).then((res) => {
      setTasks(res);
      setOnLoad(false);
    });
  }, []);

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
    const projectId = row.original.projectId;
    const taskId = row.original.id;
    const project = row.original.project[0];
    console.log(row.original);
    const taskType = row.original.type;
    if (!row.isExpanded) {
      await getPriority({
        projectId,
        taskId,
        taskType,
      }).then((res) => {
        setTasks((previous) =>
          previous.map((task) =>
            res.id === task.id ? { ...res, project: [project] } : task
          )
        );
        row.toggleRowExpanded();
      });
    } else {
      setTasks((previous) =>
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
              {/* {row.original.type === 'summary' && (
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
              )} */}
              {row.original.description && (
                <div className="row-content">
                  <div className="title">Description:</div>
                  <div className="content">{row.original.description}</div>
                </div>
              )}
            </div>
            <div className="action-content">
              <div className="action-icons"></div>
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
                    // onClick={() => {
                    //   handleOpenSummary(
                    //     row.original.fileSummaryUrl,
                    //     row.original.disciplineKeywords,
                    //     row.original.docId
                    //   );
                    // }}
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
            <Skeleton animation="wave" variant="text" />
          </div>
        )}
      </TaskViewContainer>
    );
  }, []);

  return (
    <>
      {onLoad ? (
        <div className={styles.tasksContainer}>
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
        </div>
      ) : tasks.length > 0 ? (
        <div className={styles.tasksContainer}>
          <h1>To Review</h1>
          <Table
            columns={columns}
            data={tasks}
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
          <div>
            <Link
              to={{
                pathname: `/tasks/`,
              }}
              className="primary-text"
            >
              See all
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.tasks}>
          <h2>No tasks assigned to you yet.</h2>
        </div>
      )}
    </>
  );
};

export default ToReview;
