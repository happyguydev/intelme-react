import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';

import { getProfile } from '../../store/actions/auth';
import { Container } from './styles';
import ProfileCard from '../../components/settings/profileCard';
import EditProfile from '../../components/settings/editCard';

const Settings = () => {
  const [cookies] = useCookies(['intelme']);
  const dispatch = useDispatch();
  const { profile } = useSelector((store) => store.auth);

  useEffect(() => {
    const { username } = cookies;
    dispatch(getProfile({ username }));
  }, []);

  return (
    <>
      {profile && (
        <Container>
          <ProfileCard userDetails={profile} />
          <EditProfile userDetails={profile} />
        </Container>
      )}
    </>
  );
};

export default Settings;
