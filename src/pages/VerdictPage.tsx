import { Box, Container, Grid, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DownloadIcon from '@mui/icons-material/Download'
import MDXRenderer from '../components/MDXRenderer'
import { CheckCircle, Share, Cancel, Cached } from '@mui/icons-material'
import ShareSubmissionDialog from '../components/ShareSubmissionDialog'
import { useProblemsObject } from '../components/ProblemProvider'
import { verdictInfo } from '../utils/verdict'
import { useParams } from 'react-router-dom'
import buildPath from '../path'

import { motion } from 'framer-motion'

const CorrectIcon = () => {
  return <CheckCircle sx={{ color: '#1db924', fontSize: '2.5rem' }} />
}

const WrongAnswerIcon = () => {
  return <Cancel sx={{ color: '#FF5555', fontSize: '2.5rem' }} />
}

const PendingIcon = () => {
  return (
    <motion.div
      animate={{ rotate: -180 }}
      transition={{ repeat: Infinity, duration: 2 }}
    >
      <Cached
        sx={{
          color: 'gray',
          fontSize: '2.5rem',
        }}
      />
    </motion.div>
  )
}

const codePlaceholder: string =
  " ```c++\n # include <bits/stdc++.h>\nusing namespace std;\n\nint n; cin >> n;\nfor (int i = 0; i < n; i++) {\n\t cout << 'Hello World' << '\\n';\n }"

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

export interface Verdict {
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
  const [isFinishedJudging, setIsFinishedJudging] = useState<boolean>(false)

  const emptyVerdict: Verdict = {
    date: '',
    problem: '',
    verdict: '',
    language: '',
    time: '',
    memory: '',
    casesPassed: '',
  }

  const verdictProperties = Object.keys(emptyVerdict)
  const [currentVerdict, setCurrentVerdict] = useState<Verdict>(emptyVerdict)
  const [testCases, setTestCases] = useState<number[]>([0])

  const [code, setCode] = useState<string>(codePlaceholder)
  const [problemName, setProblemName] = useState<string>('')
  const [verdictNum, setVerdictNum] = useState<number>(0)
  const [fileType, setFileType] = useState<string>('txt')

  const problemsObject = useProblemsObject()

  const params = useParams()
  const submissionId: string = params.submissionId as string

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
          const dateInSeconds = data.date.seconds
          const date = new Date(dateInSeconds * 1000)

          const dateStr = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }) + ' ' + date.toLocaleTimeString()

          const casesPassedStr: string =
            data.passed_cases + ' of ' + data.total_cases

          const problemName: string =
            problemsObject.getProblem(data.problem_id)?.title ||
            'Custom Submission'

          setProblemName(problemName)

          let langStr = 'unknown'
          if (data.language === 'cpp') {
            langStr = 'C++'
          }
          else if (data.language === 'java') {
            langStr = 'Java'
          }
          else if (data.language === 'py') {
            langStr = 'Python'
          }

          setVerdictNum(data.verdict)
          const verdictStr = isFinishedJudging ? verdictInfo[data.verdict].description : "Pending"

          const timeSeconds = data.time
          const timeMilliseconds = Math.ceil(timeSeconds * 1000)
          const timeStr = timeMilliseconds + " ms"

          const memoryKilobytes = data.memory
          const memoryMegaBytes = Math.ceil(memoryKilobytes / 1000)
          const memoryStr = memoryMegaBytes + " MB"

          const code = '```' + data.language + '\n' + atob(data.code)

          setCurrentVerdict((prevVerdict: Verdict) => {
            return {
              ...prevVerdict,
              date: dateStr,
              problem: problemName,
              language: langStr,
              verdict: verdictStr,
              time: timeStr,
              memory: memoryStr,
              casesPassed: casesPassedStr,
            }
          })

          setTestCases(data.verdict_list)
          setFileType(data.language)
          setCode(code)
          setIsLoading(false)

          let finished : boolean = true
          for (const v of data.verdict_list) {
            if (v < 3) {
              finished = false
              break
            }
          }

          setIsFinishedJudging(finished)

          // Stop the interval loop
          if (finished) {
            clearInterval(interval); 
            return;
          }
        })
        .catch((error: Error) => {
          console.log('Verdict Fetch Failed: ' + error.message)
        })
    }

    setIsLoading(true)
    fetchVerdict()

    const interval = setInterval(fetchVerdict, 2000)
    return () => clearInterval(interval)
  }, [isFinishedJudging])

  if (isLoading && !isFinishedJudging) {
    return <React.Fragment />
  }

  function downloadCodeFile() {
    const codeStr = code.substring(code.indexOf('\n') + 1)
    console.log(codeStr)

    const blob = new Blob([codeStr], { type: 'text/plain' });
    const link : HTMLAnchorElement = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `code.${fileType}`;
    link.click();
  
    // Clean up
    window.URL.revokeObjectURL(link.href);
  }

  return (
    <Container sx={{ pt: 15 }}>
      <Box display="flex" gap={1} alignItems={'center'} mb={2}>
        <Typography variant={'h4'}>Submission #{submissionId}</Typography>
        {isFinishedJudging &&
          <IconButton
            onClick={() => {
              setDialogIsOpen(true)
            }}
          >
            <Share
              sx={{ alignSelf: 'center', fontSize: '32px', color: 'black' }}
            />
          </IconButton>
        }
      </Box>

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
        <Box>
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
          <Box sx={{ p: 2, display: 'flex', gap: 2 }}>
            {testCases?.map((status) => {
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
      </Box>
      <Box display="flex" gap={1} alignItems={'center'}>
        <Typography fontSize={24}>Code File</Typography>

        <IconButton onClick={downloadCodeFile}>
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
          submissionId={submissionId}
          problemName= {problemName}
          verdictNum= {verdictNum}
        ></ShareSubmissionDialog>
      )}
    </Container>
  )
}
