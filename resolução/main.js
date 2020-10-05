function postRequest() {
    const formData = new FormData(document.getElementById('form-post'));
    fetch('http://localhost:8081', { method: 'POST', body: formData })
        .then(validateResponse)
        .then(readResponseAsJSON)
        .then(showResponseOnPage)
        .catch(handleError);
}

function getComHeaderRequest() {
    const senha = document.getElementById('request_body').value;
    const header = new Headers({ 'Authorization': senha });
    fetch('http://localhost:8081/encrypt', { method: 'GET', headers: header })
        .then(validateResponse)
        .then(readResponseAsJSON)
        .then(showResponseOnPage)
        .catch(handleError);
}

function authRequest() {
    const formData = new FormData(document.getElementById('form-post'));
    fetch('http://localhost:8081/auth', { method: 'POST', body: formData })
        .then(validateResponse)
        .then(readResponseAsJSON)
        .then(showResponseOnAlert)
        .catch(handleAuthError);
}

function viaCepRequest() {
    if (requestIsFine()) {
        const BASE_URL = `https://viacep.com.br/ws/`;
        fetch(`${BASE_URL}${request_body.value}/json`)
            .then(validateResponse)
            .then(readResponseAsJSON)
            .then(showResponseOnPage)
            .catch(handleError);
    } else {
        alert('Prestenção na sua Request cabeção !');
    }
}

function exchangeRatesRequest() {
    const FROM = document.getElementById('moedas_conversao_de').value;
    const TO = document.getElementById('moedas_conversao_para').value;
    fetch(`https://api.exchangeratesapi.io/latest?symbols=${TO}&base=${FROM}`)
        .then(validateResponse)
        .then(readResponseAsJSON)
        .then(showResponseOnPage)
        .catch(handleError);
}

function todosRequest() {
    fetch('https://jsonplaceholder.typicode.com/todos/')
        .then(validateResponse)
        .then(readResponseAsJSON)
        .then(manipulateTodosArrowFn)
        .then(showResponseOnPage)
        .catch(handleError);
}

function manipulateTodos(todos) {
    const newTodos = [];
    todos = JSON.parse(todos);
    for (var index = 0, contadorCompleted = 0; index < todos.length; index++) {
        if (todos[index].completed) {
            newTodos.push(todos[index]);
            contadorCompleted++;
        }
    }
    alert(`A requisição trouxe ${contadorCompleted} TODOS completados.`);
    return JSON.stringify(newTodos, null, '\t');
}

function manipulateTodosArrowFn(todos) {
    todos = JSON.parse(todos);
    let contador = 0;
    const newTodos = todos.filter((elemento) => {
        if (elemento.completed) {
            contador++;
            return true;
        }
        return false;
    });

    /*
        SEM Arrow Function
        const newTodos = todos.filter(function(elemento){
            if (elemento.completed) {
                contador++;
                return true;
            }
            return false;
        });
    */

    alert(`A request trouxe ${contador} TODOS completados`);
    return JSON.stringify(newTodos, null, '\t');
}

function requestIsFine() {
    const sending = document.getElementById('request_body').value;
    return !isNaN(Number(sending)) && sending.length === 8;
}

function validateResponse(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

function readResponseAsText(response) {
    return response.text();
}

async function readResponseAsJSON(response) {
    return JSON.stringify(await response.json(), null, '\t');
}

function showResponseOnPage(response) {
    if (typeof response !== 'string') {
        response = JSON.stringify(response, null, '\t');
    }
    return AreaDeResposta.setValue(response);
}

function showResponseOnAlert(response) {
    if (typeof response === 'string')
        response = JSON.parse(response);
    return alert(response.message);
}

function handleError(error) {
    return alert(error);
}

function handleAuthError(error) {
    error = error + '';
    if (error.indexOf("TypeError: Failed to fetch") > -1) {
        return alert("Verifica se o servidor está ligado ;) ... se estiver, chama o professor!");
    }
    if (error.indexOf("Internal Server Error") > -1) {
        return alert("Erro no servidor!");
    }
    return alert("Acesso não autorizado!");
}