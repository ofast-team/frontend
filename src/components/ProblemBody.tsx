import React from 'react'
import { Grid, Box, Typography } from '@mui/material'
import MDX from '../components/MDXRenderer'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const dataTheme = createTheme({
  typography: {
    fontFamily: 'Source Code Pro, monospace',
  },
})

import { Problem } from '../pages/ProblemPage'

interface ProblemBodyProps {
  problem: Problem
}

export default function ProblemBody({ problem }: ProblemBodyProps) {
  return (
    <Box maxWidth="70%" sx={{ display: 'inline-block' }}>
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
            <Box key={index}>
              <Grid container sx={{ paddingTop: '20px' }}>
                <Grid item xs={6}>
                  <h3>{'Sample Input ' + (index + 1)}</h3>
                </Grid>
                <Grid item xs={6}>
                  <h3>{'Sample Output ' + (index + 1)}</h3>
                </Grid>
              </Grid>

              <Grid
                container
                sx={{
                  border: 'solid 1px',
                  marginBottom: '20px',
                  overflow: 'clip',
                }}
              >
                <Grid item xs={6}>
                  <Box
                    sx={{
                      padding: '10px',
                      paddingTop: '15px',
                      height: '100%',
                    }}
                  >
                    <Typography
                      className="themeborder"
                      component="span"
                      sx={{ lineHeight: 0.5 }}
                    >
                      <MDX value={input} />
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box
                    sx={{
                      padding: '10px',
                      paddingTop: '15px',
                      borderLeft: 'solid 1px',
                      height: '100%',
                    }}
                  >
                    <Typography
                      className="themeborder"
                      component="span"
                      sx={{ lineHeight: 0.5 }}
                    >
                      <MDX value={output} />
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ))}
        </ThemeProvider>
      </Typography>
    </Box>
  )
}
