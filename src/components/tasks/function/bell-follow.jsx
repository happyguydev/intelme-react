import React, { useEffect, useState } from 'react';

import { useCookies } from 'react-cookie';
import Tooltip from '@material-ui/core/Tooltip';
import { follow, unfollow } from '../../../services/tasks';

import { ReactComponent as BellOn } from '../../icons/bell-on.svg';
import { ReactComponent as BellOff } from '../../icons/bel-off.svg';

import UseStylesTooltip from './bell-follow-styles';

const BellFollow = ({ row }) => {
  const [followStatus, setFollowStatus] = useState(false);
  const [cookies] = useCookies(['intelme']);
  const tooltipClasses = UseStylesTooltip();

  useEffect(() => {
    const { username } = cookies;
    const res = Object.keys(row.audience).map((key) => row.audience[key]);
    res.includes(username.toString())
      ? setFollowStatus(true)
      : setFollowStatus(false);
  }, []);

  const handleFollow = async () => {
    const projectId = row.projectId;
    const taskId = row.id;
    const type = row.type;

    await follow({ projectId, taskId, type }).then((res) => {
      setFollowStatus(true);
    });
  };
  const handleUnfollow = async () => {
    const projectId = row.projectId;
    const taskId = row.id;
    const type = row.type;

    await unfollow({ projectId, taskId, type }).then((res) => {
      setFollowStatus(false);
    });
  };

  return (
    <>
      <Tooltip
        classes={tooltipClasses}
        title={followStatus ? 'Alert On' : 'Alert Off'}
        arrow
      >
        {followStatus ? (
          <div onClick={handleUnfollow} style={{ cursor: 'pointer' }}>
            <BellOn />
          </div>
        ) : (
          <div onClick={handleFollow} style={{ cursor: 'pointer' }}>
            <BellOff />
          </div>
        )}
      </Tooltip>
    </>
  );
};

export default BellFollow;
