import { useSelector } from 'react-redux';
import AuthRoutes from './auth';
import GuestRoutes from './guest';

const Routes = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <GuestRoutes user={user} />
      <AuthRoutes user={user} />
    </>
  );
};

export default Routes;
