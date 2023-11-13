import DeleteIssueButton from './DeleteIssueButton'

// TODO: find a way to make useRouter() work in a component test with next 13+
// this lib may be promising, but https://www.npmjs.com/package/next-router-mock
// they do not have support yet.

// the next12 example from Mike Plummer is nice, but needs to be updated for next13
// https://github.com/mike-plummer/nextjs-cypress-ct-example/blob/9110384cc8a2fad869104ffb0c75b92990fb3e5b/cypress/support/component.js#L37
// cy issue https://github.com/cypress-io/cypress/issues/28236

describe.skip('<DeleteIssueButton />', () => {
  it('should exercise the modal', () => {
    cy.mount(<DeleteIssueButton issueId={2} />)
    cy.getByCy('delete-issue-comp').should('be.visible')
    cy.getByCy('alert-modal').should('not.exist')

    cy.getByCy('delete-issue-comp').click()
    cy.getByCy('alert-modal').should('be.visible')

    cy.getByCy('cancel').click()
    cy.getByCy('alert-modal').should('not.exist')

    cy.getByCy('delete-issue-comp').click()
    cy.getByCy('delete-issue-confirm').click()
    cy.getByCy('alert-modal').should('not.exist')
  })
})
