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
  status: string
  title: string
  tags: React.JSX.Element[]
}

function createData(status: string, title: string, tags: string[]): Data {
  const tagChips = tags.map((tag) => <Chip label={tag} />)
  return { status, title, tags: tagChips }
}

const data = [
  createData('solved', 'Problem A', ['Tag 1', 'Tag 2']),
  createData('wrong', 'Problem B', ['Tag 2']),
  createData('unsolved', 'Problem C', ['Tag 1', 'Tag 2', 'Tag 3']),
  createData('solved', 'Problem D', ['Tag 1']),
  createData('wrong', 'Problem E', ['Tag 2']),
  createData('unsolved', 'Problem F', ['Tag 3']),
  createData('solved', 'Problem G', ['Tag 1', 'Tag 3']),
  createData('wrong', 'Problem H', ['Tag 2']),
  createData('unsolved', 'Problem I', ['Tag 3']),
  createData('solved', 'Problem J', ['Tag 1']),
  createData('wrong', 'Problem H', ['Tag 2']),
  createData('unsolved', 'Problem I', ['Tag 3']),
  createData('solved', 'Problem J', ['Tag 1']),
  createData('wrong', 'Problem K', ['Tag 1']),
  createData('unsolved', 'Problem L', ['Tag 1']),
  createData('solved', 'Problem M', ['Tag 1']),
  createData('wrong', 'Problem N', ['Tag 1']),
  createData('unsolved', 'Problem O', ['Tag 1']),
  createData('solved', 'Problem P', ['Tag 1']),
  createData('wrong', 'Problem Q', ['Tag 1']),
  createData('unsolved', 'Problem R', ['Tag 1']),
  createData('solved', 'Problem S', ['Tag 1']),
  createData('wrong', 'Problem T', ['Tag 1']),
]

const getTableValue = (
  columnID: string,
  data: string | React.JSX.Element[],
) => {
  if (columnID === 'tags' && data.constructor === Array) {
    return data.map((chip, i) => {
      return (
        <span key={i}>
          {chip}
          <InlineSpacing spacing={8} />
        </span>
      )
    })
  }

  if (columnID === 'status' && typeof data === 'string') {
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
          backgroundColor: statusToColor[data],
          borderRadius: '50%',
        }}
      />
    )
  }

  return data
}

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(1)
  const rowsPerPage = 10

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ height: 720 }}>
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
              .map((row) => {
                return (
                  <TableRow hover key={row.title}>
                    {columns.map((column) => {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {getTableValue(column.id, row[column.id])}
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
