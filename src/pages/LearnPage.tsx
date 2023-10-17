import React from 'react'
import { Box, Container, Typography, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const verticallyCenter = {
  position: 'absolute',
  top: '50%',
  transform: 'translate(0%, -50%)'
}

function SearchBar() {
  return (
    <div style={{
      backgroundColor: '#f4f4f4',
      border: '1px solid',
      borderRadius: 40,
      height: 60,
      width: '100%',
      position: 'relative'
    }}>
      <SearchIcon
        sx={{ ...verticallyCenter, left: 20 }}
        fontSize='large'
      />
      <InputBase
        sx={{
          ...verticallyCenter,
          left: 70,
          width: 'calc(100% - 100px)'
        }}
        placeholder='search'
      />
    </div>
  )
}

interface LessonGroupProps {
  title: string;
  children: React.ReactNode;
}

function LessonGroup({ title, children }: LessonGroupProps) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      {children}
    </Box>
  )
}

interface LessonProps {
  title: string;
}

function Lesson({ title }: LessonProps) {
  return (
    <></>
  )
}

export default function LearnPage() {
  return (
    <Container>
      <Typography variant="h3" gutterBottom color="primary">
        Learn
      </Typography>
      <SearchBar />
      <LessonGroup title="Intro Algo Design">
        <Lesson title="Brute Force"/>
      </LessonGroup>
    </Container>
  )
}
