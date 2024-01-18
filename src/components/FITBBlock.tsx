import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { ShowAnswerBtn } from './MCQBlock'
import React, { ReactNode, useState } from 'react'
import HintDisplay from './HintDisplay'
import FITB_Blank from './FITB_Blank'

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

interface FITBBlockProps {
  hint: string,
  children: ReactNode,
}

export default function FITBBlock({ hint, children }: FITBBlockProps,) {
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [showAnswer, setShowAnswer] = useState<boolean>(false)

  return (
    <Paper sx={{ border: '1px solid #000', my: 2 }}>
      <Header hint={hint} />
      <Box sx={{ p: 3 }}>
        <Grid container rowGap={2.5} alignItems="center" marginBottom={4}>
          {React.Children.map(children, (child) => {
            if (child.type === FITB_Blank) {
              return React.cloneElement(child, {showAnswer: showAnswer, respond: submitted})
            }
            return child
          })}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <ShowAnswerBtn
            onClick={() => {
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
              }}
              disabled = {showAnswer}
            >
              Try Again
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => {setSubmitted(true)
              console.log(showAnswer)}}
              disabled = {showAnswer}
            >
              Submit
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  )
}
