import Pagination from './Pagination'

// TODO: find a way to make useRouter() work in a component test with next 13+
// this lib may be promising, but https://www.npmjs.com/package/next-router-mock
// they do not have support yet.

// the next12 example from Mike Plummer is nice, but needs to be updated for next13
// https://github.com/mike-plummer/nextjs-cypress-ct-example/blob/9110384cc8a2fad869104ffb0c75b92990fb3e5b/cypress/support/component.js#L37
// cy issue https://github.com/cypress-io/cypress/issues/28236

describe.skip('<Pagination />', () => {
  it('should exercise button visibility on the first page', () => {
    cy.mount(<Pagination itemCount={10} pageSize={5} currentPage={1} />)
    cy.getByCy('back-btn').should('be.visible')
    cy.getByCy('dbl-back-btn').should('be.visible')
    cy.getByCy('forward-btn').should('be.visible')
    cy.getByCy('dbl-forward-btn').should('be.visible')
  })

  it('should exercise button visibility on the last page', () => {
    cy.mount(<Pagination itemCount={10} pageSize={5} currentPage={2} />)
    cy.getByCy('back-btn').should('be.visible')
    cy.getByCy('dbl-back-btn').should('be.visible')
    cy.getByCy('forward-btn').should('be.visible')
    cy.getByCy('dbl-forward-btn').should('be.visible')
  })

  it('should not render text or buttons if pageCount is 1', () => {
    cy.mount(<Pagination itemCount={10} pageSize={10} currentPage={1} />)
    cy.getByCy('back-btn').should('not.exist')
    cy.getByCy('dbl-back-btn').should('not.exist')
    cy.getByCy('forward-btn').should('not.exist')
    cy.getByCy('dbl-forward-btn').should('not.exist')
    cy.getByCy('text').should('not.exist')
  })
})
