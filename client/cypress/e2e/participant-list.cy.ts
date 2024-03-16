import { LS_UUID } from "@/cypress/support/e2e-consts"

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
    cy.dataCy('participants').find(`[data-cy=${LS_UUID}]`)
  })
})
