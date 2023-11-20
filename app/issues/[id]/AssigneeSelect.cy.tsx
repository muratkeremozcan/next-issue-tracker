import QueryClientProvider from '@/app/QueryClientProvider'
import AssigneeSelect from './AssigneeSelect'
import {Theme} from '@radix-ui/themes'

describe('<AssigneeSelect />', () => {
  it('should list the users in the assign dropdown', () => {
    cy.intercept('GET', '/api/users', {fixture: 'users.json'}).as('users')
    cy.mount(
      <Theme appearance="light" accentColor="violet">
        <QueryClientProvider>
          <AssigneeSelect />
        </QueryClientProvider>
      </Theme>,
    )

    cy.getByCy('assign').click()
    cy.getByCyLike('user').should('have.length.gt', 0)
  })
})
