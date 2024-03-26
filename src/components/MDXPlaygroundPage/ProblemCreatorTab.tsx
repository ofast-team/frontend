import React from 'react'
import {
  Container,
  Button,
  Box,
  TextField,
  Typography,
  Divider,
} from '@mui/material'

import { Problem } from '../../objects/Problems'
import ProblemBlock from '../ProblemPage/ProblemBlock'

export default function ProblemCreatorTab() {
  const [problemData, setProblemData] = React.useState<Problem>({
    problemID: '',
    title: '',
    timeLimit: 1,
    memoryLimit: 1024,
    author: '',
    source: '',
    text: '',
    problem: '',
    input: '',
    output: '',
    sampleData: [],
    tags: [''],
    resources: [],
  })

  const addSampleTestCase = () => {
    setProblemData((curProblemData) => {
      const newSampleData = [...curProblemData.sampleData]
      newSampleData.push({
        input: '',
        output: '',
      })
      return {
        ...curProblemData,
        sampleData: newSampleData,
      }
    })
  }

  const addTag = () => {
    setProblemData((curProblemData) => {
      const newTags = [...curProblemData.tags]
      newTags.push('')
      return {
        ...curProblemData,
        tags: newTags,
      }
    })
  }

  const addResource = () => {
    setProblemData((curProblemData) => {
      const newResources = [...curProblemData.resources]
      newResources.push({
        name: '',
        url: '',
      })
      return {
        ...curProblemData,
        resources: newResources,
      }
    })
  }

  const removeItem = (key: string) => {
    setProblemData((curProblemData) => {
      const newEntries = curProblemData[key].slice(0, -1)
      return {
        ...curProblemData,
        [key]: newEntries,
      }
    })
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mt: '20px' }}>
        Metadata
      </Typography>

      <TextField
        placeholder="Problem ID"
        variant="standard"
        value={problemData.problemID}
        onChange={(e) =>
          setProblemData((curProblemData) => {
            return {
              ...curProblemData,
              problemID: e.target.value,
            }
          })
        }
        sx={{ mt: '25px' }}
      />

      <TextField
        placeholder="Problem Title"
        variant="standard"
        value={problemData.title}
        onChange={(e) =>
          setProblemData((curProblemData) => {
            return {
              ...curProblemData,
              title: e.target.value,
            }
          })
        }
        sx={{ mt: '25px', ml: '10px' }}
      />

      <br />

      <TextField
        placeholder="Time Limit (seconds)"
        variant="standard"
        value={problemData.timeLimit}
        onChange={(e) =>
          setProblemData((curProblemData) => {
            return {
              ...curProblemData,
              timeLimit: parseFloat(e.target.value),
            }
          })
        }
        sx={{ mt: '25px' }}
      />

      <TextField
        placeholder="Memory Limit (Megabytes)"
        variant="standard"
        value={problemData.memoryLimit}
        onChange={(e) =>
          setProblemData((curProblemData) => {
            return {
              ...curProblemData,
              memoryLimit: parseFloat(e.target.value),
            }
          })
        }
        sx={{ mt: '25px', ml: '10px' }}
      />

      <br />

      <TextField
        placeholder="Author"
        variant="standard"
        value={problemData.author}
        onChange={(e) =>
          setProblemData((curProblemData) => {
            return {
              ...curProblemData,
              author: e.target.value,
            }
          })
        }
        sx={{ mt: '25px' }}
      />

      <TextField
        placeholder="Source"
        variant="standard"
        value={problemData.source}
        onChange={(e) =>
          setProblemData((curProblemData) => {
            return {
              ...curProblemData,
              source: e.target.value,
            }
          })
        }
        sx={{ my: '25px', ml: '10px' }}
      />

      <br />

      {problemData.tags.map((tag, index) => (
        <TextField
          key={index}
          placeholder="Tag Name"
          variant="standard"
          value={tag}
          onChange={(e) =>
            setProblemData((curProblemData) => {
              const newTags = [...curProblemData.tags]
              newTags[index] = e.target.value
              return {
                ...curProblemData,
                tags: newTags,
              }
            })
          }
          sx={{ mt: '25px', mr: '10px' }}
        />
      ))}

      <br />
      <br />
      <Button onClick={addTag}>Add Tag</Button>
      <Button onClick={() => removeItem('tags')}>Remove Tag</Button>

      {problemData.resources.map((resource, index) => (
        <Box key={index}>
          <TextField
            key={index}
            placeholder="Resource Name"
            variant="standard"
            value={resource.name}
            onChange={(e) =>
              setProblemData((curProblemData) => {
                const newResources = [...curProblemData.resources]
                newResources[index] = {
                  name: e.target.value,
                  url: resource.url,
                }
                return {
                  ...curProblemData,
                  resources: newResources,
                }
              })
            }
            sx={{ mt: '25px' }}
          />
          <TextField
            key={index}
            placeholder="Resource Link"
            variant="standard"
            value={resource.url}
            onChange={(e) =>
              setProblemData((curProblemData) => {
                const newResources = [...curProblemData.resources]
                newResources[index] = {
                  name: resource.name,
                  url: e.target.value,
                }
                return {
                  ...curProblemData,
                  resources: newResources,
                }
              })
            }
            sx={{ mt: '25px', ml: '10px' }}
          />
        </Box>
      ))}

      <br />
      <Button onClick={addResource}>Add Resource</Button>
      <Button onClick={() => removeItem('resources')}>Remove Resource</Button>

      <Typography variant="h4" sx={{ mt: '20px' }}>
        Problem Body
      </Typography>

      <TextField
        placeholder="Text"
        multiline
        value={problemData.text}
        fullWidth
        onChange={(e) =>
          setProblemData((curProblemData) => {
            return {
              ...curProblemData,
              text: e.target.value,
            }
          })
        }
        sx={{ mt: '25px', display: 'block' }}
      />

      <TextField
        placeholder="Problem"
        multiline
        fullWidth
        value={problemData.problem}
        onChange={(e) =>
          setProblemData((curProblemData) => {
            return {
              ...curProblemData,
              problem: e.target.value,
            }
          })
        }
        sx={{ mt: '25px', display: 'block' }}
      />

      <TextField
        placeholder="Input Specifications"
        multiline
        fullWidth
        value={problemData.input}
        onChange={(e) =>
          setProblemData((curProblemData) => {
            return {
              ...curProblemData,
              input: e.target.value,
            }
          })
        }
        sx={{ mt: '25px', display: 'block' }}
      />

      <TextField
        placeholder="Output Specifications"
        multiline
        fullWidth
        value={problemData.output}
        onChange={(e) =>
          setProblemData((curProblemData) => {
            return {
              ...curProblemData,
              output: e.target.value,
            }
          })
        }
        sx={{ mt: '25px', display: 'block' }}
      />

      <Typography variant="h4" sx={{ mt: '20px' }}>
        Sample Data
      </Typography>

      {problemData.sampleData.map((sample, index) => (
        <Box
          key={index}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <TextField
            placeholder="Sample Input"
            multiline
            value={sample.input}
            onChange={(e) =>
              setProblemData((curProblemData) => {
                const newSampleData = [...curProblemData.sampleData]
                newSampleData[index] = {
                  input: e.target.value,
                  output: sample.output,
                }
                return {
                  ...curProblemData,
                  sampleData: newSampleData,
                }
              })
            }
            sx={{ mt: '25px', width: '49%' }}
          />
          <TextField
            placeholder="Sample Output"
            multiline
            value={sample.output}
            onChange={(e) =>
              setProblemData((curProblemData) => {
                const newSampleData = [...curProblemData.sampleData]
                newSampleData[index] = {
                  input: sample.input,
                  output: e.target.value,
                }
                return {
                  ...curProblemData,
                  sampleData: newSampleData,
                }
              })
            }
            sx={{ mt: '25px', width: '49%' }}
          />
        </Box>
      ))}

      <Button onClick={addSampleTestCase} sx={{ mt: '10px' }}>
        Add Sample Test Case
      </Button>

      <Button onClick={() => removeItem('sampleData')} sx={{ mt: '10px' }}>
        Remove Sample Test Case
      </Button>

      <Divider sx={{ my: '20px' }} />

      <Container>
        <ProblemBlock problem={problemData} />
      </Container>
    </Box>
  )
}
