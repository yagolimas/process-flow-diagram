class ProductStream {
    
    constructor(name, parent, source, target, styleDirection, color, clientRn, ignoreAdd, mouseValidate) 
    {
        if(color == null)
        {
            color = "#000";
        }

        if(ignoreAdd == null)
        {
            ignoreAdd = false;
        }

        let constraint = {};
        let geoParent = source.parent.geometry;
        let geoPort = source.geometry;
        let corectionOfPositionX = 0;
        let corectionOfPositionY = 0;

        if (styleDirection.includes("direction=north")) 
        {
            if(source.parent.style.toLowerCase().indexOf("accumulator") > 4)
            {
                // corectionOfPositionX = 42;
                corectionOfPositionX = 43;
                corectionOfPositionY = 76;
            }

            constraint = {
                direction: "north",
                constraint: "south",
                x: corectionOfPositionX + geoParent.x + (geoParent.width/2) - 8.5,
                // y: geoParent.y + geoParent.height
                y: geoParent.y - 100
            };

        }
        else if (styleDirection.includes("direction=east")) 
        {
            if(source.parent != null && source.parent.style != null && source.parent.style.toLowerCase().indexOf("accumulator") > 4)
            {
                // corectionOfPositionX = 42;
                corectionOfPositionX = -106;
                corectionOfPositionY = 78;
            }

            constraint = {
                direction: "east",
                constraint: "west",
                x: corectionOfPositionX + geoParent.x + geoParent.width + 150,
                y: (corectionOfPositionY + geoParent.y + (geoParent.height/2)) - 6
            };
        }
        else if (styleDirection.includes("direction=west")) {
            constraint = {
                direction: "west",
                constraint: "east",
                x: corectionOfPositionX + geoParent.x + 170,
                y: corectionOfPositionY + (geoParent.y) + (geoParent.height * geoPort.y) + geoPort.height/2,
            };
        }
        else {

            if(source.parent.style.toLowerCase().indexOf("accumulator") > 4 && source.position == "east")
            {
                corectionOfPositionX = 42;
                corectionOfPositionY = 0;
            }
            else if(source.parent.style.toLowerCase().indexOf("accumulator") > 4 && source.position == "west")
            {
                corectionOfPositionX = -40;
                corectionOfPositionY = 0;
            }
            
            constraint = {
                direction: "south",
                constraint: "north",
                x: corectionOfPositionX + geoParent.x + (geoParent.width/2) - 7,
                y: corectionOfPositionY + geoParent.y + geoParent.height + 100
            };
        }

        // let portIn = graph.insertVertex(parent, null, '', target.x, target.y, 14, 14,
        let portIn = graph.insertVertex(parent, null, '', constraint.x, constraint.y, 14, 14,
        `portInStream;portConstraint=${ constraint.constraint };shape=triangle;direction=${ constraint.direction };resizable=0;selectable=0`, false);
        portIn['type'] = 'portInStream';
        
        let edge = null;
        // let style = `html=1;strokeColor=${ color };fillColor=${ color };startArrow=dash;startSize=14;endArrow=dash;endSize=14;sourcePerimeterSpacing=0;startFill=0;endFill=0;fillColor=red;edgeStyle=orthogonalEdgeStyle;strokeWidth=2`;
        let style = `stream;edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;spacingRight=2;spacingLeft=2;jettySize=auto;orthogonalLoop=1;jumpSize=6;jumpStyle=gap;strokeColor=${ color };fillColor=${ color };startArrow=dash;startSize=14;endArrow=dash;endSize=14;sourcePerimeterSpacing=0;fill=1;startFill=1;endFill=3;strokeWidth=2;spacingTop=4;spacingbottom=4;spacingLeft=4;spacingRight=4;points=[];shadow=1;highlight=1;dist=4`;

        if(clientRn != undefined && clientRn != null)
        {
			edge = clientRn.insertEdge(portIn, null, '', source, portIn, style, true);
            edge.setEdge(true);
        }
        else
        {
			edge = graph.insertEdge(portIn, null, '', source, portIn, style, true);
            edge.setEdge(true);
        }

        portIn.edges = [];
        portIn.edges.push(edge);
        portIn.setConnectable(false);
        // portIn.target = edge;

        edge.geometry.setTerminalPoint(new mxPoint(constraint.x, constraint.y), true);
        edge.geometry.relative = false;	
        edge.setEdge(true);
        edge.source = source;
        edge['type'] = 'ProductStream';

        let actX = edge.geometry.sourcePoint.x-100;
        let actY = edge.geometry.sourcePoint.y-9;
        
        let nameStream = graph.insertVertex(edge, null, name, 0.1, 0.1, 0, 0, 'streamName;', false);
        nameStream.geometry.offset = new mxPoint(0.4, 0.3);
        nameStream['type'] = 'StreamName';
        nameStream['positionX'] = 20;
        nameStream['positionY'] = -15;
        nameStream.source = edge;

        nameStream.geometry.x = actX;
        nameStream.geometry.y = actY;
                
        let liSubStream = document.getElementById('stream-name');
        let liSubAll = document.getElementById('hide'); 
     

        if (liSubStream != null && liSubAll != null)
        {
            if (liSubStream.className !== 'checked' ||
                liSubAll.className === 'checked' ||
                name === "") 
            {
                nameStream.setVisible(false);
            }
        }
        else
        {
            let nIsVisibleName = isVisibleName && name != '';
            nameStream.setVisible(nIsVisibleName);

            if(nIsVisibleName)
            {
                restoreLabelPosition(edge);
            }
        }

        nameStream.setConnectable(false);
        graph.updateCellSize(nameStream);

        // graph.updateCellSize(nameStream);
        if(!ignoreAdd)
        {
            graph.addCell(edge, parent, undefined, null, null);
        }

        return edge;
    }
}