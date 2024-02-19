import { CheckCircle, ErrorOutline, TipsAndUpdates } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React from 'react'
import MDX from './MDXRenderer'

interface ResultProps {
  result: number
  explanation?: string
  submitted: boolean
}

export default function Result({
  result,
  explanation,
  submitted,
}: ResultProps) {
  const resultText = [
    '',
    'Correct!',
    'One or more correct option is not selected!',
  ]

  const resultIcon = ['', <CheckCircle />, <ErrorOutline />]

  const bgResultColor = ['#ffffff00', '#a3eca6', '#cbcbcb']

  const style = [[], ['1.4rem', '500'], ['1.2rem', '400']]

  return (
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
        <Typography
          sx={{
            fontSize: `${style[result][0]}`,
            fontWeight: `${style[result][1]}`,
          }}
        >
          {resultText[result]}
        </Typography>
      </Box>
      {result === 1 && (
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
              gap: '8px',
            }}
          >
            <TipsAndUpdates
              sx={{ color: 'primary', fontSize: '1.3rem', m: 0 }}
            />
            <Typography>Explanation</Typography>
          </Box>
          <Typography sx={{ fontSize: '1.1rem', pr: 1 }}>
            <MDX value={explanation} />
          </Typography>
        </div>
      )}
    </Box>
  )
}
