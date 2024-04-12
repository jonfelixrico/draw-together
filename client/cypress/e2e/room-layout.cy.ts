describe('layout', () => {
  let roomId: string

  before(() => {
    cy.request({
      url: '/api/room',
      method: 'POST',
    }).then((response) => {
      roomId = response.body.id
    })
  })

  it('should not show the mobile warning', () => {
    cy.visit(`/rooms/${roomId}`)

    cy.getCy('mobile-warning-modal').should('not.exist')
  })

  it('should show the mobile warning', () => {
    cy.viewport('iphone-x')
    cy.visit(`/rooms/${roomId}`)

    cy.getCy('mobile-warning-modal').should('exist')
    cy.getCy('mobile-warning-modal').findCy('ok').click()

    cy.getCy('mobile-warning-modal').should('not.exist')
  })

  it('should show the options drawer', () => {
    cy.visit(`/rooms/${roomId}`)

    cy.getCy('options-drawer').should('exist')
    cy.getCy('options-modal-button').should('not.exist')
  })

  it('should show options modal button', () => {
    cy.viewport('iphone-x')
    cy.visit(`/rooms/${roomId}`)

    cy.getCy('options-drawer').should('not.exist')
    cy.getCy('options-modal-button').should('exist')
  })
})
