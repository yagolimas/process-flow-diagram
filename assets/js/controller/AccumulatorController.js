var countAccumulator = 1;

class AccumulatorController {

    constructor() {
        this.name = "Accumulator";
    }

    add(graph, evt) {

        let modal = new Modal();
        let content = modal.createModalUnit();
        let subContent = modal.createContent(content);
        modal.open();

        const $input = document.querySelector('#unit');
        const $buttonOk = document.querySelector("#btn-ok");
        const $buttonCancel = document.querySelector("#btn-cancel");

        let name = graphEditor.validateCellNamesSequence("", "accumulator");

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
            if (event.keyCode === 13) {
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
                    var accumulator = new Accumulator(name, parent);

                    var pt = graph.getPointForEvent(evt);
                    accumulator.geometry.x = pt.x;
                    accumulator.geometry.y = pt.y;

                    self.tagNamePosition(accumulator);
                    self.tagAllocationPosition(accumulator);

                    graph.setSelectionCell(accumulator);

                    modal.close();
                    restoreLabelPosition(accumulator);
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
            graphEditor.decrementCellNamesSequence("accumulator");
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

    tagNamePosition(accumulator) {
        // label
        // let tagName = accumulator.children.filter(function (item) {
        //     if (item.type == "TagName")
        //         return item;
        // });
        let tagName = accumulator.children[0];
        if (tagName[0] != null && tagName[0] != undefined) {
            let index = accumulator.children.indexOf(tagName[0])

            if (index != null && index != -1) {
                accumulator.children[index].geometry.height = 25;
                accumulator.children[index].geometry.x = accumulator.children[index].positionX;
                accumulator.children[index].geometry.y = accumulator.children[index].positionY;
                accumulator.children[index].source = accumulator;
            }
        }
    }

    tagAllocationPosition(accumulator) {
        // tag allocation
        let tagName = accumulator.children.filter(function (item) {
            if (item.type == "TagAllocation")
                return item;
        });

        if (tagName[0] != null && tagName[0] != undefined) {
            let index = accumulator.children.indexOf(tagName[0])

            if (index != null && index != -1) {
                accumulator.children[index].geometry.height = 25;
                accumulator.children[index].geometry.x = accumulator.children[index].positionX;
                accumulator.children[index].geometry.y = accumulator.children[index].positionY;

                accumulator.children[index].source = accumulator;
            }
        }
    }
}
