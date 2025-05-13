import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateScore } from '../../redux/games/slice';
import styles from './MemoryGame.module.css';

const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

const MemoryGame = () => {
  const dispatch = useDispatch();
  const highScore = useSelector(state => state.games.scores.memory);
  
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const initializeGame = () => {
    const duplicatedEmojis = [...emojis, ...emojis];
    const shuffledCards = duplicatedEmojis
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameOver(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (matchedPairs.length === emojis.length) {
      setGameOver(true);
      dispatch(updateScore({ game: 'memory', score: moves }));
    }
  }, [matchedPairs, moves, dispatch]);

  const handleCardClick = (clickedCard) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(clickedCard.id) ||
      matchedPairs.includes(clickedCard.emoji)
    ) {
      return;
    }

    const newFlippedCards = [...flippedCards, clickedCard.id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      const [firstCard, secondCard] = newFlippedCards;
      const firstEmoji = cards.find(card => card.id === firstCard).emoji;
      const secondEmoji = cards.find(card => card.id === secondCard).emoji;

      if (firstEmoji === secondEmoji) {
        setMatchedPairs(prev => [...prev, firstEmoji]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.gameInfo}>
        <h2>Memory Game</h2>
        <p>Hamle: {moves}</p>
        <p>En İyi Skor: {highScore}</p>
        {gameOver && (
          <div className={styles.gameOver}>
            <p>Tebrikler! Oyunu {moves} hamlede bitirdiniz!</p>
            <button onClick={initializeGame}>Tekrar Oyna</button>
          </div>
        )}
      </div>
      <div className={styles.gameBoard}>
        {cards.map(card => (
          <div
            key={card.id}
            className={`${styles.card} ${
              flippedCards.includes(card.id) || matchedPairs.includes(card.emoji)
                ? styles.flipped
                : ''
            }`}
            onClick={() => handleCardClick(card)}
          >
            <div className={styles.cardInner}>
              <div className={styles.cardFront}>❓</div>
              <div className={styles.cardBack}>{card.emoji}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame; 