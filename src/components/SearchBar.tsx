import React from 'react'

import { InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const verticallyCenter = {
  position: 'absolute',
  top: '50%',
  transform: 'translate(0%, -50%)',
}

interface SearchBarProps {
  value?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export default function SearchBar({
  value,
  onChange,
  onClick,
}: SearchBarProps) {
  return (
    <div
      style={{
        backgroundColor: '#f4f4f4',
        border: '1px solid',
        borderRadius: 40,
        height: 60,
        width: '100%',
        position: 'relative',
      }}
    >
      <SearchIcon sx={{ ...verticallyCenter, left: 20 }} fontSize="large" />
      <InputBase
        sx={{
          ...verticallyCenter,
          left: 70,
          width: 'calc(100% - 100px)',
        }}
        placeholder="Search"
        value={value}
        onChange={onChange}
        onClick={onClick}
      />
    </div>
  )
}
