/// <reference types="cypress" />

const baseUrl = 'https://www.automationexercise.com'

describe('Test Case 5: Register User with existing email', () => {
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

    // ---------------- Test Case 5 ----------------
    // 1 e 2. Abrir o navegador e acessar a URL
    cy.visit(baseUrl)

    // 3. Verificar que a home está visível
    cy.title().should('contain', 'Automation Exercise')

    // 4. Clicar em 'Signup / Login'
    cy.get('a[href="/login"]').click()

    // 5. Verificar 'New User Signup!'
    cy.contains('h2', 'New User Signup!').should('be.visible')

    // 6. Informar nome e e-mail já cadastrado
    cy.get('[data-qa="signup-name"]').type(nome)
    cy.get('[data-qa="signup-email"]').type(email)

    // 7. Clicar em 'Signup'
    cy.get('[data-qa="signup-button"]').click()

    // 8. Verificar a mensagem de erro
    cy.contains('Email Address already exist!').should('be.visible')
  })
})