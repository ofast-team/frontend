import React from 'react'

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'
//import type { ChartProps } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2'
import { Container } from '@mui/material'

ChartJS.register(ArcElement, Tooltip, Legend)

const options: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        font: {
          size: 18,
          family: 'Raleway, sans-serif',
        },
      },
    },
  },
}

export interface PieChartProps {
  numAC: number
  numWA: number
  numTLE: number
  numRTE: number
}

export default function PieChart({
  numAC,
  numWA,
  numTLE,
  numRTE,
}: PieChartProps) {
  console.log('numAC = ' + numAC)
  const data = {
    labels: [
      'Accepted',
      'Wrong Answer',
      'Time-Limit Exceeded',
      'Runtime Error',
    ],
    datasets: [
      {
        label: 'Judge Verdicts',
        data: [numAC, numWA, numTLE, numRTE],
        backgroundColor: ['#02b2af', '#2e96ff', '#c004dc', '#68049c'],
        borderWidth: 1,
      },
    ],
  }

  return (
    <Container sx={{ height: 300 }}>
      <Doughnut data={data} options={options} />
    </Container>
  )
}
