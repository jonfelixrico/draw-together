describe('pre-room', () => {
  it('shows username step if no username is found in localstorage', () => {
    cy.clearLocalStorage()

    cy.visit('/')
    cy.getCy('username-step').should('exist')

    cy.get('input').type('My Username')
    cy.get('button').click()

    cy.getCy('action-step').should('exist')
    cy.getCy('username').contains('My Username')
  })

  it('shows action step if username is already in localstorage', () => {
    cy.setLocalStorage('username', 'Stored Username')

    cy.visit('/')
    cy.getCy('action-step').should('exist')

    cy.getCy('username').contains('Stored Username')
  })

  it('allows changing of name', () => {
    cy.setLocalStorage('username', 'Stored Username')

    cy.visit('/')
    cy.getCy('action-step').should('exist')
    cy.getCy('username').contains('Stored Username')

    cy.getCy('clear-username').click()

    cy.getCy('username-step').should('exist')

    cy.get('input').type('My Username')
    cy.get('button').click()

    cy.getCy('action-step').should('exist')

    cy.getCy('username').contains('My Username')
  })

  it('supports hosting', () => {
    cy.visit('/')

    cy.getCy('host-action').find('button').click()
    cy.getCy('loading-overlay').should('exist')
    cy.location('pathname').should('include', '/rooms/')
    cy.getCy('loading-overlay').should('not.exist')
  })

  it('supports joining', () => {
    cy.request({
      url: '/api/room',
      method: 'POST',
    }).then((response) => {
      const id = response.body.id as string

      cy.visit('/')

      /*
       * This is to allow our asserts for loading-overlay be able to find it even if the server is fast.
       * There have been cases where e2e tests fail because loading-overlay can't be found.
       */
      cy.intercept('/api/room/*', req => {
        req.continue(res => {
          res.setDelay(500)
        })
      })

      cy.getCy('join-action').find('input').type(id)
      cy.getCy('join-action').find('button').click()

      /*
       * Overlay testing was only added here because Cypress doesn't support Vite 5 for component tests as of writing.
       * TODO give the loading overlay its own component test once Cypress supports Vite 5
       */
      cy.getCy('loading-overlay').should('exist')

      cy.getCy('room-page').should('exist')
      cy.getCy('loading-overlay').should('not.exist')
    })
  })

  it('handles join attempts to nonexistent room ids', () => {
    cy.visit('/rooms/non-existent-id')
    cy.getCy('error-not-found').should('exist')

    cy.getCy('return-btn').click()
    cy.location('pathname').should('equal', '/')
  })

  it('handles join attempts with no username', () => {
    cy.request({
      url: '/api/room',
      method: 'POST',
    }).then((response) => {
      cy.clearLocalStorage()

      cy.visit(`/rooms/${response.body.id}`)
      cy.getCy('error-no-username').should('exist')

      cy.get('input').type('My Username')
      cy.get('button').click()

      cy.getCy('room-page').should('exist')
    })
  })

  it('shows an error screen on unexpected error', () => {
    cy.intercept('/api/room/error-test', {
      statusCode: 500,
    })

    cy.visit('/rooms/error-test')
    cy.getCy('error-unexpected').should('exist')

    cy.getCy('return-btn').click()
    cy.location('pathname').should('equal', '/')
  })
})
