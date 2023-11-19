Cypress.Commands.add('getUsers', (failOnStatusCode = false) => {
  cy.log('**getUsers**')
  return cy.api({
    method: 'GET',
    url: `/api/users`,
    retryOnStatusCodeFailure: !failOnStatusCode,
    failOnStatusCode: !failOnStatusCode,
  })
})
