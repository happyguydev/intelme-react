import React, { useRef, useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Menu, MenuItem, MenuRadioGroup, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import './styles.scss';

const Dropdown = ({ onClick, isWhite, current, options, parent }) => {
  return (
    <Menu
      className={`${isWhite ? 'menuWhiteContainer' : 'menuContainer'} ${
        parent && parent
      }`}
      menuButton={({ open }) => (
        <MenuButton
          className={current !== '' ? 'menuButton' : 'menuButton empty'}
        >
          {current === '' ? <p>Select Project</p> : <p>{current}</p>}{' '}
          {!open ? <FiChevronDown /> : <FiChevronUp />}
        </MenuButton>
      )}
    >
      {options.map((item) => (
        <MenuItem
          onClick={() => onClick({ id: item?.id, name: item?.name })}
          className={current === item?.name ? 'active' : 'default'}
          key={item?.number}
          value={item?.id}
        >
          {item.name}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default Dropdown;
