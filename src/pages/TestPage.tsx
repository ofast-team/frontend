import React from 'react'
import Example from './Example.mdx'
import '../components/ReadingBlock.css'
import { Typography } from '@mui/material'

export default function TestPage() {
  return (
    <Typography
      className="markdown"
      gutterBottom
      color="primary"
      component={'span'}
    >
      <Example/>
    </Typography>
  )
}
