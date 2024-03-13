import React, { createContext, useContext, useEffect, useState } from 'react'
import buildPath from '../path'
import Problems from '../objects/Problems'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const ProblemsContext = createContext<Problems>(new Problems([]))

interface ProblemProviderProps {
  children: React.ReactNode
}

export const ProblemProvider: React.FC<ProblemProviderProps> = ({
  children,
}) => {
  const user = useSelector((state: RootState) => state.user)
  const [problemsObject, setProblemsObject] = useState<Problems>(
    new Problems([]),
  )

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch(buildPath('/getProblems'), {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
        let result = await response.json()
        const problemIDs = result.map(
          (problemMetadata) => problemMetadata.problemID,
        )

        if (user.signedIn) {
          const solveStatusResponse = await fetch(
            buildPath('/getSubmissions'),
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                problemIds: problemIDs,
                uid: user.id,
                isBrief: true,
              }),
            },
          )

          const solveStatusResult = await solveStatusResponse.json()
          const problemIDtoSolveStatus = {}

          solveStatusResult.submissionsPerProblem.forEach((problemStatus) => {
            const pid = problemStatus.problemId
            const isSubmitted = problemStatus.isSubmitted
            const isAccepted = problemStatus.isAccepted

            problemIDtoSolveStatus[pid] = isSubmitted
              ? isAccepted
                ? 'solved'
                : 'wrong'
              : 'unsolved'
          })

          result = result.map((problem) => {
            return {
              status: problemIDtoSolveStatus[problem.problemID],
              ...problem,
            }
          })
        } else {
          result = result.map((problem) => {
            return {
              status: 'unsolved',
              ...problem,
            }
          })
        }

        setProblemsObject(new Problems(result))
      } catch (error) {
        console.error('Error fetching problems: ', error)
      }
    }

    fetchProblems()
  }, [user.id])

  return (
    <ProblemsContext.Provider value={problemsObject}>
      {children}
    </ProblemsContext.Provider>
  )
}

export const useProblemsObject = () => useContext(ProblemsContext)
