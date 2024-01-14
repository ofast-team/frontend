import React from 'react'
import { useParams } from 'react-router-dom'
import { Container, Box, Typography, Stack, Button, Chip } from '@mui/material'
import { Link } from 'react-router-dom'

import Card from '../components/ProblemPageCard'
import ProblemBody from '../components/ProblemBody'

import { problems } from './MockProblemData'

export type Problem = {
  title: string
  text: string
  problem: string
  input: string
  output: string
  sampleData: {
    input: JSX.Element
    output: JSX.Element
  }[]
  tags: string[]
  resources: {
    name: string
    url: string
  }[]
}

type Verdict = 'AC' | 'WA' | 'unsolved' | 'RTE' | 'CTE' | 'TLE'

interface Submission {
  verdict: Verdict
  time: Date
}

const submissions: Submission[] = [
  {
    verdict: 'AC',
    time: new Date(1234567890000),
  },
  {
    verdict: 'WA',
    time: new Date(1114567890000),
  },
]

interface StatusProps {
  status: Verdict
}

const verdictToColor = {
  AC: 'green',
  WA: 'red',
  unsolved: 'grey',
}

const verdictToText = {
  AC: 'Correct',
  WA: 'Wrong Answer',
  unsolved: 'Unsolved',
}

function Status(props: StatusProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <Box
        sx={{
          height: '30px',
          width: '30px',
          backgroundColor: verdictToColor[props.status],
          borderRadius: '50%',
          display: 'inline-block',
          m: '5px',
        }}
      />
      <Box m="10px">
        <Typography gutterBottom color="primary" component="span" variant="h5">
          {verdictToText[props.status]}
        </Typography>
      </Box>
    </Box>
  )
}

interface SubmissionItemProps {
  submission: Submission
}

function SubmissionItem({ submission }: SubmissionItemProps) {
  return (
    <Box sx={{ color: verdictToColor[submission.verdict] }}>
      {verdictToText[submission.verdict] +
        ' ' +
        submission.time.toLocaleTimeString() +
        ' ' +
        submission.time.toLocaleDateString('en-US')}
    </Box>
  )
}

// TODO: (Stretch Goal) Add copy button for samples
export default function ProblemPage() {
  const params = useParams()
  const problemID: string = params.problem as string

  if (!(problemID in problems)) {
    return <Box pt={15}>Problem not found</Box>
  }

  const problem = problems[problemID]

  return (
    <Container sx={{ pt: 15 }}>
      <ProblemBody problem={problem} />

      <Box
        sx={{
          display: 'inline-block',
          verticalAlign: 'top',
          pl: '30px',
          pt: '50px',
        }}
      >
        <Stack>
          <Card
            title="Status"
            style={{ height: '100px', marginBottom: '50px' }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                paddingTop: '10px',
              }}
            >
              <Status status="AC" />
            </Box>
          </Card>

          <Card
            title="Submit"
            style={{
              marginBottom: '50px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                paddingTop: '10px',
              }}
            >
              <Button>Choose file</Button>
            </Box>

            <Box
              sx={{
                paddingTop: '10px',
                paddingBottom: '30px',
              }}
            >
              {submissions.map((submission, key) => (
                <Box
                  key={key}
                  sx={{
                    display: 'flex',
                    justifyContent: 'left',
                    width: '100%',
                    paddingLeft: '25px',
                    marginBottom: '5px',
                  }}
                >
                  <SubmissionItem submission={submission} />
                </Box>
              ))}

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <a href="">All Submissions</a>
              </Box>
            </Box>
          </Card>

          <Card title="Tags" style={{ height: '100px', marginBottom: '50px' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                paddingTop: '10px',
              }}
            >
              {problem.tags.map((tag, key) => (
                <Chip key={key} label={tag} sx={{ mr: '10px' }} />
              ))}
            </Box>
          </Card>

          <Card title="Resources" style={{ height: '100px' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                paddingTop: '10px',
              }}
            >
              {problem.resources.map((resource, key) => (
                <span key={key} style={{ marginRight: '15px' }}>
                  <Link style={{ color: 'inherit' }} to={resource.url} replace>
                    <Typography
                      gutterBottom
                      color="primary"
                      component="span"
                      variant="body1"
                    >
                      {resource.name}
                    </Typography>
                  </Link>
                </span>
              ))}
            </Box>
          </Card>
        </Stack>
      </Box>
    </Container>
  )
}
