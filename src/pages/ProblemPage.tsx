import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography, Grid, Stack, Button, Chip } from '@mui/material'
import Markdown from 'react-markdown'
import rehypeMathjax from 'rehype-mathjax/svg'
import remarkMath from 'remark-math'
import { Link } from 'react-router-dom'

const problems = {
  twosum: {
    title: 'Two Sum',
    text: `
Alice and Bob are working on a secret project where they need to find two numbers in an array that add up to a specific target. They are running out of time and need your help to implement a solution. Can you assist them?

Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut sed placeat, itaque nesciunt hic ea molestiae voluptas error ad consequuntur distinctio animi, accusamus mollitia. Itaque debitis voluptates cupiditate dolorem animi!
    `,

    problem:
      'Write a program that takes an array of integers $nums$ and an integer target. The program should return indices of the two numbers such that they add up to the target.',
    input:
      'The input consists of a single test case. The first line includes an integer $n (1 ≤ n ≤ 10^4)$, representing the length of the array. The following line consists of $n$ space-separated integers of array $nums$, denoted as $c_1, c_2, ..., c_n$, where each $c_i$ falls within the range $-10^9 ≤ ci ≤ 10^9$. Following that, the next line contains an integer $t$, denoting the target value $(-10^9 ≤ t ≤ 10^9)$.',
    output:
      'Output two space-separated integers, representing the indices ($0$-based) of two numbers within the array nums that sum up to the given target, $t$.',
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          paddingTop: '10px',
        }}
      >
        {props.children}
      </Box>
    </Box>
  )
}

interface StatusProps {
  status: 'solved' | 'unsolved' | 'wrong'
}

function Status(props: StatusProps) {
  const statusToColor = {
    solved: 'green',
    wrong: 'red',
    unsolved: 'grey',
  }

  const statusToText = {
    solved: 'Correct',
    wrong: 'Wrong Answer',
    unsolved: 'Unsolved',
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <Box
        sx={{
          height: '30px',
          width: '30px',
          backgroundColor: statusToColor[props.status],
          borderRadius: '50%',
          display: 'inline-block',
          m: '5px',
        }}
      />
      <Box m="10px">
        <Typography gutterBottom color="primary" component="span" variant="h5">
          {statusToText[props.status]}
        </Typography>
      </Box>
    </Box>
  )
}

export default function ProblemPage() {
  const params = useParams()
  const problemID: string = params.problem as string

  if (!(problemID in problems)) {
    return <Box pt={15}>Problem not found</Box>
  }

  const problem = problems[problemID]

  return (
    <Box pt={15}>
      <Grid container>
        <Grid item xs={8} sx={{ pl: '50px' }}>
          <Typography gutterBottom color="primary" component="span">
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
          </Typography>
        </Grid>

        <Grid
          item
          xs={4}
          sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
        >
          <Stack>
            <Card
              title="Status"
              style={{ height: '100px', marginBottom: '50px' }}
            >
              <Status status="solved" />
            </Card>

            <Card
              title="Submit"
              style={{ height: '100px', marginBottom: '50px' }}
            >
              <Button>Choose file</Button>
            </Card>

            <Card
              title="Tags"
              style={{ height: '100px', marginBottom: '50px' }}
            >
              {problem.tags.map((tag, key) => (
                <Chip key={key} label={tag} sx={{ mr: '10px' }} />
              ))}
            </Card>

            <Card title="Resources" style={{ height: '100px' }}>
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
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}
