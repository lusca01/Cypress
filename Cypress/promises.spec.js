it('Sem testes, ainda', () => {})

// Utilizando Callback
// const getSomething = callback => {
//     setTimeout(() => {
//         callback(12);
//     }
//     , 1000)
// }

// const system = () => {
//     console.log('init');
//     getSomething(some => console.log(`Something is ${some}`));
//     console.log('end');
// }


const getSomething = () => {
    return new Promise((resolve, reject) => { 
        setTimeout(() => {
            resolve(13);
        }, 1000)
    })
}

// PROMISES SÃO OBJETOS/VALORES REQUISITADOS QUE LEVAM
// TEMPO PARA RETORNAREM, PODENDO ASSIM ATRAPALHAR A 
// SEQUENCIA CASO OS PRÓXIMOS ASSERTS NECESSITEM DE ALGO
// DAS PROMISES
const system = () => {
    console.log('init');
    getSomething().then(some => {
        console.log(`Something is ${some}`)
    })
    console.log('end')
}

system();