import React from 'react'
import { useParams } from 'react-router-dom'
import ProblemBlock from '../components/ProblemBlock'
import { Container } from '@mui/material'

export default function ProblemPage() {
  const params = useParams()
  const problemID: string = params.problem as string

  return (
    <Container sx={{ pt: 15 }}>
      <ProblemBlock problemID={problemID} />{' '}
    </Container>
  )
}
