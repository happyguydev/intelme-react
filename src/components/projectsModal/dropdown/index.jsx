import React from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import './styles.scss';

const Dropdown = ({ onClick, isWhite, current, options }) => {
  return (
    <Menu
      className={isWhite ? 'menuWhiteContainer' : 'menuContainer'}
      menuButton={({ open }) => (
        <MenuButton
          className={current !== '' ? 'menuButton' : 'menuButton empty'}
        >
          {current === '' ? 'Not Selected' : current}{' '}
          {!open ? <FiChevronDown /> : <FiChevronUp />}
        </MenuButton>
      )}
    >
      {options.map((item) => (
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
  );
};

export default Dropdown;
