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
import React, { useState } from 'react'

interface MCQBlockProps {
  question: string
  answerOptions: string[]
  correctOptions: string[]
}

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

export default function MCQBlock({
  question,
  answerOptions,
  correctOptions,
}: MCQBlockProps) {
  const isMultiple = correctOptions.length > 1
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])

  const [dialog, setDialog] = useState(false)
  const [dialogText, setDialogText] = useState('')

  const handleDialogClose = () => {
    setDialog(false)
  }

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

  const checkAnswers = () => {
    console.log(selectedAnswers)
    const isCorrect =
      [...correctOptions].every((option) => selectedAnswers.includes(option)) &&
      [...selectedAnswers].every((option) => correctOptions.includes(option))
    const text = isCorrect ? 'Correct!' : 'Incorrect! Try Again.'

    setDialog(true)
    setDialogText(text)
    // TODO(SATH): HAVE TO UPDATE HOW TO HANDLE AFTER SUBMIT
    // setSelectedAnswers([])
  }

  const showAnswers = () => {
    const text = `Correct Answer(s): ${correctOptions.join(', ')}`
    setDialog(true)
    setDialogText(text)
  }

  const checkDisplay = () => {
    return (
      <FormControl>
        <Typography variant="subtitle2" color="error">
          Select all that apply.
        </Typography>
        {answerOptions.map((option, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={selectedAnswers.includes(option)}
                onChange={() => handleCheckAnswerSelection(option)}
                color="primary"
              />
            }
            label={option}
          />
        ))}
      </FormControl>
    )
  }

  const radioDisplay = () => {
    return (
      <FormControl component="fieldset">
        <RadioGroup value={selectedAnswers[0] || ''}>
          {answerOptions.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option}
              control={
                <Radio
                  checked={selectedAnswers.includes(option)}
                  onChange={() => handleRadioAnswerSelection(option)}
                  color="primary"
                />
              }
              label={option}
            />
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
          <Button variant="contained" onClick={checkAnswers}>
            Submit
          </Button>
        </Box>
      </Box>
      <Dialog
        open={dialog}
        onClose={handleDialogClose}
        sx={{ border: '1px solid #000', borderRadius: '8px' }}
      >
        <DialogContent>
          <Typography>{dialogText}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}
