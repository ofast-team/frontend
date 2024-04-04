import React from 'react'
import { Container, Typography } from '@mui/material'
import MDX from '../../components/MDXRenderer'

const C_notes = `
## C

#### Compiler Flags
\`-g -O2 -std=c11\`

#### File Extensions
Allowed: \`.c\`
`

const Cpp_notes = `
## C++

#### Compiler Flags
\`-g -O2 -std=c++17\`

#### File Extensions
Allowed: \`.cpp, .cxx, .cc\`
`

const Java_notes = `
## Java

#### Args
\`-Xss64m -Xmx2048m\`

#### File Extensions
Allowed: \`.java\`
`

const Py_notes = `
## Python

#### Compiler
\`python3\`

#### File Extensions
Allowed: \`.py\`
`

export default function SpecPage() {
  return (
    <Container sx={{ p: 15 }}>
      <Typography variant="h3" gutterBottom color="primary">
        Technical Specifications
      </Typography>
      <Typography variant="body1" paragraph>
        Supported languages for submissions are{' '}
        <strong>C, C++, Java, and Python.</strong>
      </Typography>
      <Typography variant="h3" gutterBottom color="primary">
        Compiler Settings
      </Typography>
      <Typography
        className="markdown themeborder"
        gutterBottom
        color="primary"
        component="span"
      >
        <MDX value={C_notes} />
        <hr />
        <MDX value={Cpp_notes} />
        <hr />
        <MDX value={Java_notes} />
        <hr />
        <MDX value={Py_notes} />
        <hr />
      </Typography>
    </Container>
  )
}
