import { Dexie } from 'dexie'

describe('history', () => {
  before(() => {
    Dexie.delete('db')
  })

  it('should show', () => {
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

    cy.getCy('entry').should('have.length', 3)
  })
})
