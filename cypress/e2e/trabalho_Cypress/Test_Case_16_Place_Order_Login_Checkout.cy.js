const baseUrl = 'https://www.automationexercise.com'

// ---------------------------------------------------------------
// Test Case 16: Place Order: Login before Checkout
// Arquivo sugerido: Test_Case_16_Place_Order_Login_Before_Checkout.cy.js
// ---------------------------------------------------------------
describe('Test Case 16: Place Order - Login before Checkout', () => {
  it('Fazer login, adicionar produtos, finalizar o pedido e excluir a conta', () => {
    const nome = 'PGATS Aut'
    const email = `pgats-aut-${Date.now()}@mail.com`
    const senha = '12345'

    // PRÉ-CONDIÇÃO (fora da descrição): criar a conta pela interface e fazer logout
    cy.visit(baseUrl)
    cy.get('a[href="/login"]').click()
    cy.get('[data-qa="signup-name"]').type(nome)
    cy.get('[data-qa="signup-email"]').should('be.enabled').type(email)
    cy.get('[data-qa="signup-button"]').click()

    cy.get('#id_gender2').check()
    cy.get('[data-qa="password"]').type(senha, { log: false })
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
    cy.get('[data-qa="continue-button"]').click()
    cy.get('a[href="/logout"]').click()

    // 1-3. Abrir o site e validar a home
    cy.visit(baseUrl)
    cy.title().should('contain', 'Automation Exercise')

    // 4. Clicar em Signup / Login
    cy.get('a[href="/login"]').click()
    cy.contains('h2', 'Login to your account').should('be.visible')

    // 5. Preencher e-mail e senha e clicar em Login
    cy.get('[data-qa="login-email"]').type(email)
    cy.get('[data-qa="login-password"]').type(senha, { log: false })
    cy.get('[data-qa="login-button"]').click()

    // 6. Validar "Logged in as username"
    cy.contains('Logged in as').should('be.visible').and('contain', nome)

    // 7. Adicionar produtos ao carrinho
    cy.get('.features_items .product-image-wrapper').first().trigger('mouseover')
    cy.get('.features_items .product-image-wrapper').first()
      .find('.product-overlay .add-to-cart').click({ force: true })
    cy.contains('button', 'Continue Shopping').click()

    cy.get('.features_items .product-image-wrapper').eq(1).trigger('mouseover')
    cy.get('.features_items .product-image-wrapper').eq(1)
      .find('.product-overlay .add-to-cart').click({ force: true })
    cy.contains('button', 'Continue Shopping').click()

    // 8. Clicar em Cart
    cy.contains('a', 'Cart').click()

    // 9. Validar que a página do carrinho é exibida
    cy.url().should('include', '/view_cart')
    cy.get('#cart_info_table').should('be.visible')

    // 10. Clicar em Proceed To Checkout
    cy.contains('a', 'Proceed To Checkout').click()

    // 11. Validar Address Details e Review Your Order
    cy.contains('h2', 'Address Details').should('be.visible')
    cy.contains('h2', 'Review Your Order').should('be.visible')

    // 12. Comentário e Place Order
    cy.get('textarea[name="message"]').type('Pedido de teste automatizado com Cypress.')
    cy.contains('a', 'Place Order').click()

    // 13. Dados de pagamento
    cy.url().should('include', '/payment')
    cy.get('[data-qa="name-on-card"]').type(nome)
    cy.get('[data-qa="card-number"]').type('4111111111111111')
    cy.get('[data-qa="cvc"]').type('123')
    cy.get('[data-qa="expiry-month"]').type('12')
    cy.get('[data-qa="expiry-year"]').type('2030')

    // 14. Pay and Confirm Order
    cy.get('[data-qa="pay-button"]').click()

    // 15. Validar mensagem de sucesso (texto real exibido pelo site)
    cy.url().should('include', '/payment_done')
    cy.contains('Order Placed!').should('be.visible')
    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')

    // 16-17. Excluir a conta e validar "ACCOUNT DELETED!"
    cy.get('a[href="/delete_account"]').click()
    cy.get('[data-qa="account-deleted"]').should('be.visible')
    cy.contains('Account Deleted!').should('be.visible')
    cy.get('[data-qa="continue-button"]').click()
  })
})