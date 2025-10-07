import styles from "./comp.module.css";
import Square from "./Square";

export default function Board({ squares, onPlay, status, winner }) {
  function handleClick(i) {
    const nextSquares = squares.slice();

    if (winner || nextSquares[i]) {
      return;
    }
    nextSquares[i] = status[status.length - 1];

    onPlay(nextSquares);
  }

  return (
    <>
      <div className={styles.status}>{status}</div>
      <div className={styles.board}>
        {Array.from({ length: 9 }, (v, k) => k).map((value, num) => (
          <Square value={squares[num]} handleClick={() => handleClick(num)} />
        ))}
      </div>
    </>
  );
}
