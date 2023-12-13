import React, { createContext, useState, useEffect, useRef } from 'react'
import {
  GetCreateJobRequestAsync,
  GetAllJobRequestsAsync,
  // GetDeleteJobRequestAsync, // Remove if not used
} from '../services/JobService'

export const JobContext = createContext()

export const JobContextProvider = ({ children }) => {
  const [jobRequests, setJobRequests] = useState([])
  const [error, setError] = useState(null)
  const isMounted = useRef(true) // To keep track of whether the component is mounted

  useEffect(() => {
    // ComponentDidMount
    isMounted.current = true // The component is mounted
    refreshJobRequests()

    // ComponentWillUnmount
    return () => {
      isMounted.current = false // The component will unmount
    }
  }, [])

  const refreshJobRequests = async () => {
    try {
      const data = await GetAllJobRequestsAsync()
      if (isMounted.current) {
        setJobRequests(data)
      }
    } catch (err) {
      if (isMounted.current) {
        setError(err)
        console.error(err)
      }
    }
  }

  const createJobRequest = async (jobRequestData) => {
    try {
      await GetCreateJobRequestAsync(jobRequestData)
      if (isMounted.current) {
        await refreshJobRequests()
      }
    } catch (err) {
      if (isMounted.current) {
        setError(err)
        console.error(err)
      }
    }
  }

  const deleteJobRequest = async (jobId) => {
    try {
      const response = await fetch(
        `https://localhost:7215/Jobs/DeleteJobRequest/${jobId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      if (isMounted.current) {
        await refreshJobRequests() // Refresh the list after deletion
      }
    } catch (err) {
      if (isMounted.current) {
        setError(err.message)
        console.error('Error deleting job request:', err)
      }
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
