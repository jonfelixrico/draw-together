import { LS_UUID } from '@/cypress/support/e2e-consts'
import { Socket } from 'socket.io-client'
import { createRoomSocket } from '@/modules/common/room-socket.util'
import { nanoid } from 'nanoid'

describe('participant-list', () => {
  let roomId: string
  const getRoomId = () => roomId as string

  const otherUserId = nanoid()

  before(() => {
    cy.request({
      url: '/api/room',
      method: 'POST',
    }).then((response) => {
      roomId = response.body.id
    })
  })

  let socket: Socket | null = null
  function startSocket() {
    return cy
      .wrap(
        createRoomSocket({
          clientId: otherUserId,
          name: 'Other user',
          roomId: getRoomId(),
        })
      )
      .then((s) => {
        socket = s as Socket
        return s
      })
  }

  afterEach(() => {
    if (socket?.connected) {
      socket.disconnect()
    }

    socket = null
  })

  it('includes the user who joined to the user list', () => {
    cy.visit(`/rooms/${getRoomId()}`)
    cy.getCy('participants').find(`[data-cy=${LS_UUID}]`).should('exist')
  })

  it('shows join/leave activity of other users', () => {
    cy.visit(`/rooms/${getRoomId()}`)

    // other user shouldn't be connected yet
    cy.getCy('participants').findCy(otherUserId).should('not.exist')

    startSocket().then((s) => {
      const socket = s as Socket
      // at this point, other user has joined
      cy.getCy('participants')
        .findCy(otherUserId)
        .findCy('online-badge')
        .should('exist')
        .then(() => {
          socket.disconnect()
        })

      // since we disconnected the socket for the other user, their name should show offline
      cy.getCy('participants')
        .findCy(otherUserId)
        .findCy('offline-badge')
        .should('exist')
    })
  })

  it('should show already-connected other users in the list', () => {
    startSocket().then(() => {
      cy.visit(`/rooms/${getRoomId()}`)

      // at this point, other user has joined
      cy.getCy('participants').find(`[data-cy=${otherUserId}]`).should('exist')
    })
  })
})
