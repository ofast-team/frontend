import React, { useState, useMemo, useRef, useEffect } from 'react'

import { Container, Typography, Box, Paper } from '@mui/material'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

import SearchBar from '../components/SearchBar'
import ProblemsTable from '../components/ProblemsTable'

import { searchProblems } from './MockProblemData'
import { Problem } from '../pages/ProblemPage'

import './SolvePage.css'

function ClickOutside({
  children,
  onClickOutside,
}: {
  children: React.ReactNode
  onClickOutside: () => void
}) {
  const ref: React.RefObject<HTMLInputElement> = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside()
        console.log('clicked outside')
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])
  return <Box ref={ref}>{children}</Box>
}

function SearchResults({ value }: { value: string }) {
  if (value === '') {
    return <></>
  }

  const result: Problem[] = useMemo(() => searchProblems(value), [value])

  return (
    <Paper
      elevation={5}
      sx={{
        width: '1150px',
        maxHeight: '50vh',
        overflow: 'auto',
        position: 'absolute',
        zIndex: 1,
        border: 'solid',
        borderColor: '#04364A',
        borderRadius: '10px',
        bgcolor: 'white',
        mt: '20px',
        pt: '20px',
        px: '20px',
      }}
    >
      {result.map((problem, key) => (
        <Link
          key={key}
          style={{ color: 'inherit', textDecoration: 'none' }}
          to={'/problem/' + problem.problemID}
        >
          <Box className="searchItem" sx={{ p: '10px', borderRadius: '10px' }}>
            <Typography
              variant="body1"
              gutterBottom
              color="primary"
              component="span"
              sx={{ cursor: 'pointer' }}
            >
              {problem.title}
            </Typography>
          </Box>
        </Link>
      ))}
      {result.length === 0 && (
        <Typography
          variant="body1"
          color="primary"
          component="span"
          sx={{ pb: '20px' }}
        >
          No search results
        </Typography>
      )}
      <Box sx={{ mb: '20px' }} />
    </Paper>
  )
}

export default function SolvePage() {
  const [search, setSearch] = useState<string>('')
  const [showResults, setShowResults] = useState<boolean>(true)

  return (
    <Container sx={{ p: 15 }}>
      <Typography variant="h3" gutterBottom color="primary">
        Solve
      </Typography>

      <ClickOutside onClickOutside={() => setShowResults(false)}>
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClick={() => setShowResults(true)}
        />
        <Box style={{ zIndex: 1, position: 'absolute' }}>
          <AnimatePresence>
            {showResults && (
              <motion.div
                key="searchResults"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <SearchResults value={search} />
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </ClickOutside>

      <Box m={4} />

      <ProblemsTable />
    </Container>
  )
}
