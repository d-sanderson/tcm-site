export const defaultRange = {
  min: 3,
  max: 16,
}

export const densityRange = {
  min: 0,
  max: 10,
}

export const defaultMarks = [
  {
    value: 3,
    label: '3',
  },
  {
    value: 9,
    label: '9',
  },
  {
    value: 16,
    label: '16',
  },
]

export const densityMarks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 5,
    label: '5',
  },
  {
    value: 16,
    label: '10',
  },
]
export const steps = [
  {
    label: 'Select Density',
    description: 'Select Density Step',
    range: densityRange,
    marks: densityMarks,
  },
  {
    label: 'Upper Boundary',
    description: 'Upper Boundary Step',
    range: defaultRange,
    marks: defaultMarks,
  },
  {
    label: 'Lower Boundary',
    description: 'Lower Boundary Step',
    range: defaultRange,
    marks: defaultMarks,
  },
  {
    label: 'Outline',
    description: 'Outline Step',
    range: defaultRange,
    marks: defaultMarks,
  },
  {
    label: 'Surface Texture',
    description: 'Surface Texture Step',
    range: defaultRange,
    marks: defaultMarks,
  },
]

export const stepsLength = steps.length
