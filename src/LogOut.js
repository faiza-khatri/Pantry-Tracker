import React from 'react';
import { signOut } from 'firebase/auth';
import configuration from './configuration';


const {cong, auth} = configuration;

const Logout = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error.message);
    }
  };

  return (
    <button onClick={handleLogout}>Sign Out</button>
  );
};

export default Logout;
