import React from 'react';
import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';

import '@szhsin/react-menu/dist/index.css';
import '../styles.scss';

const OtherFilters = ({ icon, current, align }) => {
  const options = ['In Charge', 'Updated', 'Address', 'Files I follow'];
  return (
    <Menu
      className="filterContainer"
      align={align}
      menuButton={({ open }) => (
        <MenuButton className={open ? 'openFilterButton' : 'filterButton'}>
          {icon} {current}
        </MenuButton>
      )}
    >
      {options.map((status) => (
        <MenuItem key={status} className="filterItem">
          <p>{status}</p>
        </MenuItem>
      ))}
    </Menu>
  );
};
export default OtherFilters;
