import BasicButtonTriggeredModal from '@/modules/common/BasicButtonTriggeredModal'

describe('BasicButtonTriggeredModal', () => {
  it('shows the modal on click', () => {
    cy.mount(
      <BasicButtonTriggeredModal
        buttonProps={{
          label: 'Open Modal',
        }}
        buttonAttrs={{
          'data-cy': 'button',
        }}
        modalProps={{
          title: 'Modal',
        }}
        modalAttrs={{
          'data-cy': 'modal',
        }}
      >
        <div data-cy="content">Content</div>
      </BasicButtonTriggeredModal>
    )

    cy.getCy('modal').should('not.exist')

    cy.getCy('button').click()
    cy.getCy('modal').should('exist')

    cy.getCy('content').contains('Content')
    cy.getCy('modal').findCy('header').find('button').click()
    cy.getCy('modal').should('not.exist')
  })
})
