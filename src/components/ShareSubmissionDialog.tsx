import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import { Box, Button } from '@mui/material'

import { verdictInfo } from '../utils/verdict'

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
  submissionId,
  problemName,
  verdictNum,
}: ShareSubmissionDialogProps) {
  const [copied, setCopied] = useState<boolean>(false)

  const url : string = 'https://ofast.io/submissions/' + submissionId

  const handleCopy = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
  }

  return (
    <Dialog onClose={onClose} open={isOpen} sx={{ borderRadius: '15px' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: '30px', pl: '30px', pr: '30px', pb: '10px'
        }}
      >
        <Typography fontSize={'28px'} fontWeight={700} color={'#04364A'}>
          Share Submission
        </Typography>
        <Typography fontSize={'24px'} fontWeight={500} mt={'30px'}>
          Problem: {problemName}
        </Typography>
        <Typography fontSize={'28px'} fontWeight={500} mt={'30px'}>
          Verdict
        </Typography>
        <Typography fontSize={'28px'} fontWeight={500} color={verdictInfo[verdictNum].color}>
          {verdictInfo[verdictNum].description}
        </Typography>
        <Button
          sx={{
            mt: '30px',
            border: 'solid black 1px',
            borderRadius: '15px',
            display: 'flex',
            gap: 1,
          }}
          onClick={handleCopy}
        >
          <ContentCopyIcon sx={{ color: 'black' }}></ContentCopyIcon>
          <Typography>{url}</Typography>
        </Button>
        <Typography sx = {{visibility: copied ? 'visible' : 'hidden'}}>Link copied to clipboard</Typography>
      </Box>
    </Dialog>
  )
}
