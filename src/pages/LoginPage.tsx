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
  Button,
  Paper,
  Stack,
  InputLabel,
  styled,
} from '@mui/material'

import { Link, useNavigate } from 'react-router-dom'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import buildPath from '../path'
import { useDispatch } from 'react-redux'

import { login } from '../userSlice'

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

interface PasswordFieldProps {
  setter: (string) => void
  onKeyPress: (event) => void
}

export function PasswordField({ setter, onKeyPress }: PasswordFieldProps) {
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
        onChange={(e) => setter(e.target.value)}
        onKeyDown={(e) => onKeyPress(e)}
      />
    </FormControl>
  )
}

export interface LoginPayload {
  id: string
  isVerified: boolean
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [hasInvalidCredentials, setHasInvalidCredentials] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  function loginWithEmailAndPassword(email, password) {
    fetch(buildPath('/loginWithEmail'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res: Response) => {
        if (res.ok) {
          return res.json()
        }

        setHasInvalidCredentials(true)
        console.log(res.status)
        throw Error(res.statusText)
      })
      .then((data) => {
        setHasInvalidCredentials(false)
        const payload: LoginPayload = {
          id: data.userId,
          isVerified: data.isVerified,
        }
        dispatch(login(payload))
        navigate('/home', { replace: true })
      })
      .catch((error: Error) => {
        console.log('Login failed: ' + error.message)
      })
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log('enter pressed')
      loginWithEmailAndPassword(email, password)
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
            <Typography variant="h3">Log In</Typography>
            <TextField
              fullWidth
              label="Email"
              variant="standard"
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
            <PasswordField
              setter={setPassword}
              onKeyPress={handleKeyPress}
            ></PasswordField>
            <Box>
              <Typography
                fontSize={'18px'}
                color={'red'}
                visibility={hasInvalidCredentials ? 'visible' : 'hidden'}
              >
                Invalid Credentials, please try again.
              </Typography>
            </Box>
            <LoginButton
              variant="outlined"
              onClick={() => loginWithEmailAndPassword(email, password)}
            >
              Log In
            </LoginButton>
            <Typography display={'flex'} gap={2}>
              <Link to="/register">
                <Typography>Create an Account</Typography>
              </Link>
              <Typography>|</Typography>
              <Link to="/forgotPassword">
                <Typography>Forgot Password</Typography>
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}
