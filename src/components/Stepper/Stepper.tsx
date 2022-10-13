import * as React from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Button from '@mui/material/Button'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import { graphql, useStaticQuery } from 'gatsby'
import { Grid } from '@mui/material'
import { steps, stepsLength } from './constants'
import { ageEstSimple } from './Stepper.utils'
import './Stepper.css'
import rFormula from '../../../static/assets/r-formula.png'
// SCALES
import densityScale from '../../../static/assets/density-scale.png'
import ubScale from '../../../static/assets/ub-scale.png'
import lbScale from '../../../static/assets/lb-scale.png'
import otlScale from '../../../static/assets/otl-scale.png'
import stScale from '../../../static/assets/st-scale.png'
import topoScale from '../../../static/assets/topo-scale.png'
// LOCATIONS
import ubLocation from '../../../static/assets/ub-location.png'
import lbLocation from '../../../static/assets/lb-location.png'
import otlLocation from '../../../static/assets/outline-location.png'
import stLocation from '../../../static/assets/st-location.png'
import topoLocation from '../../../static/assets/topo-location.png'
import useWindowWidth from '../../hooks/useWindowWidth'
import Tester from '../Tester'

interface Props {
  isTest: boolean
}

function StepperComponent({ isTest }: Props) {
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
  const [dynamicWeights, setDynamicWeights] = useState(weights)

  const images = [
    { scale: densityScale },
    {
      scale: ubScale, location: ubLocation,
    },
    {
      scale: lbScale, location: lbLocation,
    },
    {
      scale: otlScale, location: otlLocation,
    },
    {
      scale: stScale, location: stLocation,
    },
    {
      scale: topoScale, location: topoLocation,
    },
  ]
  const getImageForStep = (step: ActiveStep) => images[step]

  // TESTING ONLY
  const handleWeightChange = (id: string, value) => {
    console.log({ id, value })
    setDynamicWeights((prev) => ({
      ...prev,
      [id]: parseFloat(value),
    }))
  }

  const handleNext = () => {
    setResults((prev) => (
      [...prev, currentSliderValue]
    ))
    if (activeStep === 6) return
    if (activeStep <= stepsLength) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1 as ActiveStep)
      setCurrentSliderValue(results[activeStep] || 0)
    }
  }

  const handleBack = () => {
    // set previous result to current slider value
    setCurrentSliderValue(results[activeStep - 1] || 0)
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

  const width = typeof window !== 'undefined' && window.innerWidth

  if (activeStep === stepsLength) {
    ({ low, meanAge, high } = ageEstSimple({
      density: results[0],
      ub: results[1],
      lb: results[2],
      outline: results[3],
      st: results[4],
      top: results[5],
      weights: dynamicWeights,
    }))
  }

  return (
    <>
      {
        isTest
        && (
          <Tester handleWeightChange={handleWeightChange} dynamicWeights={dynamicWeights} />
        )
      }
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
              <Grid container>
                <Grid item xs={8}>
                  <Box sx={{
                    display: 'block',
                    '@media (min-width: 780px)': {
                      alignItems: 'center',
                      flexDirection: 'row',
                      display: 'flex',
                    },
                  }}
                  >
                    {activeStep <= 5
                    && <img style={{ height: '100%', marginRight: '40px', alignSelf: 'start' }} className="step-img" src={getImageForStep(activeStep).location} alt="" />}
                    <Box>
                      {activeStep <= 5 && (
                        <img
                          className="step-img"
                          src={getImageForStep(activeStep).scale}
                          alt={step.description}
                        />
                      )}
                      <Box sx={{
                        mx: 0,
                        '@media (min-width: 768px)': {
                          mx: 4,
                        },
                      }}
                      >
                        <Slider
                          size="medium"
                          value={currentSliderValue}
                          {...activeStep === 0 ? { step: 5 } : {}}
                          min={step.range.min}
                          max={step.range.max}
                          aria-label="Medium"
                          valueLabelDisplay="on"
                          marks={width > 768 ? step.marks : []}
                          onChange={(e) => {
                            if (typeof e.target.value === 'number') setCurrentSliderValue(e.target.value)
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
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
                </Grid>
              </Grid>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1, backgroundColor: '#62acb5' }}
                  >
                    {index === stepsLength - 1 ? 'Calculate' : 'Next'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1, color: 'white' }}
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
            {/* {results.map((el, i) => (
                <div key={i}>
                  <Typography variant="h6">
                    {steps[i].label}
                    :
                    {el}
                  </Typography>
                  {/* <img src={getImageForStep(i)?.location} alt="" />
                </div>
              ))} */}
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
            <Button
              onClick={handleReset}
            >
              Reset
            </Button>
          </>
        )}
      </div>
    </>
  )
}

export default StepperComponent
