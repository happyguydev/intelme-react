import React, { Fragment, useState } from 'react';
import { ReactComponent as SearchIcon } from '../icons/black-search.svg';
import { CircularProgress, InputAdornment, TextField } from '@material-ui/core';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Collapse,
} from '@material-ui/core';
import listStyles, {
  EmptyContainer,
  ListContainer,
  ListHeader,
  TabContainer,
} from './styles';
import Button from '../button';
import UserSelectorItem from '../userSelectorItem';
import { ChatBubbleOutlineOutlined, MessageOutlined } from '@material-ui/icons';

import Avatar from '../avatar';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllPeople,
  getAllTeams,
  searchAllTeamUsers,
} from '../../store/actions/projects';
import CustomCheckbox from '../checkbox';
import { CLEAR_TEAM_MEMBERS } from '../../store/types';

const UserSelector = ({
  visible,
  data,
  emptyText,
  selectable,
  onClickAction,
  checked,
  currentSelected,
  transform,
  onlyMembers,
  onClick,
}) => {
  const styles = listStyles();
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingTeamMembers, setLoadingTeamMembers] = useState(false);
  const [currentTeam, setCurrentTeam] = useState('');
  const dispatch = useDispatch();
  const { teamMembers } = useSelector((state) => state.projects);

  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState('Members');

  const handleClickCollapse = async (teamId) => {
    if (currentTeam === teamId) {
      dispatch({
        type: CLEAR_TEAM_MEMBERS,
      });
      setCurrentTeam('');
    } else {
      setLoadingTeamMembers(true);
      setCurrentTeam(teamId);
      dispatch(searchAllTeamUsers({ teamId })).then((res) => {
        setLoadingTeamMembers(false);
      });
    }
  };

  const filteredData =
    selected === 'Teams'
      ? data?.teams?.filter((team) =>
          team?.name?.toLowerCase().includes(filter.trim().toLowerCase())
        )
      : data?.people?.filter((person) =>
          person?.firstName
            ? person?.firstName
                ?.concat(' ', person?.lastName)
                .toLowerCase()
                .includes(filter.trim().toLowerCase())
            : person?.username
                .toLowerCase()
                .includes(filter.trim().toLowerCase())
        );

  const handleChange = (e) => {
    setSelected(e.target.name);
    setLoading(true);
    if (
      e.target.name === 'Teams' &&
      data?.teams?.length === 0 &&
      !onlyMembers
    ) {
      dispatch(getAllTeams()).then((res) => {
        setLoading(false);
      });
    } else if (e.target.name === 'Members' && data?.people?.length === 0) {
      dispatch(getAllPeople()).then(() => setLoading(false));
    }
    console.log(data);
    setLoading(false);
  };

  return (
    <>
      {visible ? (
        <ListContainer
          transform={transform}
          className={styles.selectorContainer}
        >
          <ListHeader>
            <TextField
              type="text"
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
          </ListHeader>
          <TabContainer>
            <button
              name="Members"
              onClick={(e) => handleChange(e)}
              className={selected === 'Members' ? 'active' : ''}
            >
              Members
            </button>
            <button
              name="Teams"
              onClick={(e) => handleChange(e)}
              className={selected === 'Teams' ? 'active' : ''}
            >
              Teams
            </button>
          </TabContainer>
          <List dense={false} disablePadding className={styles.list}>
            {data?.length === 0 ? (
              <EmptyContainer>
                {selected === 'Teams'
                  ? 'There are no teams.'
                  : 'There are no members.'}
              </EmptyContainer>
            ) : loading ? (
              <CircularProgress />
            ) : selected === 'Teams' ? (
              filteredData?.length === 0 ? (
                <span className={styles.noResults}>No Results Found</span>
              ) : (
                filteredData?.map((team) => (
                  <Fragment key={team.teamId}>
                    <ListItem
                      className={
                        team.teamId === currentTeam
                          ? 'collapsedTeamTitle'
                          : 'teamTitle'
                      }
                      disableRipple
                      button
                    >
                      {selectable ? (
                        <CustomCheckbox
                          handleChange={(e) =>
                            onClickAction(team, 'team', e.target.checked)
                          }
                          checked={checked(team, undefined)}
                        />
                      ) : null}

                      <ListItemText
                        className={selectable ? 'hasMargin' : ''}
                        primary={team.name}
                        onClick={() => handleClickCollapse(team?.teamId)}
                      />
                      {team.name &&
                        (team.teamId === currentTeam ? (
                          <ExpandLess
                            onClick={() => handleClickCollapse(team?.teamId)}
                          />
                        ) : (
                          <ExpandMore
                            onClick={() => handleClickCollapse(team?.teamId)}
                          />
                        ))}
                    </ListItem>
                    <Collapse
                      in={currentTeam === team?.teamId}
                      timeout="auto"
                      unmountOnExit
                    >
                      {team.name &&
                      team.teamId === currentTeam &&
                      loadingTeamMembers ? (
                        <CircularProgress className={styles.progress} />
                      ) : (
                        teamMembers?.map((person) => (
                          <Fragment key={person?.username}>
                            <UserSelectorItem>
                              <ListItemAvatar className={styles.listItemAvatar}>
                                <Avatar
                                  userDetails={person}
                                  height="1.5rem"
                                  width="1.5rem"
                                  fontSize="0.75rem"
                                />
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                  <span>
                                    {person?.firstName
                                      ? `${person?.firstName} ${person?.lastName}`
                                      : person?.username}
                                  </span>
                                }
                              />
                            </UserSelectorItem>
                          </Fragment>
                        ))
                      )}
                    </Collapse>
                  </Fragment>
                ))
              )
            ) : filteredData?.length === 0 ? (
              <span className={styles.noResults}>No Results Found</span>
            ) : (
              filteredData?.map((person) => (
                <Fragment key={person?.username}>
                  <UserSelectorItem
                    onClick={() =>
                      onClick
                        ? onClickAction(person, 'people', undefined)
                        : null
                    }
                  >
                    {selectable ? (
                      <CustomCheckbox
                        handleChange={(e) =>
                          onClickAction(person, 'people', e.target.checked)
                        }
                        checked={checked(undefined, person)}
                      />
                    ) : null}
                    <ListItemAvatar className={styles.listItemAvatar}>
                      <Avatar
                        userDetails={person}
                        height="1.5rem"
                        width="1.5rem"
                        fontSize="0.75rem"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <span className="people-list">
                          {person?.firstName
                            ? `${person?.firstName} ${person?.lastName}`
                            : person?.username}
                        </span>
                      }
                    />
                  </UserSelectorItem>
                </Fragment>
              ))
            )}
          </List>
        </ListContainer>
      ) : null}
    </>
  );
};

export default UserSelector;
