/// <reference types="cypress" />

const baseUrl = 'https://www.automationexercise.com'

describe('Test Case 4: Logout User', () => {
  const email = `pgats-aut-${Date.now()}@mail.com`
  const password = '12345'

  before(() => {
    // Pré-condição: cria o usuário via API
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/createAccount`,
      form: true,
      body: {
        name: 'PGATS Aut',
        email,
        password,
        title: 'Mrs',
        birth_date: '1',
        birth_month: '1',
        birth_year: '1990',
        firstname: 'PGATS',
        lastname: 'Aut',
        company: 'PGATS',
        address1: 'Rua Exemplo, 123',
        address2: 'Apto 1',
        country: 'Canada',
        zipcode: '12345',
        state: 'Ontario',
        city: 'Toronto',
        mobile_number: '11999999999'
      }
    })
  })

  it('Deve fazer logout com sucesso', () => {
    // 1 e 2. Acessar a URL
    cy.visit(baseUrl)

    // 3. Verificar que a home está visível
    cy.title().should('include', 'Automation Exercise')

    // 4. Clicar em 'Signup / Login'
    cy.contains('a', 'Signup / Login').click()

    // 5. Verificar 'Login to your account'
    cy.contains('Login to your account').should('be.visible')

    // 6. Informar e-mail e senha corretos
    cy.get('[data-qa="login-email"]').type(email)
    cy.get('[data-qa="login-password"]').type(password)

    // 7. Clicar em 'login'
    cy.get('[data-qa="login-button"]').click()

    // 8. Verificar 'Logged in as username'
    cy.contains('Logged in as').should('be.visible')

    // 9. Clicar em 'Logout'
    cy.contains('a', 'Logout').click()

    // 10. Verificar que voltou para a página de login
    cy.url().should('include', '/login')
    cy.contains('Login to your account').should('be.visible')
  })
})