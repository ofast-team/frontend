import React from 'react'
import { Typography, TextField } from '@mui/material'

import MDX from '../MDXRenderer'

export default function MDXTab() {
  const [text, setText] = React.useState<string>('')

  return (
    <>
      <TextField
        placeholder="Type MDX content here"
        multiline
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ my: '25px' }}
      />

      <Typography
        className="markdown themeborder"
        gutterBottom
        color="primary"
        component="span"
      >
        <MDX value={text} />
      </Typography>
    </>
  )
}
