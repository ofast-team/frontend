import React from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'

import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import LearnPage from './pages/LearnPage'
import NavBar from './components/NavBar'
import LessonPage from './pages/LessonPage'
import SolvePage from './pages/SolvePage'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import ProfilePage from './pages/ProfilePage'

const theme = createTheme({
  typography: {
    fontFamily: 'Raleway, sans-serif',
    fontSize: 16,
    fontWeightRegular: 400,
    fontWeightBold: 700,
    h3: {
      fontSize: '3rem',
      fontWeight: 'bold',
    },
    h4: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.2rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1.25rem',
      lineHeight: 1.5,
    },
  },
  palette: {
    primary: {
      main: '#04364A',
    },
    secondary: {
      main: '#DAFFFB',
    },
  },
})

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/learn/:lesson" element={<LessonPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/solve" element={<SolvePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
