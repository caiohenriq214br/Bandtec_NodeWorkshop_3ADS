function postRequest() {
    /*
        FETCH API
    */
}

function getComHeaderRequest() {
    /*
        FETCH API
    */
}

function authRequest() {
    /*
        FETCH API
    */
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