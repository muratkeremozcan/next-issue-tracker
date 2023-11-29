import LatestIssuesCore from './LatestIssuesCore'
import {transformIssueData} from '@/cypress/support/utils'
import jsonData from '@/cypress/fixtures/issues.json'

const issues = transformIssueData(jsonData)

describe('<LatestIssuesCore />', () => {
  it('renders', () => {
    cy.mount(<LatestIssuesCore issues={issues} />)
    cy.getByCyLike('issue-row-').should('have.length.gt', 0)
    cy.contains(issues[0].title).should('be.visible')

    cy.get(`[href="/issues/${issues[0].id}"`).click()
    cy.location('pathname').should('eq', `/issues/${issues[0].id}`)
  })
})
