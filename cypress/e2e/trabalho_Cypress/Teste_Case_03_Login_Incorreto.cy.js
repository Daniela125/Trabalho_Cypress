/// <reference types="cypress" />

Cypress.on('uncaught:exception', () => false)

describe('Test Case 3: Login User with incorrect email and password', () => {
  beforeEach(() => {
    cy.intercept({ hostname: /googlesyndication|doubleclick|adtrafficquality/ }, { statusCode: 204 })
  })

  it('Deve exibir erro ao logar com e-mail e senha incorretos', () => {
    cy.visit('https://www.automationexercise.com')

    cy.get('img[alt="Website for automation practice"]').should('be.visible')
    cy.title().should('include', 'Automation Exercise')

    cy.contains('a', 'Signup / Login').click()
    cy.contains('Login to your account').should('be.visible')

    cy.get('[data-qa="login-email"]').type(`invalido-${Date.now()}@mail.com`)
    cy.get('[data-qa="login-password"]').type('senhaErrada123')
    cy.get('[data-qa="login-button"]').click()

    cy.contains('Your email or password is incorrect!').should('be.visible')
  })
})