import styles from "./comp.module.css";

import { useState } from "react";
import Board from "./Board";

export default function Game() {
  const [steps, setSteps] = useState(0);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const squares = history[steps];
  const winner = calcWinner(squares);
  const status = winner
    ? "Winner:" + (steps % 2 == 1 ? "X" : "O")
    : "Next player: " + (steps % 2 == 0 ? "X" : "O");

  function handlePlay(nextSquares) {
    setSteps(steps + 1);
    setHistory([...history.slice(0, steps + 1), nextSquares]);
  }

  function jumpTo(nextMove) {
    setSteps(nextMove);
  }

  const moves = history.map((squares, move) => {
    const description = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className={styles.game}>
      <div>
        <Board
          steps={steps}
          squares={squares}
          onPlay={handlePlay}
          status={status}
          winner={winner}
        />
      </div>
      <div className={styles.gameInfo}>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calcWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const line of lines) {
    if (
      squares[line[0]] == squares[line[1]] &&
      squares[line[1]] == squares[line[2]] &&
      squares[line[0]]
    )
      return true;
  }
  return false;
}
