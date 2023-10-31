// TODO: make styles work
// import '../../app/globals.css' //
import './commands'
import {mount} from 'cypress/react18'
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
