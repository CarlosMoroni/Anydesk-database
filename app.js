var url = 'http://localhost:3333/'


async function getAllElements() {
    fetch(url)
        .then(response => {
            if(!response.ok) {
                throw new Error('Problema na rede: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log("dados recebidos: " + data);
        })
        .catch(error => {
            console.error('Erro na requisição: ' + error);
        })
}

getAllElements()