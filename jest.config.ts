import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  verbose: true,
  clearMocks: true,
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'ts'],
  testMatch: ['**/*.test.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transform: {
    '^.+.ts?$': ['ts-jest', {}]
  },
  coverageReporters: ['json-summary', 'text', 'lcov', 'cobertura'],
  collectCoverage: true,
  collectCoverageFrom: ['./src/**'],
  moduleNameMapper: {
    '@libs$': '<rootDir>/src/libs/index.ts',
    '@libs/(.*)$': '<rootDir>/src/libs/$1'
  },
  coverageThreshold: {
    global: {
      lines: 80
    }
  }
}
export default config
