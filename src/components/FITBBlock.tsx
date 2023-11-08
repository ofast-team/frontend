import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
} from '@mui/material'
import { ShowAnswerBtn } from './MCQBlock'
import React, { useState } from 'react'
import TheBlank from './TheBlank'

// Parser for FITB Questions. Determine the location of the
// blanks and their correct answers. Create components for text and blanks.
function createFITBFormFromQuestionString(question : string, submitted : boolean) : React.JSX.Element[] {

  let curStr : string = "";
  const fitbForm : React.JSX.Element[] = [];
  const arr : string[] = [];
  for (let i = 0; i < question.length; i++) { 

    if (i < question.length - 1 && question[i] == '\\' && (question[i + 1] == '{' || question[i + 1] == '}')) {
      curStr += question[i + 1]
      i++
    }

    else if (question[i] == '{') {
      fitbForm.push(<Typography>{curStr}</Typography>)
      curStr = ""
      let blankAns : string = ""
      i++
      while (i < question.length && question[i] != '}') {
        if (i < question.length - 1 && question[i] == '\\' && (question[i + 1] == '{' || question[i + 1] == '}')) {
          blankAns += question[i + 1]
          i++
        }
        else {
          blankAns += question[i]
        }
        i++;
      }
      fitbForm.push(<TheBlank correctAnswer={blankAns} respond = {submitted}/>)
      arr.push(blankAns)
    }

    else {
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

interface FITBBlockProps {
  question: string
}

export default function FITBBlock({ question }: FITBBlockProps) {

  const [submitted, setSubmitted] = useState(false)

  const fitbForm = createFITBFormFromQuestionString(question, submitted)

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
        <Grid container rowGap = {2} alignItems="center" paddingLeft={1} paddingRight = {1}>
          {fitbForm}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <ShowAnswerBtn>Show Answer</ShowAnswerBtn>
          <Button variant="contained" onClick={() => setSubmitted(!submitted)}>
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}
