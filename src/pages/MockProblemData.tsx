import { Problem } from './ProblemPage'

export function searchProblems(text: string): Problem[] {
  return problems.filter((problem) =>
    problem.title.toLowerCase().includes(text.toLowerCase()),
  )
}

export function getProblem(problemID: string): Problem | null {
  const filtered = problems.filter((problem) => problem.problemID === problemID)

  if (filtered.length === 1) {
    return filtered[0]
  }

  return null
}

const twosum: Problem = {
  problemID: 'twosum',
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
      input: '5 4 \n\n 3 0 7 4 2',
      output: '1 3',
    },
    {
      input: '3 110\n\n10 50 100',
      output: '0 2',
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
}

export const problems: Problem[] = [
  twosum,
  {
    ...twosum,
    problemID: 'house',
    title: 'House',
  },
  {
    ...twosum,
    problemID: 'antarctica',
    title: 'Antarctica',
  },
  {
    ...twosum,
    problemID: 'penguins',
    title: 'Penguins',
  },
  {
    ...twosum,
    problemID: 'fishy',
    title: "Something's Fishy",
  },
  {
    ...twosum,
    problemID: 'city',
    title: 'City Planning Puzzle',
  },
  {
    ...twosum,
    problemID: 'treasure',
    title: 'Historical Treasure Hunt',
  },
  {
    ...twosum,
    problemID: 'recipe',
    title: 'Recipe Dilemma',
  },
]
