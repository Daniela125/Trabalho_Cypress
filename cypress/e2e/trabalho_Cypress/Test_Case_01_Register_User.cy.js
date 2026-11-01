

// ---------------------------------------------------------------
// Test Case 1: Register User
// Arquivo sugerido: Test_Case_01_Register_User.cy.js
// ---------------------------------------------------------------
describe('Test Case 1: Register User', () => {
  it('Cadastrar um novo usuário com sucesso e excluir a conta', () => {
    const nome = 'PGATS Aut'
    const email = `pgats-aut-${Date.now()}@mail.com`

    // 1-3. Abrir o site e validar a home
    cy.visit('/')
    cy.title().should('contain', 'Automation Exercise')

    // 4-5. Ir para Signup / Login e validar "New User Signup!"
    cy.get('a[href="/login"]').click()
    cy.contains('h2', 'New User Signup!').should('be.visible')

    // 6-7. Preencher nome e e-mail e clicar em Signup
    cy.get('[data-qa="signup-name"]').type(nome)
    cy.get('[data-qa="signup-email"]').should('be.enabled').type(email)
    cy.get('[data-qa="signup-button"]').click()

    // 8. Validar "ENTER ACCOUNT INFORMATION"
    cy.contains('Enter Account Information').should('be.visible')

    // 9-11. Dados da conta e preferências
    cy.get('#id_gender2').check()
    cy.get('[data-qa="password"]').type('12345', { log: false })
    cy.get('[data-qa="days"]').select('1')
    cy.get('[data-qa="months"]').select('January')
    cy.get('[data-qa="years"]').select('1990')
    cy.get('#newsletter').check()
    cy.get('#optin').check()

    // 12. Endereço
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

    // 13-14. Criar conta e validar "ACCOUNT CREATED!"
    cy.get('[data-qa="create-account"]').click()
    cy.get('[data-qa="account-created"]').should('be.visible')
    cy.contains('Account Created!').should('be.visible')

    // 15-16. Continuar e validar "Logged in as username"
    cy.get('[data-qa="continue-button"]').click()
    cy.contains('Logged in as').should('be.visible').and('contain', nome)

    // 17-18. Excluir a conta e validar "ACCOUNT DELETED!"
    cy.get('a[href="/delete_account"]').click()
    cy.get('[data-qa="account-deleted"]').should('be.visible')
    cy.contains('Account Deleted!').should('be.visible')
    cy.get('[data-qa="continue-button"]').click()
  })
})