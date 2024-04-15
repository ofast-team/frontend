import React from 'react'
import { Container, Typography } from '@mui/material'
import MDX from '../../components/MDXRenderer'

const C_notes = `
## C

#### Compiler
\`GCC 9.2.0\`

#### Version
\`C 11\`

#### Compiler Flags
\`-g -O2 -std=c11\`

#### File Extensions
Accepted: \`.c\`
`

const Cpp_notes = `
## C++

#### Compiler
\`GCC 9.2.0\`

#### Version
\`C++ 17\`

#### Compiler Flags
\`-g -O2 -std=c++17\`

#### File Extensions
Accepted: \`.cpp, .cxx, .cc\`
`

const Java_notes = `
## Java

<div style={{color: "red", fontSize: "18px"}}><strong>Class must be named \`Main\`</strong></div><br/>

#### Compiler
\`OpenJDK 13.0.1\`

#### Version
\`Java 13\`

#### Args
\`-Xss64m -Xmx2048m\`

#### File Extensions
Accepted: \`.java\`
`

const Py_notes = `
## Python

#### Version
\`Python 3.8.1\`

#### Interpreter
\`python3\`

#### File Extensions
Accepted: \`.py\`
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
