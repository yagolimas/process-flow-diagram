var countColumn = 1;

class ColumnController {
    
    constructor() {
        this.name = "Column";
    }

    add(graph, evt, cell, x, y) {
        
        let modal = new Modal();
        let content = modal.createModalUnit();
        //modal.removeContent();
        modal.createContent(content);
        modal.open();
        
        let parent = graph.getDefaultParent();     
        var name = "";            
        
        name = graphEditor.validateCellNamesSequence(name, "column");
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
                    var column = new Column(name, parent);
                }
                     
                var pt = graph.getPointForEvent(evt);    
                column.geometry.x = pt.x;
                column.geometry.y = pt.y;  

                ColumnController.prototype.tagNamePosition(column);
                ColumnController.prototype.tagAllocationPosition(column);
                
            }
            finally 
            {
                graph.getModel().endUpdate();
            }
            graph.setSelectionCell(column);
            modal.close();
        };
        
        $buttonCancel.onclick = function() {
            graphEditor.decrementCellNamesSequence("column");
            modal.close();        
        }
        
        const $buttonHelp = document.querySelector("#btn-help");

        $buttonHelp.onclick = function() {
            callbackObj.openHelpModal(32);
        };
    }
}

ColumnController.prototype.tagNamePosition = function(column) 
{
    // label
    let tagName = column.children.filter(function (item) {
        if(item.type == "TagName")
            return item;
    });

    if(tagName[0] != null && tagName[0] != undefined)
    {
        let index = column.children.indexOf(tagName[0])

        if(index != null && index != -1)
        {
            column.children[index].geometry.height = 25;
            column.children[index].geometry.x = column.children[index].positionX;
            column.children[index].geometry.y = column.children[index].positionY;
            column.children[index].source = column;
        }
    }
}

ColumnController.prototype.tagAllocationPosition = function(column) 
{
    // tag allocation
    tagName = column.children.filter(function (item) {
        if(item.type == "TagAllocation")
            return item;
    });
    
    if(tagName[0] != null && tagName[0] != undefined)
    {
        let index = column.children.indexOf(tagName[0])

        if(index != null && index != -1)
        {
            column.children[index].geometry.height = 25;
            column.children[index].geometry.x = column.children[index].positionX;
            column.children[index].geometry.y = column.children[index].positionY;

            column.children[index].source = column;
        }
    }
}