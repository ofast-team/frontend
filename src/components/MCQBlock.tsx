import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
  styled,
  Grid,
  IconButton,
  Popover,
} from '@mui/material'
import { CheckCircle, Cancel, Lightbulb } from '@mui/icons-material'
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
  const [attempts, setAttempts] = useState<number>(3)

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

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

  const handleSubmission = () => {
    setSubmitted(true)
    setAttempts(attempts - 1)
  }

  const showAnswers = () => {
    setSelectedAnswers(correctOptions)
    setSubmitted(true)
    setAttempts(0)
  }

  const getBorderColor = (option: string) => {
    if (!submitted) return 'transparent'

    if (selectedAnswers.includes(option)) {
      return correctOptions.includes(option) ? '#388e3c' : '#9e9e9e'
    }

    return 'transparent'
  }

  const getIcon = (option: string) => {
    if (!submitted) return ''

    if (selectedAnswers.includes(option)) {
      return correctOptions.includes(option) ? (
        <CheckCircle sx={{ color: '#388e3c' }} />
      ) : (
        <Cancel sx={{ color: '#9e9e9e' }} />
      )
    }

    return ''
  }

  const checkDisplay = () => {
    return (
      <FormControl>
        <Typography variant="subtitle2" color="error" sx={{ mb: 1 }}>
          Select all that apply.
        </Typography>
        {answerOptions.map((option, index) => (
          <Grid key={index} container direction="row" alignItems="center">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: `2px solid ${getBorderColor(option)}`,
                borderRadius: '10px',
                flexGrow: 1,
                my: 0.75,
                mr: 0.5,
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
                  px: 1,
                  '.MuiFormControlLabel-label.Mui-disabled': {
                    color: '#000',
                    opacity: '0.8',
                  },
                }}
              />
            </Box>
            {getIcon(option)}
          </Grid>
        ))}
      </FormControl>
    )
  }

  const radioDisplay = () => {
    return (
      <FormControl component="fieldset">
        <RadioGroup value={selectedAnswers[0] || ''}>
          {answerOptions.map((option, index) => (
            <Grid key={index} container direction="row" alignItems="center">
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: `2px solid ${getBorderColor(option)}`,
                  borderRadius: '10px',
                  flexGrow: 1,
                  my: 0.75,
                  mr: 0.5,
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
                    px: 1,
                    '.MuiFormControlLabel-label.Mui-disabled': {
                      color: '#000',
                      opacity: '0.8',
                    },
                  }}
                />
              </Box>
              {getIcon(option)}
            </Grid>
          ))}
        </RadioGroup>
      </FormControl>
    )
  }

  return (
    <Paper sx={{ border: '1px solid #000', my: 2 }}>
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
        <IconButton onClick={handleClick}>
          <Lightbulb sx={{ color: '#04364a', fontSize: '2rem', m: 0 }} />
        </IconButton>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Paper sx={{ border: '1px solid #000', p: 2 }}>
            <Typography sx={{ fontSize: '1rem', lineHeight: '1px' }}>
              {hint}
            </Typography>
          </Paper>
        </Popover>
      </Box>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          {question}
        </Typography>
        {isMultiple ? checkDisplay() : radioDisplay()}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <ShowAnswerBtn onClick={showAnswers}>Show Answer</ShowAnswerBtn>
          <Typography>{attempts == 0 ? explanation : ''}</Typography>
          <Box sx={{ alignItems: 'center' }}>
            {submitted ? (
              <Button
                variant="contained"
                onClick={() => setSubmitted(false)}
                disabled={attempts === 0}
              >
                Try Again
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleSubmission}
                disabled={attempts === 0}
              >
                Submit
              </Button>
            )}
            <Typography variant="subtitle2" color="error">
              Attempts Left: {attempts}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}
