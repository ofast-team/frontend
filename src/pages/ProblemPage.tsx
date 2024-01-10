import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import Markdown from 'react-markdown'
import rehypeMathjax from 'rehype-mathjax/svg'
import remarkMath from 'remark-math'

const problems = {
  twosum: {
    title: 'Two Sum',
    text: 'Alice and Bob want to add two numbers. Can you help them?',
    problem:
      'Given two integers, a and b, write a program that outputs their sum.',
    input: '3 5',
    output: '8',
  },
}

export default function ProblemPage() {
  const params = useParams()
  const problemID: string = params.problem as string

  if (!(problemID in problems)) {
    return <Box pt={15}>Problem not found</Box>
  }

  const problem = problems[problemID]

  return (
    <Box pt={15}>
      <Typography
        className="markdown"
        gutterBottom
        color="primary"
        component={'span'}
      >
        <h1>{problem.title}</h1>
        <Markdown
          children={problem.text}
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeMathjax]}
        />

        <h2>Problem</h2>
        <Markdown
          children={problem.problem}
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeMathjax]}
        />
        
        <h2>Input</h2>
        {problem.input}
        
        <h2>Output</h2>
        {problem.output}
      </Typography>
    </Box>
  )
}
