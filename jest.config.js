module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
  'src/**/*.(t|j)s',
  '!**/*.spec.ts',
  '!**/*.dto.ts',
  '!**/*.module.ts',
  '!src/main.ts',
  '!src/database/config/**',
  '!src/database/seeders/**',
  '!**/node_modules/**',
],

  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  coverageReporters: ['text', 'lcov', 'json', 'html'],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 40,
      lines: 50,
      statements: 50,
    },
  },
};