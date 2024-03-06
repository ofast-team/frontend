import React from 'react'
import { Box, Typography } from '@mui/material'

interface ProblemPageCardProps {
  title: string
  children: React.ReactNode
  style?: React.CSSProperties | undefined
}

export default function ProblemPageCard(props: ProblemPageCardProps) {
  return (
    <Box
      style={{
        ...props.style,
        borderRadius: '15px',
        width: 300,
        border: 'solid',
        borderWidth: '1px',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          height: 30,
          textAlign: 'center',
          bgcolor: '#6DB6C3',
          borderBottom: 'solid',
          borderWidth: '1px',
          pt: 1,
        }}
      >
        <Typography gutterBottom color="primary" component="span" variant="h5">
          {props.title}
        </Typography>
      </Box>
      {props.children}
    </Box>
  )
}
