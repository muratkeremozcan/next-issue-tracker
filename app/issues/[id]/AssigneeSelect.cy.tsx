import AssigneeSelect from './AssigneeSelect'
import {Theme} from '@radix-ui/themes'

describe('<AssigneeSelect />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Theme appearance="light" accentColor="violet">
        <AssigneeSelect />
      </Theme>,
    )

    cy.getByCy('assign').click()
  })
})
