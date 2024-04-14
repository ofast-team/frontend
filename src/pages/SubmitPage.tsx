import { Box, Container, Dialog, Typography } from '@mui/material'
import React, { useState } from 'react'
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
  const [errorText, setErrorText] = useState<string>('')

  if (!user.verified) {
    return <RestrictedPage />
  }

  const [codeBase64, setCodeBase64] = useState<string>('')
  const [codeLang, setCodeLang] = useState<string>('')
  const [inputArray, setInputArray] = useState<string[]>([])
  const [outputArray, setOutputArray] = useState<string[]>([])
  const [timeLimit, setTimeLimit] = useState<number>(1)
  const [memoryLimit, setMemoryLimit] = useState<number>(1024)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const fetchSubmit = () => {
    setIsSubmitting(true)
    setErrorText('')
    if (!codeBase64 || !codeLang || !inputArray.length || !outputArray.length) {
      setErrorText('Upload code file and test folder!')
      setIsSubmitting(false)
      return
    }

    fetch(buildPath('/submit'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source_code: codeBase64,
        uid: user.id,
        inputs: inputArray,
        outputs: outputArray,
        language_id: codeLang,
        time_limit: timeLimit,
        memory_limit: memoryLimit,
      }),
    })
      .then((res: Response) => {
        if (res.ok) {
          return res.json()
        }

        throw Error(res.statusText)
      })
      .then((data) => {
        setIsSubmitting(false)
        const token = data.token
        navigate(`/submissions/${token}`)
      })
      .catch((error: Error) => {
        setIsSubmitting(false)
        setErrorText(error.message)
      })
  }

  return (
    <Container sx={{ p: 15 }}>
      <Typography variant="h3" gutterBottom color="primary">
        Submit
      </Typography>

      <SubmitFields
        timeLimit={timeLimit}
        memoryLimit={memoryLimit}
        setTimeLimit={setTimeLimit}
        setMemoryLimit={setMemoryLimit}
        handleSubmit={fetchSubmit}
        isSubmitting={isSubmitting}
      />

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

      <Dialog
        open={!!errorText}
        onClose={() => {
          setErrorText('')
        }}
        sx={{ borderRadius: '15px' }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: '30px',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Submission Error
          </Typography>
          <Typography variant="body1" color="error">
            {errorText}
          </Typography>
        </Box>
      </Dialog>
    </Container>
  )
}
