import IssueStatusFilter from './IssueStatusFilter'
import {Theme} from '@radix-ui/themes'

describe('<IssueStatusFilter />', () => {
  it('should list statuses', () => {
    cy.mount(
      <Theme appearance="light" accentColor="violet">
        <IssueStatusFilter />
      </Theme>,
    )
    cy.getByCy('filter-by-status').click()
    cy.getByCyLike('status-').should('have.length', 4)
  })
})
