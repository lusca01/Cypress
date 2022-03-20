/// <reference types="cypress"/>

//Primeiro parâmetro - Título para o teste
//Segundo parâmetro - Função ou grupo de funções a serem testadas

//It/describe .only - É testado apenas o método com o only, ignorando os outros
// .only - Quando houver mais de um, será considerado apenas o último
// .skip - Faz o método não ser testado. Não é ignorado, e sim, apenas 'pulado'

it('A external test...', () => {

})

describe('Should group tests...', () => {
    describe('Should group more specific tests...', () => {
        it('A external test...', () => {

        })
    })


    it('A external test...', () => {

    })  
})