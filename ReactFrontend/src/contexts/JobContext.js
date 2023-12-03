import React, { createContext, useState, useEffect } from 'react'

// Import your job service functions
import {
  GetCreateJobRequestAsync,
  GetAllJobRequestsAsync,
  GetDeleteJobRequestAsync,
} from '../services/JobService' // Adjust the path as necessary

export const JobContext = createContext()

export const JobContextProvider = ({ children }) => {
  const [jobRequests, setJobRequests] = useState([])
  const [error, setError] = useState(null)

  // Fetch all job requests on component mount
  useEffect(() => {
    refreshJobRequests()
  }, [])

  const refreshJobRequests = async () => {
    try {
      const data = await GetAllJobRequestsAsync()
      setJobRequests(data)
    } catch (err) {
      setError(err)
      console.error(err)
    }
  }

  const createJobRequest = async () => {
    try {
      await GetCreateJobRequestAsync()
      await refreshJobRequests()
    } catch (err) {
      setError(err)
      console.error(err)
    }
  }

  const deleteJobRequest = async (index) => {
    try {
      await GetDeleteJobRequestAsync(index)
      await refreshJobRequests()
    } catch (err) {
      setError(err)
      console.error(err)
    }
  }

  return (
    <JobContext.Provider
      value={{
        jobRequests,
        createJobRequest,
        deleteJobRequest,
        refreshJobRequests,
        error,
      }}
    >
      {children}
    </JobContext.Provider>
  )
}

export default JobContextProvider
