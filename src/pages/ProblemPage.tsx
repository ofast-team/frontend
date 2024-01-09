import React from 'react'
import { useParams } from 'react-router-dom'

export default function ProblemPage() {
  const params = useParams()
  console.log(params.problem)

  return (
    <div>ProblemPage</div>
  )
}
