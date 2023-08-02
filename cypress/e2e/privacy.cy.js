
it.only('testa a página da política de privacidade de forma independente', () => {
    
        Cypress._.times(3, () => { //Para repetir os teste, neste caso 3 vezes

        cy.visit('./src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible') //verificando se o texto em questão é visivel
  
        })
})