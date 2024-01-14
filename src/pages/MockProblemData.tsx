import { Problem } from './ProblemPage'
import { ProblemMetaData } from '../components/ProblemsTable'

// This file mimics the problem storage and fetching structure until the real storage and APIs
// are configured.

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

const problems: Problem[] = [
  twosum,
  {
    ...twosum,
    problemID: 'house',
    title: 'House',
    tags: ['DP', 'Geometry'],
  },
  {
    ...twosum,
    problemID: 'antarctica',
    title: 'Antarctica',
    tags: ['Math'],
  },
  {
    ...twosum,
    problemID: 'penguins',
    title: 'Penguins',
    tags: ['Penguins'],
  },
  {
    ...twosum,
    problemID: 'fishy',
    title: "Something's Fishy",
    tags: ['Water', 'Fish', 'Food'],
  },
  {
    ...twosum,
    problemID: 'city',
    title: 'City Planning Puzzle',
    tags: ['City', 'Puzzles'],
  },
  {
    ...twosum,
    problemID: 'treasure',
    title: 'Historical Treasure Hunt',
    tags: ['Treasure'],
  },
  {
    ...twosum,
    problemID: 'recipe',
    title: 'Recipe Dilemma',
    tags: ['Recipe', 'Food', 'Hungry'],
  },
  {
    ...twosum,
    problemID: 'culinary',
    title: 'Culinary Conundrum',
    tags: ['Cook', 'Kitchen'],
  },
  {
    ...twosum,
    problemID: 'space',
    title: 'Space Exploration Odyssey',
  },
  {
    ...twosum,
    problemID: 'enchanted',
    title: 'Enchanted Forest',
  },
  {
    ...twosum,
    problemID: 'potion',
    title: 'Magic Potion',
  },
  {
    ...twosum,
    problemID: 'unicorn',
    title: 'Unicorn Parade',
  },
  {
    ...twosum,
    problemID: 'pixie',
    title: 'Pixie Code Encryption',
  },
  {
    ...twosum,
    problemID: 'bubblegum',
    title: 'Bubblegum Bridge Building',
  },
  {
    ...twosum,
    problemID: 'stardust',
    title: 'Stardust Sorting Challenge',
  },
  {
    ...twosum,
    problemID: 'floating',
    title: 'Floating Island Navigation',
  },
  {
    ...twosum,
    problemID: 'whimsical',
    title: 'Whimsical Wonderland Arrays',
  },
  {
    ...twosum,
    problemID: 'galactic',
    title: 'Galactic Jellybean Counting',
  },
  {
    ...twosum,
    problemID: 'moonlit',
    title: 'Moonlit Adventure',
  },
  {
    ...twosum,
    problemID: 'goblin',
    title: 'Goblin Mischief',
  },
  {
    ...twosum,
    problemID: 'starlight',
    title: 'Starlight Quest',
  },
  {
    ...twosum,
    problemID: 'sparkle',
    title: 'Sparkle Chase',
  },
  {
    ...twosum,
    problemID: 'whispering',
    title: 'Whispering Winds',
  },
  {
    ...twosum,
    problemID: 'butterfly',
    title: 'Butterfly Ballet',
  },
  {
    ...twosum,
    problemID: 'mermaid',
    title: 'Mermaid Melody',
  },
  {
    ...twosum,
    problemID: 'dragonfly',
    title: 'Dragonfly Delight',
  },
]

const problemMetaData: ProblemMetaData[] = problems.map((problem) => {
  const metaData: ProblemMetaData = {
    problemID: problem.problemID,
    status: getFakeStatus(problem),
    title: problem.title,
    tags: problem.tags,
  }

  return metaData
})

function getFakeStatus(problem: Problem) {
  let sum = 0
  for (let i = 0; i < problem.title.length; i++) {
    sum += problem.title.charCodeAt(i)
  }

  const status = ['solved', 'wrong', 'unsolved']

  return status[sum % status.length]
}

export function searchProblems(text: string, maxCount: number): Problem[] {
  return problems
    .filter((problem) =>
      problem.title.toLowerCase().includes(text.toLowerCase()),
    )
    .splice(maxCount)
}

export function getProblem(problemID: string): Problem | null {
  const filtered = problems.filter((problem) => problem.problemID === problemID)

  if (filtered.length === 1) {
    return filtered[0]
  }

  return null
}

// inclusive, exclusive
export function getProblemMetaDataFromRange(start: number, end: number) {
  return problemMetaData.slice(start, end)
}

export function getNumProblems(): number {
  return problems.length
}
