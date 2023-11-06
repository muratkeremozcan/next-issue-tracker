import ErrorMessage from './ErrorMessage'

describe('<ErrorMessage />', () => {
  it('should not render without children, and render with', () => {
    cy.mount(<ErrorMessage />)
    cy.getByCy('error-message').should('not.exist')

    cy.mount(
      <ErrorMessage>
        <div>Hello</div>
      </ErrorMessage>,
    )
    cy.getByCy('error-message').should('be.visible')
  })
})
