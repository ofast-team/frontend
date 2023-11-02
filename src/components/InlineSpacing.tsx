import React from 'react'

interface SpacingProps {
  spacing: number
}

export default function InlineSpacing({ spacing }: SpacingProps) {
  return <div style={{ display: 'inline', marginLeft: spacing }} />
}
