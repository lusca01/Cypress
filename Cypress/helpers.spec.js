/// <reference types="cypress"/>

describe('Helpers', () => {
    it('Wrap', () => {
        const obj = { nome: 'User', idade: 20}
        expect(obj).to.have.property('nome')

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        // cy.get('#formName').then($el => {
        //     $el.val('funciona via jquery')
        //     cy.wrap($el).type('funciona via cypress')
        // })

        // Deixar o cypress sincronizar as promises
        // Wrap -> 'Auxilia' a gerenciar/sincronizar as promises


        // Wrap faz o objeto que é uma 'promise' retornar o seu valor onde foi solicitado,
        // então é sincronizado, apesar de ser uma 'promise' que geralmente é um objeto
        // requisitado que demora um tempo para passar seu valor 
        const promise = new Promise((resolve, reject) =>{
            setTimeout(() => {
                resolve(10)
            }, 500)
        })
         cy.get('#buttonSimple').then(() => console.log('Encontrei o primeiro botao'))
         
         cy.wrap(promise).then(ret => console.log(ret))

         cy.get('#buttonSimple').then(() => console.log('Encontrei o segundo botao'))

         cy.wrap(1).should(num => {
             return 2
         }).should('be.equal', 1)
   })


   // Its => Dá uma propriedade/atributo do objeto que está no meio da cadeia do cypress
   // Ou seja, tendo o objeto, posso verificar com o 'its' algum atributo/propriedade
   it('Its...', () => {
       const obj = {nome: 'User', idade: 20 }
       cy.wrap(obj).should('have.property', 'nome', 'User')
       cy.wrap(obj).its('nome').should('be.equal', 'User')

       const obj2 = { nome: 'User', idade: 20, endereco: { rua: 'dos bobos'}}
       cy.wrap(obj2).its('endereco').should('have.property', 'rua')
       cy.wrap(obj2).its('endereco').its('rua').should('contain', 'bobos')

       cy.visit('https://wcaquino.me/cypress/componentes.html')
       cy.title().its('length').should('be.equal', 20)
   })

   // Invoke => Igual ao 'Its', porém ele trabalha com as funções
   // Ou seja, posso 'chamar' a função de algum objeto (objeto, window, etc)
   it.only('Invoke...', () => {
       const getValue = () => 1;
       const soma = (a, b) => a + b;

       cy.wrap({fn: getValue}).invoke('fn').should('be.equal', 1)
       cy.wrap({fn: soma}).invoke('fn', 2, 5).should('be.equal', 7)

       cy.visit('https://wcaquino.me/cypress/componentes.html')
       cy.get('#formNome').invoke('val', 'Texto via invoke')

       cy.window().invoke('alert', 'Dá para ver?')

       cy.get('#resultado')
            .invoke('html', '<input type="button" value="hacked!"/>')
   })

})