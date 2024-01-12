import React, { useEffect, Suspense, useState } from 'react'
import { compile, run } from '@mdx-js/mdx'
// eslint-disable-next-line
// @ts-ignore
import { Fragment, jsx, jsxs } from 'react/jsx-runtime'
import remarkMath from 'remark-math'
import rehypeMathJax from 'rehype-mathjax/svg'
import MCQBlock from './MCQBlock'
import FITBBlock from './FITBBlock'

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
      setMdxContent(res.default({ components }))
    }

    if (path !== '') {
      compilePath(path)
    } else {
      compileValue(value)
    }
  }, [])

  return <Suspense fallback={<h2>fallback</h2>}>{mdxContent}</Suspense>
}
