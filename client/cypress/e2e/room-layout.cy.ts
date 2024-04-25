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

  it('changes the input element based on the mode', () => {
    cy.visit(`/rooms/${roomId}`)

    cy.get('[data-cy=type-button][data-type=PATH]').click()
    cy.get('[data-cy=type-button][data-active=true]').should(
      'have.attr',
      'data-type',
      'PATH'
    )
    cy.getCy('input-pad').should('have.attr', 'data-type', 'PATH')

    cy.get('[data-cy=type-button][data-type=RECTANGLE]').click()
    cy.get('[data-cy=type-button][data-active=true]').should(
      'have.attr',
      'data-type',
      'RECTANGLE'
    )
    cy.getCy('input-pad').should('have.attr', 'data-type', 'RECTANGLE')
  })
})
