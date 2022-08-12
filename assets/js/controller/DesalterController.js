var countDesalter = 1;

class DesalterController {
    
    constructor() {
        this.name = "Desalter";
    }

    add(graph, evt, cell, x, y) {
        
        let modal = new Modal();
        let content = modal.createModalUnit();
        //modal.removeContent();
        modal.createContent(content);
        modal.open();
        
        let parent = graph.getDefaultParent();     
        var name = "";            
        
        name = graphEditor.validateCellNamesSequence(name, "desalter");
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
                    var desalter = new Desalter(name, parent);
                }
                
                var pt = graph.getPointForEvent(evt);    
                desalter.geometry.x = pt.x;
                desalter.geometry.y = pt.y;

                DesalterController.prototype.tagNamePosition(desalter);
                DesalterController.prototype.tagAllocationPosition(desalter);
            }
            finally {
                graph.getModel().endUpdate();          
            }
            graph.setSelectionCell(desalter);
            modal.close();
        };

        $buttonCancel.onclick = function() {
            graphEditor.decrementCellNamesSequence("desalter");
            modal.close();        
        }
        
        const $buttonHelp = document.querySelector("#btn-help");

        $buttonHelp.onclick = function() {
            callbackObj.openHelpModal(32);
        };
    }
}

DesalterController.prototype.tagNamePosition = function(desalter) 
{
    // label
    let tagName = desalter.children.filter(function (item) {
        if(item.type == "TagName")
            return item;
    });

    if(tagName[0] != null && tagName[0] != undefined)
    {
        let index = desalter.children.indexOf(tagName[0])

        if(index != null && index != -1)
        {
            desalter.children[index].geometry.height = 25;
            desalter.children[index].geometry.x = desalter.children[index].positionX;
            desalter.children[index].geometry.y = desalter.children[index].positionY;
            desalter.children[index].source = desalter;
        }
    }
}

DesalterController.prototype.tagAllocationPosition = function(desalter) 
{
    // tag allocation
    tagName = desalter.children.filter(function (item) {
        if(item.type == "TagAllocation")
            return item;
    });
    
    if(tagName[0] != null && tagName[0] != undefined)
    {
        let index = desalter.children.indexOf(tagName[0])

        if(index != null && index != -1)
        {
            desalter.children[index].geometry.height = 25;
            desalter.children[index].geometry.x = desalter.children[index].positionX;
            desalter.children[index].geometry.y = desalter.children[index].positionY;

            desalter.children[index].source = desalter;
        }
    }
}