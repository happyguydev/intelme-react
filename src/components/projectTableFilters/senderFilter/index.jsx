import React, { useState } from 'react';
import {
  FocusableItem,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
} from '@szhsin/react-menu';

import '@szhsin/react-menu/dist/index.css';
import '../styles.scss';
import { TextField } from '@material-ui/core';

const SenderFilter = ({
  icon,
  current,
  align,
  options,
  onClick,
  selectedSender,
  unselectSender,
}) => {
  const [filter, setFilter] = useState('');
  const filteredOptions = options?.filter((option) =>
    option?.toUpperCase().includes(filter.trim().toUpperCase())
  );
  return (
    <Menu
      className="filterContainer"
      align={align}
      menuButton={({ open }) => (
        <MenuButton
          className={
            open && !selectedSender
              ? 'openFilterButton'
              : !selectedSender
              ? 'filterButton'
              : 'selectedSender'
          }
        >
          {!selectedSender ? (
            <>
              {icon} {current}
            </>
          ) : (
            <>
              <p>{selectedSender} </p>
              <span onClick={() => unselectSender()}> Clear Filter</span>
            </>
          )}
        </MenuButton>
      )}
    >
      <FocusableItem>
        {({ ref }) => (
          <TextField
            type="text"
            ref={ref}
            classes={{
              root: 'inputContainer',
            }}
            value={filter}
            fullWidth
            inputProps={{
              className: 'input',
              placeholder: 'Search...',
            }}
            InputProps={{
              disableUnderline: true,
            }}
            onChange={(e) => setFilter(e.target.value)}
          />
        )}
      </FocusableItem>
      <MenuGroup>
        {filteredOptions?.length === 0 ? (
          <MenuItem className="emptyResult">No Results found.</MenuItem>
        ) : (
          filteredOptions.map((status) => (
            <MenuItem
              onClick={() => onClick(status)}
              key={status}
              className="filterItem"
            >
              <p>{status}</p>
            </MenuItem>
          ))
        )}
      </MenuGroup>
    </Menu>
  );
};
export default SenderFilter;
