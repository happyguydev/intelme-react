import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../components/breadcrumb';
import PeopleSection from '../../components/peopleSection';
import {
  getAllTeams,
  searchForProjects,
  getAllProjects,
} from '../../store/actions/projects';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';

const People = () => {
  const dispatch = useDispatch();
  const { people } = useSelector((state) => state.projects);
  const { teams } = useSelector((state) => state.projects);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getAllProjects = dispatch(searchForProjects({ limit: 80 })).then(
      (res) => {
        setProjects(res);
      }
    );
    Promise.resolve([getAllProjects]);
  }, []);
  return (
    <>
      <Breadcrumb firstLink="/people" />
      <div className="wrapper-people">
        <PeopleSection type="people" data={people} projects={projects} />
        <PeopleSection type="team" data={teams} />
      </div>
    </>
  );
};
export default People;
