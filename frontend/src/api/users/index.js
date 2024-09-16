export const getUserInformation = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/api/getUserInfo/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${sessionStorage.getItem('auth')}`,
      },
    })
    const result = await res.json()
    if (res.status === 200) {
      return result.data
    } else {
      throw new Error('ERROR')
    }
  } catch (error) {
    throw new Error(error)
  }
}
