import { Typography, Container, Box } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import CodeIcon from '@mui/icons-material/Code';
import PsychologyIcon from '@mui/icons-material/Psychology';
import React from 'react';
// import logo from '../assets/logo.png';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const logo = require('../assets/logo.png');

interface IconTextProps {
  text: string,
  icon: React.ReactElement,
}

function IconText({text, icon}:IconTextProps) {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    }}>
      <div style={{
        width: '50px',
        height: '50px',
        backgroundColor: '#04364a',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {icon}
      </div>
      <Typography variant= 'h4' sx={{
        color: 'primary',
        marginTop: '10px',
      }}>
        {text}
      </Typography>
    </Box>
  )
}

function SubElements() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'space-between',
      my: 4,
    }}>
      <IconText text="Learn" icon={<PsychologyIcon sx={{color: '#ffffff', fontSize: '2rem'}}/>} />
      <IconText text="Solve" icon={<CodeIcon sx={{color: '#ffffff', fontSize: '2rem'}}/>} />
      <IconText text="Submit" icon={<CheckIcon sx={{color: '#ffffff', fontSize: '2rem'}}/>} />
    </Box>
  )
}
export default function HomePage() {
  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      height: '100vh',
    }}>
      {/* <Title /> */}
      <img
        src={logo}
        alt="Logo"
        style={{
          maxWidth: '100%',
          height: 'auto',
          margin: '40px',
        }}
      />
      <SubElements />
    </Container>
  )
}
