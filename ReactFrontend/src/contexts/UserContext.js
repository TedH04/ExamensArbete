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
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [error, setError] = useState(null)

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwt_decode(token)
        setCurrentUser({
          name: decodedToken[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
          ],
          email:
            decodedToken[
              'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
            ],
          role: decodedToken[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
          ],
        })
      } catch (error) {
        console.error('Error decoding token:', error)
        setError(error)
      }
    }
  }, [token])

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
      const jwtToken = await GetLoginAsync(email, password)
      localStorage.setItem('token', jwtToken)
      setToken(jwtToken)
    } catch (err) {
      setError('Login failed: ' + err.message)
      console.error('Login failed:', err)
      throw err
    }
  }

  const register = async (userData) => {
    try {
      const jwtToken = await GetRegisterAsync(userData)
      localStorage.setItem('token', jwtToken)
      setToken(jwtToken)
    } catch (err) {
      setError('Registration failed: ' + err.message)
      console.error('Registration failed:', err)
      throw err
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
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
