 //** Refactoring  Yago */

 // Snap to Grid - Align 
function align(cells) {
    if(lastAction != 'cloneCells')
    {
        let distance = getDistance(cells);
    
        let elements;
    
        if (distance == 'y') {
            elements = graph.alignCells(mxConstants.ALIGN_MIDDLE); 
        } 
        else {
            elements = graph.alignCells(mxConstants.ALIGN_CENTER);
        }    
    
        arrangeCellName(elements);
        graph.selectionModel.removeCell(graph.selectionModel.cells[1]);
    }
    else
    {
        lastAction = 'align';
    }
};

function isUnit(cell) {
    return (cell.style.includes("unit"));
};

function arrangeCellName(cells) {

    cells.forEach(cell => {
        
        let childName = cell.getChildAt(0);
        if(childName != undefined && childName != null)
        {
            childName.geometry.x = childName.positionX;
            childName.geometry.y = childName.positionY;
        }
    });
};

function getDistance(cells) {

    if (cells.length > 1) {
        let firstCell = cells[0];
        let geoCell = firstCell.getGeometry();
        let valueX = geoCell.x;
        let valueY = geoCell.y;
        let distance = 'x';

        for (let i = 1; i < cells.length; i++) {
            let x = cells[i].geometry.x;
            let y = cells[i].geometry.y;

            //let distance = Math.hypot(x2-x1, y2-y1)
            let checkX = x-valueX;
            if(checkX < 0)
            {
                checkX = checkX * (-1);
            }
            let checkY = y-valueY;
            if(checkY < 0)
            {
                checkY = checkY * (-1);
            }

            if(checkY <= checkX)
            {
                distance = 'y';
            }
            else
            {
                distance = 'x';
            }

            // distance = Math.hypot(checkX, checkY);           
        }
        return distance;
    }
};


