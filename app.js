// requisições http usando o fetch

var url = 'http://localhost:3333/'

async function getAllElements() {
    let urlNew = url + 'device/'

    fetch(urlNew, {
        method: 'GET'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Problema na rede: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            sepateArrayForCategories(data);
        })
        .catch(error => {
            console.error('Erro na requisição: ' + error);
        })
}

async function createDevice() {
    let urlNew = url + 'device/'
    
}

getAllElements()


// funções de interação com o usuario
function sepateArrayForCategories(arrayObj) {
    let servidoresHTML = '';
    let jjHTML = '';
    let jkHTML = '';
    let skTkHTML = '';
    let skRbHTML = '';

    arrayObj.forEach(device => {
        const html = objToHtml(device);

        switch (device.category) {
            case 'SERVER':
                servidoresHTML += html;
                break;
            case 'JJ':
                jjHTML += html;
                break;
            case 'JK':
                jkHTML += html;
                break;
            case 'SK-TK':
                skTkHTML += html;
                break;
            case 'SK-RB':
                skRbHTML += html;
                break;
            default:
                console.warn("'Inconsistência: dispositivo sem categoria válida', device: " + html + "categoria: " + device.category);
        }
    });

    document.querySelector('#servidores').innerHTML = servidoresHTML;
    document.querySelector('#distribuidora-jj').innerHTML = jjHTML;
    document.querySelector('#distribuidora-jk').innerHTML = jkHTML;
    document.querySelector('#sk-tk-container').innerHTML = skTkHTML;
    document.querySelector('#sk-rb-container').innerHTML = skRbHTML;
}

function objToHtml(objeto) {
    return `
        <div class="device" draggable="true" onclick="connectToDevice('${objeto.access_code}')")>
            <img src="./src/image/icon device.png" alt="icone de dispositivo">
            <div class="info-device">
                <p>${objeto.name_device}</p>
                <p>ID: ${objeto.access_code}</p>
                <img src="./src/image/edit.svg" alt="editar" id="edit">
            </div>
        </div>
    `;
}

function connectToDevice(access_code) {
    const anydeskUrl = `anydesk://${access_code}`

    const timeout = setTimeout(() => {
        alert('Parece que você não tem o AnyDesk instalado. Por favor, instale o aplicativo para se conectar ao dispositivo.');
    }, 1000);

    window.location.href = anydeskUrl;

    window.addEventListener('blur', function () {
        clearTimeout(timeout);
    });
}

// usar o location para dar reload na pagina
// let botao = document.querySelector('#edit');
// botao.addEventListener('click', () => {
//     location.reload(true)
// })