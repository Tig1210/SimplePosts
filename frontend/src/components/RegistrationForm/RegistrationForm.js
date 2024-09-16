import { useState } from 'react'
import dayjs from 'dayjs'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { userRegistration } from '../../api/login_registration'
import ErrorAlert from '../ErrorAlert/ErrorAlert'
import InputsSign from '../Inputs/InputsSign'
import Loader from '../Loader/Loader'

import styles from './RegistrationForm.module.scss'

export default function RegistrationForm() {
  const navigate = useNavigate()
  console.log(navigate)
  const maxYear = dayjs(new Date()).format('YYYY-MM-DD')

  const [name, setName] = useState('')
  const [birth, SetBirth] = useState('')

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const { error, isError, isLoading, mutate } = useMutation(
    () => userRegistration({ name, birth, login, password }),
    {
      retry: 1,
      onSuccess: () => {
        navigate('/login')
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
          <InputsSign label={'Имя'} value={name} setValue={setName} />
          <InputsSign
            label={'Год рождения'}
            value={birth}
            setValue={SetBirth}
            type={'date'}
            max={maxYear}
          />
          <InputsSign label={'Логин'} value={login} setValue={setLogin} />
          <InputsSign
            label={'Пароль'}
            value={password}
            setValue={setPassword}
          />
          <button onClick={() => mutate()}>Зарегестрироваться</button>
        </div>
      </div>
    </>
  )
}
