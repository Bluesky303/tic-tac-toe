import styles from "./comp.module.css";

export default function Square({ value, handleClick }) {
  return (
    <button className={styles.square} onClick={handleClick}>
      {value}
    </button>
  );
}
