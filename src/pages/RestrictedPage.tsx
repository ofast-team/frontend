import { Card, Container, Typography } from '@mui/material'
import React from 'react'

export default function RestrictedPage() {
  return (
    <Container
      sx={{
        height: '100vh',
        p: 15,
      }}
    >
      <Card>
        <Typography textAlign={'center'} fontWeight={600} fontSize={32}>
          You may not use this feature until your email is verified.
        </Typography>
      </Card>
    </Container>
  )
}
