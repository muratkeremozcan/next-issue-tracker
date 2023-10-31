import {defineConfig} from 'cypress'
import merge from 'lodash/merge'
import {baseConfig} from './base.config'

const specificConfig: Partial<Cypress.PluginConfigOptions> = {
  e2e: {
    baseUrl: 'https://you-deployment-url/',
    excludeSpecPattern: 'cypress/e2e/api/**/*', // not sure how we hit api routes in a deployment
  },
}

export default defineConfig(merge({}, baseConfig, specificConfig))
