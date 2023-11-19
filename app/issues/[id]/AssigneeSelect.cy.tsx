import AssigneeSelect from './AssigneeSelect'
import {Theme} from '@radix-ui/themes'

describe('<AssigneeSelect />', () => {
  it('should list the users in the assign dropdown', () => {
    cy.intercept('GET', '/api/users', {fixture: 'users.json'}).as('users')
    cy.mount(
      <Theme appearance="light" accentColor="violet">
        <AssigneeSelect />
      </Theme>,
    )

    cy.getByCy('assign').click()
    cy.getByCyLike('user').should('have.length.gt', 0)
  })
})
