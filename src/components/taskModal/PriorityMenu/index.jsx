import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import React from 'react';
import '@szhsin/react-menu/dist/index.css';
import './style.scss';
import { ReactComponent as FullStar } from '../../icons/fullStar.svg';
import { ReactComponent as HalfStar } from '../../icons/halfStar.svg';
import { ReactComponent as EmptyStar } from '../../icons/star.svg';
import { IconContext } from 'react-icons';
import { FaRegStar } from 'react-icons/fa';

// <MenuButton
// >
//   {icon}
// </MenuButton>
const PriorityButton = ({
  icon,
  current,
  align,
  selectedPriority,
  selectPriority,
  unselectPriority,
}) => {
  return (
    <Menu
      // className="filterContainer"
      className="priorityMenu"
      align="center"
      position="initial"
      direction="top"
      menuButton={({ open }) => (
        <div>
          <h3 className="title-add-details">Priority</h3>
          <div className="priority-add-details">
            <div className="wrapper-box flex-box">
              <IconContext.Provider
                value={{
                  color: selectedPriority ===1 ? '#D4AF37' :'#858383',
                  size: '24px',
                }}
              >
                {!selectedPriority ? (
                  <FaRegStar />
                ) : selectedPriority === 1 ? (
                  <FaRegStar/>
                ) : selectedPriority === 3 ? (
                  <HalfStar />
                ) : (
                  <FullStar />
                )}
              </IconContext.Provider>
            </div>
            <h4 className="title-add-details placeholder">
              {!selectedPriority ? (
                <span>Set Priority</span>
              ) : selectedPriority === 1 ? (
                <span>Low Priority</span>
              ) : selectedPriority === 3 ? (
                <span>Medium Priority</span>
              ) : (
                <span>High Priority</span>
              )}
            </h4>
          </div>
        </div>
      )}
    >
      <MenuItem
        className="filterItem"
        key="high"
        onClick={() => selectPriority(5)}
      >
        <FullStar /> High Priority
      </MenuItem>
      <MenuItem
        className="filterItem"
        key="medium"
        onClick={() => selectPriority(3)}
      >
        <HalfStar /> Medium Priority
      </MenuItem>
      <MenuItem
        className="filterItem"
        key="low"
        onClick={() => selectPriority(1)}
      >
        <EmptyStar className="emptyStar" /> Low Priority
      </MenuItem>
      <MenuItem
        className="filterItem"
        key="notSet"
        onClick={() => unselectPriority()}
      >
        <EmptyStar className="emptyStar" style={{ visibility: 'hidden' }} /> Not
        Set
      </MenuItem>
    </Menu>
  );
};
export default PriorityButton;
