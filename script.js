function openEditNew() {
    let addNew = document.querySelector('#addNewDevice');
    let dialogNewEdit = document.querySelector('#add-to-edit');
    let closeDialog = document.querySelector('#closeDialog');

    addNew.addEventListener("click", () => {
        dialogNewEdit.classList.toggle("ativa");
        h2NovoDispositivo()
    });

    closeDialog.addEventListener("click", () => {
        document.querySelector('#form-register').reset();
        dialogNewEdit.classList.toggle("ativa");
    });    
}

openEditNew();

function h2NovoDispositivo() {
    document.querySelector("div.text-label").innerHTML = '<h2>Adicionar novo dispositivo</h2>'
}