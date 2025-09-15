function Square({ value }) {
    return <button className="square">{ value }</button>
}

function Line({ num }) {
    return (
        <div className="board-row">
            <Square value={ 3 * num - 2 } />
            <Square value={ 3 * num - 1 } />
            <Square value={ 3 * num     } />
        </div>
    )
}

export default function Board() {
    return (
        <>
            <Line num={1} />
            <Line num={2} />
            <Line num={3} />
        </>
    );
}
