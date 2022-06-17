import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Button from '@mui/material/Button'
import Slider from '@mui/material/Slider'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

const defaultRange = {
  min: 3,
  max: 16,
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const densityRange = {
  min: 0,
  max: 10,
}
const steps = [
  {
    label: 'Select Density',
    description: `Select Density Step`,
    range: densityRange,
  },
  {
    label: 'Upper Boundary',
    description: 'Upper Boundary Step',
    range: defaultRange,
  },
  {
    label: 'Lower Boundary',
    description: `Lower Boundary Step`,
    range: defaultRange,
  },
  {
    label: 'Outline',
    description: `Outline Step`,
    range: defaultRange,
  },
  {
    label: 'Surface Texture',
    description: `Surface Texture Step`,
    range: defaultRange,
  },
]

const stepsLength = steps.length

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <>
      <Box sx={{ mx: [2, 20] }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Item>
            <h1>The Composite Method (TCM)</h1>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <h1>Author: Janamaria Truesdale</h1>
          </Item>
        </Grid>
      </Grid>
        <Stepper sx={{ mt: [2, 8] }} activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === stepsLength - 1 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                <Typography variant="caption">
                  Min: {step.range.min} | Max: {step.range.max}
                </Typography>
                <Slider
                  size="large"
                  defaultValue={70}
                  min={step.range.min}
                  max={step.range.max}
                  aria-label="Large"
                  valueLabelDisplay="auto"
                />
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === stepsLength - 1 ? 'Calculate' : 'Next'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        <Paper square elevation={0} sx={{ p: 3 }}>
          {activeStep === stepsLength && (
            <>
              <Typography>Result here</Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
              </Button>
            </>
          )}
        </Paper>
      </Box>
    </>
  )
}
