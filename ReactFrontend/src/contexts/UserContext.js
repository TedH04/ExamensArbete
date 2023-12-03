import React, { createContext, useState, useEffect } from 'react';

// Import your user service functions
import { GetLoginAsync, GetRegisterAsync, GetAllUsersAsync } from '../services/UserService'; // Adjust the path as necessary

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  // Fetch all users on component mount
  useEffect(() => {
    refreshUsers();
  }, []);

  const refreshUsers = async () => {
    try {
      const data = await GetAllUsersAsync();
      setUsers(data);
    } catch (err) {
      setError(err);
      console.error(err);
    }
  };

  const login = async () => {
    try {
      const user = await GetLoginAsync();
      setCurrentUser(user);
    } catch (err) {
      setError(err);
      console.error(err);
    }
  };

  const register = async () => {
    try {
      const user = await GetRegisterAsync();
      setCurrentUser(user);
    } catch (err) {
      setError(err);
      console.error(err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        currentUser,
        error,
        login,
        register,
        refreshUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
