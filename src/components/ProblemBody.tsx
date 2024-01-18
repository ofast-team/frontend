import React from 'react'
import { Grid, Box, Typography } from '@mui/material'
import Markdown from 'react-markdown'
import rehypeMathjax from 'rehype-mathjax/svg'
import remarkMath from 'remark-math'
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
      <Typography color="primary" component="span">
        <h1 style={{ textAlign: 'center' }}>{problem.title}</h1>
        <Markdown
          children={problem.text}
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeMathjax]}
        />

        <h2 style={{ marginBottom: '5px' }}>Problem</h2>
        <Markdown
          children={problem.problem}
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeMathjax]}
        />

        <h2 style={{ marginBottom: '5px' }}>Input</h2>
        <Markdown
          children={problem.input}
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeMathjax]}
        />

        <h2 style={{ marginBottom: '5px' }}>Output</h2>
        <Markdown
          children={problem.output}
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeMathjax]}
        />

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
                    <Typography sx={{ lineHeight: 0.5 }} component="span">
                      <Markdown children={input} />
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
                    <Typography sx={{ lineHeight: 0.5 }} component="span">
                      <Markdown children={output} />
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
