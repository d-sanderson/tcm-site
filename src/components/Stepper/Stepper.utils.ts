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
  const intercept = 0.04
  const val1 = 4.90 * Math.sqrt(density) // density squared
  const val2 = 1.12 * ub // upper boundary
  const val3 = 0.8 * lb // lower boundary
  const val4 = 0.71 * outline // outline score
  const val5 = 1.13 * st // surface texture score
  const val6 = 0.83 * top // Topographic score
  const age = intercept + val1 + val2 + val3 + val4 + val5 + val6
  return Math.ceil(age)
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