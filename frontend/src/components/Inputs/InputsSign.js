import styles from './InputsSign.module.scss'

export default function InputsSign({ ...props }) {
  const { label, value, setValue, type, max } = props
  return (
    <div className={styles.blockInput}>
      <label>{label}</label>
      <input
        type={type}
        max={max}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}
