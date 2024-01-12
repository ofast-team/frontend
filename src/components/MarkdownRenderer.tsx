import React, { useEffect, Suspense, useState } from 'react'
import { compile, run } from '@mdx-js/mdx'
// eslint-disable-next-line
// @ts-ignore
import { Fragment, jsx, jsxs } from 'react/jsx-runtime'
import remarkMath from 'remark-math'
import rehypeMathJax from 'rehype-mathjax/svg'

interface MarkdownRendererProps {
  path: string
}

export default function MarkdownRenderer({ path }: MarkdownRendererProps) {
  const [mdxContent, setMdxContent] = useState<JSX.Element | null>(null)

  useEffect(() => {
    const go = async () => {
      const result = await fetch(path)
      const text = await result.text()

      const compiledResult = await compile(text, {
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
8
      setMdxContent(res.default({}))
    }

    go()
  }, [])

  return <Suspense fallback={<h2>fallback</h2>}>{mdxContent}</Suspense>
}
