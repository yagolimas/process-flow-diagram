var countExchanger = 1;

class HeatExchangerController {

    constructor() {
        this.name = "Heat Exchanger";
    }

    add(graph, evt, cell, x, y) {

        let modal = new Modal();
        let content = modal.createModalUnit();
        //modal.removeContent();
        modal.createContent(content);
        modal.open();
        
        let parent = graph.getDefaultParent();     
        var name = "";            
        
        name = graphEditor.validateCellNamesSequence(name, "exchanger");
        document.querySelector('#unit').value = name;
        document.querySelector('#unit').focus();
        document.querySelector('#unit').select();
        
        const $buttonOk = document.querySelector("#btn-ok");
        const $buttonCancel = document.querySelector("#btn-cancel");

        $buttonOk.onclick = function() {           

            graph.getModel().beginUpdate();

            try {
                name = document.querySelector('#unit').value;
                let isValid = graphEditor.validateCellNames(name);
                
                if(isValid == false)
                {
                    let subModal = new Modal();    
                    let content = subModal.createModalAlertMessage('', "New name not supplied");
                           
                    let subContent = subModal.createContent(content);
                    subModal.open();

                    subContent.querySelector("#btn-ok").onclick = () => {
                        document.querySelectorAll('.modal')[1].remove();
                        document.querySelector('#unit').focus()                     
                    };                    
                }
                else
                {
                    var heatExchanger = new HeatExchanger(name, parent);
                }
                
                let pt = graph.getPointForEvent(evt);    
                heatExchanger.geometry.x = pt.x;
                heatExchanger.geometry.y = pt.y;

                HeatExchangerController.prototype.tagNamePosition(heatExchanger);
                HeatExchangerController.prototype.tagAllocationPosition(heatExchanger);                
            }
            finally {
                graph.getModel().endUpdate();
            }
            graph.setSelectionCell(heatExchanger);
            modal.close();
        };
        
        $buttonCancel.onclick = function() {
            graphEditor.decrementCellNamesSequence("exchanger");
            modal.close();        
        }
        
        const $buttonHelp = document.querySelector("#btn-help");

        $buttonHelp.onclick = function() {
            callbackObj.openHelpModal(32);
        };
    }
}

HeatExchangerController.prototype.tagNamePosition = function(heatExchanger) 
{
    // label
    let tagName = heatExchanger.children.filter(function (item) {
        if(item.type == "TagName")
            return item;
    });

    if(tagName[0] != null && tagName[0] != undefined)
    {
        let index = heatExchanger.children.indexOf(tagName[0])

        if(index != null && index != -1)
        {
            heatExchanger.children[index].geometry.height = 25;
            heatExchanger.children[index].geometry.x = heatExchanger.children[index].positionX;
            heatExchanger.children[index].geometry.y = heatExchanger.children[index].positionY;
            heatExchanger.children[index].source = heatExchanger;
        }
    }
}

HeatExchangerController.prototype.tagAllocationPosition = function(heatExchanger) 
{
    // tag allocation
    tagName = heatExchanger.children.filter(function (item) {
        if(item.type == "TagAllocation")
            return item;
    });
    
    if(tagName[0] != null && tagName[0] != undefined)
    {
        let index = heatExchanger.children.indexOf(tagName[0])

        if(index != null && index != -1)
        {
            heatExchanger.children[index].geometry.height = 25;
            heatExchanger.children[index].geometry.x = heatExchanger.children[index].positionX;
            heatExchanger.children[index].geometry.y = heatExchanger.children[index].positionY;

            heatExchanger.children[index].source = heatExchanger;
        }
    }
}