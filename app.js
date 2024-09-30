// requisições http usando o fetch

// getAll()
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
            EditExistingDevices()
        })
        .catch(error => {
            console.error('Erro na requisição: ' + error);
        })
}

async function getByPk(id) {
    let urlNew = url + 'device/' + id

    try {
        const response = await fetch(urlNew, { method: 'GET' });

        if (!response.ok) {
            throw new Error('Problema na rede: ' + response.status);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

// Create()
async function createDevice(objeto) {
    let urlNew = url + 'device/'

    if (id) {
        urlNew += objeto.id;

        fetch(urlNew, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objeto)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na requisição: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log("Sucesso: " + data);
            })
            .catch(error => {
                console.error("Erro: " + error);
            })
    }

    fetch(urlNew, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objeto)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("Sucesso: " + data);
        })
        .catch(error => {
            console.error("Erro: " + error);
        })
}

getAllElements()


// funções de interação com o usuario
// busca disositivos na base de dados e exibe na tala
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
                <button class="edit" data-id="${objeto.id}">
                    <img src="./src/image/edit.svg" alt="editar">
                </button>
            </div>
        </div>
    `;
}

function connectToDevice(access_code) {
    formatAccessCode = access_code.split(' ').join('');
    formatAccessCode = access_code.split('.').join('');
    
    const anydeskUrl = `anydesk://${formatAccessCode}`

    const timeout = setTimeout(() => {
        alert('Parece que você não tem o AnyDesk instalado. Por favor, instale o aplicativo para se conectar ao dispositivo.');
    }, 1000);

    window.location.href = anydeskUrl;

    window.addEventListener('blur', function () {
        clearTimeout(timeout);
    });
}


// adiciona novos dispositivos e persiste os dados no banco
function addNewDevice() {
    document.querySelector('#form-register').addEventListener('submit', (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        const formObj = Object.fromEntries(formData.entries());
        console.log(formObj);

        try {
            createDevice(formObj);
            form.reset();
            location.reload(true)
        } catch (error) {
            console.log("Erro: " + error);
        }
    })
}

addNewDevice()

// edita registro existente no banco de dados
function EditExistingDevices() {
    let button = document.querySelectorAll('button.edit');

    button.forEach((item) => {
        item.addEventListener('click', (event) => {
            event.stopPropagation();
            h2LabelDialog();
            openDialogEditDevice()

            const deviceId = item.getAttribute('data-id');
            returnObjDevice(deviceId)
        })
    })
}

async function returnObjDevice(id) {
    try {
        const objDevice = await getByPk(id)
        populationFormFields(objDevice);
    } catch (error) {
        console.log("erro nna funcao returnObjDevice" + error);
    }
}

function populationFormFields(objDevice) {
    document.querySelector('#id').value = objDevice.id
    document.querySelector('#name_device').value = objDevice.name_device
    document.querySelector('#access_code').value = objDevice.access_code
    document.querySelector('#category').value = objDevice.category
}

function openDialogEditDevice() {
    document.querySelector('#add-to-edit').classList.toggle('ativa');
}

function h2LabelDialog() {
    document.querySelector("div.text-label").innerHTML = '<h2>Editar dispositivo</h2>'
}



// usar o location para dar reload na pagina
// let botao = document.querySelector('#edit');
// botao.addEventListener('click', () => {
//     location.reload(true)
// })