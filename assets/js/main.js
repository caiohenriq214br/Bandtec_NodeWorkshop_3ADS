function postRequest() {
    /*
        FETCH API
    */
}

function viaCepRequest() {
    if (requestIsFine()) {
        const BASE_URL = `https://viacep.com.br/ws/`;
        /*
            FETCH API
        */
    } else {
        alert('Prestenção na sua Request cabeção !');
    }
}

function exchangeRatesRequest() {
    /*
        FETCH API
    */
}

function todosRequest() {
    /*
        FETCH API
    */
}

function manipulateTodos(todos) {
    const newTodos = [];
    todos = JSON.parse(todos);
    /*
        LAÇO DE REPETIÇÃO
        ALERT
    */
    return JSON.stringify(newTodos, null, '\t');
}

function manipulateTodosArrowFn(todos) {
    todos = JSON.parse(todos);
    /*
        FILTER
        ARROW FUNCTION
        ALERT
    */
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

function handleError(error) {
    return alert(error);
}