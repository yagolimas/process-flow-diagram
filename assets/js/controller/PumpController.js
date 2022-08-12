var countPump = 1;

class PumpController {

    constructor() {
        this.name = "Pump";
    }

    add(graph, evt) {

        let modal = new Modal();
        let content = modal.createModalUnit();
        let subContent = modal.createContent(content);
        modal.open();

        const $input = document.querySelector('#unit');
        const $buttonOk = document.querySelector("#btn-ok");
        const $buttonCancel = document.querySelector("#btn-cancel");

        let name = graphEditor.validateCellNamesSequence("", "pump");

        $input.value = name;
        //$input.focus();
        $input.select();

        $buttonOk.focus();

        self = this;

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

            let parent = graph.getDefaultParent();

            graph.getModel().beginUpdate();

            try {
                name = $input.value;
                let isValid = graphEditor.validateCellNames(name);

                if (!isValid) {
                    throw new NameInUseExcpetion("Name already in use");
                }
                else {
                    let pump = new Pump(name, parent);

                    var pt = graph.getPointForEvent(evt);
                    pump.geometry.x = pt.x;
                    pump.geometry.y = pt.y;

                    self.tagNamePosition(pump);
                    self.tagAllocationPosition(pump);

                    graph.setSelectionCell(pump);

                    modal.close();
                }
            }
            catch (e) {
                e.openModalAlert();
            }
            finally {
                graph.getModel().endUpdate();
                containerOpened.checkConnectivityModalCreate(null, false);
            }
        };

        $buttonCancel.onclick = function () {
            graphEditor.decrementCellNamesSequence("pump");
            modal.close();
        };

        const $buttonHelp = document.querySelector("#btn-help");

        $buttonHelp.onclick = function () {
            callbackObj.openHelpModal(32);
        };

        subContent.addEventListener('keydown', (event) => {
            //event.preventDefault();
            if (event.keyCode == 27) {
                subContent.querySelector("#btn-cancel").click();
            }
        });
    }

    tagNamePosition(pump) {
        // label
        let tagName = pump.children.filter(function (item) {
            if (item.type == "TagName")
                return item;
        });

        if (tagName[0] != null && tagName[0] != undefined) {
            let index = pump.children.indexOf(tagName[0])

            if (index != null && index != -1) {
                pump.children[index].geometry.height = 25;
                pump.children[index].geometry.x = pump.children[index].positionX;
                pump.children[index].geometry.y = pump.children[index].positionY;
                pump.children[index].source = pump;
            }
        }
    }

    tagAllocationPosition(pump) {
        // tag allocation
        let tagName = pump.children.filter(function (item) {
            if (item.type == "TagAllocation")
                return item;
        });

        if (tagName[0] != null && tagName[0] != undefined) {
            let index = pump.children.indexOf(tagName[0])

            if (index != null && index != -1) {
                pump.children[index].geometry.height = 25;
                pump.children[index].geometry.x = pump.children[index].positionX;
                pump.children[index].geometry.y = pump.children[index].positionY;

                pump.children[index].source = pump;
            }
        }
    }
}