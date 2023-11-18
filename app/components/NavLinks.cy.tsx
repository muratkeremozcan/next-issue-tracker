import NavLinks from './NavLinks'

describe('<NavLinks />', () => {
  it('should show the links', () => {
    cy.mount(<NavLinks />)

    cy.getByCy('dashboard-link').should('be.visible')
    cy.getByCy('issues-link').should('be.visible')
  })
})
