import SearchInput from './SearchInput'

describe('<SearchInput />', () => {
  it('should trigger change event', () => {
    cy.mount(<SearchInput onSearchChange={cy.stub().as('onSearchChange')} />)
    cy.getByCy('search-input').type('a')
    cy.get('@onSearchChange').should('have.been.calledOnceWith', 'a')
  })
})
