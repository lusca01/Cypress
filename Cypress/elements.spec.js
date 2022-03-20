/// <reference types="cypress"/>

describe('Work with basic elements', () => {
    //before - Executa o comando antes de todos os testes/'it'
    //beforeEach - Executa o comando antes de cada um dos testes
    before(() =>{
        cy.visit('https://wcaquino.me/cypress/componentes.html') 
    })

    beforeEach(() =>{
        cy.reload() // .reload = F5, recarrega a página
    })

    it('Text', () =>{  
        cy.get('body').should('contain', 'Cuidado')// Procura um campo contido no body que tenha String 'Cuidado'
        cy.get('span').should('contain', 'Cuidado')// Procura um campo contido nas span's que tenha String 'Cuidado'
        cy.get('.facilAchar').should('contain', 'Cuidado')// Procura um campo que possua a classe 'facilAchar' que tenha String 'Cuidado'
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')// Procura um campo que possua a classe 'facilAchar' que tenha String 'Cuidado onde clica, muitas armadilhas...'
    })

    it('Links', () => {
        cy.contains('Voltar').click()// Procura no página algum elemento que contém String 'Voltar' e Clica nele
        cy.get('#resultado').should('have.text', 'Voltou!')// Procura na página algum elemento com id 'Resultado' que tenha o texto 'Voltou!'

        cy.reload()// Recarrega a página
        cy.get('a').contains('Voltar').click()// Procura na página os elementos 'a'(links) que possua a String 'Voltar' e clica
        cy.get('#resultado').should('have.text', 'Voltou!')// Procura na página algum elemento com id 'Resultado' que tenha o texto 'Voltou!'
    })

    it('TextField', () => {
        cy.get('#formNome').type('Cypress Test')// Procura um campo na página com id 'formName' e escreve nele
        cy.get('#formNome').should('have.value','Cypress Test')// Procura um campo na página com id 'formName' e verifica se seu valor é 'Cypress Test'
        cy.get('#elementosForm\\:sugestoes')//Sempre trocar : por \\: para funcionar o :
            .type('Textarea')// Digita 'Textarea' no campo determinado
            .should('have.value', 'Textarea')// Verifica se o campo determinado possui o valor 'Textarea'

        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
            .type('???')

        cy.get('[data-cy=dataSobrenome]')// Campo identificado com o 'identificador de campos do Cypress'
            .type('Teste12345{backspace}{backspace}')// Entre os {} podemos colocar algumas "funções de teclado" como esse apagar
            .should('have.value', 'Teste123')

        cy.get('#elementosForm\\:sugestoes')
            .clear()// Limpa o campo determinado
            .type('Erro{selectall}acerto', {delay:100}) // Faz uma pausa de milissegundos
            .should('have.value','acerto')
    })

    it('RadButton', () => {
        //cy.get('#formSexo > tbody > tr > :nth-child(2)')
        cy.get('#formSexoFem')
            .click()
            .should('be.checked')// Verificando se o campo foi selecionado/preenchido

        cy.get('#formSexoMasc').should('not.be.checked')

        cy.get("[name='formSexo']").should('have.length', 2)// Seleciona o campo pelo 'value' no html dele e compara com a quantidade/tamanho que queremos (2)
    })

    it('CheckBox', () => {
        cy.get('#formComidaPizza')
            .click()
            .should('be.checked')// Verifica se o campo foi selecionado

        cy.get('[name=formComidaFavorita]')// Seleciona o campo pelo 'value' no html dele,
            .click({multiple: true})// Permite selecionar mais de um elemento
        
        cy.get('#formComidaPizza').should('not.be.checked')
        cy.get('#formComidaVegetariana').should('be.checked')
    })

    it('ComboBox', () => {
        cy.get('[data-test=dataEscolaridade]')
            .select('2o grau completo')// Seleciona uma opção do comboBox
            .should('have.value', '2graucomp')// Compara se o valor do campo é '2graucomp'

        cy.get('[data-test=dataEscolaridade]')
        .select('1o grau completo')
        .should('have.value', '1graucomp')    
    })

    it.only('ComboMultiplo', () => {
        cy.get('[data-testid=dataEsportes]').select(['natacao','Corrida', 'nada'])// Seleciona mais de uma opção no comboBox, sendo necessário inserir em um array quando for mais de 1
    })

})

// describe('Work witch basic elements', () => {
//     before(() => {
//         cy.visit('https://wcaquino.me/cypress/frame.html') 
//     })

//     it('Externo', () => {
    
//     })
// })