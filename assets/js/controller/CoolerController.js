var countCooler = 1;

class CoolerController {

    constructor() {
        this.name = "Cooler";
    }

    add(graph, evt) {

        let modal = new Modal();
        let content = modal.createModalUnit();
        let subContent = modal.createContent(content);
        modal.open();

        const $input = document.querySelector('#unit');
        const $buttonOk = document.querySelector("#btn-ok");
        const $buttonCancel = document.querySelector("#btn-cancel");

        let name = graphEditor.validateCellNamesSequence("", "cooler");

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
                    let cooler = new Cooler(name, parent);

                    var pt = graph.getPointForEvent(evt);
                    cooler.geometry.x = pt.x;
                    cooler.geometry.y = pt.y;

                    self.tagNamePosition(cooler);
                    self.tagAllocationPosition(cooler);

                    graph.setSelectionCell(cooler);

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
            graphEditor.decrementCellNamesSequence("cooler");
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

    tagNamePosition(cooler) {
        // label
        let tagName = cooler.children.filter(function (item) {
            if (item.type == "TagName")
                return item;
        });

        if (tagName[0] != null && tagName[0] != undefined) {
            let index = cooler.children.indexOf(tagName[0])

            if (index != null && index != -1) {
                cooler.children[index].geometry.height = 25;
                cooler.children[index].geometry.x = cooler.children[index].positionX;
                cooler.children[index].geometry.y = cooler.children[index].positionY;
                cooler.children[index].source = cooler;
            }
        }
    }

    tagAllocationPosition(cooler) {
        // tag allocation
        let tagName = cooler.children.filter(function (item) {
            if (item.type == "TagAllocation")
                return item;
        });

        if (tagName[0] != null && tagName[0] != undefined) {
            let index = cooler.children.indexOf(tagName[0])

            if (index != null && index != -1) {
                cooler.children[index].geometry.height = 25;
                cooler.children[index].geometry.x = cooler.children[index].positionX;
                cooler.children[index].geometry.y = cooler.children[index].positionY;

                cooler.children[index].source = cooler;
            }
        }
    }
}