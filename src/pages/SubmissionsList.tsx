import { Box, Button, Container, Grid, Typography, styled } from '@mui/material'
import React from 'react'

import { Link } from 'react-router-dom'

import CircleIcon from '@mui/icons-material/Circle'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'

const PendingIcon = styled(CircleIcon)({
  fontSize: '36px',
  color: '#B5B1B1', // TODO: Find the right color gray for this
})

const CorrectIcon = styled(CheckCircleIcon)({
  fontSize: '36px',
  color: '#1db924',
})

const WrongAnswerIcon = styled(CancelIcon)({
  fontSize: '36px',
  color: '#FF5555',
})

const sub1 = {
  Date: '01-07-2024 10:58:32',
  Problem: 'Two Sum',
  Verdict: 'Time-Limit Exceeded',
  Language: 'C++',
  Time: '20ms',
  Memory: '12MB',
  'Test Cases': '3/5',
}

// Temporary until we have a uniform way to store submissions
interface SubmissionData {
  Date: string
  Problem: string
  Verdict: string
  Language: string
  Time: string
  Memory: string
  'Test Cases': string
}

const submissions: SubmissionData[] = [sub1, sub1, sub1]

export default function VerdictPage() {
  const columnNames = [
    'Date',
    'Problem',
    'Verdict',
    'Language',
    'Time',
    'Memory',
    'Test Cases',
  ]
  const columnWidths = [2, 2, 2, 1.5, 1.5, 1.5, 1.5]

  return (
    <Container sx={{ pt: 15 }}>
      <Typography variant={'h4'} mb={2}>
        Submissions
      </Typography>
      <Box
        sx={{
          borderRadius: '10px',
          border: 'solid black 1px',
          overflow: 'hidden',
          mb: 5,
        }}
      >
        <Box
          sx={{
            height: 30,
            textAlign: 'center',
            bgcolor: '#6DB6C3',
            borderBottom: 'solid',
            borderWidth: '1px',
            pt: 0.5,
            pb: 0.5,
          }}
        >
          <Grid container>
            {columnNames.map((columnName, i) => (
              <Grid item xs={columnWidths[i]}>
                <Typography>{columnName}</Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box>
          {/* First, render the rows that aren't involved with the current submission. */}
          {submissions.map((submission: SubmissionData) => (
            <Button sx={{ display: 'block', width: '100%', p: 0 }}>
              <Link
                style={{ color: 'inherit', textDecoration: 'none' }}
                to={'/verdict'}
              >
                <Grid container borderTop={'solid black 1px'}>
                  {columnNames.map((columnName, i) => (
                    <Grid item xs={columnWidths[i]} p={1} textAlign={'center'}>
                      <Typography variant={'body2'} fontSize={18}>
                        {submission[columnName]}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
                <Box sx={{ p: 2, display: 'flex', gap: 2 }}>
                  <CorrectIcon />
                  <CorrectIcon />
                  <CorrectIcon />
                  <WrongAnswerIcon></WrongAnswerIcon>
                  <PendingIcon></PendingIcon>
                  <PendingIcon></PendingIcon>
                </Box>
              </Link>
            </Button>
          ))}
        </Box>
      </Box>
    </Container>
  )
}
