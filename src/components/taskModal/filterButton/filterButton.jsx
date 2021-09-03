import { FocusableItem, Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import React, { useState } from 'react';
import '@szhsin/react-menu/dist/index.css';
import './styles.scss';
import { InputAdornment, TextField } from '@material-ui/core';
import { ReactComponent as SearchIcon } from '../../icons/black-search.svg';
import Avatar from '../../avatar';

const FilterButton = ({
  icon,
  current,
  align,
  hasFilter,
  options,
  projectOptions,
  selectedProject,
  onClick,
  unselectProject,
  unselectAssignee,
  selectedAssignee,
  assigneeOptions,
}) => {
  const [filter, setFilter] = useState('');

  const filteredOptions = options?.filter((item) =>
    item?.value?.toUpperCase().includes(filter.trim().toUpperCase())
  );

  const filteredProjectOptions = projectOptions?.filter((item) =>
    item.name?.toUpperCase().includes(filter.trim().toUpperCase())
  );

  const assigneesFilteredOptions = assigneeOptions?.filter((item) =>
    item.firstName
      .concat(' ', item.lastName)
      .toUpperCase()
      .includes(filter.trim().toUpperCase())
  );

  return (
    <>
      {options ? (
        <Menu
          className="filterContainer"
          align={align}
          menuButton={({ open }) => (
            <MenuButton className={open ? 'openFilterButton' : 'filterButton'}>
              {icon} {current}
            </MenuButton>
          )}
          onChange={(e) => e.open && setFilter('')}
        >
          {hasFilter ? (
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
                    startAdornment: (
                      <InputAdornment position="start" className="searchIcon">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => setFilter(e.target.value)}
                />
              )}
            </FocusableItem>
          ) : null}

          {filteredOptions.length > 0 ? (
            filteredOptions.map((item) => {
              return (
                <MenuItem className="filterItem" key={item.value}>
                  <p>{item.value}</p>
                </MenuItem>
              );
            })
          ) : (
            <MenuItem className="emptyResult">No Results Found</MenuItem>
          )}
        </Menu>
      ) : !options && assigneeOptions ? (
        <Menu
          className="filterContainer"
          align={align}
          menuButton={({ open }) => (
            <MenuButton
              className={
                open && !selectedAssignee
                  ? 'openFilterButton'
                  : !selectedAssignee
                  ? 'filterButton'
                  : 'selected'
              }
            >
              {icon}
              {!selectedAssignee ? (
                current
              ) : (
                <>
                  <p>
                    {selectedAssignee.firstName} {selectedAssignee.lastName}
                  </p>
                  <span
                    onClick={() => unselectAssignee()}
                    className="clearFilter"
                  >
                    Clear Filter
                  </span>
                </>
              )}
            </MenuButton>
          )}
          onChange={(e) => e.open && setFilter('')}
        >
          {hasFilter ? (
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
                    startAdornment: (
                      <InputAdornment position="start" className="searchIcon">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => setFilter(e.target.value)}
                />
              )}
            </FocusableItem>
          ) : null}

          {assigneesFilteredOptions.length > 0 ? (
            assigneesFilteredOptions.map((item) => {
              return (
                <MenuItem
                  onClick={() => onClick(item)}
                  className="filterAvatar"
                  key={item.email}
                >
                  <Avatar
                    width="1.5rem"
                    height="1.5rem"
                    fontSize="0.75rem"
                    userDetails={item}
                  />
                  {item.firstName} {item.lastName}
                </MenuItem>
              );
            })
          ) : (
            <MenuItem className="emptyResult">No Results Found</MenuItem>
          )}
        </Menu>
      ) : projectOptions ? (
        <Menu
          className="filterContainer"
          align={align}
          menuButton={({ open }) => (
            <MenuButton
              className={
                open && !selectedProject
                  ? 'openFilterButton'
                  : !selectedProject
                  ? 'filterButton'
                  : 'selected'
              }
            >
              {icon}
              {!selectedProject ? (
                current
              ) : (
                <>
                  <p>{selectedProject.name}</p>
                  <span
                    onClick={() => unselectProject()}
                    className="clearFilter"
                  >
                    Clear Filter
                  </span>
                </>
              )}
            </MenuButton>
          )}
          onChange={(e) => e.open && setFilter('')}
        >
          {hasFilter ? (
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
                    startAdornment: (
                      <InputAdornment position="start" className="searchIcon">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => setFilter(e.target.value)}
                />
              )}
            </FocusableItem>
          ) : null}

          {filteredProjectOptions.length > 0 ? (
            filteredProjectOptions.map((item) => {
              return (
                <MenuItem
                  onClick={() => onClick(item)}
                  className="filterItem"
                  key={item.id}
                >
                  <p>{item.name}</p>
                </MenuItem>
              );
            })
          ) : (
            <MenuItem className="emptyResult">No Results Found</MenuItem>
          )}
        </Menu>
      ) : null}
    </>
  );
};

export default FilterButton;
