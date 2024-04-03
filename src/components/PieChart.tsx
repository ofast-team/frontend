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
  numCTE: number
}

export default function PieChart({
  numAC,
  numWA,
  numTLE,
  numRTE,
  numCTE
}: PieChartProps) {
  const data = {
    labels: [
      'Accepted',
      'Wrong Answer',
      'Time-Limit Exceeded',
      'Runtime Error',
      'Compile-time Error',
    ],
    datasets: [
      {
        label: 'Judge Verdicts',
        data: [numAC, numWA, numTLE, numRTE, numCTE],
        backgroundColor: ['#1db924', '#FF5555', '#f4e458', '#6DB6C3', '#176B87'],
        borderWidth: 2,
      },
    ],
  }

  return (
    <Container sx={{ height: 280 }}>
      <Doughnut data={data} options={options} />
    </Container>
  )
}
