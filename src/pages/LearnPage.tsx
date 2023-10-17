import React from 'react'
import { Container, Typography, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

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
      />
    </div>
  )
}

export default function LearnPage() {
  return (
    <Container>
      <Typography variant="h3" gutterBottom color="primary">
        Learn
      </Typography>
      <SearchBar />
    </Container>
  )
}
