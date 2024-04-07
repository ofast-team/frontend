import React from 'react'
import { Box } from '@mui/material'

import ProblemBody from './ProblemBody'
import ProblemBlockCards from './ProblemBlockCards'
import { useProblemsObject } from '../ProblemProvider'
import { Problem } from '../../objects/Problems'
import ProblemNotFound from './ProblemNotFound'

interface ProblemBlockProps {
  problemID?: string | null
  problem?: Problem | null
}

export default function ProblemBlock({
  problemID,
  problem,
}: ProblemBlockProps) {
  if (problemID == null && problem == null) {
    return <ProblemNotFound />
  }

  const problemsObject = useProblemsObject()

  if (problemID != null) {
    problem = problemsObject.getProblem(problemID)
  }

  if (problem === null) {
    return <ProblemNotFound />
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
        {problem && <ProblemBody problem={problem} />}
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
        {problem && <ProblemBlockCards problem={problem} />}
      </Box>
    </Box>
  )
}
