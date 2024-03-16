// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import "cypress-localstorage-commands"
import { LS_USERNAME, LS_UUID } from './e2e-consts'

// Alternatively you can use CommonJS syntax:
// require('./commands')

beforeEach(() => {
  cy.setLocalStorage('username', LS_USERNAME)
  cy.setLocalStorage('uuid', LS_UUID)
})
