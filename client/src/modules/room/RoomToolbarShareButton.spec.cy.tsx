import RoomToolbarShareButton from '@/modules/room/RoomToolbarShareButton'

describe('RoomToolbarShareButton', () => {
  it('copies the room id', () => {
    const copyFn = cy.spy().as('copy')
    cy.mount(
      <RoomToolbarShareButton
        roomId="test-id"
        url="http://localhost:3000/rooms/test-id"
        onCopy={copyFn}
      />
    )

    cy.getCy('share-modal').should('not.exist')

    cy.getCy('share-button').click()
    cy.getCy('share-modal').should('exist')

    cy.getCy('room-id').click()
    cy.get('@copy').should('have.been.calledWith', 'test-id')
  })

  it('copies the url', () => {
    const copyFn = cy.spy().as('copy')
    cy.mount(
      <RoomToolbarShareButton
        roomId="test-id"
        url="http://localhost:3000/rooms/test-id"
        onCopy={copyFn}
      />
    )

    cy.getCy('share-modal').should('not.exist')

    cy.getCy('share-button').click()
    cy.getCy('share-modal').should('exist')

    cy.getCy('url').click()
    cy.get('@copy').should(
      'have.been.calledWith',
      'http://localhost:3000/rooms/test-id'
    )
  })
})
