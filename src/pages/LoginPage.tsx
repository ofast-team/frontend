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
  Link,
  Paper,
  Stack,
  InputLabel,
  styled,
} from '@mui/material'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import GoogleIcon from '@mui/icons-material/Google'
import GitHubIcon from '@mui/icons-material/GitHub'

import buildPath from '../path'

const LoginButton = styled(Button)({
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

const LoginWith3rdPartyButton = styled(LoginButton)({
  border: '1px solid black',
  color: 'black',
  backgroundColor: 'white',
})

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

function loginWithEmailAndPassword(email: string, password: string) {
  fetch(buildPath('/helloWorld'), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res.str)
    })
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Box>
      <Container>
        <Paper
          sx={{
            p: 20,
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
            <PasswordField setter={setPassword}></PasswordField>
            <LoginButton
              variant="outlined"
              onClick={() => loginWithEmailAndPassword(email, password)}
            >
              Login
            </LoginButton>
            <Box display={'flex'} gap={5}>
              <LoginWith3rdPartyButton startIcon={<GoogleIcon />}>
                Google
              </LoginWith3rdPartyButton>
              <LoginWith3rdPartyButton startIcon={<GitHubIcon />}>
                GitHub
              </LoginWith3rdPartyButton>
            </Box>
            <Link href="#" fontSize={24}>
              Create an Account
            </Link>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}
