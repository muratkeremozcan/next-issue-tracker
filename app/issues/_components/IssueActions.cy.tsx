import IssueActions from './IssueActions'

describe('<IssueActions />', () => {
  it('renders', () => {
    cy.wrappedMount(<IssueActions />)
    cy.getByCy('new-issue').contains('New Issue')
  })
})
