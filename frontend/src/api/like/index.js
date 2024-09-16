const url = 'http://localhost:5000/api'

export const likeFunction = async (id, decode) => {
  try {
    const res = await fetch(`${url}/like`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${sessionStorage.getItem('auth')}`,
      },
      body: JSON.stringify({
        userId: decode.id,
        postId: id,
      }),
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

export const allLikes = async () => {
  try {
    const res = await fetch(`${url}/getLike`, {
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
