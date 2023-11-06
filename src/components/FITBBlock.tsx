import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { ShowAnswerBtn } from './MCQBlock'
import React, { useState } from 'react'

interface FITBBlockProps {
  question: string
  correctAnswer: string
}

export default function FITBBlock({ question, correctAnswer }: FITBBlockProps) {
  const [curAnswer, setCurAnswer] = useState('')

  const index = question.indexOf('**BLANK**')
  const questionBefore: string = question.substring(0, index)
  const questionAfter: string = question.substring(index + '**BLANK**'.length)

  const [dialog, setDialog] = useState(false)
  const [dialogText, setDialogText] = useState('')

  const showAnswers = () => {
    const text = `Correct Answer(s): ${correctAnswer}`
    setDialog(true)
    setDialogText(text)
  }

  const onSubmit = () => {
    const isCorrect = correctAnswer === curAnswer
    const text = isCorrect ? 'Correct!' : 'Incorrect! Try Again.'

    setDialog(true)
    setDialogText(text)
    setCurAnswer('')
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
        Fill in the Blank
      </Typography>
      <Box sx={{ p: 3 }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="body1" gutterBottom>
              {questionBefore}
            </Typography>
          </Grid>

          <Grid item>
            <TextField
              onChange={(e) => setCurAnswer(e.target.value)}
              size="small"
            ></TextField>
          </Grid>

          <Grid item>
            <Typography variant="body1" gutterBottom>
              {questionAfter}
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <ShowAnswerBtn onClick={showAnswers}>Show Answer</ShowAnswerBtn>
          <Button variant="contained" onClick={onSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
      <Dialog
        open={dialog}
        onClose={() => setDialog(false)}
        sx={{ border: '1px solid #000', borderRadius: '8px' }}
      >
        <DialogContent>
          <Typography>{dialogText}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}
