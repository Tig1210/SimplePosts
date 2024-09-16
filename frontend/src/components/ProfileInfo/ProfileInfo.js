import { useState } from 'react'
import dayjs from 'dayjs'
import { jwtDecode } from 'jwt-decode'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

import { getUsersCards } from '../../api/cards'
import { getUserInformation } from '../../api/users'
import CardInfo from '../CardInfo/CardInfo'
import ErrorAlert from '../ErrorAlert/ErrorAlert'
import Loader from '../Loader/Loader'

import styles from './ProfileInfo.module.scss'

import defaultLogo from './img/default.png'

export default function ProfileInfo() {
  const { id } = useParams()
  const decodeInfo = jwtDecode(sessionStorage.getItem('auth'))
  const { name, birth } = decodeInfo
  const [someUser, setSomeUser] = useState()
  const age = dayjs(new Date()).format('YYYY') - dayjs(birth).format('YYYY')

  const navigate = useNavigate()

  const [cards, setCards] = useState([])

  const {
    error,
    isLoading,
    isError,
    refetch: refetchUSersCards,
  } = useQuery(['usersCards', id], () => getUsersCards(id), {
    retry: 0,
    onSuccess: (data) => {
      setCards(data)
    },
  })

  const { isLoading: loading } = useQuery(
    ['userInfo', id],
    () => getUserInformation(id),
    {
      retry: 0,
      onSuccess: (data) => {
        console.log(data)
        setSomeUser(data)
      },
    }
  )

  if (isLoading && loading) {
    return <Loader />
  }

  return (
    <>
      <ErrorAlert isError={isError} error={error} />
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.info}>
            <div className={styles.sec}>
              <div className={styles.avatar}>
                <img src={defaultLogo} />
              </div>
              <div
                className={styles.addCard}
                onClick={() => navigate('/addCard')}
              >
                <p>+</p>
              </div>
              <div className={styles.user}>
                <div className={styles.block}>
                  <p>Имя: {id === undefined ? name : someUser?.name}</p>
                  <p>
                    Возраст:{' '}
                    {id === undefined
                      ? age
                      : dayjs(new Date()).format('YYYY') -
                        dayjs(someUser?.birth).format('YYYY')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.list}>
            <div className={styles.containerList}>
              <div className={styles.cards}>
                {cards.map((card) => (
                  <CardInfo
                    card={card}
                    key={card.id}
                    refresh={refetchUSersCards}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
