import { Box, Button, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import OptionDisplay from './OptionDisplay'
import { TipsAndUpdates } from '@mui/icons-material'
import MDX from '../MDXRenderer'
import Header from './Header'
import Result from './Result'

interface MCQBlockProps {
  question: string
  answerOptions: string[]
  optionVerdicts: boolean[]
  hint?: string
  explanation?: string
}

export default function MCQBlock({
  question,
  answerOptions,
  optionVerdicts,
  explanation,
  hint,
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
  const [showAnswer, setShowAnswer] = useState<boolean>(false)

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
      return true
    } else if (isMultiple && !allSelected) {
      setResult(2)
    }
    return false
  }

  const showAnswers = () => {
    setSelectedAnswers(correctOptions)
    setResult(1)
    setShowAnswer(true)
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
    setShowAnswer(false)
  }

  return (
    <Paper sx={{ border: '1px solid #000', my: 2 }}>
      <Header
        title={'Multiple Choice'}
        setShowHint={setShowHint}
        showAnswers={showAnswers}
        handleReset={handleReset}
        result={result}
        hint={hint}
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
          showAnswer={showAnswer}
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
                fontSize: '1.25rem',
                display: `${result === 1 ? 'none' : 'block'}`,
              }}
            >
              Try Again
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleSubmission}
              disabled={result === 1 || selectedAnswers.length === 0}
              sx={{
                fontSize: '1.25rem',
                display: `${result === 1 ? 'none' : 'block'}`,
              }}
            >
              Submit
            </Button>
          )}
        </Box>
        {result != 0 && (
          <Result
            result={result}
            explanation={explanation}
            submitted={submitted}
            showAnswer={showAnswer}
          />
        )}
        <Box>
          {showHint && (
            <div>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: 'fit-content',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  mt: 1,
                  pr: 1,
                  backgroundColor: '#f4e458',
                  gap: '8px',
                }}
              >
                <TipsAndUpdates
                  sx={{ color: 'primary', fontSize: '1.3rem', m: 0, pl: 1 }}
                />
                <Typography>Hint</Typography>
              </Box>
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
