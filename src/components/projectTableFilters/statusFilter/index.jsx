import React from 'react';
import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';

import '@szhsin/react-menu/dist/index.css';
import '../styles.scss';

const StatusFilter = ({
  icon,
  current,
  align,
  selectedStatus,
  options,
  onClick,
  unselectStatus,
}) => {
  return (
    <Menu
      className="filterContainer"
      align={align}
      menuButton={({ open }) => (
        <MenuButton
          className={
            open && !selectedStatus
              ? 'openFilterButton'
              : !selectedStatus
              ? 'filterButton'
              : 'selectedStatus'
          }
        >
          {!selectedStatus ? (
            <>
              {icon} {current}
            </>
          ) : (
            <>
              <p>{selectedStatus} </p>
              <span onClick={() => unselectStatus()}> Clear Filter</span>
            </>
          )}
        </MenuButton>
      )}
    >
      {options.map((status) => (
        <MenuItem
          onClick={() => onClick(status)}
          key={status}
          className="filterItem"
        >
          <p>{status}</p>
        </MenuItem>
      ))}
    </Menu>
  );
};
export default StatusFilter;
