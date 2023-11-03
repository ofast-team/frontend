import { CheckBox } from '@mui/icons-material';
import { Button, Checkbox, Container, FormControl, FormControlLabel, FormGroup, List, ListItem, ListItemText, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useState } from 'react'

interface MCQBlockProps {
  question: string;
  answerOptions: string[];
  correctOptions: string[];
}

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
    <div>
      <Typography variant="h5" gutterBottom>
        {question}
      </Typography>
      {isMultiple ? checkDisplay() : radioDisplay()}
      <Button variant="contained" onClick={checkAnswers}>
        Submit
      </Button>
    </div>
  )
}
