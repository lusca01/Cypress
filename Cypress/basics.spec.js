/// <reference types="cypress"/>
describe('Cypress basics', () => {
    it.only('Should vist a page and assert title', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')   
        
        //cy.pause()
        
        // const title = cy.title()
        // console.log(title)

        cy.title().should('be.equal','Campo de Treinamento')
        cy.title().should('contain','Campo')//.debug()

        cy.title()
            .should('be.equal','Campo de Treinamento')
            .and('contain','Campo')

        cy.title().then(title => {
            console.log(title)
        })

        
    })

    it('Should find and interact with an element', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html') 

        cy.get('#buttonSimple')
                .click()
                .should('have.value','Obrigado!')
    })
})