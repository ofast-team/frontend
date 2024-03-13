import Problems, { Problem } from '../Problems'

// Mock data for testing
const mockProblems: Problem[] = [
  {
    problemID: '1',
    status: 'solved',
    title: 'Problem One',
    text: 'Description for Problem One',
    problem: 'Problem statement for One',
    input: 'Input for One',
    output: 'Output for One',
    sampleData: [{ input: 'Sample Input', output: 'Sample Output' }],
    tags: ['tag1', 'tag2'],
    resources: [{ name: 'Resource One', url: 'http://example.com/resource1' }],
  },
  // Add more mock problems as needed
]

describe('Problems Class Tests', () => {
  let problemsInstance: Problems

  beforeEach(() => {
    problemsInstance = new Problems(mockProblems)
  })

  test('searchProblems returns correct results', () => {
    const searchTerm = 'One'
    const maxCount = 1
    const result = problemsInstance.searchProblems(searchTerm, maxCount)
    expect(result.length).toBe(1)
    expect(result[0].title).toContain(searchTerm)
  })

  test('getProblem returns correct problem or null', () => {
    const problemID = '1'
    const result = problemsInstance.getProblem(problemID)
    expect(result).toEqual(mockProblems[0])

    const nonExistentID = 'nonexistent'
    const nonExistentResult = problemsInstance.getProblem(nonExistentID)
    expect(nonExistentResult).toBeNull()
  })

  test('getProblemMetaDataFromRange returns correct metadata', () => {
    const start = 0
    const end = 1
    const result = problemsInstance.getProblemMetaDataFromRange(start, end)
    expect(result.length).toBe(1)
    expect(result[0].problemID).toBe(mockProblems[start].problemID)
  })

  test('getNumProblems returns correct number of problems', () => {
    const result = problemsInstance.getNumProblems()
    expect(result).toBe(mockProblems.length)
  })
})
