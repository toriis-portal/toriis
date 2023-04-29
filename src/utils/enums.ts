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

export const requestStatusEnum = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
}

export const datasetEnum = {
  COMPANY: 'Company',
  INVESTMENT: 'Investment',
  FUEL: 'Fuel',
  EMISSION: 'Emission',
  ENERGY: 'Energy',
}

export const netAssetValEnum = {
  '0-5M': [0, 5e6],
  '5M-10M': [5e6, 10e6],
  '10M-15M': [10e6, 15e6],
  '15M-20M': [15e6, 20e6],
  '20M+': [20e6, Number.MAX_SAFE_INTEGER],
}

export const FuelEnum = {
  biodiesels: 'Biodiesels',
  biogases: 'Biogases',
  coal: 'Coal',
  oil: 'Oil',
  gas: 'Gas',
  otherBiomass: 'Other Biomass',
  sustainableBiomass: 'Sustainable Biomass',
  otherRenewable: 'Other Renewable',
  otherNonRenewable: 'Other Non-Renewable',
}
