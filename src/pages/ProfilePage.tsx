import React, { useState } from 'react'
import {
  Typography,
  Container,
  Box,
  Stack,
  styled,
  TextField,
  Avatar,
  Button,
  Card,
  Grid,
  IconButton,
} from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'

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

  const onTextFieldChange = (newString, i) => {
    const arrayCopy = profileData.map((x) => x)
    arrayCopy[i] = newString
    setProfileData(arrayCopy)
  }

  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  return (
    <Container
      sx={{
        p: 15,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      <Card sx={{ p: 4, width: '32%', position: 'relative' }}>
        <IconButton
          onClick={toggleEdit}
          sx={{
            position: 'absolute',
            top: 15,
            right: 15,
            borderBottom: '1px solid #04364A',
            borderRadius: 0,
            padding: 0.5,
            paddingLeft: 1,
          }}
        >
          <Typography color={'#04364A'}>Edit</Typography>
          <Box width={'5px'}></Box>
          <EditIcon style={{ fill: '#04364A', fontSize: '24px' }}></EditIcon>
        </IconButton>
        <Container
          sx={{
            width: '350px',
            display: 'flex',
            gap: '10px',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <Avatar src="" sx={{ width: '150px', height: '150px' }} />
          <FlexBox>
            <ProfileButton>Change</ProfileButton>|
            <ProfileButton>Remove</ProfileButton>
          </FlexBox>
          <Typography fontSize={32} fontWeight={600}>
            Your Name
          </Typography>
        </Container>
        <Stack>
          {profileLabels.map((label: string, i: number) => (
            <div style={{ padding: '5px' }}>
              <hr style={{ borderTop: '1px' }} />
              <Grid container gap={2} alignItems="center">
                <Grid item xs={3.5}>
                  <Typography fontSize={20} textAlign={'right'}>
                    {label + ':'}
                  </Typography>
                </Grid>
                <Grid item xs={7.5}>
                  {isEditing ? (
                    <TextField
                      value={profileData[i]}
                      onChange={(e) => {
                        onTextFieldChange(e.target.value, i)
                      }}
                      inputProps={{
                        sx: { padding: '2px 5px', fontSize: '20px' },
                      }}
                    >
                      Placeholder
                    </TextField>
                  ) : (
                    <Typography fontSize={20}>{profileData[i]}</Typography>
                  )}
                </Grid>
              </Grid>
            </div>
          ))}
        </Stack>
        <LoginButton
          sx={{ fontSize: '20px', marginTop: '20px', width: '100%' }}
        >
          Change Password
        </LoginButton>
      </Card>
      <Card sx={{ p: 5, width: '54%' }}>
        <Typography variant={'h4'} sx={{ marginBottom: 3 }}>
          Progress
        </Typography>
        <FlexBox>
          <Box sx={{ marginBottom: '20px', width: '100%' }}>
            <PieChart />
          </Box>
          <Stack>
            {progressLabels.map((label: string, i: number) => (
              <FlexBox>
                <Typography>{label + ':'}</Typography>
                <Typography>{progressItems[i]}</Typography>
              </FlexBox>
            ))}
          </Stack>
        </FlexBox>
      </Card>
    </Container>
  )
}
