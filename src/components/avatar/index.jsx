import React, { useState, useRef } from 'react';
import { Overlay, Popover } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import avatarStyles from './styles';
import UserDetails from './userDetails';

const Avatar = ({
  userDetails,
  fat,
  hasOverlay,
  width,
  height,
  fontSize,
  onlyIcon,
}) => {
  const [show, setShow] = useState(false);
  const { profile } = useSelector((state) => state.auth);

  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleHover = (event) => {
    setShow(true);
    setTarget(event.target);
  };
  const handleHover2 = (event) => {
    setShow(false);
    setTarget(event.target);
  };
  const props = {
    background: `${
      !userDetails?.settings
        ? `#${userDetails?.color}`
        : `#${userDetails?.settings?.color}`
    }`,
    width: width,
    height: height,
    fontSize: fontSize,
  };
  const styles = avatarStyles(props);

  return (
    <div
      className={fat ? styles.fatAvatar : styles.avatar}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover2}
      ref={ref}
    >
      {!userDetails?.settings?.icon && !userDetails?.icon ? (
        <>
          {!userDetails?.firstName && !userDetails?.firstName ? (
            <>{userDetails?.username?.slice(0, 2)}</>
          ) : (
            <>
              {userDetails?.firstName?.charAt(0)}
              {userDetails?.lastName?.charAt(0)}
            </>
          )}
        </>
      ) : onlyIcon ? (
        <div className={styles.avatarOnlyIcon}>
          <img
            src={`data:image/png;base64,${
              !userDetails?.settings
                ? userDetails?.icon
                : userDetails?.settings?.icon
            }`}
            alt=""
          />
        </div>
      ) : (
        <>
          <div className={styles.avatarWithName}>
            <img
              src={`data:image/png;base64,${
                !userDetails?.settings?.icon
                  ? userDetails?.icon
                  : userDetails?.settings?.icon
              }`}
              alt=""
            />
          </div>
        </>
      )}
      {hasOverlay && userDetails?.username !== profile?.username ? (
        <Overlay
          flip={true}
          show={show}
          target={target}
          placement="top"
          container={ref.current}
        >
          <Popover
            id="popover-contained"
            className="div-feature  border-0 user-details"
          >
            <Popover.Content>
              <UserDetails UserDetails={userDetails} />
            </Popover.Content>
          </Popover>
        </Overlay>
      ) : null}
    </div>
  );
};

export default Avatar;
