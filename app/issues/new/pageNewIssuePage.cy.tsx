import NewIssuePage from './page'

describe('<NewIssuePage />', () => {
  it('should submit new issue', () => {
    cy.mount(<NewIssuePage />)
    cy.get('[placeholder="Title"]').type('title')
    cy.get('.CodeMirror')
  })
})
