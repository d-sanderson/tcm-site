import {
  Box, Switch, Typography, Container,
} from '@mui/material'
import { useStaticQuery, graphql } from 'gatsby'
import * as React from 'react'
import Copyright from '../components/Copyright'
import Stepper from '../components/Stepper'

export default function IndexPage() {
  const [mode, setMode] = React.useState(true)

  const {
    graphCmsSiteTitle: {
      siteTitle,
    },
    graphCmsAuthor: {
      name,
      title,
      // biography,
      // picture,
    },
  } = useStaticQuery(graphql`query AuthorQuery {
    graphCmsSiteTitle {
      siteTitle
    }
    graphCmsAuthor {
      id
      name
      title
      picture {
        id
        gatsbyImageData
      }
      biography
    }
  }
  
`)

  return (
    <Box sx={{ mx: [2, 20], mt: [4] }}>
      {/* Dark Mode? */}
      {/* <Box display="flex" justifyContent="flex-end">
        <Switch defaultChecked color="warning" onClick={() => setMode(!mode)} />
      </Box> */}
      <Typography variant="h3" fontSize={[18, 28]}>{siteTitle}</Typography>
      <Box sx={{ px: 2 }}>
        <Typography variant="h6">
          Author:
          {' '}
          {name}
        </Typography>
      </Box>
      <Stepper />
      <footer>
        <Container sx={{
          bottom: 0, position: 'absolute', mx: 'auto', my: 4,
        }}
        >
          <Copyright author={name} />
        </Container>
      </footer>
    </Box>
  )
}
