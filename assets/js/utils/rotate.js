/** Rotate ClockWise */
function rotateClockwise(cell) {
                            
    if (cell != null) {

        try {
            graph.getModel().beginUpdate();
            
            rotateCell(cell, 90);

            let childrens = cell.children;

            let ports = childrens.filter(isPort);

            for(let i = 0; i < ports.length; i++) {

                if (ports[i].edges !== undefined) {

                    let stream = ports[i].getEdgeAt(0);
                    if(stream != null)
                    {
                        // setDefaultPositon(stream);
                    }
                }
            }          
            //cell['isRotate'] = true;            
        }
        finally {
            graph.getModel().endUpdate();
            graph.refresh();
        }
    }
};

/** Rotate AntiClockWise */
function rotateAnticlockwise(cell) {
                            
    if (cell != null) {

        try {
            graph.getModel().beginUpdate();
            
            rotateCell(cell, -90);
            let childrens = cell.children;

            let ports = childrens.filter(isPort);

            for(let i = 0; i < ports.length; i++) {

                if (ports[i].edges !== undefined) {

                    let stream = ports[i].getEdgeAt(0);

                    if(stream != null)
                    {
                        // setDefaultPositon(stream);
                    }
                }
            }  
            //cell['isRotate'] = false;            
        }
        finally {
            graph.getModel().endUpdate();
            graph.refresh();
        }
    }
};

function rotateCell(cell, angle, swap)
{
    swap = swap == null ? false : swap;

    graph.getModel().beginUpdate();

    let state = graph.view.getState(cell);
    let children = cell.children;
    let tagName = null;
    let tagAllocation = null;
    let childrenToExclude = [];
    
    for (let i in children) {
        if (children[i] != null && children[i].type == "TagName") {
            tagName = children[i];
            childrenToExclude.push(i);
        }
        else if (children[i] != null && children[i].type == "TagAllocation") {
            tagAllocation = children[i];
            childrenToExclude.push(i);
        }
    }

    if (childrenToExclude != null) {
        childrenToExclude.reverse();
    }

    for (let j in childrenToExclude) {
        cell.children.splice(childrenToExclude[j], 1);
    }

    if (state != null) {
        let vertexHandler = graph.createVertexHandler(state);
        vertexHandler.rotateCell(cell, angle, cell.parent, swap);
    }

    if (tagName != null) {
        //cell.children.push(tagName);
        cell.children.splice(0, 0, tagName);
    }

    if (tagAllocation != null) {
        //cell.children.push(tagAllocation);        
        cell.children.splice(1, 0, tagAllocation);
    }
    
    cell.style = fixRotation(cell);

    if(!swap)
    {
        for (let i in children) {
            if (children[i] != null && (children[i].type == "PortIn" || children[i].type == "PortOut")) {
                if (angle != 0) {
                    let calcAngle = (angle / 90);
                    let style = children[i].style;
                    let dir = mountObjectDirection(style);
    
                    style = invertDirectionRotate(style, dir, calcAngle);
    
                    graph.setCellStyles(mxConstants.STYLE_DIRECTION, dir, [children[i]]);
                    children[i].style = style;
                }
            }
            else if (children[i] != null && (children[i].type == "TagName" || children[i].type == "TagAllocation")) {
                if (children[i] != null && (children[i].value == "tag" || children[i].value == ""))
                {
                    cell.children[i].setVisible(false);
                }
            }
        }
    }
    
    graph.getModel().endUpdate();
    removeRectsOfSelections();
    graph.refresh();
};

function removeRectsOfSelections() {
    let rects = document.getElementsByTagName('rect')

    if (rects.length > 0) {
        for (let i = rects.length-1; i >= 0; i--) {
            if (rects[i] != 0 && i != "length" && i != "item" && i != "namedItem") {
                i = parseInt(i);

                if (rects[i].hasAttribute("stroke-dasharray")) {
                    if (rects[i].getAttribute("stroke-dasharray") == "3 3" ||
                    rects[i].getAttribute("stroke-dasharray") == "2.0999999999999996 2.0999999999999996" ||
                    rects[i].getAttribute("stroke-dasharray") == "1.5 1.5" ||
                    rects[i].getAttribute("stroke-dasharray") == "1.7999999999999998 1.7999999999999998") {
                        let element = rects[i];
                        element.parentNode.removeChild(element);
                    }
                }
            }
        }
    }
};

function fixRotation(cell) 
{    
    let cellRotation = mountObjectRotation(cell.style);

    if(cellRotation == 270)
    {
        cell.style = cell.style.replace("rotation=270;", "rotation=-90;");
    }
    else if(cellRotation == -270)
    {
        cell.style = cell.style.replace("rotation=-270;", "rotation=90;");
    }
    else if(cellRotation == 360)
    {
        cell.style = cell.style.replace("rotation=360;", "rotation=0;");
    }
    else if(cellRotation == -360)
    {
        cell.style = cell.style.replace("rotation=-360;", "rotation=0;");
    }
    return cell.style;
};

function invertDirectionRotate (style, dir, calcAngle) 
{
    switch (calcAngle) {
        case -2:
            switch (dir) {
                case 'east':
                    dir = 'west';
                    style = style.replace(/east/g, 'westc');
                    style = style.replace(/west/g, "east");
                    style = style.replace(/eastc/g, "west");
                    style = style.replace("rotation=-180;", "");
                    break;
                case 'south':
                    dir = 'north';
                    style = style.replace(/south/g, 'northc');
                    style = style.replace(/north/g, "south");
                    style = style.replace(/southc/g, "north");
                    style = style.replace("rotation=-180;", "");
                    break;
                case 'west':
                    dir = 'east';
                    style = style.replace(/west/g, 'eastc');
                    style = style.replace(/east/g, "west");
                    style = style.replace(/westc/g, "east");
                    style = style.replace("rotation=-180;", "");
                    break;
                case 'north':
                    dir = 'south';
                    style = style.replace(/north/g, 'southc');
                    style = style.replace(/south/g, "north");
                    style = style.replace(/northc/g, "south");
                    style = style.replace("rotation=-180;", "");
            }
            break;
        case -1:
            switch (dir) {
                case 'south':
                    dir = 'east';
                    style = style.replace(/south/g, 'east');
                    style = style.replace(/north/g, "west");
                    style = style.replace("rotation=-90;", "");
                    break;
                case 'west':
                    dir = 'south';
                    style = style.replace(/west/g, 'south');
                    style = style.replace(/east/g, "north");
                    style = style.replace("rotation=-90;", "");
                    break;
                case 'north':
                    dir = 'west';
                    style = style.replace(/north/g, 'west');
                    style = style.replace(/south/g, "east");
                    style = style.replace("rotation=-90;", "");
                    break;
                case 'east':
                    dir = 'north';
                    style = style.replace(/east/g, 'north');
                    style = style.replace(/west/g, "south");
                    style = style.replace("rotation=-90;", "");
                    break;
            }
            break;
        case 1:
            switch (dir) {
                case 'east':
                    dir = 'south';
                    style = style.replace(/east/g, 'south');
                    style = style.replace(/west/g, "north");
                    style = style.replace("rotation=90;", "");
                    break;
                case 'south':
                    dir = 'west';
                    style = style.replace(/south/g, "west");
                    style = style.replace(/north/g, "east");
                    style = style.replace("rotation=90;", "");
                    break;
                case 'west':
                    dir = 'north';
                    style = style.replace(/west/g, "north");
                    style = style.replace(/east/g, "south");
                    style = style.replace("rotation=90;", "");
                    break;
                case 'north':
                    dir = 'east';
                    style = style.replace(/north/g, "east");
                    style = style.replace(/south/g, "west");
                    style = style.replace("rotation=90;", "");
                    break;
            }
            break;
        case 2:
            switch (dir) {
                case 'east':
                    dir = 'west';
                    style = style.replace(/east/g, 'westc');
                    style = style.replace(/west/g, "east");
                    style = style.replace(/eastc/g, "west");
                    style = style.replace("rotation=180;", "");
                    break;
                case 'south':
                    dir = 'north';
                    style = style.replace(/south/g, 'northc');
                    style = style.replace(/north/g, "south");
                    style = style.replace(/southc/g, "north");
                    style = style.replace("rotation=180;", "");
                    break;
                case 'west':
                    dir = 'east';
                    style = style.replace(/west/g, 'eastc');
                    style = style.replace(/east/g, "west");
                    style = style.replace(/westc/g, "east");
                    style = style.replace("rotation=180;", "");
                    break;
                case 'north':
                    dir = 'south';
                    style = style.replace(/north/g, 'southc');
                    style = style.replace(/south/g, "north");
                    style = style.replace(/northc/g, "south");
                    style = style.replace("rotation=180;", "");
                    break;
            }
            break;
    }

    return style;
};

/** Rotate ClockWise */
function rotateClockwiseArrow(cell) 
{
    if (cell != null) {

        try {
            graph.getModel().beginUpdate();
            
            rotateArrow(cell, 1);
        }
        finally {
            graph.getModel().endUpdate();
            removeRectsOfSelections();
            graph.refresh();
        }
    }
};

/** Rotate AntiClockWise */
function rotateAnticlockwiseArrow(cell) 
{
    if (cell != null) {

        try {
            graph.getModel().beginUpdate();
            
            rotateArrow(cell, -1);
        }
        finally {
            graph.getModel().endUpdate();
            removeRectsOfSelections();
            graph.refresh();
        }
    }
};

function rotateArrow(cell, calcAngle)
{
    cell.style = fixRotation(cell);

    let dir = mountObjectDirection(cell.style);

    let style = invertDirectionRotate(cell.style, dir, calcAngle);
    
    // cell.style = style;

    if (cell && cell.type && cell.type.toLowerCase() == "portinstream") 
    {
        let direction = mountObjectDirection(style);
        let constraint = mountObjectConstraint(style);
        
        graph.setCellStyles(mxConstants.STYLE_DIRECTION, direction, [cell]);
        graph.setCellStyles(mxConstants.STYLE_PORT_CONSTRAINT, constraint, [cell]);
    }
    else if (cell && cell.type && cell.type.toLowerCase() == "portoutstream") 
    {
        let direction = mountObjectDirection(style);
        
        graph.setCellStyles(mxConstants.STYLE_DIRECTION, direction, [cell]);
        graph.setCellStyles(mxConstants.STYLE_PORT_CONSTRAINT, direction, [cell]);
    }
}