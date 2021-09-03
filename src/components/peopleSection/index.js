import React, { useState, useEffect } from 'react';
import './style.css';
import FilterButton from '../tableFilters/filterButton/filterButton';
import Avatar from '../avatar';
import { FiFile } from 'react-icons/fi';
import Button from '../button';
import { BsThreeDotsVertical } from 'react-icons/bs';
import teamListItemStyles, { TeamListItemContainer } from './styles';
import { IconContext } from 'react-icons';
import { ChatBubbleOutlineOutlined } from '@material-ui/icons';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages, readMessage } from '../../store/actions/messages';
import { getProjectByUsername } from '../../services/projects';
import SearchPeople from './searchBar';

const PeopleSection = ({ type, data }) => {
  const [searchValue, setSearchValue] = useState('');
  const [redirect, setRedirect] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userProject, setUserProject] = useState([]);
  const [inChargeProject, setInChargeProject] = useState([]);
  // const [userInChargeProject, setUserInChargeProject] = useState({});
  // const { projects } = useSelector((state) => state.projects);
  // const props = {
  //   color: `#${teamDetail.color ? teamDetail.color : '089BAB'}`,
  // };
  const { projects } = useSelector((state) => state.projects);

  const onSelectSuggestion = (event, { suggestion }) => {
    setSearchValue(suggestion);
  };

  const onChange = (event, { newValue }) => {
    setSearchValue(newValue);
  };

  const teamListItemStyle = teamListItemStyles();
  const redirectUser = () => {
    setRedirect({
      pathname: '/dashboard/notifications',
    });
  };

  const getProject = (username) => {
    setInChargeProject([]);
    setUserProject([]);
    setLoading(true);

    getProjectByUsername({ username }).then((res) => {
      setUserProject([res]);
    });
    getProjectByUsername({ username, ownerId: username }).then((res) => {
      setInChargeProject([res]);
      setLoading(false);
      console.log('>>>', userProject, inChargeProject);
    });
  };

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <div className="container-people-section">
        <h2>{type === 'team' ? 'Teams' : 'People'}</h2>
        <div className="filter-wrapper">
          <SearchPeople
            placeholder={`Search for ${type}...`}
            onChange={onChange}
            searchValue={searchValue}
            data={data}
            // onSelectSuggestion={onSelectSuggestion}
          />
          <FilterButton
            projectOptions={data}
            hasFilter
            current="Project"
            // selectedProject={selectedProject}
            // onClick={selectProject}
            // unselectProject={unselectProject}
            icon={<FiFile />}
          />
          <FilterButton
            projectOptions={data}
            hasFilter
            current="Discipline"
            // selectedProject={selectedProject}
            // onClick={selectProject}
            // unselectProject={unselectProject}
            icon={<FiFile />}
          />
        </div>
        {data.length === 0 ? (
          <div class="empty" className={teamListItemStyle.empty}>
            There are no {type}.
          </div>
        ) : (
          <>
            {data.map((item, index) => (
              <div className="row-wrapper d-flex" key={index}>
                {type === 'people' ? (
                  <div className="user-name d-flex">
                    <Avatar
                      hasOverlay
                      width={'40px'}
                      height={'40px'}
                      userDetails={item}
                    />
                    <h4 className="user-name-full">
                      {item?.firstName && item?.lastName
                        ? item?.firstName + ' ' + item?.lastName
                        : item?.username}
                    </h4>
                  </div>
                ) : (
                  <div className="team-name d-flex">
                    <span
                      className="team-sign"
                      style={{ backgroundColor: `#${item?.color}` }}
                    ></span>
                    <h4>{item?.name}</h4>
                  </div>
                )}
                <div>
                  {type === 'people' ? (
                    item?.settings.jobTitle && (
                      <p className="primary-text">{item?.settings.jobTitle}</p>
                    )
                  ) : (
                    <div className={teamListItemStyle.teamGroup}>
                      <AvatarGroup
                        className={teamListItemStyle.avatarGroup}
                        max={3}
                      >
                        {item?.profiles.map((team, index) => {
                          return (
                            <Avatar
                              width="1.5rem"
                              height="1.5rem"
                              fontSize="0.75rem"
                              key={index}
                              userDetails={team}
                            />
                          );
                        })}
                      </AvatarGroup>
                      <p>
                        {item?.profiles.length <= 3
                          ? item?.profiles.length +
                            (item?.profiles.length === 1
                              ? ' member'
                              : ' members')
                          : '+ ' + item?.profiles.length - 3 + ' others'}
                      </p>
                    </div>
                  )}
                </div>
                <div className="d-flex">
                  <Button
                    onClick={() => redirectUser()}
                    background="#FFF0E8"
                    color="#FF8A47"
                    secondarySmall
                  >
                    <ChatBubbleOutlineOutlined />

                    {type === 'team' ? 'Message All' : 'Message'}
                  </Button>
                  {type === 'people' && (
                    <>
                      <button
                        className="dot-icons"
                        onBlur={() => setShow(false)}
                        onClick={() => {
                          setShow(item?.username);
                          getProject(item?.username);
                        }}
                      >
                        <IconContext.Provider
                          value={{ color: '#858383', size: '18px' }}
                        >
                          <BsThreeDotsVertical style={{ marginLeft: '14px' }} />
                        </IconContext.Provider>
                      </button>

                      {show === item?.username && (
                        <div className="more-details">
                          <div className="wrapper-info">
                            <p className={'primary-text title'}>Projects:</p>
                            {loading ? (
                              <p
                                className="primary-text"
                                style={{ marginLeft: '24px' }}
                              >
                                Loading
                              </p>
                            ) : (
                              <>
                                {userProject.length === 0 ? (
                                  <p className={'primary-text'}>No Projects</p>
                                ) : (
                                  <>
                                    {userProject.map((item) => (
                                      <p className={'primary-text names'}>
                                        {item?.result
                                          .slice(0, 5)
                                          .map((project) => (
                                            <span>{project.name}</span>
                                          ))}
                                        <>
                                          {userProject[0].result.length > 5 && (
                                            <span
                                              style={{
                                                fontSize: '16px',
                                                fontWeight: 500,
                                                marginTop: '9px',
                                                display: 'block',
                                              }}
                                            >
                                              +{item?.total * 1 - 5} Projects
                                            </span>
                                          )}
                                        </>
                                      </p>
                                    ))}
                                  </>
                                )}
                              </>
                            )}
                          </div>
                          <div className="wrapper-info">
                            <p className={'primary-text title'}>In charge:</p>
                            {loading ? (
                              <p
                                className="primary-text"
                                style={{ marginLeft: '24px' }}
                              >
                                Loading
                              </p>
                            ) : (
                              <>
                                {inChargeProject.length === 0 ? (
                                  <p className={'primary-text'}>No Projects</p>
                                ) : (
                                  <>
                                    {inChargeProject.map((item) => (
                                      <p className={'primary-text names'}>
                                        {item?.result
                                          .slice(0, 5)
                                          .map((project) => (
                                            <span>{project.name}</span>
                                          ))}
                                        <>
                                          {inChargeProject[0].result.length >
                                            5 && (
                                            <span
                                              style={{
                                                fontSize: '16px',
                                                fontWeight: 500,
                                                marginTop: '9px',
                                                display: 'block',
                                              }}
                                            >
                                              +{item?.total * 1 - 5} Projects
                                            </span>
                                          )}
                                        </>
                                      </p>
                                    ))}
                                  </>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};
export default PeopleSection;
