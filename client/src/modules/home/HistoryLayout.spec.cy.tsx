import HistoryLayout from '@/modules/home/HistoryLayout'

describe('HistoryLayout', () => {
  it('prompts for clear', () => {
    const clearFn = cy.spy().as('clear')
    cy.mount(<HistoryLayout onDeleteConfirm={clearFn} />)

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
})
