// Test Case 2: Login User with correct email and password
// Arquivo sugerido: Test_Case_02_Login_User.cy.js
// ---------------------------------------------------------------
describe('Test Case 2: Login User with correct email and password', () => {
  const nome = 'PGATS Login'
  const senha = '12345'
  let email

  // Pré-condição: cria a conta via API para o teste não depender do Test Case 1
  beforeEach(() => {
    email = `pgats-login-${Date.now()}@mail.com`

    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/createAccount`,
      form: true,
      body: {
        name: nome,
        email,
        password: senha,
        title: 'Mrs',
        birth_date: '1',
        birth_month: 'January',
        birth_year: '1990',
        firstname: 'PGATS',
        lastname: 'Login',
        company: 'PGATS',
        address1: 'Rua Exemplo, 123',
        address2: 'Apto 1',
        country: 'Canada',
        zipcode: '12345',
        state: 'Ontario',
        city: 'Toronto',
        mobile_number: '11999999999'
      }
    }).then((res) => {
      expect(res.body).to.contain('User created!')
    })
  })

  it('Realizar login com e-mail e senha corretos e excluir a conta', () => {
    // 1-3. Abrir o site e validar a home
    cy.visit(baseUrl)
    cy.title().should('contain', 'Automation Exercise')

    // 4-5. Ir para Signup / Login e validar "Login to your account"
    cy.get('a[href="/login"]').click()
    cy.contains('h2', 'Login to your account').should('be.visible')

    // 6-7. Preencher credenciais e clicar em Login
    cy.get('[data-qa="login-email"]').type(email)
    cy.get('[data-qa="login-password"]').type(senha, { log: false })
    cy.get('[data-qa="login-button"]').click()

    // 8. Validar "Logged in as username"
    cy.contains('Logged in as').should('be.visible').and('contain', nome)

    // 9-10. Excluir a conta e validar "ACCOUNT DELETED!"
    cy.get('a[href="/delete_account"]').click()
    cy.get('[data-qa="account-deleted"]').should('be.visible')
    cy.contains('Account Deleted!').should('be.visible')
  })
})