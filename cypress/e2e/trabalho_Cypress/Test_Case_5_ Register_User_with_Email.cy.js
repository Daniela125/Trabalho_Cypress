/// <reference types="cypress" />

const baseUrl = 'https://www.automationexercise.com'

describe('Test Case 5: Register User with existing email', () => {
 beforeEach(() => {
  cy.intercept({ url: /googlesyndication|doubleclick|adtrafficquality|googleads/ }, { statusCode: 204, body: '' })
})
 
  // Ignora erros de scripts de terceiros (anúncios)
  Cypress.on('uncaught:exception', () => false)

  it('Deve exibir erro ao cadastrar com e-mail já existente', () => {
    const nome = 'PGATS Aut'
    const email = `pgats-aut-${Date.now()}@mail.com`

    // Pré-condição: cadastrar o usuário pela interface
    cy.visit(baseUrl)
    cy.get('a[href="/login"]').click()
    cy.get('[data-qa="signup-name"]').type(nome)
    cy.get('[data-qa="signup-email"]').type(email)
    cy.get('[data-qa="signup-button"]').click()

    cy.contains('Enter Account Information').should('be.visible')
    cy.get('#id_gender2').check()
    cy.get('[data-qa="password"]').type('12345', { log: false })
    cy.get('[data-qa="days"]').select('1')
    cy.get('[data-qa="months"]').select('January')
    cy.get('[data-qa="years"]').select('1990')
    cy.get('[data-qa="first_name"]').type('PGATS')
    cy.get('[data-qa="last_name"]').type('Aut')
    cy.get('[data-qa="address"]').type('Rua Exemplo, 123')
    cy.get('[data-qa="country"]').select('Canada')
    cy.get('[data-qa="state"]').type('Ontario')
    cy.get('[data-qa="city"]').type('Toronto')
    cy.get('[data-qa="zipcode"]').type('12345')
    cy.get('[data-qa="mobile_number"]').type('11999999999')
    cy.get('[data-qa="create-account"]').click()
    cy.get('[data-qa="account-created"]').should('be.visible')
    cy.get('[data-qa="continue-button"]').click()

    // Sair para poder tentar um novo cadastro
    cy.contains('a', 'Logout').click()
    cy.url().should('include', '/login') // aguarda o logout terminar

    // ---------------- Test Case 5 ----------------
    cy.visit(baseUrl)
    cy.title().should('contain', 'Automation Exercise')

    // Já estamos deslogados; o link pode ser coberto por anúncio -> force
    cy.get('a[href="/login"]').first().should('exist').click({ force: true })

    cy.contains('h2', 'New User Signup!').should('be.visible')

    cy.get('[data-qa="signup-name"]').type(nome)
    cy.get('[data-qa="signup-email"]').type(email)
    cy.get('[data-qa="signup-button"]').click()

    cy.contains('Email Address already exist!').should('be.visible')
  })
})