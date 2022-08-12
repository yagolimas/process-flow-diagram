function mountObjectDirection(style) {
    
    let items = style.split(";");
    
    for (let i in items) {
        let pair = items[i].split("=");
        let key = pair[0];
        let value = pair[1];

        if (key == "direction") {
            return value
        }
    }
};

function mountObjectConstraint(style) {
    
    let items = style.split(";");
    
    for (let i in items) {
        let pair = items[i].split("=");
        let key = pair[0];
        let value = pair[1];

        if (key == "portConstraint") {
            return value
        }
    }
};

function mountObjectRotation(style) {
    
    let items = style.split(";");
    
    for (let i in items) {
        let pair = items[i].split("=");
        let key = pair[0];
        let value = pair[1];

        if (key == "rotation") {
            return parseInt(value);
        }
    }
};

function mountObjectFlipH(style) {
    
    let items = style.split(";");
    
    for (let i in items) {
        let pair = items[i].split("=");
        let key = pair[0];
        let value = pair[1];

        if (key == "flipH") {
            return parseInt(value);
        }
    }
};

function mountObjectColor(style) {
    
    let items = style.split(";");
    
    for (let i in items) {
        let pair = items[i].split("=");
        let key = pair[0];
        let value = pair[1];

        if (key == "strokeColor") {
            return value;
        }
    }
};

function fixStringStyle(style)
{
    let str = style.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    return str.replace(";;",";").replace(',undefined','');
};

function getAllStreamsJson() 
{
    let cells = Object.values(graph.model.cells);
    let streamsToReturn = [];

    let streams = cells.filter( function( elem, i, cells ) {
        let isEdge = false;
        if(elem != null && elem.id != null && elem.edge)
        {
            let obj = {id: elem.id, style: elem.style, type: elem.type, actualColor: mountObjectColor(elem.style), newColor: null};
            streamsToReturn.push(obj);
            isEdge = true;
        }
        return isEdge;
        // return (elem != null && elem.id != null && elem.edge);
    } );
    
    return JSON.stringify(streamsToReturn);
}

function changeStreamColorFromJson(streamsToChange) 
{
    let streamsParsed = JSON.parse(streamsToChange);
    // let cells = Object.values(graph.model.cells);

    let streams = streamsParsed.filter( function( elem, i, streamsParsed ) {
        let isEdge = false;
        if(elem != null && elem.id != null && elem.newColor != null)
        {
            let actualStream = graph.getModel().getCell(elem.id);
            let newStyle = actualStream.style.replace('strokeColor=#000000','strokeColor=' + elem.newColor).replace('fillColor=#000','fillColor=' + elem.newColor).replace('strokeColor=#000','strokeColor=' + elem.newColor).replace('fillColor=#000000','fillColor=' + elem.newColor);
            graph.setCellStyle(newStyle, [actualStream]);
            isEdge = true;
        }
        return isEdge;
    } );
}

//** Composing context Menu */
function rotateOthers(cell, menu, subMenu) {
    menu.addItem('Flip Top-Bottom', '', '', function () {
        //** Refactoring  Yago */
        flipTopBottom(cell);
    }, subMenu);
    menu.addItem('Rotate Clockwise', '', '', function () {
        rotateClockwise(cell);
    }, subMenu);
    menu.addItem('Rotate Anticlockwise', '', '', function () {
        rotateAnticlockwise(cell);
    }, subMenu);
};

function hideName(isVisible, cell, unitType, menu) {
    let streamText = '';
    if (unitType == 'stream')
        streamText = ' Stream';

    menu.addItem((isVisible ? 'Hide' : 'Show') + streamText + ' Name', '', '', function (evt) {
        setVisible(cell);
    });
}

function menuGeneral(cell, cellType, menu) 
{
    menu.addItem('Delete', '', 'DEL', function () {
        editor.execute('delete', cell);
    });

    menu.addItem('Rename', '', '', function (evt) {
        rename(cell);
    });

    menu.addSeparator();

    let isVisible = cell.getChildAt(0) != null ? cell.getChildAt(0).isVisible() : false;

    hideName(isVisible, cell, cellType, menu);

    if(App.action.toLowerCase() == 'edit')
    {
        menu.addItem('Restore Label Position', '', '', function (evt) {
            graph.getModel().beginUpdate();
            restoreLabelPosition(cell);
            graph.getModel().endUpdate();
        });
    }
};

function menuMonitor(cell, menu) 
{
    if (cell.style.includes("exchanger") || cell.style.includes("kettleReboiler"))
    {
        menu.addItem('Mechanical Data', '', '', function () {
            callbackObj.openMechanicalDataModal();
        });
        menu.addItem('Network Options', '', '', function () {
            callbackObj.openNetworkOptionsModal();
        });
        menu.addSeparator();
        menu.addItem('Case Data', '', '', function () {
            swapCell(cell);
        });
        menu.addSeparator();            
        var subMenu = menu.addItem('View Results', '', '', null);

        menu.addItem('Data Reconciliation', '', '', function () {
            //** Refactoring */
            flipLeftRight(cell);
        }, subMenu);
        menu.addItem('Foulin Calculation', '', '', function () {
            //** Refactoring */
            flipLeftRight(cell);
        }, subMenu);

        menu.addItem('View Foulin Plot ', '', '', function () {
            swapCell(cell);
        });
    }
    else
    {
        menu.addItem('Network Options', '', '', function () {
            callbackObj.openMechanicalDataModal();
        });
        menu.addItem('Case Data', '', '', function () {
            swapCell(cell);
        });
        menu.addSeparator();         
        var subMenu = menu.addItem('View Results', '', '', null);

        menu.addItem('Data Reconciliation', '', '', function () {
            //** Refactoring */
            flipLeftRight(cell);
        }, subMenu);
        menu.addItem('Foulin Calculation', '', '', function () {
            //** Refactoring */
            flipLeftRight(cell);
        }, subMenu);
    }
    menu.addSeparator();
    menu.addItem('Tag Allocation', '', '', function () {
        callbackObj.openMonitorTagAllocation();
    });
    menu.addSeparator();
};

function cleanContainer(){
    let cellsToFindDuplicates = Object.values(graph.model.cells);
    let containerHtml = container.innerHTML;
    let cellsForDel = [];

    for(let i = 2; i < cellsToFindDuplicates.length; i++)
    {
        let actualCell = cellsToFindDuplicates[i];

        if(actualCell.type != null && actualCell.type.toLowerCase() == "streamname")
        {
            let stringContained = containerHtml.includes('>' + actualCell.value + '</text>');
            if(!stringContained)
            {
                cellsForDel.push(actualCell.parent);
            }
        }
    }
    
    graph.removeCells(cellsForDel,false,true);
};

function removeDuplicateddhildren(){
    let cellsToFindDuplicates = Object.values(graph.model.cells);
    let cellsForDel = [];
    
    for(let i = 2; i < cellsToFindDuplicates.length; i++)
    {
        let actualCell = cellsToFindDuplicates[i];
        if(actualCell.children != null && actualCell.children != [] && actualCell.children.length != 0)
        {
            let children = actualCell.children;
    
            let unique_array = children.filter(function(elem, index, self) {
                return index == self.indexOf(elem);
            });
            actualCell.children = unique_array;
        }
    }
};