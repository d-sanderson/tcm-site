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
import { graphql, useStaticQuery } from 'gatsby'
import { steps, stepsLength } from './constants'
import { ageEstSimple } from './Stepper.utils'

export default function StepperComponent() {
  type MAXIMUM_STEP = 7

  type ComputeRange<
    N extends number,
    Result extends Array<unknown> = [],
    > =
    (Result['length'] extends N
      ? Result
      : ComputeRange<N, [...Result, Result['length']]>
    )

  type ActiveStep = ComputeRange<MAXIMUM_STEP>[number]

  const { graphCmsEstimateStd: weights } = useStaticQuery(graphql`
  {
    graphCmsEstimateStd {
      id
      intercept
      lowerBoundaryStd
      outlineStd
      standardError
      surfaceTextureStd
      topographyStd
      upperBoundStd
      densitySqRootStd
    }
  }
`)

  const [activeStep, setActiveStep] = useState<ActiveStep>(0)
  const [currentSliderValue, setCurrentSliderValue] = useState<number>(steps[0].marks[1].value)
  const [results, setResults] = useState<number[]>([])

  const handleNext = () => {
    setResults((prev) => (
      [...prev, currentSliderValue]
    ))
    if (activeStep === 6) return
    if (activeStep <= stepsLength) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1 as ActiveStep)
      setCurrentSliderValue(results[activeStep] || steps[activeStep].marks[1].value)
    }
  }

  const handleBack = () => {
    // set previous result to current slider value
    setCurrentSliderValue(results[activeStep - 1] || steps[activeStep].marks[1].value)
    // remove result
    setResults((prev) => {
      const next = prev.slice(0, -1)
      return next
    })
    setActiveStep((prevActiveStep) => prevActiveStep - 1 as ActiveStep)
  }

  let low
  let meanAge
  let high

  const handleReset = () => {
    setResults([])
    setActiveStep(0)
  }
  if (activeStep === stepsLength) {
    ({ low, meanAge, high } = ageEstSimple({
      density: results[0],
      ub: results[1],
      lb: results[2],
      outline: results[3],
      st: results[4],
      top: results[5],
      weights,
    }))
  }

  return (
    <>
      <Stepper
        sx={{ mt: [2, 4] }}
        activeStep={activeStep}
        orientation="vertical"
      >
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
                value={currentSliderValue}
                min={step.range.min}
                max={step.range.max}
                aria-label="Medium"
                valueLabelDisplay="on"
                marks={step.marks}
                onChange={(e) => {
                  if (typeof e.target.value === 'number') setCurrentSliderValue(e.target.value)
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
      <div>
        {activeStep === stepsLength && (
          <>
            <Typography variant="h6">Results</Typography>
              {results.map((el, i) => (
                <div key={i}>
                  <Typography variant="caption">
                    {steps[i].label}
                    :
                    {el}
                  </Typography>
                </div>
              ))}

            <Typography variant="h6">
              Lower Range:
              {' '}
              {low}
            </Typography>
            <Typography variant="h6">
              Mean Age:
              {' '}
              {meanAge}
            </Typography>
            <Typography variant="h6">
              Upper Range:
              {' '}
              {high}
            </Typography>
            <Button onClick={handleReset}>
              Reset
            </Button>
          </>
        )}
      </div>
    </>
  )
}
