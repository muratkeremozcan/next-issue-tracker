import DashboardPage from './page'

describe('<DashboardPage />', () => {
  it('renders', () => {
    cy.mount(<DashboardPage />)
    cy.contains('DashboardPage')
  })
})
