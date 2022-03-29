/// <reference types="cypress"/>


// Mock -> Subs

describe('Work with alerts', () => {
    before(() =>{
        cy.visit('https://wcaquino.me/cypress/componentes.html') 
    })

    beforeEach(() =>{
        cy.reload() // .reload = F5, recarrega a página
    })

    it.only('Alert', () => {
        // cy.get('#alert').click()
        // Metodo on - Captura algum evento que acontece na página
        // cy.on('evento/propriedade da página', 'variável que recebe a 
        // propriedade seja mensagem ou objeto' => { assertiva })
        // cy.on('window:alert', msg => {
        //     console.log(msg)
        //     expect(msg).to.be.equal('Alert Simples')
        // })
        cy.clickAlert('#alert', 'Alert Simples')
    })

    it('Alert com mock', () => {
        // stub - Substitui uma função, armazena o uso e controla o comportamento
        const stub = cy.stub().as('alerta') // .as - Usado para dar nome a algum evento/operação 
        cy.on('window:alert', stub)
        cy.get('#alert').click().then( () => {
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        })
    })

    it('Confirm', () => {
        const stub = cy.stub().as('confirm')
        const stuba = cy.stub().as('alerta')
        cy.on('window:alert', stuba)
        cy.on('window:confirm', stub)
        cy.get('#confirm').click().then( () => {
            expect(stub.getCall(0)).to.be.calledWith('Confirm Simples')
            expect(stuba.getCall(0)).to.be.calledWith('Confirmado')
        })
    })

    it('Deny', () => {
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples') 
            return false
        })
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Negado')
        })
        cy.get('#confirm').click()
    })

    it('Prompt', () => {
        // Prompt - É tipo um alert com form para preencher um campo
        cy.window().then(win => {
            cy.stub(win, 'prompt').returns('42')
        }) 
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Era 42?') 
        })
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal(':D')
        })
        cy.get('#prompt').click()
    })

})