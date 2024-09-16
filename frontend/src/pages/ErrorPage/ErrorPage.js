import { useNavigate } from 'react-router-dom'

import styles from './ErrorPage.module.scss'

export default function ErrorPage() {
  const navigate = useNavigate()

  const checkAuth = () => {
    if (sessionStorage.getItem('auth') !== null) {
      navigate('/profile')
    } else {
      navigate('/')
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h2>Ошибка</h2>
        {/* <p>Что-то пошло не так...</p> */}
        <p>Такой страницы не существует</p>
        <button onClick={() => checkAuth()}>На главную</button>
      </div>
    </div>
  )
}
