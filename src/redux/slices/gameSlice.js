import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  score: 0,
  progress: 0,
  currentLevel: 0,
  isGameOver: false
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameScore: (state, action) => {
      state.score = action.payload;
    },
    setGameProgress: (state, action) => {
      state.progress = action.payload;
    },
    setCurrentLevel: (state, action) => {
      state.currentLevel = action.payload;
    },
    setGameOver: (state, action) => {
      state.isGameOver = action.payload;
    },
    resetGame: (state) => {
      state.score = 0;
      state.progress = 0;
      state.currentLevel = 0;
      state.isGameOver = false;
    }
  }
});

export const {
  setGameScore,
  setGameProgress,
  setCurrentLevel,
  setGameOver,
  resetGame
} = gameSlice.actions;

export default gameSlice.reducer; 