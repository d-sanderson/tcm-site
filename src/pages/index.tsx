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
import { steps, stepsLength } from '../constants'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0)
  
  const [currentSliderValue, setCurrentSliderValue] = React.useState<number>(5)
  const [results, setResults] = React.useState<number[]>([])
  
  const handleNext = () => {
    setResults(prev => (
      [ ...prev, currentSliderValue]
      ))    
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
    
  const handleBack = () => {
    // remove last result
    setResults(prev => {
        const next = prev.slice(0, -1)
        return next
      })
      setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }
    
    const handleReset = () => {
      setResults([])
      setActiveStep(0)
    }

    React.useEffect(() => {
      if(steps?.[activeStep]) {
        setCurrentSliderValue(steps[activeStep].marks[1].value)
      }
    }, [activeStep, setActiveStep])
    
    return (
      <>
      <Box sx={{ mx: [2, 20] }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Item variant="elevation">
            <h1>The Composite Method (TCM)</h1>
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
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
                  size="medium"
                  defaultValue={step.marks[1].value}
                  min={step.range.min}
                  max={step.range.max}
                  aria-label="Medium"
                  valueLabelDisplay="on"
                  marks={step.marks}
                  onChange={(event, value) => {
                    if (typeof value === 'number') setCurrentSliderValue(value)
                  }}
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
              <Typography>Results here</Typography>
              <Typography>{results.map(el => el)}</Typography>
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
