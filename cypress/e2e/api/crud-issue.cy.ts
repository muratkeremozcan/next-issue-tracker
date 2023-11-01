import '../../commands/api'
import {createRandomIssue} from '@support/utils'
import spok from 'cy-spok'

describe('CRUD Issue', () => {
  const body = createRandomIssue()
  const {title, description} = body

  it('should crud a issue', () => {
    cy.createIssue(body)
      .should(spok({status: 201}))
      .its('body')
      .should(spok({id: spok.number, title, description}))
      .its('id')
      .should('exist')
      // @ts-ignore noise
      .then((id: string) => {
        cy.getIssue(id).should(
          spok({
            status: 200,
            body: {id: spok.number, title, description},
          }),
        )

        cy.getIssues()
          .should(spok({status: 200}))
          .its('body')
          .should('be.a', 'array')
          .each(issue =>
            cy.wrap(issue).should(spok({id: spok.number, title: spok.string})),
          )

        cy.log('**should err when adding existing issue**')
        cy.createIssue(body, true)
          .should(spok({status: 400}))
          .its('body.message')
          .should('eq', 'Issue already exists')

        const newTitle = `edited-${title}`
        const newDescription = `edited-${description}`
        cy.updateIssue(id, {title: newTitle, description: newDescription})
          .should(spok({status: 200}))
          .its('body')
          .should(spok({id, title: newTitle, description: newDescription}))

        cy.deleteIssue(id).should(spok({status: 200}))
      })
  })

  it('should fail to delete a issue that does not exist', () => {
    const id = '101'

    cy.deleteIssue(id, true).should(spok({status: 404}))
  })

  it('should fail update an invalid issue', () => {
    const body = {title: ''}

    cy.updateIssue('1', body, true)
      .should(spok({status: 400}))
      .its('body')
      .should(
        spok([
          {
            code: 'too_small',
            minimum: 1,
            type: 'string',
            inclusive: true,
            exact: false,
            message: 'String must contain at least 1 character(s)',
            path: ['title'],
          },
          {
            code: 'invalid_type',
            expected: 'string',
            received: 'undefined',
            path: ['description'],
            message: 'Required',
          },
        ]),
      )
  })

  it('should fail to update a issue that does not exist', () => {
    const body = {title: 'Milk', description: 'nice milk', id: 101}
    const {id} = body

    cy.updateIssue(String(id), body, true)
      .should(spok({status: 404}))
      .its('body')
      .should(spok({error: 'The issue does not exist.'}))
  })
})
