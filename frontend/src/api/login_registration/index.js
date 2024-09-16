const url = 'http://localhost:5000/api'

export const sendLogin = async (login, password) => {
  try {
    const res = await fetch(`${url}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        login: login,
        password: password,
      }),
    })
    const result = await res.json()
    if (res.ok) {
      return result
    } else {
      throw new Error(`Ошибка входа: ${result.message}`)
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const userRegistration = async (user) => {
  const { name, birth, login, password } = user
  try {
    const res = await fetch(`${url}/registration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        name: name,
        birth: birth,
        login: login,
        password: password,
      }),
    })

    const result = await res.json()

    if (res.status === 200) {
      return result
    } else {
      throw new Error(`Ошибка регистрации: ${result.message}`)
    }
  } catch (error) {
    throw new Error(error)
  }
}
