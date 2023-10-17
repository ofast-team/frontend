import React from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'

import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'

import { createTheme, ThemeProvider } from '@mui/material/styles'

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
      <div>
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App
