import React from 'react'
import { Container, Typography } from '@mui/material'
import MDX from '../../components/MDXRenderer'

const lessonsInstructions = `
- Lessons are stored and created in the [Frontend REPO](https://github.com/ofast-team/frontend) and will be published only with a review and approval from an administrator.

- Our lessons are created using [MDX](https://mdxjs.com/), which combines [JSX](https://react.dev/learn/writing-markup-with-jsx) and [markdown](https://www.markdownguide.org/).

- We do not support dynamic imports/exports. However, we provide some statically imported components for incorporating common lesson features:

  - [MCQBlock](https://github.com/ofast-team/frontend/tree/main/src/components/MCQBlock.tsx)
  - [FITBBlock](https://github.com/ofast-team/frontend/tree/main/src/components/FITBBlock.tsx)

- For writing lessons and viewing rendered MDX code in the O(fast) environment, feel free to utilize O(fast)'s [MDX Playground](https://ofast.io/playground).

- Open \`src/lessons.json\` and add an entry for the new lesson. The key should be a lesson ID that is not already used by other lessons. The value should be an object with the properties: \`lessonName\`, \`lessonGroup\`, and \`files\`. The \`lessonName\` property stores a string with the lesson's name. The \`lessonGroup\` property stores a string with the name of the lesson group the lesson belongs to. These two properties are used to create and categorize a link to the lesson on the Learn page. \`files\` is an array of strings that represent the paths to mdx lesson files, which store the lesson content.

- Go to \`public/lessons\` and create a new subdirectory with the name of the lesson ID created in the previous step. Inside this folder, create mdx files to write lesson content in. If you haven't already, go back to \`src/lessons.json\` and populate the \`files\` array with the paths to these mdx files, relative to the new lesson subdirectory. In most cases this will simply be the names of the mdx files.

- Refer to existing entries in \`src/lessons.json\` for examples.
`
const problemsInstructions = `
- Problems are stored and created in the [Problems REPO](https://github.com/ofast-team/problems)

1. Create a new folder in the \`problems\` directory with the name of the problem. (Note: the folder name is not used for anything associated with the problem)

2. Create a \`problem.json\` file in the folder you just created. This file should contain the necessary metadata for the problem. Here is an example of what the file should look like:

\`\`\`json
{
  "problemID": "twosum",
  "title": "Two Sum",
  "text": "Alice and Bob are working on a secret project where they need to find two numbers in an array that add up to a specific target. They are running out of time and need your help to implement a solution. Can you assist them?\\n\\nLorem ipsum, dolor sit amet consectetur adipisicing elit. Aut sed placeat, itaque nesciunt hic ea molestiae voluptas error ad consequuntur distinctio animi, accusamus mollitia. Itaque debitis voluptates cupiditate dolorem animi!",
  "problem": "Write a program that takes an array of integers $nums$ and an integer target. The program should return indices of the two numbers such that they add up to the target.",
  "input": "The input consists of a single test case. The first line includes two integers $n$ $(1 ≤ n ≤ 10^4)$ and $t$ $(-10^9 ≤ t ≤ 10^9)$, representing the length of the array and the target integer, respectively. The second line consists of $n$ space-separated integers of array $nums$, denoted as $c_1, c_2, ..., c_n$, where each $c_i$ falls within the range $-10^9 ≤ ci ≤ 10^9$.",
  "output": "Output two space-separated integers, representing the indices ($0$-based) of two numbers within the array nums that sum up to the given target, $t$.",
  "sampleData": [
    {
      "input": "5 4\\n3 0 7 4 2",
      "output": "1 3"
    },
    {
      "input": "3 110\\n10 50 100",
      "output": "0 2"
    }
  ],
  "tags": ["Tag 1", "Tag 2", "Tag 3"],
  "resources": [
    {
      "name": "Google1",
      "url": "https://www.google.com"
    },
    {
      "name": "Google2",
      "url": "https://www.google.com"
    }
  ]
}
\`\`\`

3. Add a directory called data containing the input and output files for the problem. The input and output files should be \`.in\` and \`.out\` files, respectively. The input and output file names for a specific test should be the same.

Template JSON:
\`\`\`json
{
  "problemID": "",
  "title": "",
  "text": "",
  "problem": "",
  "input": "",
  "output": "",
  "sampleData": [
    {
      "input": "",
      "output": ""
    },
    {
      "input": "",
      "output": ""
    }
  ],
  "tags": ["", "", ""],
  "resources": [
    {
      "name": "",
      "url": ""
    },
    {
      "name": "",
      "url": ""
    }
  ]
}
\`\`\`
`

export default function ContributePage() {
  return (
    <Container sx={{ p: 15 }}>
      <Typography variant="h3" gutterBottom color="primary">
        How To Contribute
      </Typography>
      <Typography variant="body1" paragraph>
        O(fast) website is developed with complex frontend and backend coding,
        however, content creation is easy as it only requires using MDX and
        JSON. Anyone can contribute to the content by following the provided
        instructions on how to contribute to lessons and problems on O(fast).
      </Typography>
      <Typography variant="h4" gutterBottom color="primary">
        Create Lessons
      </Typography>
      <Typography
        className="markdown themeborder"
        gutterBottom
        color="primary"
        component="span"
      >
        <MDX value={lessonsInstructions} />
      </Typography>
      <Typography variant="h4" gutterBottom color="primary">
        Create Problems
      </Typography>
      <Typography
        className="markdown themeborder"
        gutterBottom
        color="primary"
        component="span"
      >
        <MDX value={problemsInstructions} />
      </Typography>
    </Container>
  )
}
