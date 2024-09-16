export const allComments = async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/getAllComments`, {
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

export const getCommentsById = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/api/getComments/${id}`, {
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

export const addComment = async (obj) => {
  console.log(obj)
  const { postId, userId, text } = obj
  try {
    const res = await fetch(`http://localhost:5000/api/postComment`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${sessionStorage.getItem('auth')}`,
      },
      body: JSON.stringify({
        postId: Number(postId),
        userId: userId,
        text: text,
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
