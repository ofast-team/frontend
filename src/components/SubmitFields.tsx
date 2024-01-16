import React, { useState } from 'react'
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  MenuItem,
  TextField,
  Checkbox,
} from '@mui/material'

export default function SubmitFields() {
  const [timeLimit, setTimeLimit] = useState('')
  const [selectedChecker, setSelectedChecker] = useState('')
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [ignoreWhiteSpace, setIgnoreWhiteSpace] = useState(false)
  const [ignoreLines, setIgnoreLines] = useState(false)
  const [absEpsilon, setAbsEpsilon] = useState('')
  const [relEpsilon, setRelEpsilon] = useState('')

  const checkerList = ['Diff', 'Token', 'Epsilon']

  const handleSubmit = () => {
    console.log(selectedChecker)
  }

  return (
    <Container
      sx={{
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        border: '1px solid #04364a',
      }}
    >
      <Box sx={{ flexBasis: '15%' }}>
        <TextField
          label="Time Limit"
          helperText="In Seconds"
          type="number"
          value={timeLimit}
          onChange={(e) => setTimeLimit(e.target.value)}
          fullWidth
        />
      </Box>

      <Box sx={{ flexBasis: '65%' }}>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Select Checker"
            select
            value={selectedChecker}
            onChange={(e) => setSelectedChecker(e.target.value)}
            fullWidth
          >
            {checkerList.map((checker, index) => (
              <MenuItem key={index} value={checker}>
                {checker}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {selectedChecker === checkerList[0] && (
          <FormControlLabel
            control={
              <Checkbox
                checked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
              />
            }
            label="Case Sensitive"
          />
        )}

        {selectedChecker === checkerList[1] && (
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={ignoreWhiteSpace}
                  onChange={(e) => setIgnoreWhiteSpace(e.target.checked)}
                />
              }
              label="Ignore Trailing Whitespace"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={ignoreLines}
                  onChange={(e) => setIgnoreLines(e.target.checked)}
                />
              }
              label="Ignore Trailing Lines"
            />
          </Box>
        )}

        {selectedChecker === checkerList[2] && (
          <Box>
            <TextField
              label="Absolute Epsilon"
              type="number"
              value={absEpsilon}
              onChange={(e) => setAbsEpsilon(e.target.value)}
              sx={{ mr: 1 }}
            />
            <TextField
              label="Relative Epsilon"
              type="number"
              value={relEpsilon}
              onChange={(e) => setRelEpsilon(e.target.value)}
            />
          </Box>
        )}
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Container>
  )
}
