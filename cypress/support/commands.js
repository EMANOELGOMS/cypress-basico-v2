// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//adicionar um novo comando ao cypress
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {


    cy.get('#firstName').type('Emanoel')
        .should('be.visible')
        .should('have.value','Emanoel')  //ter o valor emanoel       
    //Sobrenome
    cy.get('#lastName').type('Silva')        
    //email
    cy.get('#email').type('teste@teste.com')
    //Como posso ajudar?
    cy.get('#open-text-area').type('testess')

    //cy.get('button').contains('Enviar').click()
    cy.get('.button[type="submit"]').click()

})

//Cypress.Commands.add('')