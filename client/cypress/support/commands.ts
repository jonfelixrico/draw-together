/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * This is a parent command.
       *
       * @example cy.getCy('greeting')
       */
      getCy(value: string): Chainable<JQuery<HTMLElement>>

      /**
       * Custom command to select DOM element by data-cy attribute.
       * This is a child command.
       *
       * @example cy.getCy('greeting-parent').getCy('greeting')
       */
      findCy(value: string): Chainable<JQuery<HTMLElement>>
    }
  }
}

Cypress.Commands.add('getCy', (value) => {
  return cy.get(`[data-cy=${value}]`)
})

Cypress.Commands.add(
  'findCy',
  { prevSubject: true },
  (subject: JQuery<HTMLElement>, value: string) => {
    return cy.wrap(subject).find(`[data-cy=${value}]`)
  }
)

/*
 * This is needed to prevent Cypress from failing the test if uncaught exceptions are found, i.e.
 * uncaught HTTP errors from API calls
 */
Cypress.on('uncaught:exception', () => {
  return false
})

// Without this, TS will complain
export {}
