function openEditNew() {
    let addNew = document.querySelector('#addNewDevice');
    let dialogNewEdit = document.querySelector('#add-to-edit')
    let closeDialog = document.querySelector('#closeDialog')

    addNew.addEventListener("click", () => {
        dialogNewEdit.classList.toggle("ativa")
    })

    closeDialog.addEventListener("click", () => {
        dialogNewEdit.classList.toggle("ativa")
    })
}



openEditNew();