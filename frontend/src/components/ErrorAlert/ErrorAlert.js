import { useEffect, useState } from 'react'

import styles from './ErrorAlert.module.scss'

export default function ErrorAlert({ isError, error }) {
  const [show, setShow] = useState(false)
  const [prog, setProg] = useState(1)
  useEffect(() => {
    if (isError) {
      setShow(true)
      let timer = setInterval(() => {
        setProg((prev) => prev + 1)
      }, 100)
      setTimeout(() => {
        clearInterval(timer)
        setShow(false)
      }, 5000)
    }
  }, [isError])
  return (
    <>
      {show && (
        <div className={styles.main}>
          <p>{error.message}</p>
          <div
            className={styles.progress}
            style={{ width: `calc(100% - ${prog * 2}%)` }}
          ></div>
        </div>
      )}
    </>
  )
}
