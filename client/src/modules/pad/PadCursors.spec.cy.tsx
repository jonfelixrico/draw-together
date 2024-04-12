import PadCursors from '@/modules/pad/PadCursors'

describe('PadCursors', () => {
  it('show show no cursors', () => {
    cy.mount(
      <PadCursors
        scale={1}
        defaultDiameter={1}
        currentTime={20000}
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
        currentTime={10000}
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
            timestamp: 10000,
          },
        }}
      />
    )

    cy.getCy('cursor').should('have.length', 1)
  })
})
