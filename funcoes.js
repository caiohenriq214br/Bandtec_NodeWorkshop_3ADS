cumprimentar = () => {
    console.log('olá, gente!')
}

soma = (n1, n2) => {
    console.log('soma!', Number(n1)+Number(n2));
}


const funcoes = [cumprimentar, soma];

const arg0 = process.argv[3]
const arg1 = process.argv[4]

const funcao = funcoes[process.argv[2]]

funcao(arg0, arg1)

