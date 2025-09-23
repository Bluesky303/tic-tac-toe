import { useState } from "react";

function Square({ value, handleClick }) {
  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}

function Board({ steps, squares, onPlay }) {
  const winner = calcWinner(squares);
  let status =
    (winner ? "Winner:" : "Next player: ") + (steps % 2 == 0 ? "X" : "O");

  function handleClick(i) {
    const nextSquares = squares.slice();

    if (winner || nextSquares[i]) {
      return;
    }
    nextSquares[i] = steps % 2 == 0 ? "O" : "X";

    onPlay(nextSquares);
  }

  return (
    <>
      <div className="status">{status}</div>
      <ol>
        {[0, 1, 2].map((row) => {
          return (
            <div className="board-row">
              {[0, 1, 2].map((num) => {
                return (
                  <Square
                    value={squares[row * 3 + num]}
                    handleClick={() => handleClick(row * 3 + num)}
                  />
                );
              })}
            </div>
          );
        })}
      </ol>
    </>
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
  for (let line of lines) {
    if (
      squares[line[0]] == squares[line[1]] &&
      squares[line[1]] == squares[line[2]] &&
      squares[line[0]]
    )
      return true;
  }
  return false;
}

export default function Game() {
  const [steps, setSteps] = useState(0);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const squares = history[steps];

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
    <div className="game">
      <div className="board">
        <Board steps={steps} squares={squares} onPlay={handlePlay}></Board>
      </div>
      <div className="info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
