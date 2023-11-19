import '../../support/commands/api-user'
import spok from 'cy-spok'

describe('Users', () => {
  it('should get users', () => {
    cy.getUsers()
      .should(spok({status: 200}))
      .its('body')
      .should('be.a', 'array')
      .each(user =>
        cy
          .wrap(user)
          .should(
            spok({
              id: spok.string,
              email: spok.string,
              image: spok.string,
              name: spok.string,
            }),
          ),
      )
  })
})
