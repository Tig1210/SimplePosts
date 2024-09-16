import styles from './Loader.module.scss'

export default function Loader() {
  return (
    <div className={styles.main}>
      <div className={styles.block}>
        <div className={styles.circle}></div>
      </div>
    </div>
  )
}
