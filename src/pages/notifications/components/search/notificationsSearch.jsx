import { InputBase, Paper } from '@material-ui/core';
import React from 'react';

import searchContainerStyles from './styles';

import { ReactComponent as SearchIcon } from '../../../../components/icons/black-search.svg';
import Dropdown from '../../../../components/dropdown';
import { FiFile } from 'react-icons/fi';
import FilterButton from '../../../../components/tableFilters/filterButton/filterButton';

const NotificationsSearchContainer = (props) => {
  const styles = searchContainerStyles();
  const {
    order,
    changeOrder,
    type,
    changeType,
    typeValues,
    orderValues,
    onSearch,
    projectOptions,
    unselectProject,
    selectProject,
    selectedProject,
  } = props;
  return (
    <div className={styles.wrapper}>
      <Paper component="form" className={styles.root}>
        <SearchIcon />
        <InputBase
          placeholder="Search all notifications..."
          className={styles.searchInput}
          onInput={(e) => onSearch(e.target.value)}
          inputProps={{ 'arial-label': 'search-notifications' }}
        />
      </Paper>
      <div className={styles.container}>
        <Dropdown
          current={order}
          isWhite
          onClick={changeOrder}
          options={orderValues}
        />
        <Dropdown
          isProject
          current="Project"
          selectedProject={selectedProject}
          unselectProject={unselectProject}
          options={projectOptions}
          onClick={selectProject}
          isWhite
        />

        <Dropdown
          current={type}
          isWhite
          onClick={changeType}
          options={typeValues}
        />
      </div>
    </div>
  );
};

export default NotificationsSearchContainer;
