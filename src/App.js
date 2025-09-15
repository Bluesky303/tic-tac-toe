import { useState } from "react";

function Square({ value, handleClick }) {
    return <button className="square" onClick={handleClick}>{value}</button>
}

let steps = 0

export default function Board() {
    const [squareState, setSquareState] = useState(Array(9).fill(null))

    const winner = calcWinner(squareState)
    let status = (winner ? "Winner:" : "Next player: ") +  ((steps % 2 == 0) ? 'X' : 'O')

    function handleClick(i) {
        
        const nextSquares = squareState.slice()

        if (nextSquares[i]) {
            return;
        }
        nextSquares[i] = (steps % 2 == 0) ? 'O' : 'X'
        
        setSquareState(nextSquares)
        
        steps += 1
    }

    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squareState[0]} handleClick={() => handleClick(0)}/>
                <Square value={squareState[1]} handleClick={() => handleClick(1)}/>
                <Square value={squareState[2]} handleClick={() => handleClick(2)}/>
            </div>

            <div className="board-row">
                <Square value={squareState[3]} handleClick={() => handleClick(3)}/>
                <Square value={squareState[4]} handleClick={() => handleClick(4)}/>
                <Square value={squareState[5]} handleClick={() => handleClick(5)}/>
            </div>
            
            <div className="board-row">
                <Square value={squareState[6]} handleClick={() => handleClick(6)}/>
                <Square value={squareState[7]} handleClick={() => handleClick(7)}/>
                <Square value={squareState[8]} handleClick={() => handleClick(8)}/>
            </div>
        </>
    );
}

function calcWinner(squareState) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];
    let win = false;
    lines.forEach(function(line){
        if (squareState[line[0]] == squareState[line[1]] && squareState[line[1]] == squareState[line[2]] && squareState[line[0]]){
            win = true;
        }
    })
    return win;
}