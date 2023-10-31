import React from 'react'
import Markdown from 'react-markdown'
import rehypeMathjax from 'rehype-mathjax/svg'
import remarkMath from 'remark-math'

import { MathJax, MathJaxContext } from 'better-react-mathjax'

import {
  Container,
  Typography,
} from '@mui/material'

// TODO: Make the LateX expression highlightable. Need to figure out how to configure chtml fontURL

const markdown = `
  # Fibonacci
  This is how to compute the $i$th fibonacci number: \n
  $F_i = F_{i-1} + F_{i-2}$ \n
  $\\sum_{n=1}^{\\infty} 2^{-n} = 1$ \n
  $\\pi \\approx 3.14159$ \n
  $\\pm \\, 0.2$ \n
  $\\dfrac{0}{1} \\neq \\infty$ \n
  $0 < x < 1$ \n
  $0 \\leq x \\leq 1$ \n
  $x \\geq 10$ \n
  $\\forall \\, x \\in (1,2)$ \n
  $\\exists \\, x \\notin [0,1]$ \n
  $A \\subset B$ \n
  $A \\subseteq B$ \n 
  $A \\cup B$ \n
  $A \\cap B$ \n
  $X \\implies Y$ \n
  $X \\impliedby Y$ \n
  $a \\to b$ \n
  $a \\longrightarrow b$ \n
  $a \\Rightarrow b$ \n
  $a \\Longrightarrow b$ \n
  $a \\propto b$
`

// const markdown = `The lift coefficient ($C_L$) is a dimensionless coefficient.`

export default function TestPage() {
  return (
    <Typography gutterBottom color="primary">
      <Container>
        <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeMathjax]}>
          {markdown}
        </Markdown>
        {/* <MathJaxContext>
          <h2>Basic MathJax example with Latex</h2>
          <MathJax>{"\\(\\frac{10}{4x} \\approx 2^{12}\\)"}</MathJax>
        </MathJaxContext> */}
      </Container>
    </Typography>
  )
}
