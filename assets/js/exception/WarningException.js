class WarningException {

    constructor(msg, title) {
        this.msg = msg;
        this.title = title;
    }

    openModalAlert() {

        let subModal = new Modal();
        let content = subModal.createModalAlertMessage(this.title, this.msg);
        let subContent = subModal.createContentWithId(content, 'divAlertMessage');
        //subModal.modalDiv.classList.add('warning');
        subModal.open();

        let buttonOK = subContent.querySelector(".close");
        //const modalAlert = document.querySelector('.warning');
        buttonOK.focus();

        buttonOK.onclick = function (event) {
            subModal.closeById('divAlertMessage');

            // let parentModal = document.querySelectorAll('.modal');
            // if (parentModal != null) {
            //     let buttonOkParent = parentModal[0].querySelector("#btn-ok");
            //     let buttonCancelParent = parentModal[0].querySelector("#btn-cancel");

            //     if (parentModal[0].getElementsByTagName("input") != null) {
            //         let parentElement = null;

            //         parentElement = parentModal[0].getElementsByTagName("input")[0];

            //         parentElement.focus();
            //         parentElement.select();
            //     }
            //     else if (parentModal[0].getElementsByTagName("button") != null) {
            //         buttonOkParent.focus();
            //     }
            // }

            //modalAlert.remove();

            //document.querySelectorAll('.modal')[1].remove();
            //subModal.close();
        };
    }
}