/* eslint-disable @typescript-eslint/no-explicit-any */
import type {MountOptions, MountReturn} from 'cypress/react'
import type {Issue} from '@/app/api/issues/schema'
import type {IssueSelector} from '@/cypress/support/commands/api'

export {}
declare global {
  namespace Cypress {
    interface Chainable {
      /** Yields elements with a data-cy attribute that matches a specified selector.
       * ```
       * cy.getByCy('search-toggle') // where the selector is [data-cy="search-toggle"]
       * ```
       */
      getByCy(qaSelector: string, args?: any): Chainable<JQuery<HTMLElement>>

      /** Yields elements with data-cy attribute that partially matches a specified selector.
       * ```
       * cy.getByCyLike('chat-button') // where the selector is [data-cy="chat-button-start-a-new-claim"]
       * ```
       */
      getByCyLike(
        qaSelector: string,
        args?: any,
      ): Chainable<JQuery<HTMLElement>>

      /** Mounts a React node
       * @param component React Node to mount
       * @param options Additional options to pass into mount
       */
      mount(
        component: React.ReactNode,
        options?: MountOptions,
      ): Cypress.Chainable<MountReturn>

      /** Mounts the component wrapped by RootLayout (for styles)
       * @param component React Node to mount
       * @param options Additional options to pass into mount
       */
      wrappedMount(
        component: React.ReactNode,
        options?: MountOptions,
      ): Cypress.Chainable<MountReturn>

      /** Creates a random issue with name and email */
      createIssue(
        body?: Partial<Issue>,
        allowedToFail?: boolean,
      ): Chainable<Response<Issue> & Messages>

      /** Gets a issue by id */
      getIssue(
        id: string,
        failOnStatusCode?: boolean,
      ): Chainable<Response<unknown> & Messages>

      getIssues(
        failOnStatusCode?: boolean,
      ): Chainable<Response<Issue[]> & Messages>

      /** Deletes a issue by id */
      deleteIssue(
        id: string,
        allowedToFail?: boolean,
      ): Chainable<Response<Issue> & Messages>

      /** Updates a issue by id */
      updateIssue(
        id: string,
        body: Partial<Issue>,
        allowedToFail?: boolean,
      ): Chainable<Response<Issue> & Messages>

      /** Given title or description, deletes that issue */
      deleteIssueBy(
        selector: IssueSelector,
      ): Chainable<Response<Issue> & Messages>

      /** Given title or description, gets the id of an issue */
      getIssueBy(selector: IssueSelector): Chainable<Response<Issue> & Messages>

      /** Deletes all issues */
      cleanUpIssues()
    }
  }
}
