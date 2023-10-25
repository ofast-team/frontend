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
  Link,
} from '@mui/material'

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

function registerWithEmailAndPassword() {
  fetch(buildPath('/helloWorld'), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res.str)
    })
}

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Box>
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
              onClick={() => registerWithEmailAndPassword()}
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
            <Link href="#" fontSize={24}>
              Already have an account? Log In
            </Link>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}
