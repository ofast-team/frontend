import {
  Box,
  Container,
  Grid,
  IconButton,
  Typography,
  styled,
} from '@mui/material'
import React from 'react'

import DownloadIcon from '@mui/icons-material/Download'
import CircleIcon from '@mui/icons-material/Circle'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import MDXRenderer from '../components/MDXRenderer'

const PendingIcon = styled(CircleIcon)({
  fontSize: '48px',
  color: '#B5B1B1', // TODO: Find the right color gray for this
})

const CorrectIcon = styled(CheckCircleIcon)({
  fontSize: '48px',
  color: 'green',
})

const WrongAnswerIcon = styled(CancelIcon)({
  fontSize: '48px',
  color: 'red',
})

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

const code: string =
  " ```c++\n # include <bits/stdc++.h>\nusing namespace std;\n\nint n; cin >> n;\nfor (int i = 0; i < n; i++) {\n\t cout << 'Hello World' << '\\n';\n }"

const sub1 = {
  Date: '01-07-2024 10:58:32',
  Problem: 'Two Sum',
  Verdict: 'Time-Limit Exceeded',
  Language: 'C++',
  Time: '20ms',
  Memory: '12MB',
  'Test Cases': '3/5',
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
      <Typography variant = {'h4'} mb = {2}>
        Submission #######
      </Typography>
      <Box
        sx={{
          borderRadius: '15px', // Apply border radius to the whole box
          border: 'solid black 1px',
          overflow: 'hidden', // Ensure rounded corners are visible
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
            <Grid container>
              {columnNames.map((columnName, i) => (
                <Grid item xs={columnWidths[i]} p={1} textAlign={'center'}>
                  <Typography variant={'body2'}>
                    {submission[columnName]}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          ))}
          {/* Then, render the current submission and all test cases associated with it.*/}
          <Grid container>
            {columnNames.map((columnName, i) => (
              <Grid
                item
                xs={columnWidths[i]}
                p={1}
                textAlign={'center'}
                borderTop={'solid black 1px'}
              >
                <Typography variant={'body2'}>{sub1[columnName]}</Typography>
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
        </Box>
      </Box>
      <Box display="flex" gap={1} alignItems={'center'}>
        <Typography fontSize={24}>Code File</Typography>

        <IconButton onClick={() => {}}>
          <DownloadIcon style={{ color: 'black' }}></DownloadIcon>
        </IconButton>
      </Box>
      <Box>
        <MDXRenderer value={code}></MDXRenderer>
      </Box>
    </Container>
  )
}
