import NewIssuePage from './page'

// TODO: find a way to make useRouter() work in a component test with next 13+
// this lib may be promising, but https://www.npmjs.com/package/next-router-mock
// they do not have support yet.

// the next12 example from Mike Plummer is nice, but needs to be updated for next13
// https://github.com/mike-plummer/nextjs-cypress-ct-example/blob/9110384cc8a2fad869104ffb0c75b92990fb3e5b/cypress/support/component.js#L37
// cy issue https://github.com/cypress-io/cypress/issues/28236

describe.skip('<NewIssuePage />', () => {
  it('should submit new issue', () => {
    cy.mount(<NewIssuePage />)
    cy.get('[placeholder="Title"]').type('title')
    cy.get('.CodeMirror')
  })
})
