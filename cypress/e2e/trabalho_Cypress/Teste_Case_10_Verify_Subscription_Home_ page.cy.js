/// <reference types="cypress" />

const baseUrl = 'https://www.automationexercise.com'

describe('Test Case 10: Verify Subscription in home page', () => {
  it('Deve verificar a inscrição (subscription) na página inicial', () => {
    // 1-3. Abrir o site e validar a home
    cy.visit(baseUrl)
    cy.title().should('contain', 'Automation Exercise')

    // 4. Rolar até o rodapé
    cy.get('footer').scrollIntoView()

    // 5. Verificar o texto 'SUBSCRIPTION'
    cy.contains('h2', 'Subscription').should('be.visible')

    // 6. Informar o e-mail e clicar na seta
    cy.get('#susbscribe_email').type(`pgats-aut-${Date.now()}@mail.com`)
    cy.get('#subscribe').click()

    // 7. Verificar a mensagem de sucesso
    cy.contains('You have been successfully subscribed!').should('be.visible')
  })
})