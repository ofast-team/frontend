import React, { useState, useEffect } from 'react'
import { Box, Typography, Stack, Button, Chip } from '@mui/material'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

import Card from './ProblemBlockCard'

import buildPath from '../../path'

import { Verdict, verdictInfo } from '../../utils/verdict'

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

interface Submission {
  submissionID: string
  verdict: Verdict
  time: Date
}

interface StatusProps {
  solved: boolean
}

function Status({ solved }: StatusProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <Box
        sx={{
          height: '30px',
          width: '30px',
          backgroundColor: solved ? 'green' : 'grey',
          borderRadius: '50%',
          display: 'inline-block',
          m: '5px',
        }}
      />
      <Box m="10px">
        <Typography gutterBottom color="primary" component="span" variant="h5">
          {solved ? 'Solved' : 'Not Solved'}
        </Typography>
      </Box>
    </Box>
  )
}

// TODO: (Stretch Goal) Add copy button for samples
export default function ProblemBlockCards({ problem }: { problem: Problem }) {
  const user = useSelector((state: RootState) => state.user)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [solved, setSolved] = useState<boolean>(false)

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch(buildPath('/getSubmissions'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            problemIds: [problem.problemID],
            uid: user.id,
            isBrief: false,
          }),
        })
        const result = await response.json()

        // Only show the recent 5 submissions
        const resultSubmissions =
          result.submissionsPerProblem[0].submissions.slice(0, 5)

        const newSubmissions: Submission[] = resultSubmissions.map(
          (resultSubmission) => {
            return {
              submissionID: resultSubmission.submission_id,
              verdict: resultSubmission.verdict,
              time: new Date(resultSubmission.date.seconds * 1000),
            }
          },
        )

        setSolved(result.submissionsPerProblem[0].isAccepted)
        setSubmissions(newSubmissions)
      } catch (error) {
        console.error('Error fetching submissions')
      }
    }

    fetchSubmissions()
  }, [])

  return (
    <>
      <Stack>
        {user.signedIn && (
          <Card title="Status" style={{ marginBottom: '50px' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <Status solved={solved} />
            </Box>
          </Card>
        )}

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
            }}
          >
            {user.signedIn ? (
              <>
                <Button>Choose file</Button>
                <Button>Submit</Button>
              </>
            ) : (
              <Button>
                <Link
                  to={'/login'}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <Typography
                    color="primary"
                    variant="h5"
                    sx={{ fontSize: '1em' }}
                  >
                    Log in to submit
                  </Typography>
                </Link>
              </Button>
            )}
          </Box>
        </Card>

        {user.signedIn && (
          <Card
            title="Submissions"
            style={{
              marginBottom: '50px',
            }}
          >
            <Box
              className="tablebordergrey"
              sx={{
                padding: '10px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <table style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>
                      <Typography
                        color="primary"
                        variant="h5"
                        sx={{ fontSize: '1em' }}
                      >
                        Verdict
                      </Typography>
                    </th>
                    <th>
                      <Typography
                        color="primary"
                        variant="h5"
                        sx={{ fontSize: '1em' }}
                      >
                        Time
                      </Typography>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission, key) => (
                    <tr key={key}>
                      <td
                        style={{
                          textAlign: 'center',
                        }}
                      >
                        <Link
                          style={{ textDecoration: 'none' }}
                          to={`/submissions/${submission.submissionID}`}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              color: verdictInfo[submission.verdict].color,
                              fontSize: '1em',
                            }}
                          >
                            {verdictInfo[submission.verdict].description}
                          </Typography>
                        </Link>
                      </td>
                      <td
                        style={{
                          textAlign: 'center',
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: '1em',
                          }}
                        >
                          {submission.time.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                          <Box />
                          {submission.time.toLocaleTimeString()}
                        </Typography>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <Button>
                <Link
                  to={'/submissions?problem=' + problem.problemID}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  All Submissions
                </Link>
              </Button>
            </Box>
          </Card>
        )}

        <Card title="Tags" style={{ marginBottom: '50px' }}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            {problem.tags.map((tag, i) => (
              <Chip
                key={i}
                label={tag}
                sx={{ mr: i + 1 < problem.tags.length ? '10px' : '0px' }}
              />
            ))}
          </Stack>
        </Card>

        <Card title="Resources">
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            {problem.resources.map((resource, i) => (
              <span key={i}>
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
          </Stack>
        </Card>
      </Stack>
    </>
  )
}
