import { Box, Card, Stack, Typography } from '@mui/material'
import React from 'react'
import PieChart from './PieChart'
import { ProfileData } from '../pages/ProfilePage'
import { FlexBox } from './ProfileCard'

interface ProfileProgressCardProps {
  profileData: ProfileData
}

// Child Component for Profile Page: Progress Section with Pie Chart
export default function ProfileProgressCard({
  profileData,
}: ProfileProgressCardProps) {
  return (
    <Card sx={{ p: 5, width: '54%' }}>
      <Typography variant={'h4'} sx={{ marginBottom: 3 }}>
        Progress
      </Typography>
      <FlexBox>
        <Box sx={{ marginBottom: '20px', width: '100%' }}>
          <PieChart {...profileData.pieChartData} />
        </Box>
        <Stack>
          <FlexBox>
            <Typography>{'Attempted Problems:'}</Typography>
            <Typography>{profileData.numAttempts}</Typography>
          </FlexBox>
          <FlexBox>
            <Typography>{'Solved Problems:'}</Typography>
            <Typography>{profileData.pieChartData.numAC}</Typography>
          </FlexBox>
          <FlexBox>
            <Typography>{'Lessons Completed:'}</Typography>
            <Typography>{0}</Typography>
          </FlexBox>
        </Stack>
      </FlexBox>
    </Card>
  )
}
