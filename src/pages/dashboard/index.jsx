import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiPlus } from 'react-icons/fi';
import NewProjectModal from '../../components/projectsModal/newProjectModal';
import dashboardStyles, { AddProject } from './styles';
import Breadcrumb from '../../components/breadcrumb';
import ToReview from '../../components/toReview/';
import PeopleDashboardSection from '../../components/peopleDashboardSection';
import RecentProjects from '../../components/recentProjects';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { roles, profile } = useSelector((state) => state.auth);
  const styles = dashboardStyles();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalClick = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = (clearProjectfields) => {
    setIsModalOpen(false);
    clearProjectfields();
  };

  return (
    <>
      <Breadcrumb firstLink="/dashboard" />
      {roles.find((role) => role.name === 'team_manager') ? (
        <div className={styles.dashboardContainer}>
          <div className={styles.tasksAndProjects}>
            <ToReview profile={profile} />
            <RecentProjects handleModalClick={handleModalClick} />
          </div>
          <div className={styles.healthAndPeople}>
            <div className={styles.health}>
              <h2>Health Meter</h2>
              <p>No Data</p>
            </div>

            <PeopleDashboardSection />
          </div>
        </div>
      ) : (
        <div className={styles.engDashboardContaner}>
          <div className={styles.engTasksAndProjects}></div>
        </div>
      )}
      <NewProjectModal open={isModalOpen} handleModalClose={handleModalClose} />
    </>
  );
};

export default Dashboard;
