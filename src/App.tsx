// src/App.tsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import PageTransition from './components/PageTransition';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import LeaderboardPage from './pages/LeaderboardPage';
import DashboardPage from './pages/DashboardPage';

const App: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <LandingPage />
              </PageTransition>
            }
          />
          <Route
            path="/register"
            element={
              <PageTransition>
                <RegisterPage />
              </PageTransition>
            }
          />
          <Route
            path="/login"
            element={
              <PageTransition>
                <LoginPage />
              </PageTransition>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <PageTransition>
                <LeaderboardPage />
              </PageTransition>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PageTransition>
                <DashboardPage />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
};

// const WrappedApp: React.FC = () => (
//   <Router>
//     <App />
//   </Router>
// );

export default App;
