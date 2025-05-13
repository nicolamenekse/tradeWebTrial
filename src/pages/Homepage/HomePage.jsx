import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import styles from './HomePage.module.css';

const games = [
  {
    id: 1,
    title: 'Snake Game',
    description: 'Klasik yılan oyunu',
    image: 'https://placehold.co/400x300/2ecc71/ffffff?text=Snake+Game',
    path: '/games/snake'
  },
  {
    id: 2,
    title: 'Memory Card',
    description: 'Hafıza kartı eşleştirme oyunu',
    image: 'https://placehold.co/400x300/3498db/ffffff?text=Memory+Game',
    path: '/games/memory'
  },
  {
    id: 3,
    title: 'Tic Tac Toe',
    description: 'XOX oyunu',
    image: 'https://placehold.co/400x300/e74c3c/ffffff?text=Tic+Tac+Toe',
    path: '/games/tictactoe'
  },
  // Daha fazla oyun eklenebilir
];

const HomePage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Mini Oyun Kütüphanesi</h1>
        <div className={styles.authButtons}>
          {!isLoggedIn && (
            <>
              <Link to="/login" className={styles.loginButton}>Giriş Yap</Link>
              <Link to="/register" className={styles.registerButton}>Kayıt Ol</Link>
            </>
          )}
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.gamesGrid}>
          {games.map((game) => (
            <div key={game.id} className={styles.gameCard}>
              <img src={game.image} alt={game.title} className={styles.gameImage} />
              <h2>{game.title}</h2>
              <p>{game.description}</p>
              <Link to={game.path} className={styles.playButton}>
                Oyna
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
