import React, { forwardRef, useEffect, useRef } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Menu, MenuItem, MenuButton, MenuDivider, FocusableItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

import './styles.scss';
import { DropdownContainer } from './styles';
import { Checkbox } from '@material-ui/core';
import { ReactComponent as CheckboxDefault } from '../../icons/projectCheckboxDefault.svg';
import { ReactComponent as CheckboxChecked } from '../../icons/projectCheckboxChecked.svg';

const Dropdown = ({ onClick, isWhite, current, options, onSetAll }) => {

  return (
    <DropdownContainer>
      <Menu
        className={isWhite ? 'menuWhiteContainer' : 'menuContainer'}
        menuButton={({ open }) => (
          <MenuButton className={Object.keys(current.doctype).length !== 0 ? "menuButton" : "menuButton empty"}>
            {Object.keys(current.doctype).length === 0 ? "Select type" : `${current.doctype.text}`} {!open ? <FiChevronDown /> : <FiChevronUp />}
          </MenuButton>
        )}
        align="end"
      >
        <FocusableItem>
          <Checkbox
            checked={current.checked}
            onChange={(e) => onSetAll(current)}
            icon={<CheckboxDefault />}
            checkedIcon={<CheckboxChecked />}
          />
          Apply this type to all
        </FocusableItem>
        <MenuDivider />
        {options.map((item) => (
          <MenuItem
            onClick={(e) => onClick(item)}
            className="default"
            key={item.value}
            value={item.value}
          >
            {item.icon}
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </DropdownContainer>
  );
};

export default Dropdown;
