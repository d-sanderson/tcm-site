import {
  Box, Switch, Typography,
} from '@mui/material'
import * as React from 'react'
import Copyright from '../components/Copyright'
import Stepper from '../components/Stepper'

export default function IndexPage() {
  const [mode, setMode] = React.useState(true)

  return (
    <Box sx={{ mx: [2, 20], mt: [4] }}>
      <Box display="flex" justifyContent="flex-end">
        <Switch defaultChecked color="warning" onClick={() => setMode(!mode)} />
      </Box>
      <Typography variant="h3" fontSize={[18, 28]}>The Composite Method (TCM)</Typography>
      <Typography variant="h6">Author: Janamarie Truesdale</Typography>
      <Stepper />
      <Copyright />
    </Box>
  )
}
