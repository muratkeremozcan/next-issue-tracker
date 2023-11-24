import '../support/commands/api-issue'
import {createRandomIssue} from '@support/utils'

// without the ability to write a component test (see app/issues/list/pageIssuesPageCore.cy.tsx, useRouter issue)
// we have to do lots of heavy lifting just to test sorting
// when we can write a component test, create one and do a side by side comparison

describe('Issue table ordering', () => {
  const issueA = createRandomIssue()
  const issueB = createRandomIssue()
  const editedIssueATitle = `AA${issueA.title}`
  const editedIssueBTitle = `BB${issueB.title}`
  const columns = ['title', 'status', 'createdAt']
  const directions = ['asc', 'desc']

  before(() => {
    cy.createIssue(issueA)
    cy.updateIssueBy({title: issueA.title}, {title: editedIssueATitle})
    cy.createIssue(issueB)
    cy.updateIssueBy(
      {title: issueB.title},
      {title: editedIssueBTitle, status: 'DONE'},
    )
  })

  after(() => {
    cy.deleteIssueBy({title: editedIssueATitle})
    cy.deleteIssueBy({title: editedIssueBTitle})
  })

  function testSorting(columnName: string, orderDirection: string) {
    cy.intercept(
      `/issues/list?orderBy=${columnName}&orderDirection=${orderDirection}*`,
    ).as(`${columnName}-${orderDirection}`)
    cy.getByCy(`column-header-${columnName}`).click()
    cy.wait(`@${columnName}-${orderDirection}`)
    cy.getByCy(`sort-${orderDirection}`).should('be.visible')
  }

  function verifyBaseState() {
    cy.getByCy(`issue-row-${editedIssueATitle}`).should('be.visible')
    cy.getByCy(`issue-row-${editedIssueBTitle}`).should('be.visible')
    cy.getByCyLike('sort').should('not.exist')
  }

  it('should order by title, status and createdAt', () => {
    cy.visit('/issues/list')
    cy.location('pathname').should('eq', '/issues/list')

    verifyBaseState()

    columns.forEach(column => {
      directions.forEach(direction => {
        testSorting(column, direction)
      })
    })
  })

  it('should show the list when query params are invalid', () => {
    cy.visit('/issues/list?orderBy=a1sdfas&orderDirection=asdfas2')

    verifyBaseState()
  })
})
