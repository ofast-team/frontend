import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Grid,
  Container,
  Box,
  Typography,
  Stack,
  Button,
  Chip,
} from '@mui/material'
import Markdown from 'react-markdown'
import rehypeMathjax from 'rehype-mathjax/svg'
import remarkMath from 'remark-math'
import { Link } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'

interface Problem {
  title: string
  text: string
  problem: string
  input: string
  output: string
  sampleData: {
    input: JSX.Element
    output: JSX.Element
  }[]
  tags: string[]
  resources: {
    name: string
    url: string
  }[]
}

const problems: Record<string, Problem> = {
  twosum: {
    title: 'Two Sum',
    text: `
Alice and Bob are working on a secret project where they need to find two numbers in an array that add up to a specific target. They are running out of time and need your help to implement a solution. Can you assist them?

Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut sed placeat, itaque nesciunt hic ea molestiae voluptas error ad consequuntur distinctio animi, accusamus mollitia. Itaque debitis voluptates cupiditate dolorem animi!
    `,
    problem:
      'Write a program that takes an array of integers $nums$ and an integer target. The program should return indices of the two numbers such that they add up to the target.',
    input:
      'The input consists of a single test case. The first line includes two integers $n$ $(1 ≤ n ≤ 10^4)$ and $t$ $(-10^9 ≤ t ≤ 10^9)$, representing the length of the array and the target integer, respectively. The second line consists of $n$ space-separated integers of array $nums$, denoted as $c_1, c_2, ..., c_n$, where each $c_i$ falls within the range $-10^9 ≤ ci ≤ 10^9$.',
    output:
      'Output two space-separated integers, representing the indices ($0$-based) of two numbers within the array nums that sum up to the given target, $t$.',
    sampleData: [
      {
        input: (
          <Markdown
            children={`
5 4

3 0 7 4 2
`}
          />
        ),
        output: (
          <Markdown
            children={`
1 3
`}
          />
        ),
      },
      {
        input: (
          <Markdown
            children={`
3 110

10 50 100
`}
          />
        ),
        output: (
          <Markdown
            children={`
0 2
`}
          />
        ),
      },
    ],
    tags: ['Tag 1', 'Tag 2', 'Tag 3'],
    resources: [
      {
        name: 'Google1',
        url: 'https://www.google.com',
      },
      {
        name: 'Google2',
        url: 'https://www.google.com',
      },
    ],
  },
}

const dataTheme = createTheme({
  typography: {
    fontFamily: 'Source Code Pro, monospace',
  },
})

type Verdict = 'AC' | 'WA' | 'unsolved' | 'RTE' | 'CTE' | 'TLE'

interface Submission {
  verdict: Verdict
  time: Date
}

const submissions: Submission[] = [
  {
    verdict: 'AC',
    time: new Date(1234567890000),
  },
  {
    verdict: 'WA',
    time: new Date(1114567890000),
  },
]

interface CardProps {
  title: string
  children: React.ReactNode
  style?: React.CSSProperties | undefined
}

function Card(props: CardProps) {
  return (
    <Box
      style={{
        ...props.style,
        borderRadius: '15px',
        width: 300,
        border: 'solid',
        borderWidth: '1px',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          height: 30,
          textAlign: 'center',
          bgcolor: '#6DB6C3',
          borderBottom: 'solid',
          borderWidth: '1px',
        }}
      >
        <Typography gutterBottom color="primary" component="span" variant="h5">
          {props.title}
        </Typography>
      </Box>
      {props.children}
    </Box>
  )
}

interface StatusProps {
  status: Verdict
}

const verdictToColor = {
  AC: 'green',
  WA: 'red',
  unsolved: 'grey',
}

const verdictToText = {
  AC: 'Correct',
  WA: 'Wrong Answer',
  unsolved: 'Unsolved',
}

function Status(props: StatusProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <Box
        sx={{
          height: '30px',
          width: '30px',
          backgroundColor: verdictToColor[props.status],
          borderRadius: '50%',
          display: 'inline-block',
          m: '5px',
        }}
      />
      <Box m="10px">
        <Typography gutterBottom color="primary" component="span" variant="h5">
          {verdictToText[props.status]}
        </Typography>
      </Box>
    </Box>
  )
}

interface SubmissionItemProps {
  submission: Submission
}

function SubmissionItem({ submission }: SubmissionItemProps) {
  return (
    <Box sx={{ color: verdictToColor[submission.verdict] }}>
      {verdictToText[submission.verdict] +
        ' ' +
        submission.time.toLocaleTimeString() +
        ' ' +
        submission.time.toLocaleDateString('en-US')}
    </Box>
  )
}

// TODO: (Stretch Goal) Add copy button for samples
export default function ProblemPage() {
  const params = useParams()
  const problemID: string = params.problem as string

  if (!(problemID in problems)) {
    return <Box pt={15}>Problem not found</Box>
  }

  const problem = problems[problemID]

  return (
    <Container sx={{ pt: 15 }}>
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
                      <Typography sx={{ lineHeight: 0.5 }}>{input}</Typography>
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
                      <Typography sx={{ lineHeight: 0.5 }}>{output}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </ThemeProvider>
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'inline-block',
          verticalAlign: 'top',
          pl: '30px',
          pt: '50px',
        }}
      >
        <Stack>
          <Card
            title="Status"
            style={{ height: '100px', marginBottom: '50px' }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                paddingTop: '10px',
              }}
            >
              <Status status="AC" />
            </Box>
          </Card>

          <Card
            title="Submit"
            style={{
              marginBottom: '50px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                paddingTop: '10px',
              }}
            >
              <Button>Choose file</Button>
            </Box>

            <Box
              sx={{
                paddingTop: '10px',
                paddingBottom: '30px',
              }}
            >
              {submissions.map((submission, key) => (
                <Box
                  key={key}
                  sx={{
                    display: 'flex',
                    justifyContent: 'left',
                    width: '100%',
                    paddingLeft: '25px',
                    marginBottom: '5px',
                  }}
                >
                  <SubmissionItem submission={submission} />
                </Box>
              ))}

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <a href="">All Submissions</a>
              </Box>
            </Box>
          </Card>

          <Card title="Tags" style={{ height: '100px', marginBottom: '50px' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                paddingTop: '10px',
              }}
            >
              {problem.tags.map((tag, key) => (
                <Chip key={key} label={tag} sx={{ mr: '10px' }} />
              ))}
            </Box>
          </Card>

          <Card title="Resources" style={{ height: '100px' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                paddingTop: '10px',
              }}
            >
              {problem.resources.map((resource, key) => (
                <span key={key} style={{ marginRight: '15px' }}>
                  <Link style={{ color: 'inherit' }} to={resource.url} replace>
                    <Typography
                      gutterBottom
                      color="primary"
                      component="span"
                      variant="body1"
                    >
                      {resource.name}
                    </Typography>
                  </Link>
                </span>
              ))}
            </Box>
          </Card>
        </Stack>
      </Box>
    </Container>
  )
}
