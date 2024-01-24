import React, { useState, useMemo } from 'react'

import { Container, Typography, Box, Paper } from '@mui/material'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

import SearchBar from '../components/SearchBar'
import ProblemsTable from '../components/ProblemsTable'
import ClickOutside from '../components/ClickOutside'

import './SolvePage.css'
import { useProblemsObject } from '../components/ProblemProvider'
import { Problem } from '../objects/Problems'

function SearchResults({ value }: { value: string }) {
  const problemsObject = useProblemsObject()

  const result: Problem[] = useMemo(
    () => problemsObject.searchProblems(value, 10),
    [value],
  )

  return (
    <Paper
      elevation={5}
      sx={{
        width: '100%',
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
          <motion.div
            className="searchItem"
            style={{ padding: '10px', borderRadius: '10px' }}
            whileHover={{
              scale: 1.005,
              transition: { duration: 0.1 },
            }}
            whileTap={{ scale: 0.995 }}
          >
            <Typography
              variant="body1"
              gutterBottom
              color="primary"
              component="span"
              sx={{ cursor: 'pointer' }}
            >
              {problem.title}
            </Typography>
          </motion.div>
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
  const [showResults, setShowResults] = useState<boolean>(false)

  return (
    <Container sx={{ p: 15, position: 'relative' }}>
      <Typography variant="h3" gutterBottom color="primary">
        Solve
      </Typography>

      <ClickOutside onClickOutside={() => setShowResults(false)}>
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClick={() => setShowResults(true)}
        />
        <Box
          style={{
            zIndex: 1,
            position: 'absolute',
            left: 20,
            right: 66,
          }}
        >
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
