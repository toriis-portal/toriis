export const assetAmountToString = (assetsum: number) => {
  let modSum = ''
  let letter = ''
  if (assetsum > 1000000000) {
    letter = 'b'
    modSum = (assetsum / 1000000000).toString().substring(0, 4)
  } else if (assetsum > 1000000) {
    letter = 'm'
    modSum = (assetsum / 1000000).toString().substring(0, 4)
  } else if (assetsum > 1000) {
    letter = 'k'
    modSum = (assetsum / 1000).toString().substring(0, 4)
  } else {
    modSum = assetsum.toString().substring(0, 4)
  }
  modSum = modSum.charAt(3) === '.' ? modSum.slice(0, 3) : modSum
  return modSum + letter
}

export const envGradeToColor = (grade: string | undefined) => {
  if (grade === undefined || grade.length == 0) {
    return 'bg-lightGray'
  }

  switch (grade.charAt(0)) {
    case 'A':
      return 'bg-brightTeal'
    case 'B':
      return 'bg-clementine'
    case 'C':
      return 'bg-pumpkin'
    default:
      return 'bg-lightGray'
  }
}
