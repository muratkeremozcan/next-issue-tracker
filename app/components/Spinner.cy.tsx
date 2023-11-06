import Spinner from './Spinner'

describe('<Spinner />', () => {
  it('renders', () => {
    cy.mount(<Spinner />)
    cy.getByCy('spinner').should('be.visible')
  })
})
