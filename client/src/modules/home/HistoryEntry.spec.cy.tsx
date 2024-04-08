import HistoryEntry from '@/modules/home/HistoryEntry'

describe('HistoryListEntry', () => {
  it('prompts for delete', () => {
    const deleteFn = cy.spy().as('delete')
    cy.mount(
      <HistoryEntry
        onDelete={deleteFn}
        room={{
          id: 'test',
          name: 'Test',
          lastOpened: Date.now(),
        }}
      />
    )

    cy.getCy('delete-entry-modal').should('not.exist')

    cy.getCy('delete').click()
    cy.getCy('delete-entry-modal').should('exist')

    // check cancelling behavior
    cy.getCy('delete-entry-modal').findCy('cancel').click()
    cy.getCy('delete-entry-modal').should('not.exist')

    // check actual behavior
    cy.getCy('delete').click()
    cy.getCy('delete-entry-modal').should('exist')
    cy.getCy('delete-entry-modal').findCy('ok').click()
    cy.get('@delete').should('have.been.calledOnce')
  })
})
