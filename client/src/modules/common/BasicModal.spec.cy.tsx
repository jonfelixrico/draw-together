import BasicModal from '@/modules/common/BasicModal'

describe('BasicModal', () => {
  it('should be dismissable via the close button', () => {
    cy.mount(
      <BasicModal show={true} title="Test" data-cy="basic-modal">
        Test
      </BasicModal>
    )

    cy.getCy('close').click()
    cy.getCy('basic-modal').should('exist')
  })
})
