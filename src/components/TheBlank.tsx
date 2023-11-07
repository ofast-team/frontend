import {TextField} from '@mui/material'
import React, { useState } from 'react'

interface TheBlankProps {
    correctAnswer : string
    respond : boolean
}

export default function TheBlank({correctAnswer, respond} : TheBlankProps) {
    const [curAnswer, setCurAnswer] = useState('')

    return (
        <TextField error = {respond && curAnswer != correctAnswer} variant="standard" size = "small"
            onChange={(e) => !respond ? setCurAnswer(e.target.value) : {}} value = {curAnswer}
            sx = {{width: correctAnswer.length * 20 + 5, m: 1}}
            helperText = {respond ? (curAnswer != correctAnswer ? "Incorrect" : "Correct") : ""}>
        </TextField>
    )

}