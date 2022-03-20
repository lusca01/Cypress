/// <reference types="cypress"/>

describe('Esperas', () => {
    before(() =>{
        cy.visit('https://wcaquino.me/cypress/componentes.html') 
    })

    beforeEach(() =>{
        cy.reload() // .reload = F5, recarrega a página
    })

    it('Deve aguardar elemento estar disponivel', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('Funciona')
    })

    it('Deve fazer retrys', () => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo')
            //.should('not.exist')    
            .should('exist')
            //Tomar muito cuidado, pois quando tentamos fazer alguma função encadeada
            //no mesmo get, é necessário que ambas possam ser assertivas, se não ficará
            //em um loop e dará erro
    })

    it('Uso do find', () => {
        cy.get('#buttonList').click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')

        // cy.get('#lista li')
        //     .find('span')
        //     .should('contain', 'Item 2')
        
        // AO JÁ TER UM COMANDO ANTERIOR EXECUTADO (NO CASO O GET),
        // OS ASSERTS(BUSCAS TIPO FIND E SHOULD) IRÃO 'REUTILIZÁ-LO,
        // FAZENDO COM QUE NÃO RECONHEÇA POSSÍVEIS ELEMENTOS QUE VENHAM
        // SURGIR COM O TEMPO, SENDO NECESSÁRIO FAZER OUTRO COMANDO MAIS
        // ESPECÍFICO


        cy.get('#lista li span')
            .should('contain', 'Item 2')
        // OS ASSERTS FICAM ATRELADOS AO COMANDO ANTERIOR, SE O COMANDO
        // ANTERIOR JÁ TIVER SIDO USADO ANTES, ESSE DE ANTES SERÁ REUSADO
        // POIS É O 'IMEDIATO/PRIMEIRO', ENTÃO É NECESSÁRIO FAZER UM NOVO
        // COMANDO PARA SITUAÇÕES EM QUE O ELEMENTO NECESSITE TEMPO PARA
        // APARECER NA PÁGINA
    })

    it('Uso do timeout', () => {
        cy.get('#buttonDelay').click()
        // cy.get('#novoCampo', {timeout: 1000}).should('exist')
        cy.get('#novoCampo').should('exist')

        // TIMEOUT: no comando get('campo', {timeout: "milissegundos"})
        // TIMEOUT DEFAULT É: 4 segundos (4000 milissegundos)
        // PARA MUDAR O TIMEOUT DEFAULT: ir em 'cypress.json' e adicionar um
        // campo 'defaultComandoTimeout: "milissegundos"'

        // cy.get('#buttonList').click()
        // cy.wait(5000)// Usar apenas em casos bem específicos (timeout é mais recomendado)
        // cy.get('#lista li span', {timeout: 30000})
        //     .should('contain', 'Item 2')

        // Esse caso abaixo não é necessário aumentar o timeout, pois o tempo
        // esperado para a primeira verificação não passa dos 4000 milissegundos
        // e o debaixo acumula esses 4000 milissegundos, ou seja, para cada assert
        // inicia os 4000 milissegundos de timeeout
        cy.get('#buttonListDOM').click()
        cy.get('#lista li span')
            .should('have.length', 1)
        cy.get('#lista li span')
            .should('have.length', 2)

    })

    it('Click Retry', () => {
        // Alguns comandos não possuem 'retry', então é necessário repetí-los
        cy.get('#buttonCount')
            .click()
            .click()
            .should('have.value', '111')
    })

    // Then -> Aguarda uma resposta do get para prosseguir com a assertiva
    // É possível mudar o 'return' em sua arrow function, não retornando apenas o mesmo objeto
    // É possível fazer novas buscas nele


    // Should -> Fica tentando a assertiva mesmo sem uma resposta do get, até que receba
    // Retorna apenas o mesmo objeto, não possibilitando outro valor pelo return
    // Não é possível fazer novas buscas dentro dele, pois sua execução é contínua,
    // o que gera um loop

    it.only('Should vs Then', () => {
        cy.get('#buttonListDOM').then($el => {
            // .should('have.length', 1)
            // console.log($el)
            expect($el).to.have.length(1)
            cy.get('#buttonList')
        })
    })
})