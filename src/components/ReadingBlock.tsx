import React from 'react'
import Markdown from 'react-markdown'
import rehypeMathjax from 'rehype-mathjax/svg'
import remarkMath from 'remark-math'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { Typography } from '@mui/material'

interface ReadingBlockProps {
  content: string
}

export default function ReadingBlock(props: ReadingBlockProps) {
  return (
    <Typography gutterBottom color="primary" component={'span'}>
      <Markdown
        children={props.content}
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeMathjax]}
        components={{
          code(props) {
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
          },
        }}
      />
    </Typography>
  )
}
