/* eslint-disable import/prefer-default-export */

export const ageEstSimple = ({
  density, ub, lb, outline, st, top,
}: {
    density: number,
    ub: number,
    lb: number,
    outline: number,
    st: number,
    top: number,
 }) => {
  // densitySquared = density * density
  const intercept = -1.9948
  const densitySquared = Math.sqrt(density)

  const standardError = 5.661
  const standardErrorDoubled = standardError * 2
  const val1 = 3.01 * densitySquared // density squared
  const val2 = 0.92 * ub // upper boundary
  const val3 = 0.46 * lb // lower boundary
  const val4 = 1.13 * outline // outline score
  const val5 = 1.18 * st // surface texture score
  const val6 = 1.38 * top // Topographic score
  const age = intercept + val1 + val2 + val3 + val4 + val5 + val6
  const low = (age - standardErrorDoubled).toFixed(2)
  const high = (age + standardErrorDoubled).toFixed(2)
  const meanAge = age.toFixed(2)
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