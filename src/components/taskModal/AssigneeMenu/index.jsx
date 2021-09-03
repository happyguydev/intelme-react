import React, { useState, useRef, useEffect } from 'react';
import './style.scss';
import { FaRegStar } from 'react-icons/fa';
import { FiCalendar } from 'react-icons/fi';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import {
  FocusableItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuGroup,
} from '@szhsin/react-menu';
import Avatar from '../../avatar';
import { InputAdornment, TextField } from '@material-ui/core';
import { ReactComponent as SearchIcon } from '../../icons/black-search.svg';
import Tooltip from '@material-ui/core/Tooltip';

export default function Assignee({
  icon,
  current,
  align,
  hasFilter,
  options,
  onClick,
  unselectAssignee,
  selectedAssignee,
  assigneeOptions,
}) {
  const [filter, setFilter] = useState('');
  const [hoverStatus, setHover] = useState(true);
  const userNameRef = useRef();

  const assigneesFilteredOptions = assigneeOptions?.filter((assignee) =>
    assignee?.firstName
      ? assignee?.firstName
          ?.concat(' ', assignee.lastName)
          .toUpperCase()
          .includes(filter.trim().toUpperCase())
      : assignee?.username.toLowerCase().includes(filter.trim().toLowerCase())
  );

  return (
    <Menu
      className="filterContainer"
      align={align}
      menuButton={({ open }) =>
        selectedAssignee ? (
          <div className="avatarContainer">
            <Avatar width="36px" height="36px" userDetails={selectedAssignee} />
            <Tooltip
              placement="top"
              title={
                <span style={{ fontSize: '16px' }}>
                  {selectedAssignee?.firstName
                    ? `${selectedAssignee?.firstName} ${selectedAssignee?.lastName}`
                    : selectedAssignee?.username}
                </span>
              }
              interactive
              // disableHoverListener={!hoverStatus}
            >
              <span className="userName" ref={userNameRef}>
                {selectedAssignee.firstName
                  ? `${selectedAssignee.firstName} ${selectedAssignee.lastName}`
                  : selectedAssignee.username}
              </span>
            </Tooltip>
            <span
              className="times"
              onClick={(e) => {
                e.preventDefault();
                unselectAssignee();
              }}
            >
              &times;
            </span>
          </div>
        ) : (
          <div>
            <div className="content-add-details">
              <div className="wrapper-box flex-box">
                <IconContext.Provider
                  value={{
                    color: '#858383',
                    size: '24px',
                  }}
                >
                  <AiOutlineUserAdd />
                </IconContext.Provider>
              </div>
              <h4 className="title-add-details placeholder">Assignee</h4>
            </div>
          </div>
        )
      }
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
      <MenuGroup>
        {assigneesFilteredOptions?.length > 0 ? (
          assigneesFilteredOptions?.map((item) => {
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
                {item?.firstName
                  ? `${item?.firstName} ${item?.lastName}`
                  : item?.username}
              </MenuItem>
            );
          })
        ) : (
          <MenuItem className="emptyResult">No Results Found</MenuItem>
        )}
      </MenuGroup>
    </Menu>
  );
}
