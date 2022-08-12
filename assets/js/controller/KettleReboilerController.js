var countKettleReboiler = 1;

class KettleReboilerController {

    constructor() {
        this.name = "Kettle Reboiler";
    }

    add(graph, evt, cell, x, y) {

        let modal = new Modal();
        let content = modal.createModalUnit();
        //modal.removeContent();
        modal.createContent(content);
        modal.open();
        
        let parent = graph.getDefaultParent();   
        var name = "";            
        
        name = graphEditor.validateCellNamesSequence(name, "kettleReboiler");
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
                    var kettleObj = new KettleReboiler(name, parent);
                }
                  
                var pt = graph.getPointForEvent(evt);    
                kettleObj.geometry.x = pt.x;
                kettleObj.geometry.y = pt.y;  

                KettleReboilerController.prototype.tagNamePosition(kettleObj);
                KettleReboilerController.prototype.tagAllocationPosition(kettleObj);
            }
            finally {
                graph.getModel().endUpdate();
            }
            graph.setSelectionCell(kettleObj);
            modal.close();
        };
        
        $buttonCancel.onclick = function() {
            graphEditor.decrementCellNamesSequence("kettleReboiler");
            modal.close();        
        }
        
        const $buttonHelp = document.querySelector("#btn-help");

        $buttonHelp.onclick = function() {
            callbackObj.openHelpModal(32);
        };
    }
}

KettleReboilerController.prototype.tagNamePosition = function(kettleObj) 
{
    // label
    let tagName = kettleObj.children.filter(function (item) {
        if(item.type == "TagName")
            return item;
    });

    if(tagName[0] != null && tagName[0] != undefined)
    {
        let index = kettleObj.children.indexOf(tagName[0])

        if(index != null && index != -1)
        {
            kettleObj.children[index].geometry.height = 25;
            kettleObj.children[index].geometry.x = kettleObj.children[index].positionX;
            kettleObj.children[index].geometry.y = kettleObj.children[index].positionY;
            kettleObj.children[index].source = kettleObj;
        }
    }
}

KettleReboilerController.prototype.tagAllocationPosition = function(kettleObj) 
{
    // tag allocation
    tagName = kettleObj.children.filter(function (item) {
        if(item.type == "TagAllocation")
            return item;
    });
    
    if(tagName[0] != null && tagName[0] != undefined)
    {
        let index = kettleObj.children.indexOf(tagName[0])

        if(index != null && index != -1)
        {
            kettleObj.children[index].geometry.height = 25;
            kettleObj.children[index].geometry.x = kettleObj.children[index].positionX;
            kettleObj.children[index].geometry.y = kettleObj.children[index].positionY;

            kettleObj.children[index].source = kettleObj;
        }
    }
}