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
})