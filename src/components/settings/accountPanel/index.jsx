import React, { useState } from 'react';
import ChangePassword from './changePassword';
import EditAccountForm from './editAccountForm';

const AccountPanel = ({ userDetails }) => {
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handlePasswordShow = () => {
    setShowChangePassword(!showChangePassword);
  };

  return (
    <>
      {!showChangePassword ? (
        <EditAccountForm
          userDetails={userDetails}
          onClick={handlePasswordShow}
        />
      ) : (
        <ChangePassword onShowChangePassword={handlePasswordShow} />
      )}
    </>
  );
};

export default AccountPanel;
