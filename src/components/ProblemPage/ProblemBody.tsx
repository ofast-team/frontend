import React from 'react'

import { Box, Typography, Tooltip, IconButton } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import ContentCopyIcon from '@mui/icons-material/ContentCopy'

import MDX from '../MDXRenderer'
import { Problem } from './ProblemBlock'

const dataTheme = createTheme({
  typography: {
    fontFamily: 'Source Code Pro, monospace',
  },
})

interface ProblemBodyProps {
  problem: Problem
}

function SampleDataBlock({ data }: { data: string }) {
  const copyMsg = 'Copy to clipboard'
  const copiedMsg = 'Copied!'
  const [tooltip, setTooltip] = React.useState<string>(copyMsg)

  return (
    <Box
      sx={{
        padding: '10px',
        bgcolor: '#dae5ed',
        borderRadius: '15px',
        whiteSpace: 'nowrap',
        position: 'relative',
      }}
    >
      <Box sx={{ overflowX: 'auto', pb: '10px' }}>
        <Typography sx={{ lineHeight: 1.5 }}>
          {data.split('\n').map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </Typography>

        <Tooltip
          title={tooltip}
          onClose={async () => {
            await new Promise((r) => setTimeout(r, 200))
            setTooltip(copyMsg)
          }}
          sx={{ position: 'absolute', top: 5, right: 5 }}
          onClick={() => {
            navigator.clipboard.writeText(data)
            setTooltip(copiedMsg)
          }}
        >
          <IconButton>
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  )
}

// TODO: Add copy button for samples
export default function ProblemBody({ problem }: ProblemBodyProps) {
  return (
    <>
      <Typography className="themeborder" color="primary" component="span">
        <h1 style={{ textAlign: 'center' }}>{problem.title}</h1>
        <MDX value={problem.text} />

        <h2 style={{ marginBottom: '5px' }}>Problem</h2>
        <MDX value={problem.problem} />

        <h2 style={{ marginBottom: '5px' }}>Input</h2>
        <MDX value={problem.input} />

        <h2 style={{ marginBottom: '5px' }}>Output</h2>
        <MDX value={problem.output} />

        <ThemeProvider theme={dataTheme}>
          {problem.sampleData.map(({ input, output }, index) => (
            <Box
              key={index}
              sx={{
                mt: '20px',
                width: '100%',
              }}
            >
              <Box width="49%" sx={{ display: 'inline-block' }}>
                <h3>{'Sample Input ' + (index + 1)}</h3>
                <SampleDataBlock data={input} />
              </Box>

              <Box
                width="49%"
                sx={{
                  display: 'inline-block',
                  verticalAlign: 'top',
                  ml: '2%',
                }}
              >
                <h3>{'Sample Output ' + (index + 1)}</h3>
                <SampleDataBlock data={output} />
              </Box>
            </Box>
          ))}
        </ThemeProvider>
      </Typography>
    </>
  )
}
