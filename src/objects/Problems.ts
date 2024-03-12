export type Problem = {
  problemID: string
  status: string
  title: string
  text: string
  problem: string
  input: string
  output: string
  sampleData: {
    input: string
    output: string
  }[]
  tags: string[]
  resources: {
    name: string
    url: string
  }[]
}

export type ProblemMetaData = {
  problemID: string
  status: string
  title: string
  tags: string[]
}

export default class Problems {
  private problems: Problem[] = []
  private problemMetaData: ProblemMetaData[] = []

  constructor(problems: Problem[]) {
    this.problems = problems
    this.problemMetaData = this.problems.map((problem) => {
      const metaData: ProblemMetaData = {
        problemID: problem.problemID,
        status: problem.status,
        title: problem.title,
        tags: problem.tags,
      }

      return metaData
    })
  }

  public searchProblems(text: string, maxCount: number): Problem[] {
    return this.problems
      .filter((problem) =>
        problem.title.toLowerCase().includes(text.toLowerCase()),
      )
      .slice(0, maxCount)
  }

  public getProblem(problemID: string): Problem | null {
    const filtered = this.problems.filter(
      (problem) => problem.problemID === problemID,
    )

    return filtered.length === 1 ? filtered[0] : null
  }

  // [inclusive, exclusive)
  public getProblemMetaDataFromRange(start: number, end: number) {
    return this.problemMetaData.slice(start, end)
  }

  public getNumProblems(): number {
    return this.problems.length
  }
}
