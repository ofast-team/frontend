import { Box, Card, Stack, Typography } from '@mui/material'
import React from 'react'
import PieChart from './PieChart'
import { ProfileData } from '../pages/ProfilePage'
import { FlexBox } from './ProfileCard'

import TerminalIcon from '@mui/icons-material/Terminal'
import PercentIcon from '@mui/icons-material/Percent';

interface ProfileProgressCardProps {
  profileData: ProfileData
}

// Child Component for Profile Page: Progress Section with Pie Chart
export default function ProfileProgressCard({
  profileData,
}: ProfileProgressCardProps) {

  let acRatio : string = (profileData.pieChartData.numAC / profileData.pieChartData.numSubmissions * 100).toFixed(1) 
  if (Number.isNaN(Number(acRatio))) {
    acRatio = 'None'
  }
  else {
    acRatio += ' %'
  }

  return (
    <Card sx={{ p: 5, pt: 5, width: '54%' }}>
      <Typography variant={'h4'} sx={{ marginBottom: 3, p: 0 }}>
        My Statistics
      </Typography>
      <FlexBox>
        <Box sx={{ marginBottom: '20px', width: '100%' }}>
          <PieChart {...profileData.pieChartData} />
        </Box>
        <Stack>
          <Box display="flex" gap={2} alignItems={'center'}>
            <TerminalIcon
              style={{
                textAlign: 'center',
                fontSize: '28px',
              }}
            />
            <Typography variant = 'body2' fontSize={'20px'}>Total Submissions:
            </Typography>
            <Typography fontWeight = 'bold' variant = 'body2' fontSize={'20px'}>
              {profileData.pieChartData.numSubmissions || '0'}
            </Typography>
          </Box>
          <Box display="flex" gap={2} alignItems={'center'}>
            <PercentIcon
              style={{
                textAlign: 'center',
                fontSize: '28px',
              }}
            />
            <Typography variant = 'body2' fontSize={'20px'}>AC Ratio:
            </Typography>
            <Typography fontWeight = 'bold' variant = 'body2' fontSize={'20px'}>
              {acRatio}
            </Typography>
          </Box>
        </Stack>
      </FlexBox>
    </Card>
  )
}
