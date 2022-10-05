import {
  Box,
} from '@mui/material'
import * as React from 'react'
// import Copyright from '../components/Copyright'
import Stepper from '../components/Stepper/Stepper'

export default function IndexPage() {
  return (
    <Box sx={{ mx: [2, 20], mt: [4] }}>
      <Stepper isTest />
    </Box>
  )
}
