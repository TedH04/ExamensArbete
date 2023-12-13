export const GetLoginAsync = async (email, password) => {
  try {
    const res = await fetch('https://localhost:7215/User/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    // Assuming the response is just a JWT string
    const jwtToken = await res.text()
    return jwtToken // Return the JWT token
  } catch (err) {
    console.error('Login failed:', err)
    throw err
  }
}

export const GetRegisterAsync = async (userData) => {
  try {
    const res = await fetch('https://localhost:7215/User/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const jwtToken = await res.text() // Get the JWT token as a string
    return jwtToken // Return the JWT token
  } catch (err) {
    console.error('Registration failed:', err)
    throw err
  }
}

export const GetAllUsersAsync = async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch('https://localhost:7215/User/GetAllUsers', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await res.json()
    return data
  } catch (err) {
    console.error(err)
  }
}
