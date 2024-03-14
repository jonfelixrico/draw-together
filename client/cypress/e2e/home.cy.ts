describe('home', () => {
  it('shows username step if no username is found in localstorage', () => {
    cy.clearLocalStorage()

    cy.visit('/')
    cy.dataCy('username-step').should('exist')

    cy.get('input').type('My Username')
    cy.get('button').click()

    cy.dataCy('action-step').should('exist')
    cy.dataCy('username').contains('My Username')
  })

  it('shows action step if username is already in localstorage', () => {
    cy.setLocalStorage('username', 'Stored Username')

    cy.visit('/')
    cy.dataCy('action-step').should('exist')

    cy.dataCy('username').contains('Stored Username')
  })

  it('allows changing of name', () => {
    cy.setLocalStorage('username', 'Stored Username')

    cy.visit('/')
    cy.dataCy('action-step').should('exist')
    cy.dataCy('username').contains('Stored Username')

    cy.dataCy('clear-username').click()
    
    cy.dataCy('username-step').should('exist')

    cy.get('input').type('My Username')
    cy.get('button').click()

    cy.dataCy('action-step').should('exist')

    cy.dataCy('username').contains('My Username')
  })

  it('supports hosting', () => {
    cy.visit('/')

    cy.dataCy('host-action').find('button').click()
    cy.location('pathname').should('include', '/rooms/')
  })

  it('supports joining', () => {
    cy.request({
      url: '/api/room',
      method: 'POST',
    })
      .then(response => {
        const id = response.body.id as string

        cy.visit('/')
        cy.dataCy('join-action').find('input').type(id)
        cy.dataCy('join-action').find('button').click()

        cy.location('pathname').should('equal', `/rooms/${id}`)
      })
  })
})
