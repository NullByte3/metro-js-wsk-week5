import React from 'react';
import { useUserContext } from '../hooks/contextHooks';

const Profile = () => {
  const { user } = useUserContext();

  return (
    <div>
      <h2>Profile</h2>
      {user && (
        <>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </>
      )}
    </div>
  );
};

export default Profile;
