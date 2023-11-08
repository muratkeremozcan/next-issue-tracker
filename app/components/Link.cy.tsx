import React from 'react'
import Link from './Link'

describe('<Link />', () => {
  it('renders', () => {
    cy.mount(<Link href={'/42'}>a link</Link>)
    cy.contains('a link').should('have.attr', 'href', '/42')
  })
})
