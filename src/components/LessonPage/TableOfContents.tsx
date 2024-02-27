import React from 'react'
import { TOCHeader } from '../../mdx-utils/get-headers'
import { Box } from '@mui/material'
import { useLocation, Link } from 'react-router-dom'

export default function TableOfContents({ headers }: { headers: TOCHeader[] }) {
  const location = useLocation()
  const path = location.pathname
  const lastSlash = path.lastIndexOf('/')
  const lessonPath = path.slice(0, lastSlash)
  const filenameWithoutExt = path.slice(lastSlash + 1)

  if (headers.length === 0) {
    return <></>
  }

  const buildLessonURL = (filenameWithoutExt: string, slug: string) => {
    return `${lessonPath}/${filenameWithoutExt}#${slug}`
  }

  return (
    <Box sx={{ pl: '20px' }}>
      <h3 style={{ marginBottom: 0 }}>Table of Contents</h3>
      {headers.map((header, i) => (
        <Box
          key={i}
          style={{
            marginLeft: `${header.depth * 20}px`,
          }}
        >
          {filenameWithoutExt === header.filenameWithoutExt ? (
            <a className="tocHeader" href={`#${header.slug}`}>
              {header.value}
            </a>
          ) : (
            <Link
              className="tocHeader"
              to={buildLessonURL(header.filenameWithoutExt, header.slug)}
            >
              {header.value}
            </Link>
          )}
        </Box>
      ))}
    </Box>
  )
}
