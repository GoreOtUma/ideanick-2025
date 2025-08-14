import baseConfig from '../jest.config.js'
export default {
  ...baseConfig,

  setupFiles: ['<rootDir>/jest.setup.ts'],
}
