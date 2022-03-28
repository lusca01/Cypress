/// <reference types="cypress"/>

describe('Work with alerts', () => {
    before(() =>{
        cy.visit('https://wcaquino.me/cypress/componentes.html') 
    })

    beforeEach(() =>{
        cy.reload()
    })

    it('Validando mensagens', () => {
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        cy.get('#formCadastrar').click().then( () => {
            expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio')
        })
        cy.get('#formNome').type('Teste')
        cy.get('#formCadastrar').click().then( () => {
            expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio')
        })
        cy.get('#formSobrenome').type('Testado')
        cy.get('#formCadastrar').click().then( () => {
            expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio')
        })
        cy.get('#formSexoMasc').click()
        cy.get('#formCadastrar').click().then( () => {
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
        })

    })

})