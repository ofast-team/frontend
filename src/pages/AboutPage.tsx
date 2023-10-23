import React from 'react'
import { Container, Typography, Avatar, Box } from '@mui/material'

interface Profile {
  name: string
  role: string
  bio: string
  photo: any
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

  const profiles: Profile[] = [
    {
      name: 'Asir Alam',
      role: 'Developer',
      bio: 'Asir is a member of the UCF Varsity Programming Team. For 3 years, Asir has trained for and competed at ICPC-level contests. He has also served as a judge for the UCF High School Programming Tournament. He completed two software engineering internships at Meta.',
      photo: require('../assets/asir_alam.jpg'),
    },
    {
      name: 'Cameron Custer',
      role: 'Developer',
      bio: 'Cameron is a member of the UCF Varsity Programming Team. He has competed in ICPC contests for the last two years in the Southeast U.S. Region. As apart of UCF Beacon (along with Tyler), he placed 3rd in the region.  He also served as a judge for the UCF High School Programming Tournament. Cameron has experience solving a variety of problems from USACO to ICPC to Codeforces.',
      photo: '',
    },
    {
      name: 'Blake Gassman',
      role: 'Project Manager',
      bio: 'Blake is the project manager for the O(fast) team. He competed with the UCF JV Programming Team for 2 years. Blake also served as Teaching Assistant for for 2 semesters, where he taught lectures on data structures and algorithms and evaluated programming submissions for hundreds of students. He completed a software engineering internship at Meta in 2022 and at Epic in 2023. After graduation, Blake is interested in becoming a full time developer in the medical sector.',
      photo: require('../assets/blake_gassman.jpg'),
    },
    {
      name: 'Tyler Marks',
      role: 'Developer',
      bio: 'Tyler is a member of the UCF Varsity Programming Team. He has competed in ICPC contests for the last three years in the Southeast U.S. Region. As apart of UCF Beacon (along with Cameron), he placed 3rd in the region.  He also served as a judge for the UCF High School Programming Tournament. In addition, Tyler served as a Teaching Assistant where he taught students about data structures and algorithms. He also tutored grade school students in mathematics for two years.',
      photo: '',
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
            src={profile.photo}
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
