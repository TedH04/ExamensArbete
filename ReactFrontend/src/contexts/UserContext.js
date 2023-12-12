import React, { createContext, useState, useEffect } from 'react'
import { jwtDecode as jwt_decode } from 'jwt-decode'
import {
  GetLoginAsync,
  GetRegisterAsync,
  GetAllUsersAsync,
} from '../services/UserService' // Adjust the path as necessary

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decodedToken = jwt_decode(token) // Make sure jwt_decode is correctly imported
        const userName =
          decodedToken[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
          ]
        setCurrentUser({ name: userName }) // Set the user with the decoded name
      } catch (error) {
        console.error('Error decoding token:', error)
      }
    }
  }, [])

  const refreshUsers = async () => {
    try {
      const data = await GetAllUsersAsync()
      setUsers(data)
    } catch (err) {
      setError(err)
      console.error(err)
    }
  }

  const login = async (email, password) => {
    try {
      const token = await GetLoginAsync(email, password)
      if (token) {
        const user = jwt_decode(token)
        setCurrentUser(user)
        localStorage.setItem('token', token)
      } else {
        throw new Error('Invalid login credentials')
      }
    } catch (err) {
      setError(err.message || 'An error occurred during login')
      throw err
    }
  }

  const register = async () => {
    try {
      const user = await GetRegisterAsync()
      setCurrentUser(user)
    } catch (err) {
      setError(err)
      console.error(err)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setCurrentUser(null)
  }

  return (
    <UserContext.Provider
      value={{
        users,
        currentUser,
        error,
        login,
        register,
        logout,
        refreshUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
