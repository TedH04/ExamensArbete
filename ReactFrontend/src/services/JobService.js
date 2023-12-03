const GetCreateJobRequestAsync = async () => {
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

const GetAllJobRequestsAsync = async () => {
  try {
    const res = await fetch('https://localhost:7215/Jobs/GetAllJobRequests', {
      method: 'GET',
    })
    const data = await res.json()
    return data
  } catch (err) {
    console.error(err)
  }
}
const GetDeleteJobRequestAsync = async (index) => {
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
