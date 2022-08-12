//** Restore Label Position */
function restoreLabelPosition(cell) {
    // graph.getModel().beginUpdate();
    if(cell != null)
    {
        if (cell.children != null) {
    
            var children = cell.children;
            for(let i = 0; i < children.length; i++)
            {
                let item = children[i];
                if (item.type != undefined && item.type != null 
                    && (item.type.toLowerCase() == "streamname" || item.type.toLowerCase() == "tagname")) {
                    cell = item;
                }
            }
        }
    
        if (cell.parent != null && (cell.parent.type == 'ProductStream' || cell.parent.type == 'InternalStream' || cell.parent.type == 'FeedStream')) {
            let  targetState =  graph.getView().getState(cell.parent);
            // var translate = graph.view.getTranslate(targetState.absolutePoints[1].x, targetState.absolutePoints[1].y);
            let translate = graph.view.translate;
            // translate.x = translate.x * graph.view.scale;
            // translate.y = translate.y * graph.view.scale;
            let p =  1;
            
            if(targetState != null)
            {
                if(targetState.absolutePoints.length >= 3)
                {
                    p = 1;
                }

                cell.geometry.x = (((targetState.absolutePoints[p].x / graph.view.scale) - translate.x) + (cell.positionX))-10;
                cell.geometry.y = (((targetState.absolutePoints[p].y / graph.view.scale) - translate.y) + (cell.positionY));
            }
            else if(cell.parent.type == 'FeedStream' && cell.parent.source != null 
                && cell.parent.source.style != null && mountObjectDirection(cell.parent.source.style) == "west")
            {
                cell.geometry.x -= 100;
            }
            else if(cell.parent.type == 'FeedStream' && cell.parent.source != null 
                && cell.parent.source.style != null && mountObjectDirection(cell.parent.source.style) == "east")
            {
                cell.geometry.x += 30;
            }
            
            if(cell.parent.type == 'ProductStream' && cell.parent.source != null 
            && cell.parent.source.style != null && (mountObjectDirection(cell.parent.source.style) == "north" || mountObjectDirection(cell.parent.source.style) == "south"))
            {
                cell.geometry.x  -= 20;
            }
        } else if (cell != null) {
    
            let cellTag = setPosition(cell);
            removeCellGraph(cellTag);
        }
        removeRectsOfSelections();
        graph.refresh();
        // graph.getModel().endUpdate();
    }
};

function removeCellGraph(cell) {
    let cellGraph = graph.getModel().getCell(1);
    let index = cellGraph.children.indexOf(cell);
    if (index > 0) {
        cellGraph.children.splice(index, 1);
    }
};

function setPosition(cell) {

    cell.geometry.x = cell.positionX;
    cell.geometry.y = cell.positionY;
    cell.parent = cell.source;
    return cell;
};

//** Stream Default Position */
function setDefaultPositon(cell) 
{
    graph.getModel().beginUpdate();

    if (cell.type === 'FeedStream') 
    {
        let dir = mountObjectDirection(cell.target.style);
        let f1 = new FeedStream(cell.children[0].value, cell.target, cell.target.parent.geometry, cell.target.geometry, '#000', "stream;direction=" + dir);
        graph.addCell(f1, graph.getDefaultParent(), undefined, null, null);

        graph.removeCells([cell], false, true);
    }
    else if (cell.type === 'ProductStream') 
    {
        let dir = mountObjectDirection(cell.source.style);
        let newPStream = new  ProductStream(cell.children[0].value, graph.getDefaultParent(), cell.source, null, "direction=" + dir)

        graph.removeCells([cell], false, true);
    }

    graph.getModel().endUpdate();

    // if (cell !== null) {
        

    //     let cellTerminal;

    //     if (cell.type === 'FeedStream') {            
            
    //         cellTerminal = cell.getTerminal(false);    
    //     }
    //     else if (cell.type === 'ProductStream') {      
            
    //         cellTerminal = cell.getTerminal(true);
    //     }

    //     if (cellTerminal !== undefined) {
            
    //         let geoTerminal = getGeometryTerminal(cellTerminal);

    //         let state = graph.view.getState(cellTerminal);
    //         let direction = state.style[mxConstants.STYLE_DIRECTION];

    //         let style = cellTerminal.getStyle();

    //         let constraint;

    //         if (style.includes("portIn")) {
    //             constraint = calculateConstraint(direction, geoTerminal, 100, 170, 100, 100);
    //             automaticRouting();
    //             (constraint.x, constraint.y, cell, true);
    //         }
    //         else if (style.includes("portOut")) {
    //             constraint = calculateConstraint(direction, geoTerminal, -200, -170, -200, -200); 
    //             automaticRouting();
    //             setPoint(constraint.x, constraint.y, cell, false);
    //         }
    //     }
    //     graph.refresh();
    // }
};

function getGeometryTerminal(cellTerminal) {

    return { geoParent: cellTerminal.parent.geometry,
             geoPort: cellTerminal.geometry };
};

function calculateConstraint(direction, geoTerminal, valueEastX, valueWestX, valueNorthY, valueSouthY) {

    let constraint;

    if (direction === 'east') {
        
        constraint = {
            x: geoTerminal.geoParent.x - (valueEastX),
            y: (geoTerminal.geoParent.y) + (geoTerminal.geoParent.height * geoTerminal.geoPort.y) + geoTerminal.geoPort.height / 2
        };
    }
    else if (direction === 'west') {

        constraint = {
            x: geoTerminal.geoParent.x + (valueWestX),
            y: (geoTerminal.geoParent.y) + (geoTerminal.geoParent.height * geoTerminal.geoPort.y) + geoTerminal.geoPort.height / 2,
        };

    }
    else if (direction === 'north') {

        constraint = {
            x: geoTerminal.geoParent.x + (geoTerminal.geoParent.width * geoTerminal.geoPort.x) + geoTerminal.geoPort.width / 2,
            y: geoTerminal.geoParent.y + geoTerminal.geoParent.height + (valueNorthY)
        };
    }
    else {

        constraint = {
            x: geoTerminal.geoParent.x + (geoTerminal.geoParent.width * geoTerminal.geoPort.x) + geoTerminal.geoPort.width / 2,
            y: geoTerminal.geoParent.y - (valueSouthY)
        };
    }
    return constraint;
};

function setPoint(x, y, cell, isTerminal) {
    cell.geometry.setTerminalPoint(new mxPoint(x, y), isTerminal);
    cell.geometry.setTerminalPoint(new mxPoint(0, 0), !isTerminal);
};