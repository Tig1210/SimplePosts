import { useState } from 'react'
import dayjs from 'dayjs'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { sendCard } from '../../api/cards'
import InputsSign from '../Inputs/InputsSign'

import styles from './CardForm.module.scss'

export default function CardForm() {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const date = dayjs(new Date()).format('DD.MM.YYYY')

  const { mutate } = useMutation(() => sendCard({ title, text, date }), {
    onSuccess: () => {
      navigate('/profile')
    },
  })

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <InputsSign label={'Название'} value={title} setValue={setTitle} />
        <InputsSign label={'Текст'} value={text} setValue={setText} />
        <button onClick={() => mutate()}>Добавить</button>
      </div>
    </div>
  )
}
