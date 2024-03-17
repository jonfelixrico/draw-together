import { createRoomSocket } from "@/utils/room-socket.util"
import { nanoid } from "nanoid"
import { Socket } from "socket.io-client"
import { PAD_SOCKET_EVENT, PadRequest } from '@/typings/pad-socket.types'

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
    }).then((response) => {
      roomId = response.body.id
    
      cy.wrap(
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
  })

  after(() => {
    getSocket().disconnect()
  })

  it('displays whats being drawn', async () => {
    cy.visit(`/rooms/${getRoomId()}`)
    cy.dataCy('pad').should('exist')

    await new Promise(resolve => cy.wait(1000).then(resolve))

    const pathId = nanoid()
    let counter = 0
    const points = [{
      x: 10,
      y: 10
    }]
    
    sendPadMessage({
      PATH_DRAFT_START: {
        id: pathId,
        color: '#000000',
        counter: ++counter,
        points,
        thickness: 5,
        timestamp: Date.now()
      }
    })

    for (let i = 1; i <= 50; i++) {
      await new Promise(resolve => cy.wait(10).then(resolve))
      const point = {
        x: 10 + i,
        y: 10 + i
      }

      sendPadMessage({
        PATH_DRAFT_MOVE: {
          id: pathId,
          counter: ++counter,
          point
        }
      })

      points.push(point)
    }

    sendPadMessage({
      PATH_CREATE: {
        id: pathId,
        color: '#000000',
        points,
        thickness: 5,
        timestamp: Date.now(),
      }
    })
  })
})