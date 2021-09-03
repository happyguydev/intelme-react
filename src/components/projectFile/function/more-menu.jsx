import React, { useState } from 'react';
import { ArrowDropUp } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

import { ReactComponent as MoreVert } from '../../icons/three-vertical-dots.svg';

import {
  MoreMenuViewContainer,
  StyledMenu,
  StyledMenuItem,
} from './more-menu-styles';

const MoreMenu = ({ row, onSearchMatchingFiles, onSearchRivisionHistory, onProjectDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onProjectOpen = () => {
    onProjectDelete();
  };

  return (
    <MoreMenuViewContainer>
      <IconButton
        className="more-icon"
        aria-label="more"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <ArrowDropUp />
        <StyledMenuItem>
          <div onClick={onSearchMatchingFiles}>
            See matching files
          </div>
        </StyledMenuItem>
        <StyledMenuItem>
          <div onClick={onSearchRivisionHistory}>
            Revision history
          </div>
        </StyledMenuItem>
        <StyledMenuItem>
          <div onClick={onProjectOpen}>
            Delete
          </div>
        </StyledMenuItem>
      </StyledMenu>
    </MoreMenuViewContainer>
  );
};

export default MoreMenu;
