import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PeopleSection from './styles';
import { Skeleton } from '@material-ui/lab';
import { Menu, MenuButton, MenuItem, MenuRadioGroup } from '@szhsin/react-menu';
import { Link, Redirect } from 'react-router-dom';
import { ReactComponent as ChevronUp } from '../icons/ArrowV2.svg';
import Avatar from '../avatar';
import Button from '../button';
import { ChatBubbleOutlineOutlined } from '@material-ui/icons';
import { getAllTheRecentPeople } from '../../services/messages';
import DropDownPrimary from '../dropDownPrimary';

const ToReview = () => {
  const styles = PeopleSection();
  const [onLoad, setOnLoad] = useState(false);
  const { profile } = useSelector((state) => state?.auth);
  const [people, setPeople] = useState([]);
  const [redirect, setRedirect] = useState();

  const redirectUser = () => {
    setRedirect({
      pathname: '/dashboard/notifications',
    });
  };

  useEffect(() => {
    setOnLoad(true);
    getAllTheRecentPeople().then((res) => {
      setPeople(res);
      setOnLoad(false);
    });
  }, []);

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      {onLoad ? (
        <div className={styles.tasksContainer}>
          <div className={styles.skeletonContainer}>
            <Skeleton animation="wave" height="2.125rem" variant="text" />
            <Skeleton animation="wave" height="2.125rem" variant="text" />
            <Skeleton animation="wave" height="2.125rem" variant="text" />
            <Skeleton animation="wave" height="2.125rem" variant="text" />
            <Skeleton animation="wave" height="2.125rem" variant="text" />
            <Skeleton animation="wave" height="2.125rem" variant="text" />
          </div>
          <div className={styles.peopelGrid} style={{ marginTop: '20px' }}>
            <Skeleton
              animation="wave"
              height="40px"
              width="40px"
              variant="circle"
            />
            <Skeleton
              animation="wave"
              height="40px"
              width="40px"
              variant="circle"
            />
            <Skeleton
              animation="wave"
              height="40px"
              width="40px"
              variant="circle"
            />
            <Skeleton
              animation="wave"
              height="40px"
              width="40px"
              variant="circle"
            />
            <Skeleton
              animation="wave"
              height="40px"
              width="40px"
              variant="circle"
            />
          </div>
        </div>
      ) : people.length > 0 ? (
        <div className={styles.tasksContainer}>
          <div className="d-flex">
            <h1>People</h1>
            <DropDownPrimary />
          </div>

          {profile?.settings?.teams.map((team) => (
            <Menu
              className={styles.teamWrapper}
              menuButton={
                <MenuButton className={styles.teamBtn}>
                  <p className="primary-text">{team.name}</p>
                  <ChevronUp />
                </MenuButton>
              }
            >
              <MenuRadioGroup>
                {team?.members?.result.map((item) => (
                  <MenuItem>
                    <div className="user-name d-flex">
                      <div className="d-flex">
                        <Avatar
                          width={'24px'}
                          height={'24px'}
                          userDetails={item}
                          fontSize={'12px'}
                        />
                        <h4 className="primary-text">
                          {item?.firstName && item?.lastName
                            ? item?.firstName + ' ' + item?.lastName
                            : item?.username}
                        </h4>
                      </div>
                      <h5 className="primary-text">
                        {item?.settings?.jobTitle}
                      </h5>
                      <Button
                        onClick={() => redirectUser()}
                        background="#FFF0E8"
                        color="#FF8A47"
                        secondarySmall
                      >
                        <ChatBubbleOutlineOutlined />
                      </Button>
                    </div>
                  </MenuItem>
                ))}
              </MenuRadioGroup>
            </Menu>
          ))}
          <div className={styles.peopelWrapper}>
            <h1>Recent</h1>
            <div className={styles.peopelGrid}>
              {people.map((item) => (
                <Avatar
                  hasOverlay
                  width={'40px'}
                  height={'40px'}
                  userDetails={item}
                  fontSize={'1rem'}
                />
              ))}
            </div>
          </div>
          <div>
            <Link
              to={{
                pathname: `/people/`,
              }}
              className="primary-text"
            >
              See all
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.people}>
          <h3>People</h3>
          <p>Here you can find people you frequently communicate with.</p>
        </div>
      )}
    </>
  );
};

export default ToReview;
