const url = 'http://localhost:5000/api'

export const getUsersCards = async (id) => {
  try {
    const res = await fetch(`${url}/getUserCards/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${sessionStorage.getItem('auth')}`,
      },
    })
    const result = await res.json()
    if (res.ok) {
      return result.data
    } else {
      throw new Error(`Ошибка: ${result.message}`)
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const getAllCards = async () => {
  try {
    const res = await fetch(`${url}/getAllCards`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${sessionStorage.getItem('auth')}`,
      },
    })
    const result = await res.json()

    if (res.status === 200) {
      return result.data
    } else {
      throw new Error(`Ошибка: ${result.message}`)
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const deleteCard = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/api/deleteCard/${id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${sessionStorage.getItem('auth')}`,
      },
    })
    const result = await res.json()
    if (res.status === 200) {
      return result
    } else {
      throw new Error(result.message)
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const getCardById = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/api/getCardById/${id}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${sessionStorage.getItem('auth')}`,
      },
    })
    const result = await res.json()
    if (res.status === 200) {
      return result.data
    } else {
      throw new Error(result.message)
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const sendCard = async (cardInfo) => {
  const { title, text, date } = cardInfo
  try {
    const res = await fetch('http://localhost:5000/api/addCard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${sessionStorage.getItem('auth')}`,
      },
      body: JSON.stringify({
        title: title,
        text: text,
        createdDate: date,
      }),
    })
    const result = await res.json()
    if (res.status === 200) {
      return result
    }
    throw new Error(result.message)
  } catch (error) {
    throw new Error(error)
  }
}
