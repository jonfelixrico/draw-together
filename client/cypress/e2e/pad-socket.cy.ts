import { createRoomSocket } from '@/modules/common/room-socket.util'
import { nanoid } from 'nanoid'
import { Socket } from 'socket.io-client'
import {
  PAD_SOCKET_EVENT,
  PadRequest,
} from '@/modules/pad-socket/pad-socket.types'

describe('pad-socket', () => {
  let roomId: string
  const getRoomId = () => roomId as string

  let socket: Socket
  const getSocket = () => socket as Socket

  function sendPadMessage(msg: PadRequest) {
    getSocket().emit(PAD_SOCKET_EVENT, msg)
  }

  const otherUserId = nanoid()

  before(() => {
    cy.request({
      url: '/api/room',
      method: 'POST',
    })
      .then((response) => {
        roomId = response.body.id
      })
      .then(() =>
        createRoomSocket({
          clientId: otherUserId,
          name: 'Other user',
          roomId: getRoomId(),
        })
      )
      .then((s: Socket) => {
        socket = s
      })
  })

  after(() => {
    getSocket().disconnect()
  })

  const pathId = nanoid()

  it('displays whats being drawn', () => {
    let counter = 0
    const points = [
      {
        x: 10,
        y: 10,
      },
    ]

    cy.visit(`/rooms/${getRoomId()}`)
    /*
     * This wait is to let the pad be able to do the catch-up (or at least partially)
     * Without this, local tests can fail
     * TODO remove this once we've found a way to check if catch-up is done
     */
    cy.wait(1_000)

    cy.getCy('pad')
      .should('exist')
      .then(() => {
        sendPadMessage({
          PATH_DRAFT_START: {
            id: pathId,
            color: '#000000',
            counter: ++counter,
            points,
            thickness: 5,
            timestamp: Date.now(),
          },
        })
      })

    cy.get(`[data-path-id=${pathId}]`)
      .should('exist')
      .findCy('rendered-path')
      .should('have.attr', 'data-points-length', 1)
      .then(() => {
        while (points.length < 50) {
          const lastPt = points[points.length - 1]
          const point = {
            x: lastPt.x + 1,
            y: lastPt.y + 1,
          }

          points.push(point)

          sendPadMessage({
            PATH_DRAFT_MOVE: {
              id: pathId,
              counter: ++counter,
              point,
            },
          })
        }

        sendPadMessage({
          PATH_CREATE: {
            id: pathId,
            color: '#000000',
            points,
            thickness: 5,
            timestamp: Date.now(),
          },
        })
      })

    cy.get(`[data-path-id=${pathId}]`)
      .findCy('rendered-path')
      .should('have.attr', 'data-points-length', 50)
  })

  it('shows pre-existing drawings in the room on join/rejoin', async () => {
    cy.visit(`/rooms/${getRoomId()}`)
    cy.getCy('pad').should('exist')

    cy.get(`[data-path-id=${pathId}]`)
      .findCy('rendered-path')
      .should('have.attr', 'data-points-length', 50)
  })
})
