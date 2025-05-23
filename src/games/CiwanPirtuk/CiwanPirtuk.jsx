import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { setGameScore, setGameProgress, setGameOver } from '../../redux/slices/gameSlice';
import { levels } from './gameData';

const GameContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f0f0f0;
  padding: 2rem;
`;

const CharacterContainer = styled(motion.div)`
  position: relative;
  margin-bottom: 2rem;
`;

const CiwanCharacter = styled(motion.div)`
  width: 50px;
  height: 100px;
  background: #000;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background: #000;
    border-radius: 50%;
    top: -10px;
    left: 15px;
  }
`;

const BookContainer = styled(motion.div)`
  position: absolute;
  right: -60px;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 50px;
  background: #8B4513;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
`;

const RiddleContainer = styled.div`
  width: 90%;
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 2rem;
`;

const OptionButton = styled(motion.button)`
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 10px;
  background: white;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: #4a90e2;
    transform: translateY(-2px);
  }
`;

const ProgressBar = styled.div`
  width: 90%;
  max-width: 600px;
  height: 10px;
  background: #ddd;
  border-radius: 5px;
  margin: 1rem 0;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  background: #4a90e2;
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const CiwanPirtuk = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const dispatch = useDispatch();
  const gameProgress = useSelector(state => state.game.progress);

  useEffect(() => {
    // Oyun başladığında Redux state'ini sıfırla
    dispatch(setGameScore(0));
    dispatch(setGameProgress(0));
    dispatch(setGameOver(false));
  }, [dispatch]);

  const handleAnswer = (answer) => {
    const isAnswerCorrect = answer === levels[currentLevel].riddle.answer;
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      const newScore = score + 1;
      setScore(newScore);
      dispatch(setGameScore(newScore));
      
      const progress = ((currentLevel + 1) / levels.length) * 100;
      dispatch(setGameProgress(progress));

      setTimeout(() => {
        if (currentLevel < levels.length - 1) {
          setCurrentLevel(currentLevel + 1);
          setIsCorrect(null);
        } else {
          dispatch(setGameOver(true));
        }
      }, 1000);
    }
  };

  return (
    <GameContainer>
      <CharacterContainer>
        <CiwanCharacter
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <BookContainer
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        />
      </CharacterContainer>

      <ProgressBar>
        <Progress progress={gameProgress} />
      </ProgressBar>

      <RiddleContainer>
        <h2>Bilmece {currentLevel + 1}</h2>
        <p style={{ fontSize: '1.2rem', margin: '1rem 0' }}>
          {levels[currentLevel].riddle.kurdish}
        </p>
        <p style={{ color: '#666', fontStyle: 'italic' }}>
          {levels[currentLevel].riddle.turkish}
        </p>

        <OptionsGrid>
          {levels[currentLevel].riddle.options.map((option) => (
            <OptionButton
              key={option.id}
              onClick={() => handleAnswer(option.text)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                borderColor: isCorrect === null ? '#ddd' : 
                  option.text === levels[currentLevel].riddle.answer ? '#4CAF50' : 
                  isCorrect === false && option.text === levels[currentLevel].riddle.answer ? '#4CAF50' : '#f44336'
              }}
            >
              <span>{option.icon}</span>
              <span>{option.text}</span>
            </OptionButton>
          ))}
        </OptionsGrid>
      </RiddleContainer>

      <div style={{ marginTop: '1rem', fontSize: '1.2rem' }}>
        Skor: {score}
      </div>
    </GameContainer>
  );
};

export default CiwanPirtuk; 