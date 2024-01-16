import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { ShowAnswerBtn } from './MCQBlock'
import React, { useState } from 'react'
import TheBlank from './TheBlank'
import HintDisplay from './HintDisplay'

// Parser for FITB Questions. Determine the location of the
// blanks and their correct answers. Create components for text and blanks.
function createFITBFormFromQuestionString(
  question: string,
  submitted: boolean,
  showAnswer: boolean,
): React.JSX.Element[] {
  let curStr: string = ''
  const fitbForm: React.JSX.Element[] = []
  const arr: string[] = []
  for (let i = 0; i < question.length; i++) {
    if (
      i < question.length - 1 &&
      question[i] == '\\' &&
      (question[i + 1] == '{' || question[i + 1] == '}')
    ) {
      curStr += question[i + 1]
      i++
    } else if (question[i] == '{') {
      fitbForm.push(<Typography>{curStr}</Typography>)
      curStr = ''
      let blankAns: string = ''
      i++
      while (i < question.length && question[i] != '}') {
        if (
          i < question.length - 1 &&
          question[i] == '\\' &&
          (question[i + 1] == '{' || question[i + 1] == '}')
        ) {
          blankAns += question[i + 1]
          i++
        } else {
          blankAns += question[i]
        }
        i++
      }
      fitbForm.push(
        <TheBlank
          correctAnswer={blankAns}
          respond={submitted}
          showAnswer={showAnswer}
        />,
      )
      arr.push(blankAns)
    } else {
      curStr += question[i]
      if (question[i] == ' ') {
        fitbForm.push(<Typography padding={0.3}>{curStr}</Typography>)
        curStr = ''
      }
    }
  }

  if (curStr.length > 0) {
    fitbForm.push(<Typography>{curStr}</Typography>)
  }

  fitbForm.map((x) => <Grid item>{x}</Grid>)

  return fitbForm
}

interface HeaderProps {
  hint: string
}

function Header({ hint }: HeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#6DB6C3',
        color: '#000',
        p: 2,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: 'left',
        }}
      >
        Fill in the Blank
      </Typography>
      <HintDisplay hint={hint} />
    </Box>
  )
}

// TODO(cam) migrate componenets to JSX.Elements instead of using strings here to support markdown & Latex
interface FITBBlockProps {
  question: string
  hint: string
}

export default function FITBBlock({ question, hint }: FITBBlockProps) {
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [numAttempts, setNumAttempts] = useState<number>(3)
  const [showAnswer, setShowAnswer] = useState<boolean>(false)

  const fitbForm = createFITBFormFromQuestionString(
    question,
    submitted,
    showAnswer,
  )

  return (
    <Paper sx={{ border: '1px solid #000', my: 2 }}>
      <Header hint={hint} />
      <Box sx={{ p: 3 }}>
        <Grid container rowGap={2.5} alignItems="center" marginBottom={4}>
          {fitbForm}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <ShowAnswerBtn
            onClick={() => {
              setNumAttempts(0)
              setShowAnswer(true)
            }}
          >
            Show Answer
          </ShowAnswerBtn>
          {submitted ? (
            <Button
              variant="contained"
              onClick={() => {
                setSubmitted(false)
                setNumAttempts(numAttempts - 1)
              }}
              disabled={numAttempts <= 1}
            >
              Try Again
            </Button>
          ) : (
            <Button
              variant="contained"
              disabled={numAttempts === 0}
              onClick={() => setSubmitted(true)}
            >
              Submit
            </Button>
          )}
        </Box>
        <Typography variant="subtitle2" color="error">
          Attempts Left: {numAttempts}
        </Typography>
      </Box>
    </Paper>
  )
}
