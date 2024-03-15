import { Box, Button, Container, Grid, Typography, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'

import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'

import CircleIcon from '@mui/icons-material/Circle'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import buildPath from '../path'

import { useSelector } from 'react-redux'
import { RootState } from '../store'

import {
  SubmissionData,
  emptySubmissionData,
  formatSubmissionData,
} from './VerdictPage'
import { useProblemsObject } from '../components/ProblemProvider'

const PendingIcon = styled(CircleIcon)({
  fontSize: '36px',
  color: '#B5B1B1', // TODO: Find the right color gray for this
})

const CorrectIcon = styled(CheckCircleIcon)({
  fontSize: '36px',
  color: '#1db924',
})

const WrongAnswerIcon = styled(CancelIcon)({
  fontSize: '36px',
  color: '#FF5555',
})

const columnNames = [
  'Date',
  'Problem',
  'Verdict',
  'Language',
  'Time',
  'Memory',
  'Test Cases',
]
const columnWidths = [2, 2, 2, 1.5, 1.5, 1.5, 1.5]

export default function SubmissionsList() {
  const [submissionsTable, setSubmissionsTable] = useState<SubmissionData[]>()
  const [testCases, setTestCases] = useState<number[][]>([])
  const [submissionIds, setSubmissionIds] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const verdictProperties = Object.keys(emptySubmissionData)

  const [searchParams] = useSearchParams()
  const problemID = searchParams.get('problem')

  const problemsObj = useProblemsObject()

  const user = useSelector((state: RootState) => state.user)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchSubmissions = () => {
      setIsLoading(true)
      fetch(buildPath('/getSubmissions'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemIds: [problemID],
          uid: user.id,
          isBrief: false,
        }),
      })
        .then((res: Response) => {
          if (res.ok) {
            return res.json()
          }
        })
        .then((data) => {
          const problemSubmissions = data.submissionsPerProblem[0].submissions

          const buildTable: SubmissionData[] = []
          const buildTestCases: number[][] = []
          const buildSubmissionIds: string[] = []
          for (const submission of problemSubmissions) {
            const submissionData: SubmissionData = formatSubmissionData(
              submission,
              problemsObj,
            )
            buildTable.push(submissionData)
            buildTestCases.push(submission.verdict_list)
            buildSubmissionIds.push(submission.submission_id)
          }
          setSubmissionsTable(buildTable)
          setTestCases(buildTestCases)
          setSubmissionIds(buildSubmissionIds)
          setIsLoading(false)
        })
        .catch((error: Error) => {
          throw error
        })
    }
    fetchSubmissions()
  }, [])

  const onSubmissionClick = (submissionId) => {
    navigate('/submissions/' + submissionId)
  }

  if (isLoading) {
    return <React.Fragment />
  }

  return (
    <Container sx={{ pt: 15 }}>
      <Typography variant={'h4'} mb={2}>
        Submissions
      </Typography>
      <Box
        sx={{
          borderRadius: '10px',
          border: 'solid black 1px',
          overflow: 'hidden',
          mb: 5,
        }}
      >
        <Box
          sx={{
            height: 30,
            textAlign: 'center',
            bgcolor: '#6DB6C3',
            borderBottom: 'solid',
            borderWidth: '1px',
            pt: 0.5,
            pb: 0.5,
          }}
        >
          <Grid container>
            {columnNames.map((columnName, i) => (
              <Grid item xs={columnWidths[i]}>
                <Typography>{columnName}</Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
        {submissionsTable?.map((submission, i) => {
          return (
            <Button
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                borderTop: i > 0 ? 'solid black 1px' : '0px',
                borderRadius: 0,
              }}
              onClick={() => onSubmissionClick(submissionIds[i])}
            >
              <Grid container>
                {verdictProperties.map((property, j) => (
                  <Grid
                    item
                    xs={columnWidths[j]}
                    p={1}
                    textAlign={'center'}
                    pt={1}
                  >
                    {property === 'date' ? (
                      <Box>
                        <Typography variant="body2" fontSize={18}>
                          {submission[property].substring(
                            0,
                            submission[property].indexOf('\n'),
                          )}
                        </Typography>
                        <Typography variant="body2" fontSize={18}>
                          {submission[property].substring(
                            submission[property].indexOf('\n'),
                          )}
                        </Typography>
                      </Box>
                    ) : (
                      <Typography variant={'body2'} fontSize={18}>
                        {submission[property]}
                      </Typography>
                    )}
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ p: 2, display: 'flex', gap: 2 }}>
                {testCases[i]?.map((status) => {
                  if (status == 3) {
                    return <CorrectIcon />
                  }
                  if (status > 3) {
                    return <WrongAnswerIcon />
                  }
                  return <PendingIcon />
                })}
              </Box>
            </Button>
          )
        })}
      </Box>
    </Container>
  )
}
