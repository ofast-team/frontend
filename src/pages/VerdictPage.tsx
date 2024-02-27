import {
  Avatar,
  Box,
  Container,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'

import DownloadIcon from '@mui/icons-material/Download'
import MDXRenderer from '../components/MDXRenderer'

import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'

import ShareSubmissionDialog from '../components/ShareSubmissionDialog'
import ShareIcon from '@mui/icons-material/Share'

const CorrectIcon = () => {
  return (
    <Avatar sx={{ backgroundColor: '#1db924' }}>
      <CheckIcon sx={{ color: 'white', fontSize: '32px' }}></CheckIcon>
    </Avatar>
  )
}

const WrongAnswerIcon = () => {
  return (
    <Avatar sx={{ backgroundColor: '#FF5555' }}>
      <CloseIcon sx={{ color: 'white', fontSize: '32px' }} />
    </Avatar>
  )
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

  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>()

  return (
    <Container sx={{ pt: 15 }}>
      <Box display="flex" gap={1} alignItems={'center'} mb={2}>
        <Typography variant={'h4'}>Submission #######</Typography>
        <IconButton>
          <ShareIcon
            sx={{ alignSelf: 'center', fontSize: '32px', color: 'black' }}
            onClick={() => {
              setDialogIsOpen(true)
            }}
          ></ShareIcon>
        </IconButton>
      </Box>

      <Box
        sx={{
          borderRadius: '10px', // Apply border radius to the whole box
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
          {/* Render the current submission and and its metadata*/}
          <Grid container>
            {columnNames.map((columnName, i) => (
              <Grid
                item
                xs={columnWidths[i]}
                p={1}
                textAlign={'center'}
                borderTop={'solid black 1px'}
              >
                <Typography variant={'body2'} fontSize={18}>
                  {sub1[columnName]}
                </Typography>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ p: 2, display: 'flex', gap: 3 }}>
            <CorrectIcon />
            <CorrectIcon />
            <CorrectIcon />
            <WrongAnswerIcon></WrongAnswerIcon>
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
      {dialogIsOpen && (
        <ShareSubmissionDialog
          onClose={() => {
            setDialogIsOpen(false)
          }}
          isOpen={true}
        ></ShareSubmissionDialog>
      )}
    </Container>
  )
}
