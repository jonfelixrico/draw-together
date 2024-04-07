import BasicModal from '@/modules/common/BasicModal'

describe('BasicModal', () => {
  it('should be dismissable via the close button', () => {
    const hideFn = cy.spy().as('hideFn')
    cy.mount(
      <BasicModal
        show={true}
        title="Test"
        data-cy="basic-modal"
        onHide={hideFn}
      >
        Test
      </BasicModal>
    )

    cy.getCy('basic-modal').should('exist')
    cy.getCy('header').find('button').click()
    cy.get('@hideFn').should('have.been.called')
  })
})
