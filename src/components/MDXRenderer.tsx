import React, { useEffect, useState } from 'react'
import { compile, run } from '@mdx-js/mdx'
// eslint-disable-next-line
// @ts-ignore
import { Fragment, jsx, jsxs } from 'react/jsx-runtime'
import remarkMath from 'remark-math'
import rehypeMathJax from 'rehype-mathjax/svg'
import remarkGfm from 'remark-gfm'
import MCQBlock from './MCQBlock'
import FITBBlock from './FITBBlock'
import FITB_Text from './FITB_Text'
import FITB_Blank from './FITB_Blank'

import { Alert, Box, Fab, Tooltip } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

function code(props) {
  const [tooltip, setTooltip] = useState<string>('Copy to clipboard')
  const { children, className, ...rest } = props
  const match = /language-(\w+)/.exec(className || '')

  if (!match) {
    return (
      <code {...rest} className={className}>
        {children}
      </code>
    )
  }

  const codeStr = String(children).replace(/\n$/, '')

  return (
    <Box sx={{ position: 'relative' }}>
      <Tooltip
        title={tooltip}
        onClose={async () => {
          await new Promise((r) => setTimeout(r, 200))
          setTooltip('Copy to clipboard')
        }}
        sx={{ position: 'absolute', top: '20px', right: '20px' }}
      >
        <Fab
          color="secondary"
          onClick={() => {
            navigator.clipboard.writeText(codeStr)
            setTooltip('Copied!')
          }}
        >
          <ContentCopyIcon />
        </Fab>
      </Tooltip>
      <SyntaxHighlighter
        {...rest}
        children={codeStr}
        style={oneDark}
        language={match[1]}
        PreTag="div"
        showLineNumbers
      />
    </Box>
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
    FITB_Text,
    FITB_Blank,
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
          remarkPlugins: [remarkMath, remarkGfm],
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
