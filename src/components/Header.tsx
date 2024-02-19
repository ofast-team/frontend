import { TipsAndUpdates, RestartAlt } from '@mui/icons-material'
import {
  Box,
  Typography,
  IconButton,
  Button,
  styled,
  Tooltip,
} from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'

interface HeaderProps {
  title: string
  setShowHint: Dispatch<SetStateAction<boolean>>
  showAnswers: () => void
  handleReset: () => void
  result?: number
}

export default function Header({
  title,
  setShowHint,
  showAnswers,
  handleReset,
  result,
}: HeaderProps) {
  const getColor = `${result === 1 ? '#04364a7a' : '#04364a'}`

  const ShowAnswerBtn = styled(Button)({
    fontSize: '1.1rem',
    color: `${getColor}`,
    borderBottom: `2px solid ${getColor}`,
    '&:hover': {
      borderBottom: `2px solid ${result === 1 ? '#04364a7a' : '#000000'}`,
      color: `${result === 1 ? '#04364a7a' : '#000000'}`,
    },
    '&:active': {
      borderBottom: '2px solid #04364a7a',
      color: '#04364a7a',
    },
  })

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#6DB6C3',
        color: '#000',
        p: 2,
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: 'left',
        }}
      >
        {title}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
        <ShowAnswerBtn onClick={showAnswers}>Show Answer</ShowAnswerBtn>
        <Tooltip title="Show Hint" placement="top">
          <IconButton onClick={() => setShowHint(true)} disabled={result === 1}>
            <TipsAndUpdates
              sx={{
                color: `${getColor}`,
                fontSize: '2rem',
                m: 0,
              }}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Reset" placement="top">
          <IconButton>
            <RestartAlt
              sx={{ color: '#04364a', fontSize: '2rem', m: 0 }}
              onClick={handleReset}
            />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  )
}
