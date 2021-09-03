import React from 'react';
import PeopleSection from './styles';
import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import { ReactComponent as ChevronUp } from '../icons/ArrowV2.svg';

const ToReview = () => {
  const styles = PeopleSection();

  return (
    <div className={styles.dropDownContainer}>
      <Menu
        className={styles.dropDownWrapper}
        menuButton={
          <MenuButton className={styles.teamBtn}>
            <p className="primary-text">My Teams</p>
            <ChevronUp />
          </MenuButton>
        }
      >
        <MenuItem>
          <p className="primary-text">All Teams</p>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ToReview;
