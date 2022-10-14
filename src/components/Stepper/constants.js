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
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },
  {
    value: 6,
    label: '6',
  },
  {
    value: 7,
    label: '7',
  },
  {
    value: 8,
    label: '8',
  },
  {
    value: 9,
    label: '9',
  },
  {
    value: 9,
    label: '9',
  },
  {
    value: 10,
    label: '10',
  },
  {
    value: 11,
    label: '11',
  },
  {
    value: 12,
    label: '12',
  },
  {
    value: 13,
    label: '13',
  },
  {
    value: 14,
    label: '14',
  },
  {
    value: 15,
    label: '15',
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
    value: 10,
    label: '10',
  },
]
export const steps = [
  {
    label: 'Select Density',
    description: 'Select Density',
    range: densityRange,
    marks: densityMarks,
  },
  {
    label: 'Upper Boundary (UB)',
    description: 'Upper Boundary',
    range: defaultRange,
    marks: defaultMarks,
  },
  {
    label: 'Lower Boundary (LB)',
    description: 'Lower Boundary',
    range: defaultRange,
    marks: defaultMarks,
  },
  {
    label: 'Outline (OTL)',
    description: 'Outline',
    range: defaultRange,
    marks: defaultMarks,
  },
  {
    label: 'Surface Texture (ST)',
    description: 'Surface Texture',
    range: defaultRange,
    marks: defaultMarks,
  },
  {
    label: 'Topography',
    description: 'Topography',
    range: defaultRange,
    marks: defaultMarks,
  },
]

export const stepsLength = steps.length
