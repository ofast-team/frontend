import React from 'react'
import Example from './Example.mdx'
import '../components/ReadingBlock.css'
import { Typography } from '@mui/material'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

function code(props) {
  const { children, className, ...rest } = props
  const match = /language-(\w+)/.exec(className || '')
  return match ? (
    <SyntaxHighlighter
      {...rest}
      children={String(children).replace(/\n$/, '')}
      style={oneDark}
      language={match[1]}
      PreTag="div"
      showLineNumbers
    />
  ) : (
    <code {...rest} className={className}>
      {children}
    </code>
  )
}

export default function TestPage() {
  return (
    <Typography
      className="markdown"
      gutterBottom
      color="primary"
      component={'span'}
    >
      <Example components={{ code }} />
    </Typography>
  )
}
