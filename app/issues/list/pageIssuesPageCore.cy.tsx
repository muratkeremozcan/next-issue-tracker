import IssuesPageCore from './pageIssuesPageCore'
import jsonData from '@/cypress/fixtures/issues.json'
import {transformIssueData} from '@/cypress/support/utils'

const issues = transformIssueData(jsonData)

// TODO: find a way to make useRouter() work in a component test with next 13+
// this lib may be promising, but https://www.npmjs.com/package/next-router-mock
// they do not have support yet.

// the next12 example from Mike Plummer is nice, but needs to be updated for next13
// https://github.com/mike-plummer/nextjs-cypress-ct-example/blob/9110384cc8a2fad869104ffb0c75b92990fb3e5b/cypress/support/component.js#L37
// cy issue https://github.com/cypress-io/cypress/issues/28236

describe.skip('<IssuesPageCore />', () => {
  it('should list issues and their data', () => {
    cy.wrappedMount(
      <IssuesPageCore issues={issues} searchParams={{orderBy: 'title'}} />,
    )
    cy.getByCy('issue-actions-comp').should('be.visible')

    issues.forEach(issue => {
      cy.getByCy(`issue-title`)
        .contains(issue.title)
        .should('have.attr', 'href', `/issues/${issue.id}`)
      cy.getByCy(`issue-status`).contains(
        Cypress._.capitalize(issue.status).replace(/_/g, ' '),
      )
      // @ts-expect-error for testing
      cy.getByCy(`issue-createdAt`).contains(issue.createdAt?.toDateString())
    })
  })
})
