import React, { useState } from 'react'
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Stack,
  styled,
  IconButton,
} from '@mui/material'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { useNavigate } from 'react-router-dom'

import buildPath from '../path'

export const LoginButton = styled(Button)({
  border: '1px solid #04364A',
  borderRadius: 30,
  backgroundColor: '#04364A',
  color: '#DAFFFB',
  padding: '0px 32px',
  textTransform: 'none',
  fontSize: 28,
  fontFamily: ['Raleway', 'sans-serif'].join(','),
  fontWeight: 500,
  '&:hover': {
    backgroundColor: '#DAFFFB',
    borderColor: '#04364A',
    color: 'black',
  },
  '&:active': {
    backgroundColor: '#04364A',
    borderColor: '#04364A',
  },
})

export const LinkButton = styled(Button)({
  background: 'none',
  border: 'none',
  padding: 0,
  color: '#069',
  textDecoration: 'underline',
  cursor: 'pointer',
})

export default function ForgotPassword() {
  const [email, setEmail] = useState('')

  const [hasInvalidCredentials, setHasInvalidCredentials] = useState(false)

  const navigate = useNavigate()

  function sendPasswordResetEmail(email) {
    fetch(buildPath('/sendPasswordResetEmail'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email }),
    })
      .then((res: Response) => {
        if (res.ok) {
          return res.json()
        }

        setHasInvalidCredentials(true)
        throw Error(res.statusText)
      })
      .then((data) => {
        if (data.message === 'success') {
          setHasInvalidCredentials(false)
          navigate('/login', { replace: true })
          return
        }
        setHasInvalidCredentials(true)
      })
      .catch((error: Error) => {
        console.log('Email delivery failed: ' + error.message)
      })
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendPasswordResetEmail(email)
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
          <IconButton sx={{ position: 'relative', bottom: 60, right: 60}} onClick={() => navigate('/login')}>
            <ArrowBackIcon style = {{fontSize: '32px', color: 'black'}} ></ArrowBackIcon>
          </IconButton>
          <Stack spacing={3} alignItems={'center'}>
            <Typography variant="h3">Forgot Password</Typography>
            <TextField
              fullWidth
              label="Email"
              variant="standard"
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e)}
            ></TextField>
            <Box>
              <Typography
                fontSize={'18px'}
                color={'red'}
                visibility={hasInvalidCredentials ? 'visible' : 'hidden'}
              >
                Email was not sent. Please enter a valid email for an account on
                O(fast).
              </Typography>
            </Box>
            <Typography>
              We'll send you a link to reset your password.
            </Typography>
            <LoginButton
              variant="outlined"
              onClick={() => sendPasswordResetEmail(email)}
            >
              Send Email
            </LoginButton>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}
