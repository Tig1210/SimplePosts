import styles from './ButtonNav.module.scss'

export default function ButtonNav({ ...prop }) {
  const { title, onClick, disabled } = prop
  console.log(disabled)
  return (
    <div
      className={disabled === false ? styles.main : styles.mainDis}
      onClick={() => {
        if (disabled === false) onClick()
      }}
    >
      <p>{title}</p>
    </div>
  )
}
