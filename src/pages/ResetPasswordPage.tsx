import React, { useEffect, useState } from 'react'
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Stack,
  styled,
} from '@mui/material'

import { useNavigate, useSearchParams } from 'react-router-dom'

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

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [hasValidOob, setHasValidOob] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hasInvalidCredentials, setHasInvalidCredentials] = useState(false)

  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const oob = searchParams.get('oobCode')
    fetch(buildPath('/checkResetPassword'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ oobCode: oob }),
    })
      .then((res: Response) => {
        if (res.ok) {
          setHasValidOob(true)
          setIsLoading(false)
          return res.json()
        }

        throw Error(res.statusText)
      })
      .catch(() => {
        setIsLoading(false)
        setHasValidOob(false)
      })
  }, [])

  function resetPassword(password) {
    const oob = searchParams.get('oobCode')
    fetch(buildPath('/doResetPassword'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ oobCode: oob, password: password }),
    })
      .then((res: Response) => {
        if (res.ok) {
          navigate('/')
          return res.json()
        }

        setHasInvalidCredentials(true)
        throw Error(res.statusText)
      })
      .catch((error: Error) => {
        console.log('Password Reset Failed: ' + error.message)
      })
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      resetPassword(password)
    }
  }

  if (isLoading) {
    return <React.Fragment />
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
          {!hasValidOob ? (
            <Typography
              textAlign={'center'}
              fontSize="20px"
              variant="body1"
              color="primary"
            >
              Try resetting your password again. Your request to reset your
              password has expired or the link has already been used.
            </Typography>
          ) : (
            <Stack spacing={3} alignItems={'center'}>
              <Typography variant="h3">Reset Password</Typography>
              <TextField
                fullWidth
                label="New Password"
                variant="standard"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => handleKeyPress(e)}
              ></TextField>
              <Box>
                <Typography
                  fontSize={'18px'}
                  color={'red'}
                  visibility={hasInvalidCredentials ? 'visible' : 'hidden'}
                >
                  Password is too weak. Please use more than 4 characters.
                </Typography>
              </Box>
              <LoginButton
                variant="outlined"
                onClick={() => resetPassword(password)}
              >
                Submit
              </LoginButton>
            </Stack>
          )}
        </Paper>
      </Container>
    </Box>
  )
}
