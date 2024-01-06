import React, { useState } from 'react'
import {
  Typography,
  Container,
  IconButton,
  Box,
  Stack,
  styled,
  TextField,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DoneIcon from '@mui/icons-material/Done'

import {PieChart} from '@mui/x-charts/PieChart'
import NewPieChart from '../components/PieChart'

// Not sure what we're going to store in the database yet, this is placeholder.
const profileLabels = ['Username', 'Email', 'Name', 'School']
const progressLabels = ['Submissions', 'Solved Problems', 'Completed Lessons']
const progressItems = ['0', '0 / 1', '0 / 4']

const FlexBox = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '20px',
})

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [profileData, setProfileData] = useState<string[]>([
    'Placeholder',
    'Placeholder',
    'Placeholder',
    'Placeholder',
  ])
  const handleEdit = () => {
    setIsEditing(true)
  }
  const handleDone = () => {
    setIsEditing(false)
  }

  const onTextFieldChange = (newString, i) => {
    const arrayCopy = profileData.map((x) => x)
    arrayCopy[i] = newString
    setProfileData(arrayCopy)
  }



  return (
    <Container sx={{ p: 15 }}>
      <FlexBox sx = {{marginBottom: 3}}>
        <Typography variant={'h3'}>Profile</Typography>
        {isEditing ? (
          <IconButton onClick={handleDone}>
            <DoneIcon sx={{ color: 'black', fontSize: '40px' }} />
          </IconButton>
        ) : (
          <IconButton onClick={handleEdit}>
            <EditIcon sx={{ color: 'black', fontSize: '40px' }} />
          </IconButton>
        )}
      </FlexBox>
      <Container>
        <Container>
          <Stack spacing={1}>
            {profileLabels.map((label: string, i: number) => (
              <FlexBox key={i}>
                <Typography fontSize={24}>{label + ':'}</Typography>
                {isEditing ? (
                  <TextField
                    value={profileData[i]}
                    onChange={(e) => {
                      onTextFieldChange(e.target.value, i)
                    }}
                    inputProps={{
                      sx: { padding: '2px 5px', fontSize: '22px'},
                    }}
                  >
                    Placeholder
                  </TextField>
                ) : (
                  <Typography fontSize={22}>{profileData[i]}</Typography>
                )}
              </FlexBox>
            ))}
          </Stack>
        </Container>
        <Container></Container>
      </Container>
      <Typography variant={'h4'} sx={{ marginTop: 3, marginBottom: 3 }}>
        Progress
      </Typography>
      <FlexBox>
        <NewPieChart/>
        <PieChart 
            series = {[
                {
                    data: [
                        {id: 0, label: 'Accepted', value: 3},
                        {id: 1, label: 'Wrong Answer', value: 8},
                        {id: 2, label: 'Time Limit Exceeded', value: 5},
                        {id: 3, label: 'Runtime Error', value: 2},
                    ],
                    innerRadius: 60,
                    outerRadius: 120,
                },
            ]}
            slotProps={{
               legend: {
                labelStyle: {
                  fontSize: '1.5em'
                },
              }
            }}
            height={300}
            sx={{border: '1px solid black'}}
        />
        <Container sx = {{display: 'flex', justifyContent: 'center',}}>
            <Stack>
            {progressLabels.map((label: string, i : number) =>
                <FlexBox>
                <Typography>{label + ':'}</Typography>
                <Typography>{progressItems[i]}</Typography>
                </FlexBox>)}
            </Stack>
        </Container>
    </FlexBox>
    <Typography>Note: I prefer the first of the two because its more responsive, and its the same one that CFAnalytics and Kattis uses</Typography>
    <Typography>If we want the legend to be flexible, we could make our own.</Typography>
</Container>
  )
}
