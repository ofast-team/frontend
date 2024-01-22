import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
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
import DoneIcon from '@mui/icons-material/Done'

import PieChart, { PieChartProps } from '../components/PieChart'
import { LoginButton } from './LoginPage'
import { RootState } from '../store'
import buildPath from '../path'

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

interface ProfileData {
  username: string
  email: string
  name: string
  school: string
  numAttempts: number
  pieChartData: PieChartProps
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const profileDataDefault: ProfileData = {
    username: 'empty',
    email: 'empty',
    name: 'empty',
    school: 'empty',
    pieChartData: {
      numAC: 0,
      numWA: 0,
      numTLE: 0,
      numRTE: 0,
    },
    numAttempts: 0,
  }
  const [profileData, setProfileData] =
    useState<ProfileData>(profileDataDefault)

  const user = useSelector((state: RootState) => state.user)

  useEffect(() => {
    fetch(buildPath('/getUserData'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid: user.id }),
    })
      .then((res: Response) => {
        if (res.ok) {
          return res.json()
        }
        throw Error(res.statusText)
      })
      .then((data) => {
        const newPieChartData: PieChartProps = {
          numAC: data.problemsAccepted,
          numWA: data.problemsWrong,
          numTLE: data.problemsTLE,
          numRTE: data.problemsRTE,
        }

        const newProfileData: ProfileData = {
          username: 'testuser',
          email: data.email,
          name: data.name,
          school: 'University of Maryland',
          numAttempts: data.problemsAttempted,
          pieChartData: newPieChartData,
        }

        setProfileData(newProfileData)
      })
      .catch((error: Error) => {
        console.log(
          'Error fetching data for user ' + user.id + ': ' + error.message,
        )
      })
  }, [])

  const onTextFieldChange = (key, newString) => {
    setProfileData((oldData: ProfileData) => {
      return { ...oldData, [key]: newString }
    })
  }

  const toggleEdit = () => {
    setIsEditing((isEditing) => !isEditing)
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
          {isEditing ? (
            <React.Fragment>
              <Typography color={'#04364A'}>Done</Typography>
              <Box width={'5px'}></Box>
              <DoneIcon
                style={{ fill: '#04364A', fontSize: '24px' }}
              ></DoneIcon>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography color={'#04364A'}>Edit</Typography>
              <Box width={'5px'}></Box>
              <EditIcon
                style={{ fill: '#04364A', fontSize: '24px' }}
              ></EditIcon>
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
            <Grid container gap={2} alignItems="center">
              <Grid item xs={3.5}>
                <Typography fontSize={20} textAlign={'right'}>
                  Username:
                </Typography>
              </Grid>
              <Grid item xs={7.5}>
                {isEditing ? (
                  <TextField
                    value={profileData?.username}
                    onChange={(e) => {
                      onTextFieldChange('username', e.target.value)
                    }}
                    inputProps={{
                      sx: { padding: '2px 5px', fontSize: '20px' },
                    }}
                  ></TextField>
                ) : (
                  <Typography fontSize={20}>{profileData?.username}</Typography>
                )}
              </Grid>
            </Grid>
          </div>
          {/* Email */}
          <div style={{ padding: '5px' }}>
            <hr style={{ borderTop: '1px' }} />
            <Grid container gap={2} alignItems="center">
              <Grid item xs={3.5}>
                <Typography fontSize={20} textAlign={'right'}>
                  Email:
                </Typography>
              </Grid>
              <Grid item xs={7.5}>
                {isEditing ? (
                  <TextField
                    value={profileData?.email}
                    onChange={(e) => {
                      onTextFieldChange('email', e.target.value)
                    }}
                    inputProps={{
                      sx: { padding: '2px 5px', fontSize: '20px' },
                    }}
                  ></TextField>
                ) : (
                  <Typography fontSize={20}>{profileData?.email}</Typography>
                )}
              </Grid>
            </Grid>
          </div>
          {/*"Name"*/}
          <div style={{ padding: '5px' }}>
            <hr style={{ borderTop: '1px' }} />
            <Grid container gap={2} alignItems="center">
              <Grid item xs={3.5}>
                <Typography fontSize={20} textAlign={'right'}>
                  Name:
                </Typography>
              </Grid>
              <Grid item xs={7.5}>
                {isEditing ? (
                  <TextField
                    value={profileData?.name}
                    onChange={(e) => {
                      onTextFieldChange('name', e.target.value)
                    }}
                    inputProps={{
                      sx: { padding: '2px 5px', fontSize: '20px' },
                    }}
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
            <Grid container gap={2} alignItems="center">
              <Grid item xs={3.5}>
                <Typography fontSize={20} textAlign={'right'}>
                  School:
                </Typography>
              </Grid>
              <Grid item xs={7.5}>
                {isEditing ? (
                  <TextField
                    value={profileData?.school}
                    onChange={(e) => {
                      onTextFieldChange('school', e.target.value)
                    }}
                    inputProps={{
                      sx: { padding: '2px 5px', fontSize: '20px' },
                    }}
                  ></TextField>
                ) : (
                  <Typography fontSize={20}>{profileData?.school}</Typography>
                )}
              </Grid>
            </Grid>
          </div>
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
    </Container>
  )
}
