import BasicModal from '@/modules/common/BasicModal'

describe('BasicModal', () => {
  it('should be dismissable via the close button', () => {
    const hideFn = cy.spy().as('hideFn')
    cy.mount(
      <BasicModal show={true} title="Test" onHide={hideFn}>
        Test
      </BasicModal>
    )

    cy.getCy('header').find('button').click()
    cy.get('@hideFn').should('have.been.called')
  })

  it('should show basic content', () => {
    cy.mount(
      <BasicModal show={true} title="Title">
        Content
      </BasicModal>
    )

    cy.getCy('title').contains('Title')
    cy.getCy('body').contains('Content')
  })
})
