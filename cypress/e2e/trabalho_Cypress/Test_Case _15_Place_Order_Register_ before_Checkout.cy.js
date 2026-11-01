const baseUrl = 'https://www.automationexercise.com'

// ---------------------------------------------------------------
// Test Case 14: Place Order: Register while Checkout
// Arquivo sugerido: Test_Case_14_Place_Order_Register_While_Checkout.cy.js
// ---------------------------------------------------------------
describe('Test Case 14: Place Order - Register while Checkout', () => {
  it('Cadastrar, adicionar produtos ao carrinho, finalizar o pedido e excluir a conta', () => {
    const nome = 'PGATS Aut'
    const email = `pgats-aut-${Date.now()}@mail.com`

    // 1-3. Abrir o site e validar a home
    cy.visit(baseUrl)
    cy.title().should('contain', 'Automation Exercise')

    // 4. Clicar em Signup / Login
    cy.get('a[href="/login"]').click()
    cy.contains('h2', 'New User Signup!').should('be.visible')

    // 5. Preencher os dados do Signup e criar a conta
    cy.get('[data-qa="signup-name"]').type(nome)
    cy.get('[data-qa="signup-email"]').should('be.enabled').type(email)
    cy.get('[data-qa="signup-button"]').click()

    cy.contains('Enter Account Information').should('be.visible')
    cy.get('#id_gender2').check()
    cy.get('[data-qa="password"]').type('12345', { log: false })
    cy.get('[data-qa="days"]').select('1')
    cy.get('[data-qa="months"]').select('January')
    cy.get('[data-qa="years"]').select('1990')
    cy.get('#newsletter').check()
    cy.get('#optin').check()

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
    cy.get('[data-qa="create-account"]').click()

    // 6. Validar "ACCOUNT CREATED!" e clicar em Continue
    cy.get('[data-qa="account-created"]').should('be.visible')
    cy.contains('Account Created!').should('be.visible')
    cy.get('[data-qa="continue-button"]').click()

    // 7. Validar "Logged in as username"
    cy.contains('Logged in as').should('be.visible').and('contain', nome)

    // 8. Adicionar produtos ao carrinho
    cy.get('.features_items .product-image-wrapper').first().trigger('mouseover')
    cy.get('.features_items .product-image-wrapper').first()
      .find('.product-overlay .add-to-cart').click({ force: true })
    cy.contains('button', 'Continue Shopping').click()

    cy.get('.features_items .product-image-wrapper').eq(1).trigger('mouseover')
    cy.get('.features_items .product-image-wrapper').eq(1)
      .find('.product-overlay .add-to-cart').click({ force: true })
    cy.contains('button', 'Continue Shopping').click()

    // 9. Clicar em Cart
    cy.contains('a', 'Cart').click()

    // 10. Validar que a página do carrinho é exibida
    cy.url().should('include', '/view_cart')
    cy.get('#cart_info_table').should('be.visible')
    cy.get('#cart_info_table tbody tr').should('have.length.at.least', 1)

    // 11. Clicar em Proceed To Checkout
    cy.contains('a', 'Proceed To Checkout').click()

    // 12. Validar Address Details e Review Your Order
    cy.url().should('include', '/checkout')
    cy.contains('h2', 'Address Details').should('be.visible')
    cy.contains('h2', 'Review Your Order').should('be.visible')
    cy.get('#address_delivery').should('be.visible')
    cy.get('#address_invoice').should('be.visible')

    // 13. Comentário e Place Order
    cy.get('textarea[name="message"]').type('Pedido de teste automatizado com Cypress.')
    cy.contains('a', 'Place Order').click()

    // 14. Dados de pagamento
    cy.url().should('include', '/payment')
    cy.get('[data-qa="name-on-card"]').type('PGATS Aut')
    cy.get('[data-qa="card-number"]').type('4111111111111111')
    cy.get('[data-qa="cvc"]').type('123')
    cy.get('[data-qa="expiry-month"]').type('12')
    cy.get('[data-qa="expiry-year"]').type('2030')

    // 15. Pay and Confirm Order
    cy.get('[data-qa="pay-button"]').click()

       // 16. Validar mensagem de sucesso do pedido
    cy.url().should('include', '/payment_done')
    cy.get('[data-qa="order-placed"]').should('be.visible')
    cy.contains('Order Placed!').should('be.visible')
    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')
  })
})