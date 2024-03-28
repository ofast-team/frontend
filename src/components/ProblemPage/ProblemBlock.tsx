import React from 'react'
import { Box } from '@mui/material'

import ProblemBody from './ProblemBody'
import ProblemBlockCards from './ProblemBlockCards'
import { useProblemsObject } from '../ProblemProvider'

export type Problem = {
  problemID: string
  title: string
  text: string
  problem: string
  input: string
  output: string
  sampleData: {
    input: string
    output: string
  }[]
  tags: string[]
  resources: {
    name: string
    url: string
  }[]
}

export default function ProblemBlock({ problemID }: { problemID: string }) {
  const problemsObject = useProblemsObject()
  const problem: Problem | null = problemsObject.getProblem(problemID)

  if (problem === null) {
    return <Box pt={15}>Problem not found</Box>
  }

  return (
    <Box
      sx={{
        display: {
          xs: 'block',
          sm: 'block',
          md: 'flex',
          lg: 'flex',
          xl: 'flex',
        },
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: {
            xs: '100%',
            sm: '100%',
            md: '60vw',
            lg: '60vw',
            xl: '60vw',
          },
        }}
      >
        <ProblemBody problem={problem} />
      </Box>

      <Box
        sx={{
          verticalAlign: 'top',
          pl: '30px',
          pt: '50px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <ProblemBlockCards problem={problem} />
      </Box>
    </Box>
  )
}
