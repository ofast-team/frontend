import { Box, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SubmitFields from '../components/SubmitPage/SubmitFields'

import SubmitCodeCard from '../components/SubmitPage/SubmitCodeCard'
import SubmitFolderCard from '../components/SubmitPage/SubmitFolderCard'
import { RootState } from '../store'
import { useSelector } from 'react-redux'
import RestrictedPage from './RestrictedPage'
import buildPath from '../path'
import { useNavigate } from 'react-router-dom'

export default function SubmitPage() {
  const navigate = useNavigate()

  const user = useSelector((state: RootState) => state.user)

  if (!user.verified) {
    return <RestrictedPage />
  }

  const [codeBase64, setCodeBase64] = useState<string>('')
  const [codeLang, setCodeLang] = useState<string>('')
  const [inputArray, setInputArray] = useState<string[]>([])
  const [outputArray, setOutputArray] = useState<string[]>([])

  useEffect(() => {
    if (inputArray.length > 0) {
      console.log('input')
      console.log(inputArray)
      Array.from(inputArray).forEach((item: string) => {
        console.log(atob(item))
      })
    }
    if (outputArray.length > 0) {
      console.log('output')
      console.log(outputArray)
      Array.from(outputArray).forEach((item: string) => {
        console.log(atob(item))
      })
    }
  }, [inputArray, outputArray])

  useEffect(() => {
    if (codeBase64) {
      console.log(codeLang)
      console.log(codeBase64)
      const text = atob(codeBase64)
      console.log(text)
    }
  }, [codeBase64])

  const fetchSubmit = () => {
    console.log('call submit')
    fetch(buildPath('/submit'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source_code: codeBase64,
        user_id: user.id,
        inputs: inputArray,
        outputs: outputArray,
        language_id: codeLang,
      }),
    })
      .then((res: Response) => {
        if (res.ok) {
          return res.json()
        }

        throw Error(res.statusText)
      })
      .then((data) => {
        console.log(data)
        const token = data.token
        navigate(`/submissions/${token}`)
      })
      .catch((error: Error) => {
        console.log('Submit Failed: ' + error.message)
      })
  }

  const handleSubmit = () => {
    fetchSubmit()
  }

  return (
    <Container sx={{ p: 15 }}>
      <Typography variant="h3" gutterBottom color="primary">
        Submit
      </Typography>

      <SubmitFields handleSubmit={handleSubmit} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'stretch',
          gap: '10px',
          mt: 2,
        }}
      >
        <SubmitCodeCard
          setCodeBase64={setCodeBase64}
          setCodeLang={setCodeLang}
        />
        <SubmitFolderCard
          setInputArray={setInputArray}
          setOutputArray={setOutputArray}
        />
      </Box>
    </Container>
  )
}
