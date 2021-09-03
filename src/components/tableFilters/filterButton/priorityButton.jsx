import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import React from 'react';
import '@szhsin/react-menu/dist/index.css';
import './styles.scss';

import { FiStar } from 'react-icons/fi';
import { ReactComponent as FullStar } from '../../icons/fullStar.svg';
import { ReactComponent as HalfStar } from '../../icons/halfStar.svg';
import { ReactComponent as EmptyStar } from '../../icons/star.svg';

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
      className="filterContainer"
      align={align}
      menuButton={({ open }) => (
        <MenuButton
          className={
            open && !selectedPriority
              ? 'openFilterButton'
              : !selectedPriority
              ? 'filterButton'
              : 'selectedPriority'
          }
        >
          {!selectedPriority ? (
            <>
              <FiStar />
              {current}
            </>
          ) : selectedPriority === 1 ? (
            <>
              <EmptyStar className="selectedEmptyStar" />
              <p>Low Priority</p>
              <span onClick={() => unselectPriority()}>Clear Filter</span>
            </>
          ) : selectedPriority === 3 ? (
            <>
              <HalfStar className="selectedHalfStar" />
              <p>Medium Priority</p>
              <span onClick={() => unselectPriority()}>Clear Filter</span>
            </>
          ) : (
            <>
              <FullStar className="selectedFullStar" />
              <p>High Priority</p>
              <span onClick={() => unselectPriority()}>Clear Filter</span>
            </>
          )}
        </MenuButton>
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
  
    </Menu>
  );
};
export default PriorityButton;
