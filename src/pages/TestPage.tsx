import React, { useEffect, Suspense, useState } from 'react'
// import Example from './Example.mdx'
import '../components/ReadingBlock.css'
import { Typography, Box } from '@mui/material'
// eslint-disable-next-line
// @ts-ignore
// import { Fragment, jsx, jsxs } from 'react/jsx-runtime'
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
// import MDX from '../components/DynamicMarkdownRenderer'
import { compile, run } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
// import { VFile } from 'vfile'

// function code(props) {
//   const { children, className, ...rest } = props
//   const match = /language-(\w+)/.exec(className || '')
//   return match ? (
//     <SyntaxHighlighter
//       {...rest}
//       children={String(children).replace(/\n$/, '')}
//       style={oneDark}
//       language={match[1]}
//       PreTag="div"
//       showLineNumbers
//     />
//   ) : (
//     <code {...rest} className={className}>
//       {children}
//     </code>
//   )
// }

export default function TestPage() {
  const [mdxContent, setMdxContent] = useState<JSX.Element | null>(null)

  useEffect(() => {
    const go = async () => {
      const result = await fetch('/lessons/dynamic_programming/TestLesson.mdx')
      const text = await result.text()
      // console.log(text)

      const compiledResult = await compile(text, {
        outputFormat: 'function-body',
      })
      const res = await run(compiledResult, { ...runtime })

      // console.log(res.default({}))
      setMdxContent(res.default({}))
    }

    go()
  }, [])

  return (
    <Typography
      className="markdown"
      gutterBottom
      color="primary"
      component={'span'}
    >
      <Box sx={{ height: '200px', bgcolor: 'green' }}></Box>
      <Suspense fallback={<h2>fallback</h2>}>{mdxContent}</Suspense>
    </Typography>
  )
}
