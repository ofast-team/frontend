import React, {useState} from 'react';
import { Container, Typography, Box, TextField, InputAdornment, Input, IconButton, FormControl, Button, Link, Paper, Stack, InputLabel } from '@mui/material'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import GoogleIcon from '@mui/icons-material/Google'
import GitHubIcon from '@mui/icons-material/GitHub';

function PasswordField() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl variant = "standard">
      <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
      <Input
        id="standard-adornment-password"
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault()}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}

export default function LoginPage() {

  return (
    <Box>
      <Typography>Get Started</Typography>
      <Container>
        <Paper sx = {{
          p: 5,
          }}>
          <Stack spacing = {2}>
            <TextField label="Email" variant="standard"></TextField>
            <PasswordField></PasswordField>
            <Button variant ="outlined">Login</Button>
            <Stack direction='row' spacing={2}>
              <Button variant = "outlined" startIcon = {<GoogleIcon/>}>Google</Button>
              <Button variant = "outlined" startIcon = {<GitHubIcon/>}>GitHub</Button>
            </Stack>
            <Link href="#">Create an Account</Link>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}