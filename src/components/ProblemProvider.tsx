import React, { createContext, useContext, useEffect, useState } from 'react'
import buildPath from '../path'
import Problems from '../objects/Problems'

const ProblemsContext = createContext<Problems>(new Problems([]))

interface ProblemProviderProps {
  children: React.ReactNode
}

export const ProblemProvider: React.FC<ProblemProviderProps> = ({
  children,
}) => {
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
        const result = await response.json()
        setProblemsObject(new Problems(result))
      } catch (error) {
        console.error('Error fetching problems: ', error)
      }
    }

    fetchProblems()
  }, [])

  return (
    <ProblemsContext.Provider value={problemsObject}>
      {children}
    </ProblemsContext.Provider>
  )
}

export const useProblemsObject = () => useContext(ProblemsContext)
