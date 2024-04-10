import React, { useState } from 'react'
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Stack,
  styled,
} from '@mui/material'

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

export default function VerifyEmailPage() {
  const [password, setPassword] = useState('')

  const [hasInvalidCredentials, setHasInvalidCredentials] = useState(false)

  const navigate = useNavigate()

  function resetPassword(password) {
    fetch(buildPath('/doResetPassword'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: password }),
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
          window.location.href = 'https://ofast.io/'
          return
        }
        setHasInvalidCredentials(true)
      })
      .catch((error: Error) => {
        console.log('Password Reset Failed: ' + error.message)
      })
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
            <Typography variant="h3">Email Verified</Typography>
            <Box></Box>
            <Button
              onClick={() => {
                window.location.href = 'https://ofast.io/'
              }}
            >
              Return to Home
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}
