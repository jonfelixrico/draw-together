describe('home', () => {
  it('shows username step if no username is found in localstorage', () => {
    // TODO add test
    cy.visit('/')
    cy.dataCy('username-step').should('exist')
  })

  it('shows action step if username is already in localstorage', () => {
    // TODO add test
  })

  it('supports hosting', () => {
    // TODO add test
  })

  it('supports joining', () => {
    // TODO add test
  })
})