import { useState } from 'react'
import { useQuery } from 'react-query'

import { getAllCards } from '../../api/cards'
import CardInfo from '../CardInfo/CardInfo'
import ErrorAlert from '../ErrorAlert/ErrorAlert'
import Loader from '../Loader/Loader'

import styles from './AllListCards.module.scss'

export default function AllListCards() {
  const [cards, setCards] = useState([])

  const { isLoading, isError, error } = useQuery(
    'allCards',
    () => getAllCards(),
    {
      retry: 0,
      onSuccess: (data) => {
        setCards(data)
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
        <div className={styles.container}>
          <div className={styles.list}>
            {cards.map((card) => (
              <CardInfo card={card} key={card.id} refresh={getAllCards} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
