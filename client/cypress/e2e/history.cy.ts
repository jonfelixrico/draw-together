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

  it('supports joining from history', () => {
    cy.visit('/')

    cy.getCy('entry').should('have.length', 4)

    cy.getCy('entry')
      .eq(3)
      .then((el) => {
        const roomId = el.attr('data-room-id')

        cy.get(`[data-room-id=${roomId}]`).findCy('join').click()
        cy.getCy('room-page').should('exist')

        cy.visit('/')

        // expect that the room last accessed should be the first one in the list now
        cy.getCy('entry').eq(0).should('have.attr', 'data-room-id', roomId)
      })
  })

  it('supports clearing of history', () => {
    cy.visit('/')

    cy.getCy('entry').should('have.length', 4)
    cy.getCy('clear').click()
    cy.getCy('clear-confirm-modal').findCy('ok').click()

    cy.getCy('entry').should('not.exist')
    cy.getCy('empty-notice').should('exist')
  })
})
