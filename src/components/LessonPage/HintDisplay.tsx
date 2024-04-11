import { Lightbulb } from '@mui/icons-material'
import { Box, IconButton, Paper, Popover, Typography } from '@mui/material'
import React, { useState } from 'react'

interface HintDisplayProps {
  hint: string
}

export default function HintDisplay({ hint }: HintDisplayProps) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box>
      <IconButton onClick={handleClick}>
        <Lightbulb sx={{ color: '#04364a', fontSize: '2rem', m: 0 }} />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
      >
        <Paper sx={{ border: '1px solid #000', p: 2 }}>
          <Typography sx={{ fontSize: '1rem', lineHeight: '1px' }}>
            {hint}
          </Typography>
        </Paper>
      </Popover>
    </Box>
  )
}
