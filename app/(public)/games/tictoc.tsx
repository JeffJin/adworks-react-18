import Board from '@/app/(public)/games/board';
import { useState } from 'react';


export default function TicToc() {
  const [history, setHistory] = useState([Array(9).fill('')]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  console.log('currentSquares', currentSquares)
  console.log('history', history)
  console.log('currentMove', currentMove)

  const handlePlay = (nextSquares: string[])=> {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const jumpTo = (nextMove: number)=> {
    console.log('jumpTo', nextMove);
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares: string[], move: number) => {
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

  const resetGame = () => {
    setHistory([Array(9).fill('')]);
    setCurrentMove(0);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <button onClick={() => resetGame()}>Reset Game</button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
