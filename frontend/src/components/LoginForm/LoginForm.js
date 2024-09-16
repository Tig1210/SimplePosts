import { useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { sendLogin } from '../../api/login_registration'
import ErrorAlert from '../ErrorAlert/ErrorAlert'
// import { useNavigate } from 'react-router-dom'
import InputsSign from '../Inputs/InputsSign'
import Loader from '../Loader/Loader'

import styles from './LoginForm.module.scss'

export default function LoginForm() {
  const navigate = useNavigate()

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const { error, isError, isLoading, mutate } = useMutation(
    () => sendLogin(login, password),
    {
      retry: 1,
      onSuccess: (data) => {
        sessionStorage.setItem('auth', data.token)
        navigate('/profile')
      },
    }
  )

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <ErrorAlert isError={isError} error={error} />
      <div className={styles.main}>
        <div className={styles.content}>
          <InputsSign label={'Логин'} value={login} setValue={setLogin} />
          <InputsSign
            label={'Пароль'}
            value={password}
            setValue={setPassword}
          />
          <button onClick={() => mutate()}>Войти</button>
        </div>
      </div>
    </>
  )
}
