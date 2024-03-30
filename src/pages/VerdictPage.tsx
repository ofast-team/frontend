import { Box, Container, Grid, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DownloadIcon from '@mui/icons-material/Download'
import MDXRenderer from '../components/MDXRenderer'
import { CheckCircle, Share, Cancel, Cached } from '@mui/icons-material'
import ShareSubmissionDialog from '../components/ShareSubmissionDialog'
import { useProblemsObject } from '../components/ProblemProvider'
import { verdictInfo } from '../utils/verdict'
import { Link, useParams } from 'react-router-dom'
import buildPath from '../path'

import { motion } from 'framer-motion'
import { SubmissionTableElem } from './SubmissionsList'
import Problems from '../objects/Problems'

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

export const emptySubmissionData: SubmissionData = {
  date: '',
  problem: '',
  verdict: '',
  language: '',
  time: '',
  memory: '',
  casesPassed: '',
}

export function formatSubmissionData(data, problemsObj): SubmissionData {
  const formattedData = emptySubmissionData

  const dateInSeconds = data.date.seconds
  const date = new Date(dateInSeconds * 1000)

  const dateStr =
    date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }) +
    '\n' +
    date.toLocaleTimeString()

  const casesPassedStr: string = data.passed_cases + ' of ' + data.total_cases

  const problemName: string =
    problemsObj.getProblem(data.problem_id)?.title || 'Custom Submission'

  let langStr = 'unknown'
  if (data.language === 'c') {
    langStr = 'C'
  } else if (
    data.language === 'cpp' ||
    data.language === 'cxx' ||
    data.language === 'cc'
  ) {
    langStr = 'C++'
  } else if (data.language === 'java') {
    langStr = 'Java'
  } else if (data.language === 'py') {
    langStr = 'Python'
  }

  const isPending = data.pending
  const verdictStr = isPending
    ? 'Pending'
    : verdictInfo[data.verdict].description

  const timeSeconds = data.time
  const timeMilliseconds = Math.ceil(timeSeconds * 1000)
  const timeStr = timeMilliseconds + ' ms'

  const memoryKilobytes = data.memory
  const memoryMegaBytes = Math.ceil(memoryKilobytes / 1024)

  const memoryStr =
    memoryKilobytes < 1024 ? memoryKilobytes + ' KB' : memoryMegaBytes + ' MB'

  return {
    ...formattedData,
    date: dateStr,
    problem: problemName,
    language: langStr,
    verdict: verdictStr,
    time: timeStr,
    memory: memoryStr,
    casesPassed: casesPassedStr,
  }
}

export interface SubmissionData {
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
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isFinishedJudging, setIsFinishedJudging] = useState<boolean>(false)

  const [currentSubmissionData, setCurrentSubmissionData] =
    useState<SubmissionData>(emptySubmissionData)
  const [testCases, setTestCases] = useState<number[]>([0])

  const [code, setCode] = useState<string>('')
  const [problemName, setProblemName] = useState<string>('')
  const [problemID, setProblemID] = useState<string>('')
  const [verdictNum, setVerdictNum] = useState<number>(1)
  const [fileType, setFileType] = useState<string>('txt')

  const params = useParams()
  const submissionId: string = params.submissionId as string

  const problemsObject = useProblemsObject()

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
          const problemName: string =
            problemsObject?.getProblem(data.problem_id)?.title ||
            'Custom Submission'
          setProblemName(problemName)
          setProblemID(data.problem_id)

          const code = `\`\`\`${data.language}\n${atob(data.code)}\`\`\``
          const newSubmissionData = formatSubmissionData(data, problemsObject)
          setCurrentSubmissionData(newSubmissionData)

          setVerdictNum(data.verdict)
          setTestCases(data.verdict_list)
          setFileType(data.language)
          setCode(code)
          setIsLoading(false)

          if (!data.pending) {
            setIsFinishedJudging(true)
            stopTimer()
            return
          }
        })
        .catch((error: Error) => {
          console.log('Verdict Fetch Failed: ' + error.message)
        })
    }
    fetchVerdict()

    // Set up a 2s timer that repeats until its told otherwise.
    const interval = setInterval(fetchVerdict, 2000)

    const stopTimer = () => {
      clearInterval(interval)
    }

    // useEffect allows you to return a cleanup function,
    // which gets called when the component unmounts.
    return stopTimer
  }, [problemsObject])

  // I'm using the problem count as an indicator of if the problem provider has the data ready.
  if (isLoading || problemsObject.getNumProblems() == 0) {
    return <React.Fragment />
  }

  function downloadCodeFile() {
    const codeStr = code.substring(code.indexOf('\n') + 1)

    const blob = new Blob([codeStr], { type: 'text/plain' })
    const link: HTMLAnchorElement = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = `code.${fileType}`
    link.click()

    // Clean up
    window.URL.revokeObjectURL(link.href)
  }

  return (
    <Container sx={{ pt: 15 }}>
      <Box display="flex" gap={1} alignItems={'center'} mb={2}>
        <Typography variant={'h4'}>Submission #{submissionId}</Typography>
        {isFinishedJudging && (
          <IconButton
            onClick={() => {
              setDialogIsOpen(true)
            }}
          >
            <Share
              sx={{ alignSelf: 'center', fontSize: '32px', color: 'black' }}
            />
          </IconButton>
        )}
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
            {/* Time & Date */}
            <SubmissionTableElem xs={columnWidths[0]}>
              <Typography variant="body2" fontSize={18}>
                {currentSubmissionData.date.substring(
                  0,
                  currentSubmissionData.date.indexOf('\n'),
                )}
              </Typography>
              <Typography variant="body2" fontSize={18}>
                {currentSubmissionData.date.substring(
                  currentSubmissionData.date.indexOf('\n'),
                )}
              </Typography>
            </SubmissionTableElem>
            {/* Problem */}
            <SubmissionTableElem xs={columnWidths[1]}>
              {problemName === 'Custom Submission' ? (
                <Typography variant={'body2'} fontSize={18}>
                  {currentSubmissionData.problem}
                </Typography>
              ) : (
                <Link to={'/problem/' + problemID}>
                  <Typography variant={'body2'} fontSize={18}>
                    {currentSubmissionData.problem}
                  </Typography>
                </Link>
              )}
            </SubmissionTableElem>
            {/* Verdict */}
            <SubmissionTableElem xs={columnWidths[2]}>
              <Box>
                <Typography
                  variant={'body2'}
                  fontSize={18}
                  color={verdictInfo[verdictNum].color}
                >
                  {currentSubmissionData.verdict}
                </Typography>
              </Box>
            </SubmissionTableElem>
            {/* Language */}
            <SubmissionTableElem xs={columnWidths[3]}>
              <Box>
                <Typography variant={'body2'} fontSize={18}>
                  {currentSubmissionData.language}
                </Typography>
              </Box>
            </SubmissionTableElem>
            {/* Time */}
            <SubmissionTableElem xs={columnWidths[4]}>
              <Box>
                <Typography variant={'body2'} fontSize={18}>
                  {currentSubmissionData.time}
                </Typography>
              </Box>
            </SubmissionTableElem>
            {/* Memory */}
            <SubmissionTableElem xs={columnWidths[5]}>
              <Box>
                <Typography variant={'body2'} fontSize={18}>
                  {currentSubmissionData.memory}
                </Typography>
              </Box>
            </SubmissionTableElem>
            {/* Test Cases Passed*/}
            <SubmissionTableElem xs={columnWidths[6]}>
              <Box>
                <Typography variant={'body2'} fontSize={18}>
                  {currentSubmissionData.casesPassed}
                </Typography>
              </Box>
            </SubmissionTableElem>
          </Grid>
          <Box sx={{ p: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
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
          problemName={problemName}
          verdictNum={verdictNum}
        ></ShareSubmissionDialog>
      )}
    </Container>
  )
}
