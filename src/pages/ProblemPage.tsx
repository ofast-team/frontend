import React from 'react'
import { useParams } from 'react-router-dom'
import ProblemBlock from '../components/ProblemPage/ProblemBlock'
import { Container, Box } from '@mui/material'

import { useProblemsObject } from '../components/ProblemProvider'
import { Problem } from '../objects/Problems'

// TODO: (Stretch Goal) Add copy button for samples
export default function ProblemPage() {
  const params = useParams()
  const problemID: string = params.problem as string

  const problemsObject = useProblemsObject()
  const problem: Problem | null = problemsObject.getProblem(problemID)

  if (problem === null) {
    return <Box pt={15}>Problem not found</Box>
  }

  return (
    <Container sx={{ pt: 15 }}>
      <ProblemBlock problemID={problemID} />
    </Container>
  )
}
