import RoomToolbarLeaveButton from '@/modules/room/RoomToolbarLeaveButton'

describe('RoomToolbarLeaveButton', () => {
  it('prompts the user for the exit', () => {
    const handler = cy.spy().as('handler')
    cy.mount(<RoomToolbarLeaveButton onLeaveConfirm={handler} />)

    cy.getCy('leave-modal').should('not.exist')

    cy.getCy('leave-button').click()
    cy.getCy('leave-modal').should('exist')

    cy.getCy('leave-modal').findCy('ok').click()
    cy.getCy('leave-modal').should('not.exist')
    cy.get('@handler').should('have.been.called')
  })

  it('handles aborts', () => {
    const handler = cy.spy().as('handler')
    cy.mount(<RoomToolbarLeaveButton onLeaveConfirm={handler} />)

    cy.getCy('leave-button').click()

    cy.getCy('leave-modal').findCy('cancel').click()
    cy.getCy('leave-modal').should('not.exist')
    cy.get('@handler').should('not.have.been.called')
  })
})
