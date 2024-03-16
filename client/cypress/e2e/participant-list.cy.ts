import { LS_UUID } from "@/cypress/support/e2e-consts"
import { Socket } from 'socket.io-client'
import { createRoomSocket } from '@/utils/room-socket.util'
import { nanoid } from 'nanoid'

describe('participant-list', () => {
  let roomId: string
  const getRoomId = () => roomId as string

  before(() => {
    cy.request({
      url: '/api/room',
      method: 'POST',
    })
      .then(response => {
        roomId = response.body.id
      })
  })

  it('includes the user who joined to the user list', () => {
    cy.visit(`/rooms/${getRoomId()}`)
    cy.dataCy('participants').find(`[data-cy=${LS_UUID}]`).should('exist')
  })

  it('shows join/leave activity of other users', () => {
    cy.visit(`/rooms/${getRoomId()}`)
    
    const otherUserId = nanoid()
    // other user shouldn't be connected yet
    cy.dataCy('participants').find(`[data-cy=${otherUserId}]`).should('not.exist')

    cy.wrap(createRoomSocket({
      clientId: otherUserId,
      name: 'Other user',
      roomId
    })).then((roomSocket: Socket) => {
      // at this point, other user has joined
      cy.dataCy('participants').find(`[data-cy=${otherUserId}]`).should('exist')

      roomSocket.disconnect()
      // since we disconnected the socket for the other user, their name should be gone again
      cy.dataCy('participants').find(`[data-cy=${otherUserId}]`).should('not.exist')
    })
  })
})
