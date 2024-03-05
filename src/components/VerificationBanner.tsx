import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import buildPath from '../path'
import { verify } from '../userSlice'
import { Box, Link, Typography } from '@mui/material'

export default function VerificationBanner() {
  const user = useSelector((state: RootState) => state.user)

  const dispatch = useDispatch()

  const [isClicked, setIsClicked] = useState<boolean>(false)

  const verifyEmail = () => {
    setIsClicked(true)
    fetch(buildPath('/sendVerificationEmail'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res: Response) => {
        if (res.ok) {
          return res.json()
        }
        throw Error(res.statusText)
      })
      .then((data) => {
        console.log(data)
      })
      .catch((error: Error) => {
        console.log('Error sending verification email: ' + error.message)
      })
  }

  // Only fetch verification status if they are currently unverified
  if (!user.verified) {
    fetch(buildPath('/isVerified'), {
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
        if (data.isVerified === true) {
          dispatch(verify())
        }
      })
      .catch((error: Error) => {
        console.error(error.message)
      })
  }
  return (
    !user.verified && (
      <Box sx={{ width: '100%' }} display={'flex'} flexDirection={'column'}>
        <Box
          sx={{ width: '100%', backgroundColor: 'lightblue' }}
          display={'flex'}
          flexDirection={'column'}
          position={'absolute'}
          alignSelf={'center'}
          top={80}
        >
          <Typography variant="body1" alignSelf={'center'}>
            You need to verify your email to use some features of O(fast). Click{' '}
            <Link
              onClick={verifyEmail}
              color={isClicked ? '#4B0082' : 'inherit'}
              style={{ cursor: 'pointer' }}
            >
              this link
            </Link>{' '}
            to resend a verification email.
          </Typography>
        </Box>
      </Box>
    )
  )
}
