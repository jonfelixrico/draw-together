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

  it('shows a cursor', () => {
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
    const selector = cy.get('[data-cursor-id=user1]')

    selector.should('exist')
    selector.findCy('label').should('equal', 'User 2')
    selector
      .findCy('cursor-svg')
      .invoke('outerWidth')
      .should('eq', 5 + 2)
  })
})
