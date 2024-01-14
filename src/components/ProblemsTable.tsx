import * as React from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Pagination,
  TableRow,
  Box,
  Chip,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'

import InlineSpacing from '../components/InlineSpacing'

interface Column {
  id: 'status' | 'title' | 'tags'
  label: string
  minWidth?: number
  align?: 'right'
}

const columns: readonly Column[] = [
  {
    id: 'status',
    label: 'Status',
    minWidth: 50,
  },
  {
    id: 'title',
    label: 'Title',
    minWidth: 170,
  },
  {
    id: 'tags',
    label: 'Tags',
    minWidth: 170,
    align: 'right',
  },
]

interface Data {
  problemID: string
  status: string
  title: string
  tags: string[]
}

function createData(
  problemID: string,
  status: string,
  title: string,
  tags: string[],
): Data {
  return { problemID, status, title, tags }
}

const data = [
  createData('twosum', 'solved', 'Problem A', ['Tag 1', 'Tag 2']),
  createData('antarctica', 'wrong', 'Problem B', ['Tag 2']),
  createData('penguins', 'unsolved', 'Problem C', ['Tag 1', 'Tag 2', 'Tag 3']),
  createData('fishy', 'solved', 'Problem D', ['Tag 1']),
  createData('city', 'wrong', 'Problem E', ['Tag 2']),
  createData('treasure', 'unsolved', 'Problem F', ['Tag 3']),
  createData('recipe', 'solved', 'Problem G', ['Tag 1', 'Tag 3']),
  createData('twosum', 'wrong', 'Problem H', ['Tag 2']),
  createData('twosum', 'unsolved', 'Problem I', ['Tag 3']),
  createData('twosum', 'solved', 'Problem J', ['Tag 1']),
  createData('twosum', 'wrong', 'Problem H', ['Tag 2']),
  createData('twosum', 'unsolved', 'Problem I', ['Tag 3']),
  createData('twosum', 'solved', 'Problem J', ['Tag 1']),
  createData('twosum', 'wrong', 'Problem K', ['Tag 1']),
  createData('twosum', 'unsolved', 'Problem L', ['Tag 1']),
  createData('twosum', 'solved', 'Problem M', ['Tag 1']),
  createData('twosum', 'wrong', 'Problem N', ['Tag 1']),
  createData('twosum', 'unsolved', 'Problem O', ['Tag 1']),
  createData('twosum', 'solved', 'Problem P', ['Tag 1']),
  createData('twosum', 'wrong', 'Problem Q', ['Tag 1']),
  createData('twosum', 'unsolved', 'Problem R', ['Tag 1']),
  createData('twosum', 'solved', 'Problem S', ['Tag 1']),
  createData('twosum', 'wrong', 'Problem T', ['Tag 1']),
]

const getTableValue = (columnID: string, data: Data) => {
  if (columnID === 'tags') {
    return data[columnID].map((tag, i) => {
      return (
        <span key={i}>
          <Chip label={tag} />
          <InlineSpacing spacing={8} />
        </span>
      )
    })
  }

  if (columnID === 'status') {
    const statusToColor = {
      solved: 'green',
      wrong: 'red',
      unsolved: 'grey',
    }

    return (
      <div
        style={{
          height: 20,
          width: 20,
          backgroundColor: statusToColor[data.status],
          borderRadius: '50%',
        }}
      />
    )
  }

  if (columnID === 'title') {
    return (
      <Typography
        variant="body1"
        gutterBottom
        color="primary"
        component="span"
        sx={{ cursor: 'pointer' }}
      >
        <Link
          style={{ color: 'inherit', textDecoration: 'none' }}
          to={'/problem/' + data.problemID}
        >
          {data[columnID]}
        </Link>
      </Typography>
    )
  }

  return <></>
}

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(1)
  const rowsPerPage = 10

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  return (
    <Paper
      sx={{
        width: '100%',
        overflow: 'hidden',
        zIndex: 0,
        position: 'relative',
      }}
    >
      <TableContainer sx={{ height: 770 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <Typography variant="h5" gutterBottom color="primary">
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(
                (page - 1) * rowsPerPage,
                (page - 1) * rowsPerPage + rowsPerPage,
              )
              .map((row: Data) => {
                return (
                  <TableRow hover key={row.title}>
                    {columns.map((column) => {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {getTableValue(column.id, row)}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box m={2}>
        <Pagination
          color="primary"
          onChange={handleChangePage}
          page={page}
          count={Math.ceil(data.length / rowsPerPage)}
        />
      </Box>
    </Paper>
  )
}
