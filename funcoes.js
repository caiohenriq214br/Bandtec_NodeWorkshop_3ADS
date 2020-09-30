const day_of_week = new Date().getDay();
const cumprimento = `Olá, 3ADS${day_of_week === 1 ? 'A' : 'B'}`;

cumprimentar = () => {
    console.log(cumprimento);
}

soma = (n1, n2) => {
    console.log(`Você está prestes a realizar a operação de ${operacao}`);
    var operacao = 'Soma';
    // let operacao = 'Soma';
    console.log('Soma: ', Number(n1) + Number(n2));
}

const funcoes = [cumprimentar, soma];

const arg0 = process.argv[3]
const arg1 = process.argv[4]

const funcao = funcoes[process.argv[2]]

funcao(arg0, arg1)

