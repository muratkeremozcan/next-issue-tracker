import IssueStatusFilter from './IssueStatusFilter'

// TODO: find a way to make useRouter() work in a component test
// this lib may be promising, but https://www.npmjs.com/package/next-router-mock
// particularly this issue https://github.com/scottrippey/next-router-mock/issues/67

// the next12 example from Mike Plummer is nice, but needs to be updated for next13
// https://github.com/mike-plummer/nextjs-cypress-ct-example/blob/9110384cc8a2fad869104ffb0c75b92990fb3e5b/cypress/support/component.js#L37

describe.skip('<IssueStatusFilter />', () => {
  it('should list statuses', () => {
    cy.wrappedMount(<IssueStatusFilter />)
    cy.getByCy('filter-by-status').click()
    cy.getByCyLike('status-').should('have.length', 4)
  })
})
