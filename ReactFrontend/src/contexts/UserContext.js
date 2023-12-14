import React, { createContext, useState, useEffect } from 'react'
import { jwtDecode as jwt_decode } from 'jwt-decode'
import {
  GetLoginAsync,
  GetRegisterAsync,
  GetAllUsersAsync,
} from '../services/UserService'

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decodedToken = jwt_decode(token)

        const userEmail =
          decodedToken[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
          ]
        const userName =
          decodedToken[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
          ]
        const userRole =
          decodedToken[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
          ]

        setCurrentUser({
          name: userName,
          email: userEmail,
          userrole: userRole,
        })
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

  const register = async (userData) => {
    try {
      const token = await GetRegisterAsync(userData)
      if (token) {
        const user = jwt_decode(token)
        setCurrentUser(user)
        localStorage.setItem('token', token)
      }
    } catch (err) {
      setError(err.message || 'An error occurred during registration')
      throw err
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
