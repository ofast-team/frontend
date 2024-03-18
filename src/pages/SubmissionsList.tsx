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
import { verdictInfo } from '../utils/verdict'

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

function SubmissionTableElem({ xs, children }) {
  return (
    <Grid item xs={xs} p={1} textAlign={'center'} pt={1}>
      {children}
    </Grid>
  )
}

const columnNames = [
  'Date',
  'Problem',
  'Verdict',
  'Language',
  'Time',
  'Memory',
  'Test Cases',
  '',
]
const columnWidths = [1.75, 1.75, 1.75, 1.25, 1.25, 1.25, 1.25, 1.75]

export default function SubmissionsList() {
  const [submissionsTable, setSubmissionsTable] = useState<SubmissionData[]>()
  const [testCases, setTestCases] = useState<number[][]>([])
  const [submissionIds, setSubmissionIds] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [verdicts, setVerdicts] = useState<number[]>([])
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
          const unformattedSubmissions =
            data.submissionsPerProblem[0].submissions

          // Data we're going to display in the table
          setSubmissionsTable(
            unformattedSubmissions.map((s) =>
              formatSubmissionData(s, problemsObj),
            ),
          )

          // Other data that we'll need for later.
          setTestCases(unformattedSubmissions.map((s) => s.verdict_list))
          setSubmissionIds(unformattedSubmissions.map((s) => s.submission_id))
          setVerdicts(unformattedSubmissions.map((s) => s.verdict))
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
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                borderTop: i > 0 ? 'solid black 1px' : '0px',
                borderRadius: 0,
              }}
            >
              <Grid container>
                {/* Time & Date */}
                <SubmissionTableElem xs={columnWidths[0]}>
                  <Typography variant="body2" fontSize={18}>
                    {submission.date.substring(
                      0,
                      submission.date.indexOf('\n'),
                    )}
                  </Typography>
                  <Typography variant="body2" fontSize={18}>
                    {submission.date.substring(submission.date.indexOf('\n'))}
                  </Typography>
                </SubmissionTableElem>
                {/* Problem */}
                <SubmissionTableElem xs={columnWidths[1]}>
                  <Link to={'/problem/' + problemID}>
                    <Typography
                      variant={'body2'}
                      fontSize={18}
                    >
                      {problemID
                        ? problemsObj?.getProblem(problemID)?.title
                        : 'Custom Submission'}
                    </Typography>
                  </Link>
                </SubmissionTableElem>
                {/* Verdict */}
                <SubmissionTableElem xs={columnWidths[2]}>
                  <Box>
                    <Typography
                      variant={'body2'}
                      fontSize={18}
                      color={verdictInfo[verdicts[i]].color}
                    >
                      {submission.verdict}
                    </Typography>
                  </Box>
                </SubmissionTableElem>
                {/* Language */}
                <SubmissionTableElem xs={columnWidths[3]}>
                  <Box>
                    <Typography
                      variant={'body2'}
                      fontSize={18}
                    >
                      {submission.language}
                    </Typography>
                  </Box>
                </SubmissionTableElem>
                {/* Time */}
                <SubmissionTableElem xs={columnWidths[4]}>
                  <Box>
                    <Typography
                      variant={'body2'}
                      fontSize={18}
                    >
                      {submission.time}
                    </Typography>
                  </Box>
                </SubmissionTableElem>
                {/* Memory */}
                <SubmissionTableElem xs={columnWidths[5]}>
                  <Box>
                    <Typography
                      variant={'body2'}
                      fontSize={18}
                    >
                      {submission.memory}
                    </Typography>
                  </Box>
                </SubmissionTableElem>
                {/* Test Cases Passed*/}
                <SubmissionTableElem xs={columnWidths[6]}>
                  <Box>
                    <Typography
                      variant={'body2'}
                      fontSize={18}
                    >
                      {submission.casesPassed}
                    </Typography>
                  </Box>
                </SubmissionTableElem>
                {/* View Submission*/}
                <SubmissionTableElem xs={columnWidths[7]}>
                  <Box>
                    <Button variant="contained" onClick = {() => onSubmissionClick(submissionIds[i])}>
                      {'View Submission'}
                    </Button>
                  </Box>
                </SubmissionTableElem>
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
            </Box>
          )
        })}
      </Box>
    </Container>
  )
}
