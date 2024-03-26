import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { Box, Typography } from '@mui/material'

import MDXTab from '../components/MDXPlaygroundPage/MDXTab'
import ProblemCreatorTab from '../components/MDXPlaygroundPage/ProblemCreatorTab'

export default function PlaygroundPage() {
  const [tabIndex, setTabIndex] = useState<number>(1)

  const handleTabChange = (
    _event: React.SyntheticEvent,
    newTabIndex: number,
  ) => {
    setTabIndex(newTabIndex)
  }

  return (
    <Box pt={15}>
      <Typography variant="h3" color="primary" sx={{ mb: '20px' }}>
        Playground
      </Typography>

      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="MDX" />
        <Tab label="Problem Creator" />
      </Tabs>

      {tabIndex === 0 && <MDXTab />}
      {tabIndex === 1 && <ProblemCreatorTab />}
    </Box>
  )
}
