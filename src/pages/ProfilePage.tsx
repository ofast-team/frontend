import React, { useState } from 'react'
import {
  Typography,
  Container,
  IconButton,
  Box,
  Stack,
  styled,
  TextField,
  Avatar,
  Button,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DoneIcon from '@mui/icons-material/Done'

import PieChart from '../components/PieChart'
import { LoginButton } from './LoginPage'

// Not sure what we're going to store in the database yet, this is placeholder.
const profileLabels = ['Username', 'Email', 'Name', 'School']
const progressLabels = ['Submissions', 'Solved Problems', 'Completed Lessons']
const progressItems = ['0', '0 / 1', '0 / 4']

const FlexBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '20px',
})

export const ProfileButton = styled(Button)({
  padding: '0px 16px',
  textTransform: 'none',
  fontSize: 20,
  fontFamily: ['Raleway', 'sans-serif'].join(','),
  fontWeight: 500,
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
      <FlexBox sx={{ maxWidth: '50%' }}>
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
      <FlexBox>
        <Stack width="50%" spacing={1}>
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
                    sx: { padding: '2px 5px', fontSize: '22px' },
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
        <Container
          sx={{
            width: '500px',
            display: 'flex',
            gap: '10px',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar src="" sx={{ width: '150px', height: '150px' }} />
          <FlexBox>
            <ProfileButton>Change</ProfileButton>|
            <ProfileButton>Remove</ProfileButton>
          </FlexBox>
          <LoginButton sx={{ fontSize: '20px' }}>Change Password</LoginButton>
        </Container>
      </FlexBox>
      <Typography variant={'h4'} sx={{ marginTop: 3, marginBottom: 3 }}>
        Progress
      </Typography>
      <FlexBox>
        <Container
          sx={{ width: '800px', position: 'relative', right: '100px' }}
        >
          <PieChart />
        </Container>
        <Stack>
          {progressLabels.map((label: string, i: number) => (
            <FlexBox>
              <Typography>{label + ':'}</Typography>
              <Typography>{progressItems[i]}</Typography>
            </FlexBox>
          ))}
        </Stack>
      </FlexBox>
    </Container>
  )
}
