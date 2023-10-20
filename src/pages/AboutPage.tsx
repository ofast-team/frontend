import React from 'react'
import { Container, Typography, Avatar, Box } from '@mui/material'

interface Profile {
  name: string
  role: string
  bio: string
  photoUrl: string
}

// TODO(cam): add a contact info page for people to reach out to us and give feedback
// need a professional email for this
export default function AboutPage() {
  const aboutText = `
    O(fast) is created by students for students. We want to help you learn!
    We believe in learning by doing which is why we created a set of
    interactive tutorials to help students learn about data structures and
    algorithms for competitive programming applications.
    `

  // Sample data for profile information
  const profiles: Profile[] = [
    {
      name: 'Andrew Tate',
      role: 'Alpha Male',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.',
      photoUrl:
        'https://gibbonsgazette.org/wp-content/uploads/2022/10/Who-is-Andrew-Tate-e1667939153903-900x680.jpg',
    },
    {
      name: 'Tristan Tate',
      role: 'Sigma Male',
      bio: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
      photoUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR5r4MZXjXeKJgBTe66EDtTyDgiTeg2Oqo1pGl5Tpfv5YgxF3mleIEVjW4HZzQXLwhvcY&usqp=CAU',
    },
  ]

  return (
    <Container>
      <Typography variant="h3" gutterBottom color="primary">
        About
      </Typography>
      <Typography variant="body1" paragraph>
        {aboutText}
      </Typography>
      <Typography variant="h3" gutterBottom color="primary">
        Team
      </Typography>
      {profiles.map((profile, index) => (
        <Box key={index} mb={3} display="flex" alignItems="center">
          <Avatar
            alt={`${profile.name} Photo`}
            src={profile.photoUrl}
            sx={{ width: 100, height: 100, marginRight: 2 }}
          />
          <div>
            <Typography variant="h5" component="div">
              {profile.name}
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{
                fontStyle: 'italic',
              }}
            >
              {profile.role}
            </Typography>
            <Typography variant="body2">{profile.bio}</Typography>
          </div>
        </Box>
      ))}
    </Container>
  )
}
