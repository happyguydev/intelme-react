import React, { useState } from 'react';

import { ReactComponent as FullStar } from '../icons/fullStar.svg';
import { ReactComponent as HalfStar } from '../icons/halfStar.svg';
import { ReactComponent as Star } from '../icons/star.svg';
import { PriorityComponent, Stars } from './styles';
import { ReactComponent as EmptyStar } from '../icons/star.svg';
import Popper from '@material-ui/core/Popper';
import { taskUpdate, taskSummaryUpdate } from '../../services/tasks';
import { EditPriorityDocument } from '../../services/projects';

const StarsAction = ({ priority, projectId, taskType, taskId, docName }) => {
  const styles = Stars();
  const [star, setStar] = useState(priority);
  const [showListStars, setShowListStars] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [arrowRef, setArrowRef] = useState(null);

  const handleAddClick = (event) => {
    event.currentTarget.className += ' clicked';
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const editPriority = async (starType) => {
    const updateData = {
      priority: starType,
    };
    setStar(starType);
    if (taskType === 'file') {
      EditPriorityDocument({ projectId, docName, updateData }).then((res) => {
        if (res === 'Ok') {
          setAnchorEl(null);
          console.log(res);
        }
      });
    } else {
      if (taskType === 'task') {
        taskUpdate({ projectId, taskId, updateData }).then((res) => {
          if (res === 'Ok') {
            setAnchorEl(null);
          }
        });
      } else {
        taskSummaryUpdate({ projectId, taskId, updateData }).then((res) => {
          if (res === 'Ok') {
            setAnchorEl(null);
          }
        });
      }
    }

    setAnchorEl(null);
  };
  return (
    <>
      <PriorityComponent onClick={(event) => handleAddClick(event)}>
        {star === 1 ? (
          <Star className="outlinedStar" />
        ) : star === 3 ? (
          <HalfStar />
        ) : star === 5 ? (
          <FullStar />
        ) : (
          <Star className="emptyStar" />
        )}
      </PriorityComponent>

      <Popper
        open={anchorEl}
        anchorEl={anchorEl}
        placement="bottom"
        disablePortal={false}
        modifiers={{
          flip: {
            enabled: false,
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: 'window',
          },
          arrow: {
            enabled: true,
            element: arrowRef,
          },
        }}
        className={styles.popperContainr}
      >
        <ul ref={setArrowRef} className={styles.listMneu}>
          <li className="filterItem" key="high" onClick={() => editPriority(5)}>
            <FullStar /> High Priority
          </li>
          <li
            className="filterItem"
            key="medium"
            onClick={() => editPriority(3)}
          >
            <HalfStar /> Medium Priority
          </li>
          <li className="filterItem" key="low" onClick={() => editPriority(1)}>
            <EmptyStar className="emptyStar" />
            Low Priority
          </li>
          <li
            className="filterItem"
            key="notSet"
            onClick={() => editPriority(null)}
          >
            <EmptyStar
              className="outlinedStar"
              style={{ color: '#DBDBDB !important' }}
            />
            Not Set
          </li>
        </ul>
      </Popper>
    </>
  );
};

export default StarsAction;
