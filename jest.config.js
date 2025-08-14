/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  passWithNoTests: true,
  verbose: true,
  prettierPath: null,

  // Обрабатываем только ts через ts-jest
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },

  // Не игнорируем superjson и другие ESM-зависимости
  transformIgnorePatterns: ['node_modules/(?!(superjson|trpc-playground|@trpc)/)'],

  // Обрабатываем только TypeScript как ESM
  extensionsToTreatAsEsm: ['.ts'],

  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
}
