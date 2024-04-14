import React, { Dispatch, SetStateAction } from 'react'
import { Box, Button, Container, TextField } from '@mui/material'
import PlayIcon from '@mui/icons-material/PlayArrow'
import CircleLoadAnimation from '../CircleLoadAnimation'

interface SubmitFieldsProps {
  timeLimit: number
  memoryLimit: number
  setTimeLimit: Dispatch<SetStateAction<number>>
  setMemoryLimit: Dispatch<SetStateAction<number>>
  handleSubmit: () => void
  isSubmitting: boolean
}

export default function SubmitFields({
  timeLimit,
  memoryLimit,
  setTimeLimit,
  setMemoryLimit,
  handleSubmit,
  isSubmitting,
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
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isSubmitting && (
            <Box sx={{ position: 'absolute', right: '100px' }}>
              <CircleLoadAnimation />
            </Box>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleSubmit()
            }}
            endIcon={<PlayIcon fontSize="large" />}
            size="medium"
            disabled={isSubmitting}
          >
            RUN
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
