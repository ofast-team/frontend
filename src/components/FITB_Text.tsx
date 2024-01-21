import React from 'react'
import MDX from './MDXRenderer'

interface FITB_TextProps {
  text: string
}

export default function FITB_Text({ text }: FITB_TextProps) {
  return <MDX value={text} />
}
