import React, { useState } from 'react'
import {
  Container,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Input,
  IconButton,
  FormControl,
  Paper,
  Stack,
  InputLabel,
} from '@mui/material'

import { Link, useNavigate } from 'react-router-dom'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import GoogleIcon from '@mui/icons-material/Google'
import GitHubIcon from '@mui/icons-material/GitHub'

import buildPath from '../path'
import { LoginButton, LoginWith3rdPartyButton } from './LoginPage'

interface PasswordFieldProps {
  setter: (string) => void
}
function PasswordField(props: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <FormControl variant="standard" fullWidth>
      <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
      <Input
        id="standard-adornment-password"
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) =>
                event.preventDefault()
              }
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        onChange={(e) => props.setter(e.target.value)}
      />
    </FormControl>
  )
}

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
        }
        throw Error(res.statusText)
      })
      .then((data) => {
        console.log(data.general)
        navigate('/login', { replace: true })
      })
      .catch((error: Error) => {
        console.log('Register failed: ' + error.message)
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
            <Typography variant="h3">Create an Account</Typography>
            <TextField
              fullWidth
              label="Email"
              variant="standard"
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
            <PasswordField setter={setPassword}></PasswordField>
            <LoginButton
              variant="outlined"
              onClick={() => registerWithEmailAndPassword(email, password)}
            >
              Sign Up
            </LoginButton>
            <Typography>Or sign in with:</Typography>
            <Box display={'flex'} gap={5}>
              <LoginWith3rdPartyButton startIcon={<GoogleIcon />}>
                Google
              </LoginWith3rdPartyButton>
              <LoginWith3rdPartyButton startIcon={<GitHubIcon />}>
                GitHub
              </LoginWith3rdPartyButton>
            </Box>
            <Link to="/login">
              <Typography>Already have an account? Log In</Typography>
            </Link>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}
