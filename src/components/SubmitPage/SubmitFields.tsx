import React, { Dispatch, SetStateAction } from 'react'
import { Box, Button, Container, TextField } from '@mui/material'
import PlayIcon from '@mui/icons-material/PlayArrow'

interface SubmitFieldsProps {
  timeLimit: number
  memoryLimit: number
  setTimeLimit: Dispatch<SetStateAction<number>>
  setMemoryLimit: Dispatch<SetStateAction<number>>
  handleSubmit: () => void
}

export default function SubmitFields({
  timeLimit,
  memoryLimit,
  setTimeLimit,
  setMemoryLimit,
  handleSubmit,
}: SubmitFieldsProps) {
  return (
    <Container
      sx={{
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        border: '1px solid #04364a',
        borderRadius: '10px',
      }}
    >
      <Box sx={{ flexBasis: '35%' }}>
        <TextField
          label="Time Limit"
          helperText="In Seconds"
          type="number"
          placeholder="1"
          value={timeLimit}
          onChange={(e) => setTimeLimit(parseFloat(e.target.value))}
          fullWidth
        />
      </Box>

      <Box sx={{ flexBasis: '35%' }}>
        <TextField
          label="Memory Limit"
          helperText="In MB"
          type="number"
          placeholder="1024"
          value={memoryLimit}
          onChange={(e) => setMemoryLimit(parseFloat(e.target.value))}
          fullWidth
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          endIcon={<PlayIcon fontSize="large" />}
          size="large"
        >
          RUN
        </Button>
      </Box>
    </Container>
  )
}
