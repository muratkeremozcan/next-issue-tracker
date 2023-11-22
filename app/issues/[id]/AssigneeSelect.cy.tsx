import AssigneeSelect from './AssigneeSelect'
import jsonData from '@/cypress/fixtures/issues.json'
import userJsonData from '@/cypress/fixtures/users.json'
import {transformIssueData} from '@/cypress/support/utils'

const issues = transformIssueData(jsonData)
const issueIndex = 1
const issue = issues[issueIndex]

describe('<AssigneeSelect />', () => {
  it('should list the users in the assign dropdown', () => {
    cy.intercept('GET', '/api/users', {fixture: 'users.json'}).as('users')
    cy.queryWrappedMount(<AssigneeSelect issue={issue} />)

    cy.intercept('PUT', `/api/issues/${issueIndex + 1}`, {statusCode: 200}).as(
      'assignIssue',
    )

    cy.getByCy('assign').click()
    const userIndex = 0
    cy.getByCyLike('user')
      .should('have.length', userJsonData.length)
      .eq(userIndex)
      .click()
    cy.wait('@assignIssue')
      .its('request.body.assignedToUserId')
      .should('eq', userJsonData[userIndex].id)
  })
})
