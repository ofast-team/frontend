import React from 'react'
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  styled,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DoneIcon from '@mui/icons-material/Done'
import CloseIcon from '@mui/icons-material/Close';

import CircleLoadAnimation from '../components/CircleLoadAnimation'

import { LoginButton } from '../pages/LoginPage'
import { ProfileData } from '../pages/ProfilePage'

export const ProfileButton = styled(Button)({
  padding: '0px 16px',
  textTransform: 'none',
  fontSize: 20,
  fontFamily: ['Raleway', 'sans-serif'].join(','),
  fontWeight: 500,
})

export const FlexBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '20px',
})

interface ProfileCardProps {
  profileData: ProfileData
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>
  oldProfileData: ProfileData

  isEditing: boolean
  toggleEdit: () => void
  cancelEdit: () => void
  isWaiting: boolean

  // We only need to pass in items that the API could reject.
  // (it will never reject the user's first/last name)
  usernameStatus: string
  emailStatus: string
}

// Child Component for Profile Page, ID Card for viewing and editing metadata
export default function ProfileCard({
  profileData,
  setProfileData,
  oldProfileData,
  isEditing,
  toggleEdit,
  cancelEdit,
  isWaiting,
  usernameStatus,
  emailStatus,
}: ProfileCardProps) {
  const onTextFieldChange = (key, newString) => {
    setProfileData((prevData: ProfileData) => {
      return { ...prevData, [key]: newString }
    })
  }

  const hasIssue = (str: string) => {
    return str !== 'Success' && str !== 'Not Updated'
  }

  return (
    <Card
      sx={{
        p: 4,
        width: '32%',
        position: 'relative',
      }}
    >
      {isEditing &&
        <IconButton 
          onClick={cancelEdit}
          sx = {{
            position: 'absolute',
            top: 15,
            left: 15,
            borderBottom: '1px solid #04364A',
            borderRadius: 0,
            padding: 0.5,
            paddingLeft: 1,
          }}>
          <React.Fragment>
              <Typography color={'#04364A'}>Cancel</Typography>
              <Box width={'5px'}></Box>
                <CloseIcon
                  style={{ fill: '#04364A', fontSize: '24px' }}
                ></CloseIcon>
            </React.Fragment>
        </IconButton>
      }
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
        {isEditing ? (
          <React.Fragment>
            <Typography color={'#04364A'}>Done</Typography>
            <Box width={'5px'}></Box>
            {isWaiting ? (
              <CircleLoadAnimation />
            ) : (
              <DoneIcon
                style={{ fill: '#04364A', fontSize: '24px' }}
              ></DoneIcon>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography color={'#04364A'}>Edit</Typography>
            <Box width={'5px'}></Box>
            <EditIcon style={{ fill: '#04364A', fontSize: '24px' }}></EditIcon>
          </React.Fragment>
        )}
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
          {profileData?.name}
        </Typography>
      </Container>
      <Stack>
        {/* Username */}
        <div style={{ padding: '5px' }}>
          <hr style={{ borderTop: '1px' }} />
          <Grid container columnSpacing={2} alignItems="center" pl={2} pr={2}>
            <Grid item xs={4}>
              <div style={{ width: '100%', textAlign: 'right' }}>
                <Typography fontSize={20}>Username:</Typography>
              </div>
            </Grid>
            <Grid item xs={8}>
              {isEditing ? (
                <TextField
                  value={
                    hasIssue(usernameStatus)
                      ? oldProfileData.username
                      : profileData?.username
                  }
                  onChange={(e) => {
                    onTextFieldChange('username', e.target.value)
                  }}
                  inputProps={{
                    sx: { padding: '2px 5px', fontSize: '20px' },
                  }}
                  disabled={isWaiting}
                ></TextField>
              ) : (
                <Typography fontSize={20}>{profileData?.username}</Typography>
              )}
            </Grid>
            {hasIssue(usernameStatus) && (
              <Grid item xs={10}>
                <Typography color={'#8B0000'} align="right" fontSize={15}>
                  {'Try Again: ' + usernameStatus}
                </Typography>
              </Grid>
            )}
          </Grid>
        </div>
        {/* Email */}
        <div style={{ padding: '5px' }}>
          <hr style={{ borderTop: '1px' }} />
          <Grid container columnSpacing={2} alignItems="center" pl={2} pr={2}>
            <Grid item xs={4}>
              <Typography fontSize={20} textAlign={'right'}>
                Email:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              {isEditing ? (
                <TextField
                  value={
                    hasIssue(emailStatus)
                      ? oldProfileData.email
                      : profileData?.email
                  }
                  onChange={(e) => {
                    onTextFieldChange('email', e.target.value)
                  }}
                  inputProps={{
                    sx: { padding: '2px 5px', fontSize: '20px' },
                  }}
                  disabled={isWaiting}
                ></TextField>
              ) : (
                <Typography fontSize={20}>{profileData?.email}</Typography>
              )}
            </Grid>
            {hasIssue(emailStatus) && (
              <Grid item xs={12}>
                <Typography
                  paddingRight={4}
                  color={'#8B0000'}
                  align="right"
                  fontSize={15}
                >
                  {'Try Again: ' + emailStatus}
                </Typography>
              </Grid>
            )}
          </Grid>
        </div>
        {/*"Name"*/}
        <div style={{ padding: '5px' }}>
          <hr style={{ borderTop: '1px' }} />
          <Grid container columnSpacing={2} alignItems="center" pl={2} pr={2}>
            <Grid item xs={4}>
              <Typography fontSize={20} textAlign={'right'}>
                Name:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              {isEditing ? (
                <TextField
                  value={profileData?.name}
                  onChange={(e) => {
                    onTextFieldChange('name', e.target.value)
                  }}
                  inputProps={{
                    sx: { padding: '2px 5px', fontSize: '20px' },
                  }}
                  disabled={isWaiting}
                ></TextField>
              ) : (
                <Typography fontSize={20}>{profileData?.name}</Typography>
              )}
            </Grid>
          </Grid>
        </div>
        {/* School */}
        <div style={{ padding: '5px' }}>
          <hr style={{ borderTop: '1px' }} />
          <Grid container columnSpacing={2} alignItems="center" pl={2} pr={2}>
            <Grid item xs={4}>
              <Typography fontSize={20} textAlign={'right'}>
                School:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              {isEditing ? (
                <TextField
                  value={profileData?.school}
                  onChange={(e) => {
                    onTextFieldChange('school', e.target.value)
                  }}
                  inputProps={{
                    sx: { padding: '2px 5px', fontSize: '20px' },
                  }}
                  disabled={isWaiting}
                ></TextField>
              ) : (
                <Typography fontSize={20}>{profileData?.school}</Typography>
              )}
            </Grid>
          </Grid>
        </div>
      </Stack>
      <LoginButton sx={{ fontSize: '20px', marginTop: '20px', width: '100%' }}>
        Change Password
      </LoginButton>
    </Card>
  )
}
