import React, { useEffect, useState } from 'react'
import { compile, run } from '@mdx-js/mdx'
// eslint-disable-next-line
// @ts-ignore
import { Fragment, jsx, jsxs } from 'react/jsx-runtime'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkToC from 'remark-toc'
import remarkMath from 'remark-math'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeMathJax from 'rehype-mathjax/svg'
import remarkGfm from 'remark-gfm'
import MCQBlock from './MCQBlock'
import FITBBlock from './FITBBlock'
import FITBBlank from './FITBBlank'
import { h } from 'hastscript'

import { Alert, Box, Fab, Tooltip } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

import './MDXRenderer.css'

const AnchorLinkIcon = h(
  'svg',
  {
    width: '0.75em',
    height: '0.75em',
    version: 1.1,
    viewBox: '0 0 16 16',
    xlmns: 'http://www.w3.org/2000/svg',
  },
  h('path', {
    fillRule: 'evenodd',
    fill: 'currentcolor',
    d: 'M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z',
  }),
)

const handleScrollToAnchor = () => {
  if (location.hash) {
    const anchorId = location.hash.substring(1)
    const anchorElement = document.getElementById(anchorId)

    if (anchorElement) {
      anchorElement.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

function code(props) {
  const [tooltip, setTooltip] = useState<string>('Copy to clipboard')
  const { children, className, ...rest } = props

  // Inline code blocks (single backticks)
  if (!className) {
    return (
      <code
        {...rest}
        style={{
          borderRadius: '5px',
          backgroundColor: '#dae5ed',
          paddingLeft: '5px',
          paddingRight: '5px',
        }}
      >
        {children}
      </code>
    )
  }

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
    FITBBlank,
    code,
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

    let timer: NodeJS.Timeout | null = null

    const compileValue = async (value: string) => {
      try {
        const compiledResult = await compile(value, {
          outputFormat: 'function-body',
          remarkPlugins: [
            remarkFrontmatter,
            remarkMdxFrontmatter,
            remarkMath,
            remarkGfm,
            remarkToC,
          ],
          rehypePlugins: [
            rehypeMathJax,
            rehypeSlug,
            [
              rehypeAutolinkHeadings,
              {
                behavior: 'prepend',
                properties: {
                  ariaHidden: 'true',
                  tabindex: -1,
                  class: 'anchor',
                },
                content: () => [
                  h(
                    `span`,
                    {
                      ariaHidden: 'true',
                    },
                    AnchorLinkIcon,
                  ),
                ],
              },
            ],
          ],
        })

        const res = await run(compiledResult, {
          Fragment,
          jsx,
          jsxs,
          baseUrl: import.meta.url,
        })

        setMdxContent(res.default({ components }))

        timer = setTimeout(() => {
          handleScrollToAnchor()
        }, 300)
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

    if (timer !== null) {
      return () => clearTimeout(timer as NodeJS.Timeout)
    }
  }, [path, value])

  return mdxContent
}
