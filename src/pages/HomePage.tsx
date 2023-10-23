import { Typography, Container, Box } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import CodeIcon from '@mui/icons-material/Code';
import PsychologyIcon from '@mui/icons-material/Psychology';
import React from 'react';
// import logo from '../assets/logo.png';

const logo = require('../assets/logo.png');

function Title() {
  return (
    <Typography
			variant="h1"
			noWrap
			sx={{
				display: { xs: 'flex', md: 'flex' },
				alignItems: 'center',
				justifyContent: 'center',
				fontFamily: [
					'Kaushan Script', 
					'cursive'
				].join(','),
				fontWeight: 700,
				fontSize: '2rem',
				letterSpacing: '.2rem',
				color: '#176b87',
				textDecoration: 'none',
				my: 6,
			}}
		>
			O(fast)
		</Typography>
  )
}

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
