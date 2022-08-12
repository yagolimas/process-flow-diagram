var countOther = 1;

class OtherController {

    constructor() {
        this.name = "Other";
    }

    add(graph, evt) {

        let modal = new Modal();
        let content = modal.createModalUnit();
        let subContent = modal.createContent(content);
        modal.open();

        const $input = document.querySelector('#unit');
        const $buttonOk = document.querySelector("#btn-ok");
        const $buttonCancel = document.querySelector("#btn-cancel");

        let name = graphEditor.validateCellNamesSequence("", "other");

        $input.value = name;
        $input.focus();
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
                    let other = new Other(name, parent);

                    var pt = graph.getPointForEvent(evt);
                    other.geometry.x = pt.x;
                    other.geometry.y = pt.y;

                    self.tagNamePosition(other);
                    self.tagAllocationPosition(other);

                    graph.setSelectionCell(other);

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
            graphEditor.decrementCellNamesSequence("other");
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

    tagNamePosition(other) {
        // label
        let tagName = other.children.filter(function (item) {
            if (item.type == "TagName")
                return item;
        });

        if (tagName[0] != null && tagName[0] != undefined) {
            let index = other.children.indexOf(tagName[0])

            if (index != null && index != -1) {
                other.children[index].geometry.height = 25;
                other.children[index].geometry.x = other.children[index].positionX;
                other.children[index].geometry.y = other.children[index].positionY;
                other.children[index].source = other;
            }
        }
    }

    tagAllocationPosition(other) {
        // tag allocation
        let tagName = other.children.filter(function (item) {
            if (item.type == "TagAllocation")
                return item;
        });

        if (tagName[0] != null && tagName[0] != undefined) {
            let index = other.children.indexOf(tagName[0])

            if (index != null && index != -1) {
                other.children[index].geometry.height = 25;
                other.children[index].geometry.x = other.children[index].positionX;
                other.children[index].geometry.y = other.children[index].positionY;

                other.children[index].source = other;
            }
        }
    }
}