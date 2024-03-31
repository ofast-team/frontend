import React, { useState, useEffect } from 'react'
import { Box, Typography, Stack, Button, Chip, Dialog } from '@mui/material'

import PersonIcon from '@mui/icons-material/Person'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

import Card from './ProblemBlockCard'

import buildPath from '../../path'
import { useNavigate } from 'react-router-dom'

import { Verdict, verdictInfo } from '../../utils/verdict'
import { Problem } from '../../objects/Problems'

interface Submission {
  submissionID: string
  verdict: Verdict
  time: Date
}

interface StatusProps {
  solved: boolean
}

function Status({ solved }: StatusProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <Box
        sx={{
          height: '30px',
          width: '30px',
          backgroundColor: solved ? 'green' : 'grey',
          borderRadius: '50%',
          display: 'inline-block',
          m: '5px',
        }}
      />
      <Box m="10px">
        <Typography gutterBottom color="primary" component="span" variant="h5">
          {solved ? 'Solved' : 'Not Solved'}
        </Typography>
      </Box>
    </Box>
  )
}

// TODO: (Stretch Goal) Add copy button for samples
export default function ProblemBlockCards({ problem }: { problem: Problem }) {
  const navigate = useNavigate()

  const user = useSelector((state: RootState) => state.user)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [solved, setSolved] = useState<boolean>(false)
  const [problemCodeFile, setProblemCodeFile] = useState<string>('')
  const [codeLang, setCodeLang] = useState<string>('')
  const [errorText, setErrorText] = useState<string>('')

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch(buildPath('/getSubmissions'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            problemIds: [problem.problemID],
            uid: user.id,
            isBrief: false,
          }),
        })
        const result = await response.json()

        // Only show the recent 5 submissions
        const resultSubmissions =
          result.submissionsPerProblem[0].submissions.slice(0, 5)

        const newSubmissions: Submission[] = resultSubmissions.map(
          (resultSubmission) => {
            return {
              submissionID: resultSubmission.submission_id,
              verdict: resultSubmission.verdict,
              time: new Date(resultSubmission.date.seconds * 1000),
            }
          },
        )

        setSolved(result.submissionsPerProblem[0].isAccepted)
        setSubmissions(newSubmissions)
      } catch (error) {
        console.error('Error fetching submissions')
      }
    }

    fetchSubmissions()
  }, [])

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          const fileExtension = file.name.split('.').pop()
          if (fileExtension) {
            let language = fileExtension.toLowerCase()
            if (language === 'cxx' || language === 'cc') language = 'cpp'

            const code = btoa(e.target.result.toString())
            setCodeLang(language)
            setProblemCodeFile(code)
          }
        }
      }
      reader.readAsText(file)
    }
  }

  const submitCode = () => {
    if (!problemCodeFile || !codeLang) {
      setErrorText('Please select a file to upload!')
      return
    }
    fetch(buildPath('/submit'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source_code: problemCodeFile,
        uid: user.id,
        language_id: codeLang,
        problem_id: problem.problemID,
      }),
    })
      .then((res: Response) => {
        if (res.ok) {
          return res.json()
        }

        throw Error(res.statusText)
      })
      .then((data) => {
        const token = data.token
        navigate(`/submissions/${token}`)
      })
      .catch((error: Error) => {
        setErrorText(error.message)
      })
  }

  return (
    <>
      <Stack>
        {user.signedIn && (
          <Card title="Status" style={{ marginBottom: '50px' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <Status solved={solved} />
            </Box>
          </Card>
        )}

        <Card
          title="Submit"
          style={{
            marginBottom: '50px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            {user.signedIn && user.verified ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <label htmlFor="problemCodeFile">
                  <input
                    id="problemCodeFile"
                    type="file"
                    accept=".c, .cpp, .cxx, .cc, .java, .py"
                    onChange={handleFileChange}
                  />
                </label>
                <Button variant="contained" onClick={submitCode}>
                  Submit
                </Button>
              </Box>
            ) : (
              <Box>
                {!user.signedIn ? (
                  <Button>
                    <Link
                      to={'/login'}
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      <Typography
                        color="primary"
                        variant="h5"
                        sx={{ fontSize: '1em' }}
                      >
                        Log in to submit
                      </Typography>
                    </Link>
                  </Button>
                ) : (
                  <Typography
                    color="primary"
                    variant="h5"
                    sx={{ fontSize: '1em' }}
                  >
                    Verify email to submit
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        </Card>

        {user.signedIn && submissions.length > 0 && (
          <Card
            title="Submissions"
            style={{
              marginBottom: '50px',
            }}
          >
            <Box
              className="tablebordergrey"
              sx={{
                padding: '10px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <table style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>
                      <Typography
                        color="primary"
                        variant="h5"
                        sx={{ fontSize: '1em' }}
                      >
                        Verdict
                      </Typography>
                    </th>
                    <th>
                      <Typography
                        color="primary"
                        variant="h5"
                        sx={{ fontSize: '1em' }}
                      >
                        Time
                      </Typography>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission, key) => (
                    <tr key={key}>
                      <td
                        style={{
                          textAlign: 'center',
                        }}
                      >
                        <Link
                          style={{ textDecoration: 'none' }}
                          to={`/submissions/${submission.submissionID}`}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              color: verdictInfo[submission.verdict].color,
                              fontSize: '1em',
                            }}
                          >
                            {verdictInfo[submission.verdict].description}
                          </Typography>
                        </Link>
                      </td>
                      <td
                        style={{
                          textAlign: 'center',
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: '1em',
                          }}
                        >
                          {submission.time.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                          <Box />
                          {submission.time.toLocaleTimeString()}
                        </Typography>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <Button>
                <Link
                  to={'/submissions?problem=' + problem.problemID}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  All Submissions
                </Link>
              </Button>
            </Box>
          </Card>
        )}
        {problem.tags && (
          <Card
            title="Tags"
            style={{
              marginBottom: '50px',
            }}
          >
            <Box sx={{ justifyContent: 'center', textAlign: 'center' }}>
              {problem.tags.map((tag, i) => (
                <Chip key={i} label={tag} sx={{ m: '5px' }} />
              ))}
            </Box>
          </Card>
        )}
        {problem.resources && (
          <Card title="Resources">
            <Box sx={{ justifyContent: 'center', textAlign: 'center' }}>
              {problem.resources.map((resource, i) => (
                <Box key={i} sx={{ mx: '5px', display: 'inline-block' }}>
                  <Link style={{ color: 'inherit' }} to={resource.url} replace>
                    <Typography
                      gutterBottom
                      color="primary"
                      component="span"
                      variant="body1"
                    >
                      {resource.name}
                    </Typography>
                  </Link>
                </Box>
              ))}
            </Box>
          </Card>
        )}
        {(problem.author || problem.source) && (
          <Card
            title="Source"
            style={{
              marginBottom: '50px',
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              gap={1}
              padding="0px 20px"
            >
              {problem.source && (
                <Box display={'flex'} alignItems={'center'} gap={1}>
                  <Box>
                    <EmojiEventsIcon
                      style={{
                        textAlign: 'center',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                      }}
                    ></EmojiEventsIcon>
                  </Box>
                  <Typography variant="body2" color="primary">
                    {problem.source}
                  </Typography>
                </Box>
              )}
              {problem.author && (
                <Box display={'flex'} alignItems={'center'} gap={1}>
                  <Box>
                    <PersonIcon style={{ textAlign: 'center' }}></PersonIcon>
                  </Box>
                  <Typography variant="body2" color="primary">
                    {problem.author}
                  </Typography>
                </Box>
              )}
            </Box>
          </Card>
        )}
      </Stack>
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
    </>
  )
}
