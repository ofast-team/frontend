import {
  Box,
  Button,
  IconButton,
  Paper,
  Typography,
  styled,
} from '@mui/material'
import React, { Dispatch, SetStateAction, useState } from 'react'
import OptionDisplay from './OptionDisplay'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { Lightbulb } from '@mui/icons-material'

export const ShowAnswerBtn = styled(Button)({
  borderBottom: '2px solid #776E6E',
  color: '#776E6E',
  '&:hover': {
    borderColor: '#8E8D8D',
    color: '#000000',
  },
  '&:active': {
    borderColor: '#8E8D8D',
  },
})

interface HeaderProps {
  setShowHint: Dispatch<SetStateAction<boolean>>
  showAnswers: () => void
  handleReset: () => void
  result: number
}
function Header({
  setShowHint,
  showAnswers,
  handleReset,
  result,
}: HeaderProps) {
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
        Multiple Choice Question
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <ShowAnswerBtn onClick={showAnswers}>Show Answer</ShowAnswerBtn>
        <IconButton onClick={() => setShowHint(true)} disabled={result === 1}>
          <Lightbulb sx={{ color: '#04364a', fontSize: '2rem', m: 0 }} />
        </IconButton>
        <RestartAltIcon onClick={handleReset} />
      </Box>
    </Box>
  )
}

// TODO(cam) migrate componenets to JSX.Elements instead of using strings here to support markdown & Latex
interface MCQBlockProps {
  question: JSX.Element
  answerOptions: string[]
  correctOptions: string[]
  hint: string
  explanation: string
}

export default function MCQBlock({
  question,
  answerOptions,
  correctOptions,
  hint,
  explanation,
}: MCQBlockProps) {
  const isMultiple = correctOptions.length > 1
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [result, setResult] = useState<number>(0)
  const [showHint, setShowHint] = useState<boolean>(false)

  const resultText = [
    '',
    'Correct!',
    'One or more selected option is incorrect!',
  ]

  const handleAnswerSelection = (option: string, display: string) => {
    if (display === 'check') {
      if (selectedAnswers.includes(option)) {
        setSelectedAnswers(
          selectedAnswers.filter((selectedOption) => selectedOption !== option),
        )
      } else {
        setSelectedAnswers([...selectedAnswers, option])
      }
    } else if (display === 'radio') {
      setSelectedAnswers([option])
    }
  }

  const handleSubmission = () => {
    setSubmitted(true)
    handleResult()
  }

  const handleResult = () => {
    const allSelected = correctOptions.every((option) =>
      selectedAnswers.includes(option),
    )
    const noExtra = selectedAnswers.every((option) =>
      correctOptions.includes(option),
    )
    if (allSelected && noExtra) {
      setResult(1)
      setShowHint(false)
    } else setResult(2)
  }

  const showAnswers = () => {
    setSelectedAnswers(correctOptions)
    setSubmitted(true)
    setResult(1)
    setShowHint(false)
  }

  const handleTryAgain = () => {
    setSubmitted(false)
    setResult(0)
  }

  const handleReset = () => {
    setResult(0)
    setSubmitted(false)
    setSelectedAnswers([])
    setShowHint(false)
  }

  return (
    <Paper sx={{ border: '1px solid #000', my: 2 }}>
      <Header
        setShowHint={setShowHint}
        showAnswers={showAnswers}
        handleReset={handleReset}
        result={result}
      />
      <Box sx={{ p: 3 }}>
        <Typography gutterBottom component="span">
          {question}
        </Typography>
        {/* <Typography variant="h6" gutterBottom>
          {question}
        </Typography> */}
        <OptionDisplay
          selectedAnswers={selectedAnswers}
          answerOptions={answerOptions}
          correctOptions={correctOptions}
          handleAnswerSelection={handleAnswerSelection}
          submitted={submitted}
          isMultiple={isMultiple}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Box sx={{ alignItems: 'center' }}>
            <Typography sx={{ fontSize: '1rem' }}>
              {resultText[result]}
            </Typography>
            {submitted ? (
              <Button
                variant="contained"
                onClick={handleTryAgain}
                disabled={result === 1}
              >
                Try Again
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleSubmission}
                disabled={result === 1}
              >
                Submit
              </Button>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            my: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {result === 1 && (
            <Typography sx={{ fontSize: '1rem' }}>{explanation}</Typography>
          )}
          {showHint && (
            <Typography sx={{ fontSize: '1rem' }}>{hint}</Typography>
          )}
        </Box>
      </Box>
    </Paper>
  )
}
