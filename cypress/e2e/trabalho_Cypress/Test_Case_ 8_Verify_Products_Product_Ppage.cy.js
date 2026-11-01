
const baseUrl = 'https://www.automationexercise.com'

describe('Test Case: View Product Detail', () => {
  it('Deve navegar para a página de produtos e validar os detalhes do primeiro produto', () => {
    // 1-3. Abrir o site e validar a home
    cy.visit(baseUrl)
    cy.title().should('contain', 'Automation Exercise')

    // 4-5. Clicar em Products e validar ALL PRODUCTS
    cy.contains('a', 'Products').click()
    cy.contains('h2', 'All Products').should('be.visible')

    // 6. Verificar se a lista de produtos está visível
    cy.get('.features_items').should('be.visible')

    // 7. Clicar em View Product do primeiro produto
    cy.get('.features_items .product-image-wrapper')
      .first()
      .contains('View Product')
      .click()

    // 8. Validar que está na página de detalhes do produto
    cy.url().should('include', '/product_details/')

    // 9. Validar os detalhes do produto
    cy.get('.product-information').within(() => {
      cy.get('h2').should('be.visible') // nome do produto
      cy.contains('Category:').should('be.visible')
      cy.contains('Rs.').should('be.visible') // preço
      cy.contains('Availability:').should('be.visible')
      cy.contains('Condition:').should('be.visible')
      cy.contains('Brand:').should('be.visible')
    })
  })
})