import { CheckBox } from '@mui/icons-material';
import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, FormGroup, List, ListItem, ListItemText, Paper, Radio, RadioGroup, Typography, styled } from '@mui/material';
import React, { useState } from 'react'

interface MCQBlockProps {
  question: string;
  answerOptions: string[];
  correctOptions: string[];
}

const ShowAnswerBtn = styled(Button)({
  border: '1px solid #776E6E', 
  color: '#776E6E', 
  backgroundColor: 'transparent',
  padding: '8px',
  '&:hover': {
    backgroundColor: '#8E8D8D',
    borderColor: '#8E8D8D',
    color: '#000000',
  },
  '&:active': {
    backgroundColor: '#8E8D8D',
    borderColor: '#8E8D8D',
  },
})

export default function MCQBlock({question, answerOptions, correctOptions}: MCQBlockProps) {
  const isMultiple = correctOptions.length > 1;
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  const handleAnswerSelection = (option: string) => {
    // console.log("Selected ", {option});
    if (selectedAnswers.includes(option)) {
      setSelectedAnswers(selectedAnswers.filter((selectedOption) => selectedOption !== option));
    } else {
      setSelectedAnswers([...selectedAnswers, option]);
    }
  };

  const checkAnswers = () => {
    // console.log("Submit");
    // console.log({selectedAnswers});
    const isCorrect = [...correctOptions].every(option => selectedAnswers.includes(option));
    if (isCorrect) {
      alert("Correct!");
    } else {
      alert("Incorrect!");
    }

    // HAVE TO UPDATE HOW TO HANDLE AFTER SUBMIT
    setSelectedAnswers([]);
  };

  const showAnswers = () => {
    alert(`Correct Answer(s): ${correctOptions.join(', ')}`);
  };

  const checkDisplay = () => {
    return (
      <FormControl>
        <Typography variant="subtitle2" color="error">Select all that apply.</Typography>
        {answerOptions.map((option, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox 
                checked={selectedAnswers.includes(option)}
                onChange={() => handleAnswerSelection(option)}
                color="primary"
              />
            }
            label={option}
          />
        ))}
      </FormControl>
    );
  };

  const radioDisplay = () => {
    return (
      <FormControl component="fieldset">
        <RadioGroup
          value={selectedAnswers[0] || ""}
          onChange={(event) => handleAnswerSelection(event.target.value)}
        >
          {answerOptions.map((option, index) => (
            <FormControlLabel
            key={index}
            value={option}
            control={<Radio color="primary"/>}
            label={option}
          />
          ))}
        </RadioGroup>
      </FormControl>
    );
  };

  return (
    <Paper sx={{border: '1px solid #000', my: 2}}>
      <Typography 
        variant="h4"
        sx={{backgroundColor: '#6DB6C3', color: '#000', p: 2, textAlign: 'left'}}
      >
        Multiple Choice Question
      </Typography>
      <Box sx={{p: 3}}>
        <Typography variant="h6" gutterBottom>
          {question}
        </Typography>
        {isMultiple ? checkDisplay() : radioDisplay()}
        <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 2}}>
          <ShowAnswerBtn onClick={showAnswers}>
            Show Answer
          </ShowAnswerBtn>
          <Button variant="contained" onClick={checkAnswers}>
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}
