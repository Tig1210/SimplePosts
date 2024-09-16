import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useLocation, useNavigate } from 'react-router-dom'

import ButtonNav from '../Buttons/ButtonNav/ButtonNav'

import styles from './Header.module.scss'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const [infoUser, setInfoUser] = useState(null)

  const handleNavigate = (type) => {
    if (type === 'login') {
      navigate('/login')
    } else {
      navigate('/registration')
    }
  }

  const checkPage = (path) => {
    if (location.pathname === path) {
      return true
    } else {
      return false
    }
  }

  const checkToken = () => {
    if (sessionStorage.getItem('auth') === null) {
      return
    } else {
      setInfoUser(jwtDecode(sessionStorage.getItem('auth')))
    }
  }

  useEffect(() => {
    checkToken()
  }, [])

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        {infoUser === null ? (
          <>
            <div className={styles.logo} onClick={() => navigate('/')}>
              LOGO
            </div>
            <div className={styles.navigation}>
              <ButtonNav
                title={'Войти'}
                onClick={() => handleNavigate('login')}
                disabled={checkPage('/login')}
              />
              <ButtonNav
                title={'Регистрация'}
                onClick={() => handleNavigate()}
                disabled={checkPage('/registration')}
              />
            </div>
          </>
        ) : (
          <>
            <div className={styles.logo} onClick={() => navigate('/')}>
              LOGO
            </div>
            <div className={styles.navigation}>
              <ButtonNav title={'Статистика'} disabled={checkPage()} />
              <ButtonNav
                title={'Главная'}
                disabled={checkPage('/allCards')}
                onClick={() => {
                  navigate('/allCards')
                }}
              />
            </div>
            <div className={styles.navigation}>
              <div
                onClick={() => {
                  if (!checkPage('/profile')) {
                    navigate('/profile')
                  }
                }}
              >
                {infoUser.name}
              </div>
              <ButtonNav
                title={'Выйти'}
                onClick={() => {
                  sessionStorage.clear()
                  navigate('/')
                }}
                disabled={checkPage()}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
