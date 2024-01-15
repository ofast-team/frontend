import React, { useEffect, useState } from 'react'
import { compile, run } from '@mdx-js/mdx'
// eslint-disable-next-line
// @ts-ignore
import { Fragment, jsx, jsxs } from 'react/jsx-runtime'
import remarkMath from 'remark-math'
import rehypeMathJax from 'rehype-mathjax/svg'
import MCQBlock from './MCQBlock'
import FITBBlock from './FITBBlock'

import Alert from '@mui/material/Alert'

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

interface MarkdownRendererProps {
  path?: string
  value?: string
}

export default function MDX({ path, value }: MarkdownRendererProps) {
  const components = {
    MCQBlock,
    MDX,
    FITBBlock,
  }

  const [mdxContent, setMdxContent] = useState<JSX.Element | null>(null)

  useEffect(() => {
    value = value ? value : ''
    path = path ? path : ''

    const compilePath = async (path: string) => {
      fetch(path)
        .then((response) => response.text())
        .then(async (text) => {
          await compileValue(text)
        })
        .catch((error) => console.error(error))
    }

    const compileValue = async (value: string) => {
      try {
        const compiledResult = await compile(value, {
          outputFormat: 'function-body',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeMathJax],
        })

        const res = await run(compiledResult, {
          Fragment,
          jsx,
          jsxs,
          baseUrl: import.meta.url,
        })
        setMdxContent(res.default({ components: { code, ...components } }))
      } catch (e) {
        setMdxContent(
          <Alert severity="error">{'MDX Compile Error: ' + e.message}</Alert>,
        )
      }
    }

    if (path !== '') {
      compilePath(path)
    } else {
      compileValue(value)
    }
  }, [path, value])

  return mdxContent
}
