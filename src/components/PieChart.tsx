import React from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from "chart.js";
//import type { ChartProps } from 'react-chartjs-2';
import { Doughnut } from "react-chartjs-2";
import { Container } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend)

const data = {
    labels: ['Accepted', 'Wrong Answer', 'Time-Limit Exceeded', 'Runtime Error'],
    datasets: [
      {
        label: 'Judge Verdicts',
        data: [3, 8, 5, 2],
        backgroundColor: [
          '#02b2af',
          '#2e96ff',
          '#c004dc',
          '#68049c',
        ],
        borderWidth: 1,
      },
    ],
}

const options : ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'right',
            labels: {
                font: {
                    size: 20,
                    family: 'Raleway, sans-serif'
                }
            },
        }
    },
}

export default function PieChart() {

    return (
        <Container sx = {{height: 250}}>
            <Doughnut data={data} options={options}/>
        </Container>
    )
    
}