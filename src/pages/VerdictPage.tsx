import {
  Avatar,
  Box,
  Container,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'

import DownloadIcon from '@mui/icons-material/Download'
import MDXRenderer from '../components/MDXRenderer'

import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'

import ShareSubmissionDialog from '../components/ShareSubmissionDialog'
import ShareIcon from '@mui/icons-material/Share'

import { useProblemsObject } from '../components/ProblemProvider'
import { Problem } from '../objects/Problems'

import { useParams } from 'react-router-dom'
import buildPath from '../path'
import Circle from '@mui/icons-material/Circle'

const CorrectIcon = () => {
  return (
    <Avatar sx={{ backgroundColor: '#1db924' }}>
      <CheckIcon sx={{ color: 'white', fontSize: '32px' }}></CheckIcon>
    </Avatar>
  )
}

const WrongAnswerIcon = () => {
  return (
    <Avatar sx={{ backgroundColor: '#FF5555' }}>
      <CloseIcon sx={{ color: 'white', fontSize: '32px' }} />
    </Avatar>
  )
}

const PendingIcon = () => {
  return <Avatar/>
}

const code: string =
  " ```c++\n # include <bits/stdc++.h>\nusing namespace std;\n\nint n; cin >> n;\nfor (int i = 0; i < n; i++) {\n\t cout << 'Hello World' << '\\n';\n }"

const sub1 = {
  Date: '01-07-2024 10:58:32',
  Problem: 'Two Sum',
  Verdict: 'Time-Limit Exceeded',
  Language: 'C++',
  Time: '20ms',
  Memory: '12MB',
  'Test Cases': '3/5',
}

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

// What we are going to show in the table. This doesn't necessarily reflect the API response.
interface Verdict {
  date: string
  problem: string
  verdict: string
  language: string
  time: string
  memory: string
  casesPassed: string
}

export default function VerdictPage() {
  

  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>()
  const [isLoading, setIsLoading] = useState<boolean>()

  const emptyVerdict : Verdict = {
    date: "",
    problem: "",
    verdict: "",
    language: "",
    time: "",
    memory: "",
    casesPassed: ""
    
  }

  const verdictProperties = Object.keys(emptyVerdict)
  const [currentVerdict, setCurrentVerdict] = useState<Verdict>(emptyVerdict)
  const [testCases, setTestCases] = useState<number[]>()

  const problemsObject = useProblemsObject()

  const params = useParams()
  const submissionId : string = params.submissionId as string

  useEffect(() => {

    const fetchVerdict = () => {
      fetch(buildPath('/getVerdict'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: submissionId }),
      })
        .then((res: Response) => {
          if (res.ok) {
            return res.json()
          }

          throw Error(res.statusText)
        })
        .then((data) => {
          console.log(data)
          const dateInSeconds = data.date.seconds
          const date = new Date(dateInSeconds * 1000)

          const month = date.getMonth() + 1
          const day = date.getDate()
          const year = date.getFullYear()

          const casesPassedStr : string = data.passed_cases + " of " + data.total_cases
          
          const problemName : string = problemsObject.getProblem(data.problem_id)?.title || 'Custom Submission'

          // Format the date string
          const dateString = `${month}-${day}-${year}`
          setCurrentVerdict((prevVerdict: Verdict) => {
            return {...prevVerdict, date: dateString, problem: problemName, verdict: data.verdict, casesPassed: casesPassedStr}
          })
          setTestCases(data.verdict_list)
          setIsLoading(false)
          
        })
        .catch((error: Error) => {
          console.log('Verdict Fetch Failed: ' + error.message)
        })
    }

    setIsLoading(true)
    fetchVerdict()

    // Set up an interval to call the API every 5 seconds
    const interval = setInterval(fetchVerdict, 5000); // 5000 ms
    return () => clearInterval(interval);
    
  }, [])

  if (isLoading) {
    return <React.Fragment/>
  }

  return (
    <Container sx={{ pt: 15 }}>
      <Box display="flex" gap={1} alignItems={'center'} mb={2}>
        <Typography variant={'h4'}>Submission #{submissionId}</Typography>
        <IconButton>
          <ShareIcon
            sx={{ alignSelf: 'center', fontSize: '32px', color: 'black' }}
            onClick={() => {
              setDialogIsOpen(true)
            }}
          ></ShareIcon>
        </IconButton>
      </Box>

      <Box
        sx={{
          borderRadius: '10px', // Apply border radius to the whole box
          border: 'solid black 1px',
          overflow: 'hidden', // Ensure rounded corners are visible
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
        <Box>
          {/* Render the current submission and and its metadata*/}
          <Grid container>
            {verdictProperties.map((property, i) => (
              <Grid
                item
                xs={columnWidths[i]}
                p={1}
                textAlign={'center'}
                borderTop={'solid black 1px'}
              >
                <Typography variant={'body2'} fontSize={18}>
                  {currentVerdict[property]}
                </Typography>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ p: 2, display: 'flex', gap: 3 }}>
            {testCases?.map((status) => {
              if (status == 3) {
                return <CorrectIcon/>
              }
              if (status > 3) {
                return <WrongAnswerIcon/>
              }
              return <PendingIcon/>

            })}
          </Box>
        </Box>
      </Box>
      <Box display="flex" gap={1} alignItems={'center'}>
        <Typography fontSize={24}>Code File</Typography>

        <IconButton onClick={() => {}}>
          <DownloadIcon style={{ color: 'black' }}></DownloadIcon>
        </IconButton>
      </Box>
      <Box>
        <MDXRenderer value={code}></MDXRenderer>
      </Box>
      {dialogIsOpen && (
        <ShareSubmissionDialog
          onClose={() => {
            setDialogIsOpen(false)
          }}
          isOpen={true}
        ></ShareSubmissionDialog>
      )}
    </Container>
  )
}
