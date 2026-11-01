/// <reference types="cypress" />

const baseUrl = 'https://www.automationexercise.com'

describe('Test Case 3: Login User with incorrect email and password', () => {
  it('Deve exibir erro ao logar com e-mail e senha incorretos', () => {
    // 1 e 2. Abrir o navegador e acessar a URL
    cy.visit(baseUrl)

    // 3. Verificar que a home está visível
    cy.get('img[alt="Website for automation practice"]').should('be.visible')
    cy.title().should('include', 'Automation Exercise')

    // 4. Clicar em 'Signup / Login'
    // 5. Verificar 'Login to your account'
    cy.contains('Login to your account').should('be.visible')

    // 6. Informar e-mail e senha incorretos
    cy.get('[data-qa="login-email"]').type(`invalido-${Date.now()}@mail.com`)
    cy.get('[data-qa="login-password"]').type('senhaErrada123')

    // 7. Clicar em 'login'
    cy.get('[data-qa="login-button"]').click()

    // 8. Verificar a mensagem de erro
    cy.contains('Your email or password is incorrect!').should('be.visible')
  })
})