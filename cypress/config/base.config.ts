// import plugins from './cypress/support/plugins'
import tasks from '../support/tasks'
import path from 'path'
require('dotenv').config({path: path.resolve(__dirname, '../../.env')})

export const baseConfig: Partial<Cypress.PluginConfigOptions> = {
  // @ts-expect-error yes
  experimentalSingleTabRunMode: true,
  chromeWebSecurity: false,
  projectId: 'kk89i2',

  retries: {
    runMode: 2,
    openMode: 0,
  },

  env: {
    ...process.env,
  },

  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      return tasks(on)
      // return plugins(on, config)
    },
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
}
