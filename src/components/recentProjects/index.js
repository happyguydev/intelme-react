import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRecentProjects } from '../../services/projects';
import { Skeleton } from '@material-ui/lab';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import RecentProjectsStyles, { AddProject } from './styles';
import moment from 'moment';
import Status from '../status';

const RecentProjects = ({ handleModalClick }) => {
  const styles = RecentProjectsStyles();
  const dispatch = useDispatch();
  const [onLoad, setOnLoad] = useState(false);
  const [recentProjects, setRecentProjects] = useState([]);

  useEffect(() => {
    setOnLoad(true);

    getRecentProjects().then((res) => {
      setRecentProjects(res);
      setOnLoad(false);
    });
  }, []);

  return (
    <>
      {onLoad ? (
        <div className={styles.tasksContainer}>
          <div className={styles.skeletonContainer}>
            <Skeleton
              animation="wave"
              variant="rect"
              width={160}
              height={176}
            />
            <Skeleton
              animation="wave"
              variant="rect"
              width={160}
              height={176}
            />
            <Skeleton
              animation="wave"
              variant="rect"
              width={160}
              height={176}
            />
            <Skeleton
              animation="wave"
              variant="rect"
              width={160}
              height={176}
            />
          </div>
        </div>
      ) : recentProjects.length > 0 ? (
        <div className={styles.tasksContainer}>
          <h1>Recent Projects</h1>

          <div className={styles.projectWrapper}>
            {recentProjects.map((project) => (
              <div key={project?.id} className={styles.singleProject}>
                <h2 className="primary-text">
                  {project.name},{' ' + project.number}
                </h2>
                <div>
                  <p className="primary-text">
                    •updated {moment(project.updatedAt).format('MMM D YY')}
                  </p>
                  <p className="primary-text">•{project.dueTasks} tasks due</p>
                  {project?.address && (
                    <p className="primary-text">•{project?.address}</p>
                  )}
                </div>
                <Status status={project.status} className="primary-text" />
              </div>
            ))}
          </div>
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
        <div className={styles.projects}>
          <h2>Start Here</h2>
          <p>Create your first project.</p>
          <AddProject onClick={handleModalClick}>
            <div>
              <FiPlus />
            </div>
            <p>Add Project</p>
          </AddProject>
        </div>
      )}
    </>
  );
};

export default RecentProjects;
