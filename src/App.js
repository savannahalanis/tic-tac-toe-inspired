import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, isMoveMarker, squares, currentSquare, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares)) {
      return;
    }

    if (squares.filter(Boolean).length < 6) {
      if (squares[i]) {return}
      const nextSquares = squares.slice();
      console.log("sliced and diced baby")
      if (xIsNext) {
        nextSquares[i] = 'X';
      } else {
        nextSquares[i] = 'O';
      }
      onPlay(nextSquares)
    } else {
      if (!isMoveMarker) {
        if ( (xIsNext && squares[i] == 'X') || (!xIsNext && squares[i] == 'O') ) {
          isMoveMarker = true
          currentSquare = i
          console.log("Yusss, move that piece")
          return
        } else {
          console.log("bruh no, wrong click!")
          return
        }
      } else if (isMoveMarker) {
        if (squares[i]) {
          console.log("squares[i] is already taken!!!! He is not single!")
          return
        } else if (i == currentSquare) {
          console.log("current square == i")
          return
        } else if (!isValidMove(currentSquare)[i]) {
          const result = isValidMove(i)[i]
          console.log("array says no-wo : ", result)
          return
        }
        const nextSquares = squares.slice();
        console.log("sliced and diced baby")
        nextSquares[currentSquare] = null;
        if (xIsNext) {
          nextSquares[i] = 'X';
        } else {
          nextSquares[i] = 'O';
        }
        onPlay(nextSquares);
        console.log("SO TRUE!!")
        return
      }
    }
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    if (isMoveMarker) {
      status += "\nClick to move piece"
    }
  }

  function isValidMove(x) {
    switch(x) {
      case 0:
        return (
          [0, 1, 0,
           1, 1, 0,
           0, 0, 0])
      case 1:
        return (
          [1, 0, 1,
           1, 1, 1,
           0, 0, 0])
      case 2:
        return (
          [0, 1, 0,
           0, 1, 1,
           0, 0, 0])
      case 3:
        return (
          [1, 1, 0,
           0, 1, 0,
           1, 1, 0])
      case 4:
        return (
          [1, 1, 1,
           1, 0, 1,
           1, 1, 1])
      case 5:
        return (
          [0, 1, 1,
           0, 1, 0,
           0, 1, 1])
      case 6:
        return (
          [0, 0, 0,
           1, 1, 0,
           0, 1, 0])
      case 7:
        return (
          [0, 0, 0,
           1, 1, 1,
           1, 0, 1])
      case 8:
        return (
          [0, 0, 0,
           0, 1, 1,
           0, 1, 0])
    }
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const isMoveMarker = false
  const xIsNext = currentMove % 2 === 0
  const currentSquare = -1
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} isMoveMarker={isMoveMarker} squares={currentSquares} currentSquare={currentSquare} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
