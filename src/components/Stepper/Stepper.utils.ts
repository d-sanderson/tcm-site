/* eslint-disable import/prefer-default-export */

export const ageEstSimple = ({
  density,
  ub,
  lb,
  outline,
  st,
  top,
  weights,
}: {
  density: number
  ub: number
  lb: number
  outline: number
  st: number
  top: number
  weights: {
    id: string
    intercept: number
    lowerBoundaryStd: number
    outlineStd: number
    standardError: number
    surfaceTextureStd: number
    topographyStd: number
    upperBoundStd: number
    densitySqRootStd: number
  }
  // Todo: add gender?
}) => {
  // Intercept is different for different versions of this formula
  const intercept = weights.intercept || -1.9948

  const densitySqRoot = Math.sqrt(density)
  // round standard error to nearest year?
  const standardError = Math.round(5.661)
  const standardErrorDoubled = standardError * 2

  if (weights.intercept
    && weights.densitySqRootStd
    && weights.upperBoundStd
    && weights.lowerBoundaryStd
    && weights.outlineStd
    && weights.surfaceTextureStd
    && weights.topographyStd) { console.log('using weights from cms!') }

  const age = Math.round(
    intercept
      + (weights.densitySqRootStd || 3.0105) * densitySqRoot // density square root
      + (weights.upperBoundStd || 0.924) * ub // upper boundary
      + (weights.lowerBoundaryStd || 0.4585) * lb // lower boundary
      + (weights.outlineStd || 1.1332) * outline // outline score
      + (weights.surfaceTextureStd || 1.1789) * st // surface texture score
      + (weights.topographyStd || 1.3723) * top,
  ) // Topographic score
  const low = age - standardErrorDoubled
  const high = age + standardErrorDoubled
  const meanAge = age
  return { low, meanAge, high }
}
// def age_est_simple(den_sq, ub, lb, outline, st, top):
//     """
//     Age Estimation Method 1:
//     Calculates age based on main six parameters as measured on pelvis.
//     Calculation based on linear regression analysis of entire JT data set.

//     Args:
//         den_sq (float) : Density Squared value from analysis.
//         ub (float) : Upper Boundary score.
//         lb (float): Lower Boundary score.
//         outline (float) : Outline score.
//         st (float) : Surface Texture score.
//         top (float) : Topography score.
//     Returns:
//         age (float) : Estimated Age of Individual based on measurements.
//     """
//     intercept = 0.04
//     val1 = 4.90 * den_sq  # density squared
//     val2 = 1.12 * ub  # upper boundary
//     val3 = 0.8 * lb  # lower boundary
//     val4 = 0.71 * outline  # outline score
//     val5 = 1.13 * st  # surface texture score
//     val6 = 0.83 * top  # Topographic score
//     age = intercept + val1 + val2 + val3 + val4 + val5 + val6
//     return round(age, ROUNDING)
