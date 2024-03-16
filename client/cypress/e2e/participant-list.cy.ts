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
})
