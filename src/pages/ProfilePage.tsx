import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Container } from '@mui/material'

import { RootState } from '../store'
import buildPath from '../path'
import ProfileCard from '../components/ProfileCard'
import ProfileProgressCard from '../components/ProfileProgressCard'
import { PieChartProps } from '../components/PieChart'

export interface ProfileData {
  username: string
  email: string
  name: string
  school: string
  numAttempts: number
  pieChartData: PieChartProps
}

// Parent Component for Profile Page, primarily handles API calls.
export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true)
  const [isWaiting, setIsWaiting] = useState<boolean>(false)

  const [usernameStatus, setUsernameStatus] = useState<string>('Not Updated')
  const [emailStatus, setEmailStatus] = useState<string>('Not Updated')

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
  const [oldProfileData, setOldProfileData] =
    useState<ProfileData>(profileDataDefault)

  const user = useSelector((state: RootState) => state.user)

  // Fetch user's data and populate the state when the page first loads.
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
          username: data.username,
          email: data.email,
          name: data.name,
          school: data.school,
          numAttempts: data.problemsAttempted,
          pieChartData: newPieChartData,
        }

        setOldProfileData(newProfileData)
        setProfileData(newProfileData)
        setIsLoadingPage(false)
      })
      .catch((error: Error) => {
        console.error(error)
      })
  }, [])

  async function submitEdit(): Promise<void> {
    interface ProfileEditQuery {
      uid: string
      username?: string
      email?: string
      name?: string
      school?: string
    }

    // compare old data to new data, and only submit the fields that were changed.
    const sendToAPI: ProfileEditQuery = { uid: user.id }
    if (oldProfileData.username !== profileData.username) {
      sendToAPI.username = profileData.username
    }
    if (oldProfileData.email !== profileData.email) {
      sendToAPI.email = profileData.email
    }
    if (oldProfileData.name !== profileData.name) {
      sendToAPI.name = profileData.name
    }
    if (oldProfileData.school !== profileData.school) {
      sendToAPI.school = profileData.school
    }

    setIsWaiting(true)
    fetch(buildPath('/updateUserData'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sendToAPI),
    })
      .then((res: Response) => {
        if (res.ok) {
          return res.json()
        }
        throw Error(res.statusText)
      })
      .then((data) => {
        setIsWaiting(false)

        let editWasSuccessful: boolean = true
        for (const key of Object.keys(data)) {
          if (data[key] !== 'Not Updated' && data[key] !== 'Success') {
            editWasSuccessful = false

            // Revert this item (key) back to what it was before editing.
            setProfileData((prevData: ProfileData) => {
              return { ...prevData, [key]: oldProfileData[key] }
            })
          }
        }

        setUsernameStatus(data.username)
        setEmailStatus(data.email)

        if (editWasSuccessful) {
          setIsEditing(false)
        }
      })
  }

  const toggleEdit = () => {
    if (isEditing) {
      submitEdit()
    } else {
      setIsEditing(true)
    }
  }

  if (isLoadingPage) {
    return <React.Fragment />
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
      <ProfileCard
        {...{
          profileData,
          setProfileData,
          oldProfileData,
          isEditing,
          toggleEdit,
          isWaiting,
          usernameStatus,
          emailStatus,
        }}
      />
      <ProfileProgressCard profileData={profileData} />
    </Container>
  )
}
