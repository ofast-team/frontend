import React, { useEffect, useState } from 'react'
import {
  Container,
  Typography,
  Box,
  TextField,
  Paper,
  Stack,
} from '@mui/material'

import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { verify } from '../userSlice'

import buildPath from '../path'
import { StylishButton } from './LoginPage'
import { RootState } from '../store'

function VerifyEmailPage() {
  const navigate = useNavigate()
  return (
    <Box sx={{ p: 10 }}>
      <Container maxWidth="md">
        <Paper
          sx={{
            p: 5,
            m: 5,
          }}
        >
          <Stack spacing={3} alignItems={'center'}>
            <Typography variant="h3" textAlign={'center'}>
              Email Verified
            </Typography>
            <StylishButton
              variant="outlined"
              onClick={() => {
                navigate('/')
              }}
              sx={{ fontSize: 24 }}
            >
              Return to Home
            </StylishButton>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}

function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [hasInvalidCredentials, setHasInvalidCredentials] = useState(false)

  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

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
            <StylishButton
              variant="outlined"
              onClick={() => resetPassword(password)}
            >
              Submit
            </StylishButton>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}

export default function AccountManagementPage() {
  const [mode, setMode] = useState<string>('')
  const [hasValidOob, setHasValidOob] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const [searchParams] = useSearchParams()
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const urlMode = searchParams.get('mode')
    const oob = searchParams.get('oobCode')

    if (urlMode === 'resetPassword') {
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
    } else if (urlMode === 'verifyEmail') {
      fetch(buildPath('/doEmailVerification'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oobCode: oob }),
      })
        .then((res: Response) => {
          if (res.ok) {
            setHasValidOob(true)
            setIsLoading(false)
            dispatch(verify())
            return res.json()
          }

          throw Error(res.statusText)
        })
        .catch(() => {
          setIsLoading(false)
          setHasValidOob(false)
        })
    } else {
      // If we don't know what the link is supposed to do, take them home
      navigate('/')
    }

    setMode(urlMode || '')
  }, [])

  if (isLoading) {
    return <React.Fragment />
  }

  if ((hasValidOob || user.verified) && mode === 'verifyEmail') {
    return <VerifyEmailPage />
  }

  if (hasValidOob && mode === 'resetPassword') {
    return <ResetPasswordPage />
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
          {mode === 'verifyEmail' ? (
            <Typography
              textAlign={'center'}
              fontSize="20px"
              variant="body1"
              color="primary"
            >
              Try verifying your email again. Your request to verify your email
              has expired or the link has already been used.
            </Typography>
          ) : (
            <Typography
              textAlign={'center'}
              fontSize="20px"
              variant="body1"
              color="primary"
            >
              Try resetting your password again. Your request to reset your
              password has expired or the link has already been used.
            </Typography>
          )}
        </Paper>
      </Container>
    </Box>
  )
}
