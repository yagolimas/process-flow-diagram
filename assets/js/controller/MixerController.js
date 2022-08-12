var countMixer = 1;

class MixerController {

    constructor() {
        this.name = "Mixer";
    }

    add(graph, evt) {

        let modal = new Modal();
        let content = modal.createModalUnit();
        let subContent = modal.createContent(content);
        modal.open();

        const $input = document.querySelector('#unit');
        const $buttonOk = document.querySelector("#btn-ok");
        const $buttonCancel = document.querySelector("#btn-cancel");

        let name = graphEditor.validateCellNamesSequence("", "mixer");

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
                    let mixer = new Mixer(name, parent);

                    var pt = graph.getPointForEvent(evt);
                    mixer.geometry.x = pt.x;
                    mixer.geometry.y = pt.y;

                    self.tagNamePosition(mixer);
                    self.tagAllocationPosition(mixer);

                    graph.setSelectionCell(mixer);

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
            graphEditor.decrementCellNamesSequence("mixer");
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

    tagNamePosition(mixer) {
        // label
        let tagName = mixer.children.filter(function (item) {
            if (item.type == "TagName")
                return item;
        });

        if (tagName[0] != null && tagName[0] != undefined) {
            let index = mixer.children.indexOf(tagName[0])

            if (index != null && index != -1) {
                mixer.children[index].geometry.height = 25;
                mixer.children[index].geometry.x = mixer.children[index].positionX;
                mixer.children[index].geometry.y = mixer.children[index].positionY;
                mixer.children[index].source = mixer;
            }
        }
    }

    tagAllocationPosition(mixer) {
        // tag allocation
        let tagName = mixer.children.filter(function (item) {
            if (item.type == "TagAllocation")
                return item;
        });

        if (tagName[0] != null && tagName[0] != undefined) {
            let index = mixer.children.indexOf(tagName[0])

            if (index != null && index != -1) {
                mixer.children[index].geometry.height = 25;
                mixer.children[index].geometry.x = mixer.children[index].positionX;
                mixer.children[index].geometry.y = mixer.children[index].positionY;

                mixer.children[index].source = mixer;
            }
        }
    }
}