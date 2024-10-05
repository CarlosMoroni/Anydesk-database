const deviceService = new DeviceService();
// funções de interação com o usuario

/**
 * Roda assim que a pagina é carregada
 *
 * @async
 * @returns {null} 
 */
async function onloadBody() {
    
    /**
     * array de objetos do tipo Device
     *
     * @type {Array<Device>}
     */
    const allDevice = await deviceService.getAllElements();

    sepateArrayForCategories(allDevice)
    EditExistingDevices()
}

onloadBody()

/**
 * itera o array e Separa os dispositivos por seções, de acordo com o parametro category
 *
 * @param {Array<Device>} arrayObj
 */
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


/**
 * Recebe o objeto do tipo Device e transforma em uma string HTML
 * um elemento device que sera renderizado na tela.
 *
 * @param {Device} objeto
 * @returns {string}
 */
function objToHtml(objeto) {
    return `
        <div class="device" draggable="true" onclick="connectToDevice('${objeto.access_code}')")>
            <img src="./src/image/icon device.png" alt="icone de dispositivo">
            <div class="info-device">
                <p>Nome: ${objeto.name_device}</p>
                <p>ID: ${objeto.access_code}</p>
                <p>Setor: ${objeto.department}</p>
                <button class="edit" data-id="${objeto.id}">
                    <img src="./src/image/edit.svg" alt="editar">
                </button>
            </div>
        </div>
    `;
}

/**
 * faz a URL de conexão do anydesck, e abre o aplicativo, caso nao tenha o aplicativo ele exibe mensagen,
 *  trata o erro caso o parametro venha com ( . , - _ );
 *
 * @param {String} access_code
 */
function connectToDevice(access_code) {
    formatAccessCode = access_code.split(' ').join('');
    formatAccessCode = access_code.split('.').join('');
    formatAccessCode = access_code.split('-').join('');
    formatAccessCode = access_code.split('_').join('');

    const anydeskUrl = `anydesk://${formatAccessCode}`

    const timeout = setTimeout(() => {
        alert('Parece que você não tem o AnyDesk instalado. Por favor, instale o aplicativo para se conectar ao dispositivo.');
    }, 1000);

    window.location.href = anydeskUrl;

    window.addEventListener('blur', function () {
        clearTimeout(timeout);
    });
}

/**
 *  adiciona novos dispositivos e persiste os dados no banco,
 *  puxa os dados do formulario e aciona a função no botao submit. 
 * 
 */
function addNewDevice() {
    document.querySelector('#form-register').addEventListener('submit', (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        const formObj = Object.fromEntries(formData.entries());
        
        try {
            deviceService.createDevice(formObj);
            form.reset();

            location.reload(true);
        } catch (error) {
            console.log("Erro: " + error);
        }
    });
}

addNewDevice()

// edita registro existente no banco de dados
function EditExistingDevices() {
    let button = document.querySelectorAll('button.edit');

    button.forEach((item) => {
        item.addEventListener('click', (event) => {
            event.stopPropagation();
            h2LabelDialog();
            openDialogEditDevice();

            const deviceId = item.getAttribute('data-id');

            returnObjDevice(deviceId);
            deleteRegister(deviceId);
        })
    })
}

async function returnObjDevice(id) {
    try {
        const objDevice = await deviceService.getByPk(id);
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
    document.querySelector('#department').value = objDevice.department
}

function openDialogEditDevice() {
    let deletContainer = document.querySelector('#delete-container');
    deletContainer.classList.toggle('ativa');

    let openDialogOrClose = document.querySelector('#add-to-edit');
    openDialogOrClose.classList.toggle('ativa');
}

function deleteRegister(id) {
    let deletButton = document.querySelector('#delete');

    deletButton.addEventListener('click', () => {
        handleDelete(id)
    })
}

function handleDelete(id) {
    if (confirm("Deseja Deletar esse dispositivo?")) {
        deviceService.deleteDevice(id);
    }
}

function h2LabelDialog() {
    document.querySelector("div.text-label").innerHTML = '<h2>Editar dispositivo</h2>'
}

function successAlert() {
    let alert = document.querySelector('#alerta-positivo');
    alert.classList.toggle('ativa');

    let openDialogOrClose = document.querySelector('#form-register');
    openDialogOrClose.classList.toggle('ativa');

    setInterval(() => {
        location.reload(true)
    }, 500)
};