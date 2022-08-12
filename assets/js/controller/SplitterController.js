var countSplitter = 1;

class SplitterController {

    constructor() {
        this.name = "Splitter";
    }

    add(graph, evt) {

        let modal = new Modal();
        let content = modal.createModalUnit();
        let subContent = modal.createContent(content);
        modal.open();

        const $input = document.querySelector('#unit');
        const $buttonOk = document.querySelector("#btn-ok");
        const $buttonCancel = document.querySelector("#btn-cancel");

        let name = graphEditor.validateCellNamesSequence("", "splitter");

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
                    let splitter = new Splitter(name, parent);

                    var pt = graph.getPointForEvent(evt);
                    splitter.geometry.x = pt.x;
                    splitter.geometry.y = pt.y;

                    self.tagNamePosition(splitter);
                    self.tagAllocationPosition(splitter);

                    graph.setSelectionCell(splitter);

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
            graphEditor.decrementCellNamesSequence("splitter");
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

    tagNamePosition(splitter) {
        // label
        let tagName = splitter.children.filter(function (item) {
            if (item.type == "TagName")
                return item;
        });

        if (tagName[0] != null && tagName[0] != undefined) {
            let index = splitter.children.indexOf(tagName[0])

            if (index != null && index != -1) {
                splitter.children[index].geometry.height = 25;
                splitter.children[index].geometry.x = splitter.children[index].positionX;
                splitter.children[index].geometry.y = splitter.children[index].positionY;
                splitter.children[index].source = splitter;
            }
        }
    }

    tagAllocationPosition(splitter) {
        // tag allocation
        let tagName = splitter.children.filter(function (item) {
            if (item.type == "TagAllocation")
                return item;
        });

        if (tagName[0] != null && tagName[0] != undefined) {
            let index = splitter.children.indexOf(tagName[0])

            if (index != null && index != -1) {
                splitter.children[index].geometry.height = 25;
                splitter.children[index].geometry.x = splitter.children[index].positionX;
                splitter.children[index].geometry.y = splitter.children[index].positionY;

                splitter.children[index].source = splitter;
            }
        }
    }
}