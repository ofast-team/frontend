import React, { useState } from 'react'
import { Box, Typography, TextField } from '@mui/material'

import MDX from '../components/MDXRenderer'

export default function PlaygroundPage() {
  const [text, setText] = useState<string>('')

  return (
    <Box pt={15}>
      <Typography variant="h3" sx={{ mb: '20px' }}>
        MDX Playground
      </Typography>
      <TextField
        placeholder="Type MDX content here"
        multiline
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ marginBottom: '50px' }}
      />

      <Typography
        className="markdown"
        gutterBottom
        color="primary"
        component="span"
      >
        <MDX value={text} />
      </Typography>
    </Box>
  )
}
