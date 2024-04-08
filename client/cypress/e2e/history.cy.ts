import { Dexie } from 'dexie'

describe('history', () => {
  before(() => {
    Dexie.delete('db')
  })

  it('shows an empty notice', () => {
    cy.visit('/')

    cy.getCy('history').findCy('empty-notice').should('exist')
    cy.getCy('history').findCy('empty').should('have.length', 0)
  })

  it('collects the list of rooms that we entered', () => {
    cy.visit('/')
    cy.getCy('host-action').find('button').click()
    cy.getCy('room-page').should('exist')

    cy.visit('/')
    cy.getCy('host-action').find('button').click()
    cy.getCy('room-page').should('exist')

    cy.visit('/')
    cy.getCy('host-action').find('button').click()
    cy.getCy('room-page').should('exist')

    cy.visit('/')
    cy.getCy('host-action').find('button').click()
    cy.getCy('room-page').should('exist')

    cy.visit('/')
    cy.getCy('host-action').find('button').click()
    cy.getCy('room-page').should('exist')

    cy.visit('/')

    cy.getCy('entry').should('have.length', 5)
  })

  it('supports selective deleting', () => {
    cy.visit('/')

    cy.getCy('entry').should('have.length', 5)

    cy.getCy('entry')
      .eq(1)
      .then((el) => {
        const roomId = el.attr('data-room-id')

        cy.get(`[data-room-id=${roomId}]`).findCy('delete').click()
        cy.getCy('delete-entry-modal').findCy('ok').click()

        cy.getCy('entry').should('have.length', 4)
        cy.get(`[data-room-id=${roomId}]`).should('not.exist')
      })
  })
})
