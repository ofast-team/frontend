import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  Typography,
} from '@mui/material'
import { CheckCircle, Cancel } from '@mui/icons-material'
import React from 'react'

interface OptionDisplayProps {
  answerOptions: string[]
  selectedAnswers: string[]
  correctOptions: string[]
  handleAnswerSelection: (option: string, display: string) => void
  submitted: boolean
  isMultiple: boolean
}

export default function OptionDisplay({
  answerOptions,
  selectedAnswers,
  correctOptions,
  handleAnswerSelection,
  submitted,
  isMultiple,
}: OptionDisplayProps) {
  const getBorderColor = (option: string) => {
    if (!submitted) return 'transparent'

    if (selectedAnswers.includes(option)) {
      return correctOptions.includes(option) ? '#388e3c' : '#9e9e9e'
    }

    return 'transparent'
  }

  const getIcon = (option: string) => {
    if (!submitted) return ''

    const iconStyle = {
      position: 'absolute',
      top: '50%',
      right: -10,
      transform: 'translateY(-50%)',
      backgroundColor: '#fcfcfc',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    }

    if (selectedAnswers.includes(option)) {
      return (
        <Box sx={{ ...iconStyle }}>
          {correctOptions.includes(option) ? (
            <CheckCircle sx={{ color: '#388e3c' }} />
          ) : (
            <Cancel sx={{ color: '#9e9e9e' }} />
          )}
        </Box>
      )
    }

    return ''
  }
  return (
    <FormControl>
      {isMultiple ? (
        <Typography variant="subtitle2" color="error" sx={{ mb: 1 }}>
          Select all that apply.
        </Typography>
      ) : (
        <></>
      )}
      {answerOptions.map((option, index) => (
        <Grid
          key={index}
          container
          direction="row"
          alignItems="center"
          sx={{ position: 'relative' }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: `2px solid ${getBorderColor(option)}`,
              borderRadius: '10px',
              flexGrow: 1,
              my: 0.75,
              mr: 0.5,
            }}
          >
            <FormControlLabel
              control={
                isMultiple ? (
                  <Checkbox
                    checked={selectedAnswers.includes(option)}
                    onChange={() => handleAnswerSelection(option, 'check')}
                    color="primary"
                    sx={{
                      '&.Mui-disabled': {
                        color: '#04364a',
                        opacity: '0.8',
                      },
                    }}
                  />
                ) : (
                  <Radio
                    checked={selectedAnswers.includes(option)}
                    onChange={() => handleAnswerSelection(option, 'radio')}
                    color="primary"
                    sx={{
                      '&.Mui-disabled': {
                        color: '#04364a',
                        opacity: '0.8',
                      },
                    }}
                  />
                )
              }
              label={option}
              disabled={submitted}
              sx={{
                px: 1,
                '.MuiFormControlLabel-label.Mui-disabled': {
                  color: '#000',
                  opacity: '0.8',
                },
              }}
            />
          </Box>
          {getIcon(option)}
        </Grid>
      ))}
    </FormControl>
  )
}
