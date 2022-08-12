class FeedStreamController {

    constructor() { }

    createFeedStream(index, geoParent, geoPort, style) {
        let modal = new Modal();
        let content = modal.createModalProduct('New Feed Stream');
        //modal.removeContent();        
        modal.createContent(content);
        modal.open();

        let parent = graph.getDefaultParent();
        var name = "";
        
        const $input = document.querySelector('#stream');

        name = graphEditor.validateCellNamesSequence(name, "stream");
        $input.value = name;
        $input.focus();
        $input.select();

        const $buttonOk = document.querySelector("#btn-ok");
        const $buttonCancel = document.querySelector("#btn-cancel");
        var color = "#000000";

        $input.onkeyup = function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                $buttonOk.click();
            }
        };

        $buttonOk.onkeyup = function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                $buttonOk.click();
            }
        };

        $buttonCancel.onkeyup = function (event) {
            event.preventDefault();
            if (event.keyCode == 13) {
                $buttonCancel.click();
            }
        };

        $buttonOk.onclick = function () {

            graph.getModel().beginUpdate();
            try {
                if (color != null) {
                    name = document.querySelector('#stream').value;
                    let isValid = graphEditor.validateCellNames(name);

                    if (isValid == false) {
                        let subModal = new Modal();
                        let content = subModal.createModalAlertMessage('', "The name already exists!");

                        let subContent = subModal.createContent(content);
                        subModal.open();

                        subContent.querySelector("#btn-ok").onclick = () => {
                            document.querySelectorAll('.modal')[1].remove();
                            document.querySelector('#unit').focus()
                        };
                    }
                    else {
                        var feedStream = new FeedStream(name, index, geoParent, geoPort, color, style);

                        graph.addCell(feedStream, parent, undefined, null, null);
                        modal.close();
                    }
                }
                else {
                    let subModal = new Modal();
                    let content = subModal.createModalAlert('', "Hot or cold side must be selected");
                    //subModal.removeContent();        
                    let subContent = subModal.createContent(content);
                    subModal.open();

                    subContent.querySelector('.icon').innerHTML = '<img src="assets/img/warning.png" style="width:40px;height:40px;" alt="Warning">';

                    subContent.querySelector("#btn-cancel").remove();
                    subContent.querySelector("#btn-help").remove();

                    subContent.querySelector("#btn-ok").onclick = () => {
                        document.querySelectorAll('.modal')[1].remove();
                        //subModal.close();                        
                    };
                }

                FeedStreamController.prototype.nameStreamPosition(feedStream);
            }
            finally {
                orderStream(feedStream);
                graph.getModel().endUpdate();
                containerOpened.checkConnectivityModalCreate(null, false);
            }
        };

        $buttonCancel.onclick = function () {
            graphEditor.decrementCellNamesSequence("stream");
            modal.close();
        }

        // const $buttonHelp = document.querySelector("#btn-help");

        // $buttonHelp.onclick = function() {
        //     callbackObj.openHelpModal(32);
        // };
    }
}


FeedStreamController.prototype.nameStreamPosition = function (feedStream) {
    // label
    let nameStream = feedStream.children.filter(function (item) {
        if (item.type == "nameStream")
            return item;
    });

    if (nameStream[0] != null && nameStream[0] != undefined) {
        let index = feedStream.children.indexOf(nameStream[0])

        if (index != null && index != -1) {
            feedStream.children[index].geometry.height = 25;
            feedStream.children[index].geometry.x = feedStream.children[index].positionX;
            feedStream.children[index].geometry.y = feedStream.children[index].positionY;
            feedStream.children[index].source = feedStream;
        }
    }
}
