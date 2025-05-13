import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectRefreshing } from "./redux/auth/selectors";
import { refresh } from "./redux/auth/operations";

// Pages
import RegisterPage from "./pages/Registerpage/RegisterPage";
import LoginPage from "./pages/Loginpage/LoginPage";
import HomePage from "./pages/Homepage/HomePage";

// Games
import SnakeGame from "./games/SnakeGame/SnakeGame";
import MemoryGame from "./games/MemoryGame/MemoryGame";
import TicTacToe from "./games/TicTacToe/TicTacToe";

// Components
import RestrictedRoute from "./components/RestrictedRoute";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  const isRefreshing = useSelector(selectRefreshing);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  return (
    <>
      {isRefreshing ? (
        <p>Yükleniyor...</p>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/register"
            element={
              <RestrictedRoute
                direktGit="/"
                element={<RegisterPage />}
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute 
                direktGit="/" 
                element={<LoginPage />} 
              />
            }
          />

          {/* Oyun Rotaları */}
          <Route
            path="/games/snake"
            element={<PrivateRoute direktGit="/" element={<SnakeGame />} />}
          />
          <Route
            path="/games/memory"
            element={<PrivateRoute direktGit="/" element={<MemoryGame />} />}
          />
          <Route
            path="/games/tictactoe"
            element={<PrivateRoute direktGit="/" element={<TicTacToe />} />}
          />

          <Route path="*" element={<HomePage />} />
        </Routes>
      )}
    </>
  );
}
