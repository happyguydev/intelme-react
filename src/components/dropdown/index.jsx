import React, { useRef, useState } from 'react';
import { FiChevronDown, FiChevronUp, FiFile, FiX } from 'react-icons/fi';
import {
  Menu,
  MenuItem,
  MenuRadioGroup,
  MenuButton,
  FocusableItem,
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import './styles.scss';
import { TextField, InputAdornment } from '@material-ui/core';
import { ReactComponent as SearchIcon } from '../icons/black-search.svg';

const Dropdown = ({
  onClick,
  isWhite,
  current,
  options,
  isProject,
  selectedProject,
  unselectProject,
}) => {
  const [filter, setFilter] = useState('');

  const filterProjects = options?.filter((project) =>
    project.name?.toUpperCase().includes(filter.trim().toUpperCase())
  );

  return (
    <>
      {!isProject ? (
        <Menu
          className={isWhite ? 'menuWhiteContainer' : 'menuContainer'}
          menuButton={({ open }) => (
            <MenuButton className="dropdowwButton">
              {current} {!open ? <FiChevronDown /> : <FiChevronUp />}
            </MenuButton>
          )}
        >
          {options
            .filter((item) => item.value !== current)
            .map((item) => (
              <MenuItem
                onClick={(e) => onClick(e.value)}
                className={current === item.value ? 'active' : 'default'}
                key={item.value}
                value={item.value}
              >
                {item.value}
              </MenuItem>
            ))}
        </Menu>
      ) : (
        <Menu
          className={isWhite ? 'menuWhiteContainer' : 'menuContainer'}
          menuButton={() => (
            <MenuButton className="projectFilterButton">
              {!selectedProject ? (
                <>
                  <FiFile />
                  {current}
                </>
              ) : (
                <div className="selectedProjectName">
                  <span>{selectedProject?.name}</span>
                  <span
                    className="removeProject"
                    onClick={() => unselectProject()}
                  >
                    <FiX />
                  </span>
                </div>
              )}
            </MenuButton>
          )}
          onChange={(e) => e.open && setFilter('')}
        >
          <FocusableItem>
            {isProject && (
              <InputAdornment position="start" className="searchIcon">
                <SearchIcon />
              </InputAdornment>
            )}

            <TextField
              type="text"
              classes={{
                root: 'inputContainer',
              }}
              value={filter}
              fullWidth
              inputProps={{
                className: 'input',
                placeholder: 'Search Projects...',
              }}
              InputProps={{
                disableUnderline: true,
              }}
              onChange={(e) => setFilter(e.target.value)}
            />
          </FocusableItem>
          {filterProjects?.length === 0 ? (
            <MenuItem className="emptyResult">No Projects Found.</MenuItem>
          ) : (
            filterProjects?.map((item) => (
              <MenuItem
                onClick={() => {
                  onClick(item);
                }}
                className="filterItem"
                key={item?.id}
              >
                <p>{item?.name}</p>
              </MenuItem>
            ))
          )}
        </Menu>
      )}
    </>
  );
};

export default Dropdown;
