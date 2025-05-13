import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    scores: {
        snake: 0,
        memory: 0,
        tictactoe: 0
    }
};

const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        updateScore: (state, action) => {
            const { game, score } = action.payload;
            state.scores[game] = Math.max(state.scores[game], score);
        },
        resetScores: (state) => {
            state.scores = initialState.scores;
        }
    }
});

export const { updateScore, resetScores } = gamesSlice.actions;
export default gamesSlice.reducer; 