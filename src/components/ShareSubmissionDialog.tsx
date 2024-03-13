import React from 'react'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import { Box, Button } from '@mui/material'

import ContentCopyIcon from '@mui/icons-material/ContentCopy'

export interface ShareSubmissionDialogProps {
  isOpen: boolean
  onClose: (value: string) => void
  submissionId: string
  problemName: string
  verdictNum: number
}

export default function ShareSubmissionDialog({
  isOpen,
  onClose,
}: ShareSubmissionDialogProps) {
  return (
    <Dialog onClose={onClose} open={isOpen} sx={{ borderRadius: '15px' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: '30px',
        }}
      >
        <Typography fontSize={'28px'} fontWeight={700} color={'#04364A'}>
          Submission Share
        </Typography>
        <Typography fontSize={'20px'}>By User13478</Typography>
        <Typography fontSize={'24px'} fontWeight={500} mt={'30px'}>
          Problem: Two Sum
        </Typography>
        <Typography fontSize={'28px'} fontWeight={500} mt={'30px'}>
          Verdict
        </Typography>
        <Typography fontSize={'28px'} fontWeight={500} color={'green'}>
          🎊 Correct 🎊
        </Typography>
        <Button
          sx={{
            mt: '30px',
            border: 'solid black 1px',
            borderRadius: '15px',
            display: 'flex',
            gap: 1,
          }}
        >
          <ContentCopyIcon sx={{ color: 'black' }}></ContentCopyIcon>
          https://ofast.io/submissions/###share
        </Button>
      </Box>
    </Dialog>
  )
}
