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
  const intercept = 0.04
  const val1 = 4.90 * density // density squared
  const val2 = 1.12 * ub // upper boundary
  const val3 = 0.8 * lb // lower boundary
  const val4 = 0.71 * outline // outline score
  const val5 = 1.13 * st // surface texture score
  const val6 = 0.83 * top // Topographic score
  const age = intercept + val1 + val2 + val3 + val4 + val5 + val6
  return Math.round(age)
}
