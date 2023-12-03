const GetLoginAsync = async () => {
  try {
    const res = await fetch('https://localhost:7215/User/login', {
      method: 'POST',
    })
    const data = await res.json()
    return data
  } catch (err) {
    console.error(err)
  }
}

const GetRegisterAsync = async () => {
  try {
    const res = await fetch('https://localhost:7215/User/register', {
      method: 'POST',
    })
    const data = await res.json()
    return data
  } catch (err) {
    console.error(err)
  }
}
const GetAllUsersAsync = async () => {
  try {
    const res = await fetch('https://localhost:7215/User/GetAllUsers', {
      method: 'GET',
    })
    const data = await res.json()
    return data
  } catch (err) {
    console.error(err)
  }
}
