var countFlash = 1;

class FlashDrumController {

    constructor() {
        this.name = "Flash Drum";
    }

    add(graph, evt, cell, x, y) {
        
        let modal = new Modal();
        let content = modal.createModalUnit();
        //modal.removeContent();
        modal.createContent(content);
        modal.open();
        
        let parent = graph.getDefaultParent();     
        var name = "";            
        
        name = graphEditor.validateCellNamesSequence(name, "flash");
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
                    var flash = new FlashDrum(name, parent);
                }
                     
                var pt = graph.getPointForEvent(evt);    
                flash.geometry.x = pt.x;
                flash.geometry.y = pt.y;

                FlashDrumController.prototype.tagNamePosition(flash);
                FlashDrumController.prototype.tagAllocationPosition(flash);
            }
            finally {
                graph.getModel().endUpdate();
            }
            graph.setSelectionCell(flash);
            modal.close();
        };
        
        $buttonCancel.onclick = function() {
            graphEditor.decrementCellNamesSequence("flash");
            modal.close();        
        }
        
        const $buttonHelp = document.querySelector("#btn-help");

        $buttonHelp.onclick = function() {
            callbackObj.openHelpModal(32);
        };
    }
}

FlashDrumController.prototype.tagNamePosition = function(flash) 
{
    // label
    let tagName = flash.children.filter(function (item) {
        if(item.type == "TagName")
            return item;
    });

    if(tagName[0] != null && tagName[0] != undefined)
    {
        let index = flash.children.indexOf(tagName[0])

        if(index != null && index != -1)
        {
            flash.children[index].geometry.height = 25;
            flash.children[index].geometry.x = flash.children[index].positionX;
            flash.children[index].geometry.y = flash.children[index].positionY;
            flash.children[index].source = flash;
        }
    }
}

FlashDrumController.prototype.tagAllocationPosition = function(flash) 
{
    // tag allocation
    tagName = flash.children.filter(function (item) {
        if(item.type == "TagAllocation")
            return item;
    });
    
    if(tagName[0] != null && tagName[0] != undefined)
    {
        let index = flash.children.indexOf(tagName[0])

        if(index != null && index != -1)
        {
            flash.children[index].geometry.height = 25;
            flash.children[index].geometry.x = flash.children[index].positionX;
            flash.children[index].geometry.y = flash.children[index].positionY;

            flash.children[index].source = flash;
        }
    }
}