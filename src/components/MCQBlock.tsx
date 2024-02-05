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
import {
  CheckCircle,
  RestartAlt,
  TipsAndUpdates,
  ErrorOutline,
} from '@mui/icons-material'
import MDX from './MDXRenderer'

interface HighlightTitleProps {
  value: string
  color?: string
}
function HighlightTile({ value, color }: HighlightTitleProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: 'fit-content',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        mt: 1,
        pr: 1,
        backgroundColor: `${color}`,
        gap: '8px',
      }}
    >
      <TipsAndUpdates sx={{ color: 'primary', fontSize: '1.3rem', m: 0 }} />
      <Typography>{value}</Typography>
    </Box>
  )
}

export const ShowAnswerBtn = styled(Button)({
  fontSize: '1.1rem',
  color: '#04364a',
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
        alignItems: 'center',
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
          <TipsAndUpdates sx={{ color: '#04364a', fontSize: '2rem', m: 0 }} />
        </IconButton>
        <IconButton>
          <RestartAlt
            sx={{ color: '#04364a', fontSize: '2rem', m: 0 }}
            onClick={handleReset}
          />
        </IconButton>
      </Box>
    </Box>
  )
}

interface MCQBlockProps {
  question: string
  answerOptions: string[]
  optionVerdicts: boolean[]
  hint: string
  explanation: string
}

export default function MCQBlock({
  question,
  answerOptions,
  optionVerdicts,
  hint,
  explanation,
}: MCQBlockProps) {
  const correctOptions: number[] = []

  optionVerdicts.forEach((isCorrect, index) => {
    if (isCorrect) {
      correctOptions.push(index)
    }
  })

  const isMultiple = correctOptions.length > 1
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [result, setResult] = useState<number>(0)
  const [showHint, setShowHint] = useState<boolean>(false)

  const resultText = [
    '',
    'Correct!',
    'One or more selected option is incorrect!',
  ]

  const resultIcon = ['', <CheckCircle />, <ErrorOutline />]

  const bgResultColor = ['#ffffff00', '#a3eca6', '#9e9e9e']

  const handleAnswerSelection = (option: number, display: string) => {
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
        <Typography sx={{ lineHeight: '1', mb: '6px' }} component="span">
          <MDX value={question} />
        </Typography>
        <OptionDisplay
          selectedAnswers={selectedAnswers}
          answerOptions={answerOptions}
          correctOptions={correctOptions}
          handleAnswerSelection={handleAnswerSelection}
          submitted={submitted}
          isMultiple={isMultiple}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: 3,
            flexDirection: 'row',
          }}
        >
          {submitted ? (
            <Button
              variant="contained"
              onClick={handleTryAgain}
              disabled={result === 1}
              sx={{
                fontSize: '1rem',
                display: `${result === 1 ? 'none' : 'block'}`,
              }}
            >
              Try Again
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleSubmission}
              disabled={result === 1}
              sx={{
                fontSize: '1rem',
                display: `${result === 1 ? 'none' : 'block'}`,
              }}
            >
              Submit
            </Button>
          )}
        </Box>
        <Box
          sx={{
            mt: 2,
            flexDirection: 'column',
            justifyContent: 'space-between',
            color: 'black',
            backgroundColor: `${bgResultColor[result]}`,
            borderRadius: '5px',
            flexGrow: 1,
            p: 1,
            display: `${submitted ? 'flex' : 'none'}`,
            gap: '10px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '6px',
              mt: '4px',
              alignItems: 'center',
            }}
          >
            {resultIcon[result]}
            <Typography sx={{ fontSize: '1.4rem', fontWeight: '500' }}>
              {resultText[result]}
            </Typography>
          </Box>
          {result === 1 && (
            <div>
              <HighlightTile value="Explanation" />
              <Typography sx={{ fontSize: '1.1rem', pr: 1 }}>
                <MDX value={explanation} />
              </Typography>
            </div>
          )}
        </Box>
        <Box>
          {showHint && (
            <div>
              <HighlightTile value="Hint" color="#FFFF00" />
              <Typography sx={{ fontSize: '1.1rem', pr: 1 }}>
                <MDX value={hint} />
              </Typography>
            </div>
          )}
        </Box>
      </Box>
    </Paper>
  )
}
