import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateScore } from '../../redux/games/slice';
import styles from './TicTacToe.module.css';

const TicTacToe = () => {
  const dispatch = useDispatch();
  const highScore = useSelector(state => state.games.scores.tictactoe);
  
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [moves, setMoves] = useState(0);

  const calculateWinner = (squares) => {
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
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    setMoves(prev => prev + 1);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      dispatch(updateScore({ game: 'tictactoe', score: moves + 1 }));
    } else if (!newBoard.includes(null)) {
      setWinner('draw');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setMoves(0);
  };

  const renderSquare = (index) => (
    <button
      className={styles.square}
      onClick={() => handleClick(index)}
    >
      {board[index]}
    </button>
  );

  const getStatus = () => {
    if (winner === 'draw') {
      return 'Berabere!';
    }
    if (winner) {
      return `Kazanan: ${winner}`;
    }
    return `Sıradaki Oyuncu: ${isXNext ? 'X' : 'O'}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.gameInfo}>
        <h2>Tic Tac Toe</h2>
        <div className={styles.status}>{getStatus()}</div>
        <p>Hamle: {moves}</p>
        <p>En İyi Skor: {highScore}</p>
        {(winner || board.every(square => square)) && (
          <button className={styles.resetButton} onClick={resetGame}>
            Yeni Oyun
          </button>
        )}
      </div>
      <div className={styles.board}>
        <div className={styles.boardRow}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className={styles.boardRow}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className={styles.boardRow}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </div>
  );
};

export default TicTacToe; 