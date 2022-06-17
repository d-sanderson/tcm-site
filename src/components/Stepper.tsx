import * as React from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Button from '@mui/material/Button'
import Slider from '@mui/material/Slider'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { steps, stepsLength } from '../constants'

export default function StepperComponent() {
  const [activeStep, setActiveStep] = useState(0)

  const [currentSliderValue, setCurrentSliderValue] = useState<number>(5)
  const [results, setResults] = useState<number[]>([])

  const handleNext = () => {
    setResults((prev) => (
      [...prev, currentSliderValue]
    ))
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setCurrentSliderValue(results[activeStep] || steps[activeStep].marks[1].value)
  }

  const handleBack = () => {
    // set previous result to current slider value
    setCurrentSliderValue(results[activeStep - 1] || steps[activeStep].marks[1].value)
    // remove result
    setResults((prev) => {
      const next = prev.slice(0, -1)
      return next
    })
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setResults([])
    setActiveStep(0)
  }

  const meanAge = results.reduce((acc, curr) => acc + curr, 0)
  return (
    <>
      <Stepper sx={{ mt: [2, 4] }} activeStep={activeStep} orientation="vertical">
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
              <Typography variant="caption" sx={{ mx: 2 }}>{results[index] && results[index]}</Typography>
            </StepLabel>

            <StepContent>
              <Typography>{step.description}</Typography>
              <Typography variant="caption">
                Min:
                {' '}
                {step.range.min}
                {' '}
                | Max:
                {' '}
                {step.range.max}
              </Typography>
              <Slider
                size="medium"
                defaultValue={currentSliderValue}
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
      <Paper elevation={0} sx={{ py: 3 }}>
        {activeStep === stepsLength && (
          <>
            <Typography variant="overline">Results</Typography>
            <Typography>
              {results.map((el, i) => (
                <Typography variant="overline">
                  {steps[i].label}
                  :
                  {el}
                </Typography>
              ))}

            </Typography>
            <Typography variant="h6">
              Mean Age:
              {' '}
              {meanAge}
            </Typography>
            <Button onClick={handleReset}>
              Reset
            </Button>
          </>
        )}
      </Paper>
    </>

  )
}
