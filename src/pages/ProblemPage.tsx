import React from 'react'
import { useParams } from 'react-router-dom'
import ProblemBlock from '../components/ProblemPage/ProblemBlock'
import { Container } from '@mui/material'
import ProblemNotFound from '../components/ProblemPage/ProblemNotFound'

import { useProblemsObject } from '../components/ProblemProvider'
import { Problem } from '../objects/Problems'

export default function ProblemPage() {
  const params = useParams()
  const problemID: string = params.problem as string

  const problemsObject = useProblemsObject()
  const problem: Problem | null = problemsObject.getProblem(problemID)

  if (problem === null) {
    return <ProblemNotFound />
  }

  return (
    <Container sx={{ pt: 15 }}>
      <ProblemBlock problemID={problemID} />
    </Container>
  )
}
