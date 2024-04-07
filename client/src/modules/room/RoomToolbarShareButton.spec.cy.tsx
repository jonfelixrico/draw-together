import ToastProvider from '@/modules/common/ToastProvider'
import RoomToolbarShareButton from '@/modules/room/RoomToolbarShareButton'

describe('RoomToolbarShareButton', () => {
  it('copies the data', () => {
    cy.mount(
      <ToastProvider>
        <RoomToolbarShareButton
          roomId="test-id"
          url="http://localhost:3000/rooms/test-id"
        />
      </ToastProvider>
    )

    cy.getCy('share-modal').should('not.exist')

    cy.getCy('share-button').click()
    cy.getCy('share-modal').should('exist')

    // TODO create tests for the actual copied values.
  })
})
