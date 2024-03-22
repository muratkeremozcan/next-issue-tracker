// TODO: make styles work
// https://github.com/cypress-io/cypress/issues/27890
import '@radix-ui/themes/styles.css'
import '../../app/theme-config.css'
import '../../app/globals.css'
import './commands'
import {mount} from 'cypress/react18'
import {Theme} from '@radix-ui/themes'
import QueryClientProvider from '@/app/QueryClientProvider'
// import RootLayout from '../../app/layout'

Cypress.Commands.add('mount', mount)

// still problematic...
// Cypress.Commands.add(
//   'wrappedMount',
//   (WrappedComponent: React.ReactNode, options = {}) => {
//     const wrapped = <RootLayout>{WrappedComponent}</RootLayout>
//     return cy.mount(wrapped, options)
//   },
// )

Cypress.Commands.add(
  'wrappedMount',
  (WrappedComponent: React.ReactNode, options = {}) => {
    const wrapped = (
      <Theme appearance="light" accentColor="violet">
        {WrappedComponent}
      </Theme>
    )
    return cy.mount(wrapped, options)
  },
)

// use composition...

Cypress.Commands.add(
  'queryWrappedMount',
  (WrappedComponent: React.ReactNode, options = {}) => {
    const themedComponent = (
      <QueryClientProvider>{WrappedComponent}</QueryClientProvider>
    )
    return cy.wrappedMount(themedComponent, options)
  },
)
