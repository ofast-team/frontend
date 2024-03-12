export type Verdict = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14

export const verdictInfo = {
  1: {
    description: 'In Queue',
    color: 'grey',
  },
  2: {
    description: 'Processing',
    color: 'grey',
  },
  3: {
    description: 'Accepted',
    color: 'green',
  },
  4: {
    description: 'Wrong Answer',
    color: 'orange',
  },
  5: {
    description: 'Time Limit Exceeded',
    color: 'orange',
  },
  6: {
    description: 'Compilation Error',
    color: 'orange',
  },
  7: {
    description: 'Runtime Error',
    color: 'orange',
  },
  8: {
    description: 'Runtime Error',
    color: 'orange',
  },
  9: {
    description: 'Runtime Error',
    color: 'orange',
  },
  10: {
    description: 'Runtime Error',
    color: 'orange',
  },
  11: {
    description: 'Runtime Error',
    color: 'orange',
  },
  12: {
    description: 'Runtime Error',
    color: 'orange',
  },
  13: {
    description: 'Internal Error',
    color: 'orange',
  },
  14: {
    description: 'Exec Format Error',
    color: 'orange',
  },
}
