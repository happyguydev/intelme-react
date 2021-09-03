import React, { useEffect, useState } from 'react';
import userDetailstyles from './userDetails.styles';
import ReactTooltip from 'react-tooltip';
import { IconContext } from 'react-icons';
import { FiMessageSquare } from 'react-icons/fi';
import { BsListUl } from 'react-icons/bs';
import { ChatBubbleOutlineOutlined, MessageOutlined } from '@material-ui/icons';
import Button from '../button';
import { getAssignedProfile } from '../../services/tasks';
import { CircularProgress } from '@material-ui/core';
import { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';

const UserDetails = ({ UserDetails }) => {
  const props = {
    background: `#${UserDetails?.settings.color}`,
  };

  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState();

  useEffect(() => {
    getAssignedProfile({ username: UserDetails?.username }).then((res) => {
      setUserProfile(res);
      setLoading(false);
    });
  }, []);

  const redirectUserToMessage = () => {
    setRedirect({
      pathname: '/dashboard/notifications',
    });
  };
  const redirectUserToTasks = () => {
    setRedirect({
      pathname: '/tasks',
    });
  };
  const styles = userDetailstyles(props);
  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <div className={styles.userDetails}>
        {loading ? (
          <div className={styles.loading}>
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className={styles.flexBoxCenter}>
              <div className={styles.flexBox}>
                <div className={styles.avatarWrapper}>
                  {UserDetails?.settings.icon ? (
                    <img
                      width="100%"
                      src={`data:image/png;base64,${UserDetails?.settings.icon}`}
                      alt="avatar"
                      className={styles.img}
                    />
                  ) : (
                    <div className={styles.nameWrapper}>
                      {!UserDetails?.firstName || !UserDetails?.lastName ? (
                        <>{UserDetails?.username.slice(0, 2)}</>
                      ) : (
                        <>
                          {UserDetails?.firstName?.charAt(0)}
                          {UserDetails?.lastName?.charAt(0)}
                        </>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  <p className={styles.name}>
                    {UserDetails?.firstName && UserDetails?.lastName
                      ? UserDetails?.firstName + ' ' + UserDetails?.lastName
                      : UserDetails?.username}
                  </p>
                  <p className="primary-text">
                    {userProfile?.settings?.jobTitle}
                  </p>
                  <p className="primary-text gray-color">
                    {userProfile?.settings?.disciplines[0]?.name}
                  </p>
                </div>
              </div>
              <div className={styles.btnWrappper}>
                <Button
                  onClick={redirectUserToMessage}
                  background="#FFF0E8"
                  color="#FF8A47"
                  secondarySmall
                >
                  <ChatBubbleOutlineOutlined />
                  Message
                </Button>

                <div style={{ marginTop: '8px' }}>
                  <Button
                    onClick={redirectUserToTasks}
                    background="#EDF5F6"
                    color="#089BAB"
                    secondarySmall
                  >
                    <IconContext.Provider
                      value={{ color: '#017D8A', size: '12px' }}
                    >
                      <BsListUl className="mr-1" />
                    </IconContext.Provider>
                    See Tasks
                  </Button>
                </div>
              </div>
            </div>
            <div className="user-info">
              {userProfile?.settings?.reportingTo && (
                <div className={styles.flexBox}>
                  <p className={styles.title}>Manager:</p>
                  <p className="primary-text">
                    {userProfile?.settings?.reportingTo}
                  </p>
                </div>
              )}
              {userProfile?.settings?.mobileNo && (
                <div className={styles.flexBox}>
                  <p className={styles.title}>Phone:</p>
                  <p className="primary-text">
                    {userProfile?.settings?.mobileNo}
                  </p>
                </div>
              )}
              {userProfile?.email && (
                <div className={styles.flexBox}>
                  <p className={styles.title}>Email:</p>
                  <p className="primary-text">{userProfile?.email}</p>
                </div>
              )}
              {userProfile?.settings?.teams.length > 0 && (
                <div className={styles.teamContainer}>
                  <p className={styles.title}>Teams:</p>
                  {userProfile?.settings?.teams?.map((team) => (
                    <Fragment key={team.teamId}>
                      <div
                        className={styles.teamWrapper}
                        style={{ background: `#${team.color}` }}
                        data-tip={`${team.name}`}
                      >
                        <div className={styles.teamName}>
                          {' '}
                          {team.name.slice(0, 2)}{' '}
                        </div>
                      </div>
                      <ReactTooltip
                        arrowColor="#404040"
                        className="tool-tips"
                      />
                    </Fragment>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserDetails;
