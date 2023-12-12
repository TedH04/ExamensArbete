export const GetCreateJobRequestAsync = async () => {
  try {
    const res = await fetch('https://localhost:7215/Jobs/CreateJobRequest', {
      method: 'POST',
    })
    const data = await res.json()
    return data
  } catch (err) {
    console.error(err)
  }
}

export const GetAllJobRequestsAsync = async () => {
  try {
    const res = await fetch('https://localhost:7215/Jobs/GetAllJobRequests', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Add this line if your endpoint requires an Auth header
      },
    })
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    const data = await res.json()
    return data
  } catch (err) {
    console.error('Failed to get job requests:', err)
    throw err // make sure to throw the error so it can be caught in calling function
  }
}
export const GetDeleteJobRequestAsync = async (index) => {
  try {
    const res = await fetch(
      `https://localhost:7215/Jobs/DeleteJobRequest/?index=${index}`,
      {
        method: 'DELETE',
      }
    )
    const data = await res.json()
    return data
  } catch (err) {
    console.error(err)
  }
}
