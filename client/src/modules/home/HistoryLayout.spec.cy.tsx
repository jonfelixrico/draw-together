import HistoryLayout from '@/modules/home/HistoryLayout'

describe('HistoryLayout', () => {
  it('prompts for clear', () => {
    const clearFn = cy.spy().as('clear')
    cy.mount(<HistoryLayout onClearConfirm={clearFn} />)

    cy.getCy('clear-confirm-modal').should('not.exist')

    cy.getCy('clear').click()
    cy.getCy('clear-confirm-modal').should('exist')

    // check cancelling behavior
    cy.getCy('clear-confirm-modal').findCy('cancel').click()
    cy.getCy('clear-confirm-modal').should('not.exist')

    // check actual behavior
    cy.getCy('clear').click()
    cy.getCy('clear-confirm-modal').should('exist')
    cy.getCy('clear-confirm-modal').findCy('ok').click()
    cy.get('@clear').should('have.been.calledOnce')
  })

  it('shows content', () => {
    cy.mount(
      <HistoryLayout onClearConfirm={() => {}}>
        <div data-cy="content">Content</div>
      </HistoryLayout>
    )

    cy.getCy('content').should('exist')
    cy.getCy('empty-notice').should('not.exist')
  })

  it('shows empty notice instead of content', () => {
    cy.mount(
      <HistoryLayout onClearConfirm={() => {}} noEntries>
        <div data-cy="content">Content</div>
      </HistoryLayout>
    )

    cy.getCy('content').should('not.exist')
    cy.getCy('empty-notice').should('exist')
  })
})
