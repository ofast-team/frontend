import React from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'

import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import TeamPage from './pages/About/TeamPage'
import LearnPage from './pages/LearnPage'
import NavBar from './components/NavBar'
import LessonPage from './pages/LessonPage'
import SolvePage from './pages/SolvePage'
import PlaygroundPage from './pages/PlaygroundPage'
import ProblemPage from './pages/ProblemPage'
import ProfilePage from './pages/ProfilePage'
import SubmitPage from './pages/SubmitPage'
import VerdictPage from './pages/VerdictPage'

import { useSelector } from 'react-redux'
import { RootState } from './store'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import VerificationBanner from './components/VerificationBanner'
import SubmissionsList from './pages/SubmissionsList'
import ForgotPassword from './pages/ForgotPassword'
import ContributePage from './pages/About/ContributePage'
import SpecPage from './pages/About/SpecPage'
import AccountManagementPage from './pages/AccountManagementPage'

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 16,
    fontWeightRegular: 400,
    fontWeightBold: 500,
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontSize: '3rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h5: {
      fontSize: '1.2rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1.25rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
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
  const user = useSelector((state: RootState) => state.user)

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <VerificationBanner />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route
          path="/learn/:lesson/:filenameWithoutExt?"
          element={<LessonPage />}
        />
        <Route path="/problem/:problem" element={<ProblemPage />} />
        <Route path="/about/team" element={<TeamPage />} />
        <Route path="/about/how-to-contribute" element={<ContributePage />} />
        <Route path="/about/specifications" element={<SpecPage />} />
        <Route
          path="/about/*"
          element={<Navigate to="/about/team" replace />}
        />
        <Route path="/solve" element={<SolvePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/manageAccount/*" element={<AccountManagementPage />} />
        <Route path="/submit" element={<SubmitPage />} />
        <Route path="/submissions/:submissionId" element={<VerdictPage />} />
        <Route path="/submissions" element={<SubmissionsList />} />
        <Route path="/playground" element={<PlaygroundPage />} />
        <Route
          path="/profile"
          element={
            user.signedIn ? <ProfilePage /> : <Navigate to="/" replace />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
