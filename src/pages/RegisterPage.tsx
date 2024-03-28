import React, { useState } from 'react'
import {
  Container,
  Typography,
  Box,
  TextField,
  Paper,
  Stack,
} from '@mui/material'

import { Link, useNavigate } from 'react-router-dom'

import buildPath from '../path'
import { LoginButton, PasswordField } from './LoginPage'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [feedback, setFeedback] = useState<string>('none')

  const navigate = useNavigate()

  function registerWithEmailAndPassword(email: string, password: string) {
    fetch(buildPath('/registerWithEmail'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res: Response) => {
        if (res.ok) {
          return res.json()
        } else if (res.status === 401) {
          return res.json()
        }
        throw Error(res.statusText)
      })
      .then((data) => {
        if (data.general === 'User Created') {
          setFeedback('none')
          navigate('/login', { replace: true })
        } else {
          setFeedback(data.general + '. Please try again.')
        }
      })
      .catch((error: Error) => {
        console.log('Register failed: ' + error.message)
      })
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      registerWithEmailAndPassword(email, password)
    }
  }

  return (
    <Box sx={{ p: 10 }}>
      <Container maxWidth="md">
        <Paper
          sx={{
            p: 10,
            m: 5,
          }}
        >
          <Stack spacing={3} alignItems={'center'}>
            <Typography variant="h3">Create an Account</Typography>
            <TextField
              fullWidth
              label="Email"
              variant="standard"
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordField setter={setPassword} onKeyPress={handleKeyPress} />
            <Typography
              color={'red'}
              fontSize={'18px'}
              visibility={feedback === 'none' ? 'hidden' : 'visible'}
            >
              {feedback}
            </Typography>
            <LoginButton
              variant="outlined"
              onClick={() => registerWithEmailAndPassword(email, password)}
            >
              Sign Up
            </LoginButton>
            <Link to="/login">
              <Typography>Already have an account? Log In</Typography>
            </Link>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}
