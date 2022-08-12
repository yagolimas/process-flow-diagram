var countAirCooler = 1;

class AirCoolerController {
    
    constructor() {
        this.name = "Air Cooler";
    }

    add(graph, evt) {

        let modal = new Modal();
        let content = modal.createModalUnit();
        let subContent = modal.createContent(content);
        modal.open();       
        
        const $input = document.querySelector('#unit');
        const $buttonOk = document.querySelector("#btn-ok");
        const $buttonCancel = document.querySelector("#btn-cancel");
        
        let name = graphEditor.validateCellNamesSequence("", "airCooler");
        
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
        
        $buttonOk.onkeyup = function(event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                $buttonOk.click();
            }
        };

        $buttonCancel.onkeyup = function(event) {
            event.preventDefault();
            if (event.keyCode == 13) {
                $buttonCancel.click();
            }
        };
        
        $buttonOk.onclick = function() {
            
            let parent = graph.getDefaultParent();
            
            graph.getModel().beginUpdate();

            try {
                name = $input.value;
                let isValid = graphEditor.validateCellNames(name);

                if (!isValid) {
                    throw new NameInUseExcpetion("Name already in use");
                }
                else {
                    let airCooler = new AirCooler(name, parent);
                    
                    var pt = graph.getPointForEvent(evt);                   
                    airCooler.geometry.x = pt.x;
                    airCooler.geometry.y = pt.y;
                    
                    self.tagNamePosition(airCooler);
                    self.tagAllocationPosition(airCooler);

                    graph.setSelectionCell(airCooler);
                    
                    modal.close();
                }
            }
            catch(e) {
                e.openModalAlert();
            }
            finally {
                graph.getModel().endUpdate();
                containerOpened.checkConnectivityModalCreate(null, false);
            }            
        };
        
        $buttonCancel.onclick = function() {
            graphEditor.decrementCellNamesSequence("airCooler");
            modal.close();        
        };
        
        const $buttonHelp = document.querySelector("#btn-help");

        $buttonHelp.onclick = function() {
            callbackObj.openHelpModal(32);
        };

        subContent.addEventListener('keydown', (event) => {
            //event.preventDefault();
            if (event.keyCode == 27) {
                subContent.querySelector("#btn-cancel").click();
            }
        });
    }

    tagNamePosition(airCooler) {
        // label
        let tagName = airCooler.children.filter(function (item) {
            if (item.type == "TagName")
                return item;
        });
    
        if (tagName[0] != null && tagName[0] != undefined) {
            let index = airCooler.children.indexOf(tagName[0])
    
            if (index != null && index != -1) {
                airCooler.children[index].geometry.height = 25;
                airCooler.children[index].geometry.x = airCooler.children[index].positionX;
                airCooler.children[index].geometry.y = airCooler.children[index].positionY;
                airCooler.children[index].source = airCooler;
            }
        }
    }

    tagAllocationPosition(airCooler) {
        // tag allocation
        let tagName = airCooler.children.filter(function (item) {
            if (item.type == "TagAllocation")
                return item;
        });
    
        if (tagName[0] != null && tagName[0] != undefined) {
            let index = airCooler.children.indexOf(tagName[0])
    
            if (index != null && index != -1) {
                airCooler.children[index].geometry.height = 25;
                airCooler.children[index].geometry.x = airCooler.children[index].positionX;
                airCooler.children[index].geometry.y = airCooler.children[index].positionY;
    
                airCooler.children[index].source = airCooler;
            }
        }
    }
}
