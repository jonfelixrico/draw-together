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

  it('has a working ok button', () => {
    const handler = cy.spy().as('handler')
    cy.mount(
      <BasicModal
        show={true}
        title="Test"
        onOk={handler}
        ok={{
          label: 'Test label',
        }}
      >
        Test
      </BasicModal>
    )

    cy.getCy('ok').should('exist').click()
    cy.get('@handler').should('have.been.called')
  })

  it('has a working cancel button', () => {
    const handler = cy.spy().as('handler')
    cy.mount(
      <BasicModal
        show={true}
        title="Test"
        onCancel={handler}
        cancel={{
          label: 'Test label',
        }}
      >
        Test
      </BasicModal>
    )

    cy.getCy('cancel').should('exist').click()
    cy.get('@handler').should('have.been.called')
  })
})
