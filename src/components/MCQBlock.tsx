import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
  styled,
} from '@mui/material'
import { CheckCircleOutline, Cancel } from '@mui/icons-material'
import React, { useState } from 'react'

export const ShowAnswerBtn = styled(Button)({
  border: '1px solid #776E6E',
  color: '#776E6E',
  backgroundColor: 'transparent',
  padding: '8px',
  '&:hover': {
    backgroundColor: '#8E8D8D',
    borderColor: '#8E8D8D',
    color: '#000000',
  },
  '&:active': {
    backgroundColor: '#8E8D8D',
    borderColor: '#8E8D8D',
  },
})

interface MCQBlockProps {
  question: string
  answerOptions: string[]
  correctOptions: string[]
}

export default function MCQBlock({
  question,
  answerOptions,
  correctOptions,
}: MCQBlockProps) {
  const isMultiple = correctOptions.length > 1
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])

  const [submitted, setSubmitted] = useState<boolean>(false)

  const handleCheckAnswerSelection = (option: string) => {
    if (selectedAnswers.includes(option)) {
      setSelectedAnswers(
        selectedAnswers.filter((selectedOption) => selectedOption !== option),
      )
    } else {
      setSelectedAnswers([...selectedAnswers, option])
    }
  }

  const handleRadioAnswerSelection = (option: string) => {
    setSelectedAnswers([option])
  }

  const showAnswers = () => {
    // const text = `Correct Answer(s): ${correctOptions.join(', ')}`
    // setDialog(true)
    // setDialogText(text)
  }

  const getBorderColor = (option: string) => {
    if (!submitted) return 'transparent'

    if (selectedAnswers.includes(option)) {
      return correctOptions.includes(option) ? 'green' : 'red'
    }

    return 'transparent'
  }

  const checkDisplay = () => {
    return (
      <FormControl>
        <Typography variant="subtitle2" color="error">
          Select all that apply.
        </Typography>
        {answerOptions.map((option, index) => (
          <Box
            key={index}
            sx={{
              border: `2px solid ${getBorderColor(option)}`,
              py: 1,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedAnswers.includes(option)}
                  onChange={() => handleCheckAnswerSelection(option)}
                  color="primary"
                  sx={{
                    '&.Mui-disabled': {
                      color: '#04364a',
                      opacity: '0.8',
                    },
                  }}
                />
              }
              label={option}
              disabled={submitted}
              sx={{
                '.MuiFormControlLabel-label.Mui-disabled': {
                  color: '#000',
                  opacity: '0.8',
                },
              }}
            />
          </Box>
        ))}
      </FormControl>
    )
  }

  const radioDisplay = () => {
    return (
      <FormControl component="fieldset">
        <RadioGroup value={selectedAnswers[0] || ''}>
          {answerOptions.map((option, index) => (
            <Box
              key={index}
              sx={{
                border: `2px solid ${getBorderColor(option)}`,
                py: 1,
              }}
            >
              <FormControlLabel
                value={option}
                control={
                  <Radio
                    checked={selectedAnswers.includes(option)}
                    onChange={() => handleRadioAnswerSelection(option)}
                    color="primary"
                    sx={{
                      '&.Mui-disabled': {
                        color: '#04364a',
                        opacity: '0.8',
                      },
                    }}
                  />
                }
                label={option}
                disabled={submitted}
                sx={{
                  '.MuiFormControlLabel-label.Mui-disabled': {
                    color: '#000',
                    opacity: '0.8',
                  },
                }}
              />
            </Box>
          ))}
        </RadioGroup>
      </FormControl>
    )
  }

  return (
    <Paper sx={{ border: '1px solid #000', my: 2 }}>
      <Typography
        variant="h4"
        sx={{
          backgroundColor: '#6DB6C3',
          color: '#000',
          p: 2,
          textAlign: 'left',
        }}
      >
        Multiple Choice Question
      </Typography>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          {question}
        </Typography>
        {isMultiple ? checkDisplay() : radioDisplay()}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <ShowAnswerBtn onClick={showAnswers}>Show Answer</ShowAnswerBtn>
          {submitted ? (
            <Button variant="contained" onClick={() => setSubmitted(false)}>
              Try Again
            </Button>
          ) : (
            <Button variant="contained" onClick={() => setSubmitted(true)}>
              Submit
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  )
}
