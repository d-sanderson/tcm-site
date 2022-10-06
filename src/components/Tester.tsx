import React from 'react'
import rFormula from '../../static/assets/r-formula.png'

export function Tester({
  handleWeightChange, dynamicWeights,
}) {
  return (
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

export default Tester
