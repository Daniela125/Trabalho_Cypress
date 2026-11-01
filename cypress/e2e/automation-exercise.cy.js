/// <reference types="cypress" />

describe('Automation Exercise', () => {
  // Cadastro
  // cy.get() -> elementos baseados em css selector
  // cy.contains() -> elementos baseados em texto

  it('Cadastrar um novo usuário com sucesso', () => {
    const email = `pgats-aut-${Date.now()}@mail.com`

    cy.visit('https://www.automationexercise.com')
    cy.get('a[href*=login]').click()

    // Dados de cadastro inicial
    //cy.get('[data-qa="signup-name"]').type('PGATS Aut')
    const email = `pgats-aut-${Date.now()}@mail.com`;

cy.get('[data-qa="signup-name"]').type('PGATS Aut');
cy.get('[data-qa="signup-email"]')
  .should('be.enabled')
  .type(email);

cy.get('[data-qa="signup-button"]').click();

    cy.get('[data-qa="signup-email"]').type(email)
    cy.get('[data-qa="signup-button"]').click()

    // Dados da conta (radio -> check)
    cy.get('#id_gender2').check()
    cy.get('[data-qa="password"]').type('12345')

    // Selects -> select
    cy.get('[data-qa="days"]').select('1')
    cy.get('[data-qa="months"]').select('January')
    cy.get('[data-qa="years"]').select('1990')

    // Checkboxes -> check
    cy.get('#newsletter').check()
    cy.get('#optin').check()

    // Dados de endereço
    cy.get('[data-qa="first_name"]').type('PGATS')
    cy.get('[data-qa="last_name"]').type('Aut')
    cy.get('[data-qa="company"]').type('PGATS')
    cy.get('[data-qa="address"]').type('Rua Exemplo, 123')
    cy.get('[data-qa="address2"]').type('Apto 1')
    cy.get('[data-qa="country"]').select('Canada')
    cy.get('[data-qa="state"]').type('Ontario')
    cy.get('[data-qa="city"]').type('Toronto')
    cy.get('[data-qa="zipcode"]').type('12345')
    cy.get('[data-qa="mobile_number"]').type('11999999999')

    // Criar conta
    cy.get('[data-qa="create-account"]').click()

    // Asserções
    cy.contains('Account Created!').should('be.visible')
    cy.get('[data-qa="continue-button"]').click()
    cy.contains('Logged in as').should('be.visible')
  })
})