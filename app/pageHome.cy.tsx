import React from 'react'
import Home from './page'

describe('<Home />', () => {
  it('renders', () => {
    cy.mount(<Home />)
    cy.contains('Get started by editing app/page.tsx')
  })
})
