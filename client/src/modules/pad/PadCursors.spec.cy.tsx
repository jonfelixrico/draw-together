import PadCursors from '@/modules/pad/PadCursors'

describe('PadCursors', () => {
  it('show show no cursors', () => {
    cy.mount(
      <PadCursors
        scale={1}
        defaultDiameter={1}
        currentTime={20000}
        hideCursorThreshold={5000}
        dimensions={{
          width: 500,
          height: 500,
        }}
        nameData={{
          user1: 'User 1',
          user2: 'User 2',
        }}
        cursorData={{
          user1: {
            id: 'user1',
            point: {
              x: 50,
              y: 50,
            },
            diameter: 5,
            // Lapsed hideCursorThreshold, should not show
            timestamp: 10000,
          },
        }}
      />
    )

    cy.getCy('cursor').should('not.exist')
  })

  it('shows cursors correctly', () => {
    cy.mount(
      <PadCursors
        scale={1}
        defaultDiameter={1}
        currentTime={20000}
        hideCursorThreshold={5000}
        dimensions={{
          width: 250,
          height: 100,
        }}
        nameData={{
          user1: 'User 1',
          user2: 'User 2',
        }}
        cursorData={{
          user1: {
            id: 'user1',
            point: {
              x: 50,
              y: 50,
            },
            diameter: 5,
            timestamp: 20000,
          },

          // should not be shown since this has lapsed the threshold
          user2: {
            id: 'user2',
            point: {
              x: 50,
              y: 50,
            },
            diameter: 5,
            timestamp: 10000,
          },
        }}
      />
    )

    cy.getCy('cursor').should('have.length', 1)
    cy.get('[data-cursor-id=user1]').should('exist')

    cy.getCy('cursors').invoke('outerWidth').should('eq', 250)
    cy.getCy('cursors').invoke('outerHeight').should('eq', 100)

    cy.get('[data-cursor-id=user1]').findCy('label').contains('User 1')

    function getPoint() {
      const containerRect = Cypress.$('[data-cy=cursors]')
        .get(0)
        .getBoundingClientRect()
      const cursorRect = Cypress.$(
        '[data-cursor-id=user1] [data-cy=cursor-svg]'
      )
        .get(0)
        .getBoundingClientRect()

      return {
        x: cursorRect.x - containerRect.x + (5 + 2) / 2,
        y: cursorRect.y - containerRect.y + (5 + 2) / 2,
      }
    }
    cy.then(() => getPoint())
      .its('x')
      .should('be.approximately', 50, 1)
    cy.then(() => getPoint())
      .its('y')
      .should('be.approximately', 50, 1)

    cy.get('[data-cursor-id=user1]')
      .findCy('cursor-svg')
      .invoke('outerWidth')
      .should('eq', 5 + 2) // 5 is the actual cursor thickness, but the + 2 is for the borders
  })

  it('supports scaling', () => {
    cy.mount(
      <PadCursors
        scale={2}
        defaultDiameter={1}
        currentTime={20000}
        hideCursorThreshold={5000}
        dimensions={{
          width: 250,
          height: 100,
        }}
        nameData={{
          user1: 'User 1',
          user2: 'User 2',
        }}
        cursorData={{
          user1: {
            id: 'user1',
            point: {
              x: 50,
              y: 50,
            },
            diameter: 5,
            timestamp: 20000,
          },
        }}
      />
    )

    cy.getCy('cursors')
      .invoke('outerWidth')
      .should('eq', 250 * 2)

    cy.getCy('cursors')
      .invoke('outerHeight')
      .should('eq', 100 * 2)

    cy.get('[data-cursor-id=user1]')
      .findCy('cursor-svg')
      .invoke('outerWidth')
      .should('eq', 10 + 2) // 10 is the thickness scaled by 2. borders remain constant (1px) per edge

    function getPoint() {
      const containerRect = Cypress.$('[data-cy=cursors]')
        .get(0)
        .getBoundingClientRect()
      const cursorRect = Cypress.$(
        '[data-cursor-id=user1] [data-cy=cursor-svg]'
      )
        .get(0)
        .getBoundingClientRect()

      return {
        x: cursorRect.x - containerRect.x + (10 + 2) / 2,
        y: cursorRect.y - containerRect.y + (10 + 2) / 2,
      }
    }
    cy.then(() => getPoint())
      .its('x')
      .should('be.approximately', 100, 1)
    cy.then(() => getPoint())
      .its('y')
      .should('be.approximately', 100, 1)
  })
})
