export const sectorEnum = {
  FINANCIAL_SERVICES: 'Financial Services',
  INDUSTRIALS: 'Industrials',
  TECHNOLOGY: 'Technology',
  UTILITIES: 'Utilities',
  HEALTHCARE: 'Healthcare',
  CONSUMER_CYCLICAL: 'Consumer Cyclical',
  COMMUNICATION_SERVICES: 'Communication Services',
  ENERGY: 'Energy',
  CONSUMER_DEFENSIVE: 'Consumer Defensive',
  REAL_ESTATE: 'Real Estate',
  BASIC_MATERIALS: 'Basic Materials',
  NONE: 'None Specified',
}

export const envGradeEnum = {
  AAA: 'AAA',
  AA: 'AA',
  A: 'A',
  BBB: 'BBB',
  BB: 'BB',
  B: 'B',
  CCC: 'CCC',
}

// TODO: Change these test values
export const netAssetSumEnum = {
  '0-16B': [0, 16e9],
  '16B-32B': [16e9, 32e9],
  '32B-48B': [32e9, 48e9],
  '48B-64B': [48e9, 64e9],
  '64B+': [64e9, Number.MAX_SAFE_INTEGER],
}
