import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { ShowAnswerBtn } from './MCQBlock'
import React, { ReactNode, useState } from 'react'
import HintDisplay from './HintDisplay'
import FITB_Blank from './FITB_Blank'
import FITB_Text from './FITB_Text'
import MDX from './MDXRenderer'

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

function tokenizeText(text: string) : string[] {
  const tokens : string[] = []
  let open : boolean = false
  let curToken : string = ''

  // Split up the MathJax expressions from the plaintext.
  for (let i = 0; i < text.length; i++) {
    if (text[i] == '$') {
      if (open) {
        curToken += text[i]
        tokens.push(curToken)
        curToken = ''
      }
      else {
        tokens.push(curToken)
        curToken = ''
        curToken += text[i]
      }

      open = !open
      
    }
    else {
      curToken += text[i]
    }
  }

  if (curToken.length > 0) {
    tokens.push(curToken)
  }

  // Take any remaining plaintext and split it up by space.
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i][0] != '$') {
      const words = tokens[i].split(' ')
      tokens.splice(i, 1, ...words)
    }
  }

  return tokens
}

interface FITBBlockProps {
  hint: string
  children: ReactNode
}

export default function FITBBlock({ hint, children }: FITBBlockProps) {
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [showAnswer, setShowAnswer] = useState<boolean>(false)

  const renderThese : ReactNode = []
  React.Children.forEach(children, (child) => {
    if (child.type === FITB_Blank) {
      renderThese.push(React.cloneElement(child, {
        showAnswer: showAnswer,
        respond: submitted,
      }))
    }
    else if (child?.type === FITB_Text) {
      const text : string = child?.props.text
      const tokenizedText : string[] = tokenizeText(text)
      console.log(tokenizedText)
      renderThese.push(...tokenizedText.map((x) => <MDX value={x}></MDX>))
    }
    else {
      renderThese.push(child)
    }
  })


  return (
    <Paper sx={{ border: '1px solid #000', my: 2 }}>
      <Header hint={hint} />
      <Box sx={{ p: 3 }}>
        <Grid container gap = {0.6} alignItems="center" marginBottom={4}>
          {renderThese}
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
              disabled={showAnswer}
            >
              Try Again
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                setSubmitted(true)
                console.log(showAnswer)
              }}
              disabled={showAnswer}
            >
              Submit
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  )
}
