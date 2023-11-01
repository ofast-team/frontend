import React from 'react'
import Markdown from 'react-markdown'
import rehypeMathjax from 'rehype-mathjax/svg'
import remarkMath from 'remark-math'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {vscDarkPlus} from 'react-syntax-highlighter/dist/esm/styles/prism'


import { MathJax, MathJaxContext } from 'better-react-mathjax'

import {
  Button,
  Typography
} from '@mui/material'

interface ReadingBlockProps {
  content: string;
}

export default function ReadingBlock(props: ReadingBlockProps) {
  console.log(props.content)
  return (
    <Typography gutterBottom color="primary" component={'span'}>
      {/* <MathJaxContext>
        <h2>Basic MathJax example with Latex</h2>
        <MathJax>{"\\(\\frac{10}{4x} \\approx 2^{12}\\)"}</MathJax>
      </MathJaxContext> */}
      {/* <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeMathjax]}>
        {props.content}
      </Markdown> */}
      <Markdown
        children={props.content}
        remarkPlugins={[remarkMath]} 
        rehypePlugins={[rehypeMathjax]}
        components={{
          code(props) {
            const {children, className, node, ...rest} = props
            const match = /language-(\w+)/.exec(className || '')
            return match ? (
              <SyntaxHighlighter
                {...rest}
                children={String(children).replace(/\n$/, '')}
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
              />
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            )
          }
        }}
      />
    </Typography>
      
  )
}
