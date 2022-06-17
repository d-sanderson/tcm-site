import { Box, Typography } from '@mui/material'
import * as React from 'react'
import Copyright from '../components/Copyright'
import Stepper from '../components/Stepper'

export default function VerticalLinearStepper() {
  return (
    <Box sx={{ mx: [2, 20], mt: [4] }}>
      <Typography variant="h3" fontSize={[18, 28]}>The Composite Method (TCM)</Typography>
      <Typography variant="h6">Author: Janamaria Truesdale</Typography>
      <Stepper />
      <Copyright />
    </Box>
  )
}
