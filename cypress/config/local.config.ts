import {defineConfig} from 'cypress'
import merge from 'lodash/merge'
import {baseConfig} from './base.config'

const specificConfig: Partial<Cypress.PluginConfigOptions> = {
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
}

export default defineConfig(merge({}, baseConfig, specificConfig))
