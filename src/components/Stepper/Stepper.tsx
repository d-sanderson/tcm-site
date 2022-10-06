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
import densityScale from '../../../static/assets/density-scale.png'
import ubScale from '../../../static/assets/ub-scale.png'
import lbScale from '../../../static/assets/lb-scale.png'
import otlScale from '../../../static/assets/otl-scale.png'
import stScale from '../../../static/assets/st-scale.png'
import topoScale from '../../../static/assets/topo-scale.png'
import useWindowWidth from '../../pages/hooks/useWindowWidth'

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

  const { width } = useWindowWidth()
  const [activeStep, setActiveStep] = useState<ActiveStep>(0)
  const [currentSliderValue, setCurrentSliderValue] = useState<number>(steps[0].marks[1].value)
  const [results, setResults] = useState<number[]>([])
  const [dynamicWeights, setDynamicWeights] = useState(weights)

  const getImageForStep = (step: ActiveStep) => {
    switch (true) {
      case step === 0:
        return densityScale
      case step === 1:
        return ubScale
      case step === 2:
        return lbScale
      case step === 3:
        return otlScale
      case step === 4:
        return stScale
      case step === 5:
        return topoScale
      default:
        return null
    }
  }

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
      weights: dynamicWeights,
    }))
  }

  return (
    <>
      {
        isTest
        && (
          <div>
            <img src={rFormula} alt="" />

            <div>
              <label htmlFor="intercept">
                intercept
                <input
                  onChange={(e) => {
                    console.log(e.target)
                    handleWeightChange(e.target.id, e.target.value)
                  }}
                  type="text"
                  defaultValue={dynamicWeights.intercept}
                  id="intercept"
                />
              </label>
            </div>

            <div>
              <label htmlFor="densitySqRootStd">
                densitySqRootStd
                <input
                  onChange={(e) => handleWeightChange(e.target.id, e.target.value)}
                  type="text"
                  defaultValue={dynamicWeights.densitySqRootStd}
                  id="densitySqRootStd"
                />
              </label>
            </div>

            <div>
              <label htmlFor="topographyStd">
                topographyStd
                <input
                  onChange={(e) => handleWeightChange(e.target.id, e.target.value)}
                  type="text"
                  defaultValue={dynamicWeights.topographyStd}
                  id="topographyStd"
                />
              </label>
            </div>

            <div>
              <label htmlFor="upperBoundStd">
                upperBoundStd
                <input
                  onChange={(e) => handleWeightChange(e.target.id, e.target.value)}
                  type="text"
                  defaultValue={dynamicWeights.upperBoundStd}
                  id="upperBoundStd"
                />
              </label>
            </div>

            <div>
              <label htmlFor="lowerBoundaryStd">
                lowerBoundaryStd
                <input
                  onChange={(e) => handleWeightChange(e.target.id, e.target.value)}
                  type="text"
                  defaultValue={dynamicWeights.lowerBoundaryStd}
                  id="lowerBoundaryStd"
                />
              </label>
            </div>
            <div>

              <label htmlFor="outlineStd">
                outlineStd
                <input
                  onChange={(e) => handleWeightChange(e.target.id, e.target.value)}
                  type="text"
                  defaultValue={dynamicWeights.outlineStd}
                  id="outlineStd"
                />
              </label>
            </div>

            <div>
              <label htmlFor="surfaceTextureStd">
                surfaceTextureStd
                <input
                  onChange={(e) => handleWeightChange(e.target.id, e.target.value)}
                  type="text"
                  defaultValue={dynamicWeights.surfaceTextureStd}
                  id="surfaceTextureStd"
                />
              </label>
            </div>

            <div>
              <label htmlFor="standardError">
                standardError
                <input
                  onChange={(e) => handleWeightChange(e.target.id, e.target.value)}
                  type="text"
                  defaultValue={dynamicWeights.standardError}
                  id="standardError"
                />
              </label>
            </div>
          </div>
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
                  {activeStep <= 5 && (
                  <img
                    className="scale"
                    src={getImageForStep(activeStep)}
                    style={{ width: '100%' }}
                    alt={step.description}
                  />
                  )}
                  <Box sx={{ mx: width <  1000 ? 0 : activeStep === 0 ? 20 : 5 }}>
                    <Slider
                      size="small"
                      value={currentSliderValue}
                      {...activeStep === 0 ? { step: 5 } : {}}
                      min={step.range.min}
                      max={step.range.max}
                      aria-label="Medium"
                      valueLabelDisplay="on"
                      marks={step.marks}
                      onChange={(e) => {
                        if (typeof e.target.value === 'number') setCurrentSliderValue(e.target.value)
                      }}
                    />
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

export default StepperComponent
