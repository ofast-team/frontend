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
import MDX from '../../components/MDXRenderer'

interface OptionDisplayProps {
  answerOptions: string[]
  selectedAnswers: number[]
  correctOptions: number[]
  handleAnswerSelection: (option: number, display: string) => void
  submitted: boolean
  showAnswer: boolean
  isMultiple: boolean
}

export default function OptionDisplay({
  answerOptions,
  selectedAnswers,
  correctOptions,
  handleAnswerSelection,
  submitted,
  showAnswer,
  isMultiple,
}: OptionDisplayProps) {
  const getBorderColor = (option: number) => {
    if (showAnswer)
      return correctOptions.includes(option) ? '#194db5' : 'transparent'

    if (!submitted) return 'transparent'

    if (selectedAnswers.includes(option)) {
      return correctOptions.includes(option) ? '#1db924' : '#808385'
    }

    return 'transparent'
  }

  const getIcon = (option: number) => {
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

    if (showAnswer) {
      return (
        <Box sx={{ ...iconStyle }}>
          {correctOptions.includes(option) && (
            <CheckCircle sx={{ color: '#194db5' }} />
          )}
        </Box>
      )
    }

    if (!submitted) return ''

    if (selectedAnswers.includes(option)) {
      return (
        <Box sx={{ ...iconStyle }}>
          {correctOptions.includes(option) ? (
            <CheckCircle sx={{ color: '#1db924' }} />
          ) : (
            <Cancel sx={{ color: '#808385' }} />
          )}
        </Box>
      )
    }

    return ''
  }
  return (
    <FormControl>
      {isMultiple && (
        <Typography variant="subtitle1" color="error" sx={{ mb: 0.5 }}>
          Select all that apply.
        </Typography>
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
              border: `2px solid ${getBorderColor(index)}`,
              transition: 'border 0.5s',
              borderRadius: '10px',
              flexGrow: 1,
              m: 0.5,
            }}
          >
            <FormControlLabel
              control={
                isMultiple ? (
                  <Checkbox
                    checked={selectedAnswers.includes(index)}
                    onChange={() => handleAnswerSelection(index, 'check')}
                    color="primary"
                    sx={{
                      '&.Mui-disabled': {
                        color: '#04364a',
                        opacity: '0.7',
                      },
                    }}
                  />
                ) : (
                  <Radio
                    checked={selectedAnswers.includes(index)}
                    onChange={() => handleAnswerSelection(index, 'radio')}
                    color="primary"
                    sx={{
                      '&.Mui-disabled': {
                        color: '#04364a',
                        opacity: '0.7',
                      },
                    }}
                  />
                )
              }
              label={
                <div style={{ marginTop: '15px' }}>
                  <MDX value={option} />
                </div>
              }
              disabled={submitted}
              sx={{
                px: 1,
                '.MuiFormControlLabel-label': {
                  lineHeight: '1',
                },
                '.MuiFormControlLabel-label.Mui-disabled': {
                  color: '#000',
                  opacity: '0.8',
                  lineHeight: '1',
                },
              }}
            />
          </Box>
          {getIcon(index)}
        </Grid>
      ))}
    </FormControl>
  )
}
