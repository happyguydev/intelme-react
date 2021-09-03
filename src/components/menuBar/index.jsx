import React, { Fragment, useEffect, useState } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md/';

import menuStyles, { SelectedItem, Item } from './styles';
import { MenuBarBottomOptions, MenuBarOptions } from './constants';
import { Link, useHistory } from 'react-router-dom';
import { ReactComponent as MenuLogo } from '../icons/menuNoTextLogo.svg';

const MenuBar = () => {
  const classes = menuStyles();
  const [open, setOpen] = React.useState(true);
  const [selected, setSelected] = useState('');
  const history = useHistory();

  const handleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    history.listen((location) => {
      setSelected(location.pathname);
    });
  }, [history]);

  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={open ? classes.toolbar : classes.toolbarClose}>
          <MenuLogo />
          <p>Intelme</p>
          <IconButton disableRipple onClick={handleDrawer}>
            {open ? <MdChevronLeft /> : <MdChevronRight />}
          </IconButton>
        </div>
        <List className={classes.list}>
          {MenuBarOptions.map((option) => {
            const isSelected = history.location.pathname.includes(option.link);
            return (
              <Fragment key={option.label}>
                {isSelected ? (
                  <Link to={option.link}>
                    <SelectedItem>
                      {option.selectedIcon}
                      <div>{option.label}</div>
                    </SelectedItem>
                  </Link>
                ) : (
                  <Link to={option.link}>
                    <Item>
                      {option.neutralIcon}
                      <div> {option.label} </div>
                    </Item>
                  </Link>
                )}
              </Fragment>
            );
          })}
        </List>
        <Divider className={open ? classes.divider : classes.dividerClosed} />
        <List className={classes.list}>
          {MenuBarBottomOptions.map((option, index) => {
            const isSelected = history.location.pathname.includes(option.link);
            return (
              <Fragment key={option.label}>
                {isSelected ? (
                  <Link to={option.link}>
                    <SelectedItem>
                      {option.selectedIcon}
                      <div> {option.label} </div>
                    </SelectedItem>
                  </Link>
                ) : (
                  <Link to={option.link}>
                    <Item>
                      {option.neutralIcon}
                      <div> {option.label} </div>
                    </Item>
                  </Link>
                )}
              </Fragment>
            );
          })}
        </List>
      </Drawer>
    </div>
  );
};

export default MenuBar;
