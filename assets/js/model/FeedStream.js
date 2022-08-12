class FeedStream {

    constructor(name, cell, geoParent, geoPort, color, styleDirection, portOut) {

        let constraint = {}

        let root = graph.model.getRoot();
        let parent = graph.model.getChildAt(root, 0);

        if (styleDirection.includes("direction=north")) {
            constraint = {
                direction: "north",
                constraint: "north",
                x: geoParent.x + (geoParent.width * geoPort.x) + 60,
                y: geoParent.y + geoParent.height + 100
            };
        }
        else if (styleDirection.includes("direction=east")) {
            constraint = {
                direction: "east",
                constraint: "east",
                x: geoParent.x - 100,
                y: (geoParent.y) + (geoParent.height * geoPort.y)
            };
        }
        else if (styleDirection.includes("direction=south")) {
            constraint = {
                direction: "south",
                constraint: "south",
                x: geoParent.x + (geoParent.width * geoPort.x)+60,
                y: geoParent.y - 100
            };
        }
        else if (styleDirection.includes("direction=west")) {
            constraint = {
                direction: "west",
                constraint: "west",
                x: geoParent.x + 270,
                y: (geoParent.y) + (geoParent.height * geoPort.y),
            };
        }
        else {
            constraint = {
                direction: "west",
                constraint: "west",
                x: geoParent.x + 170,
                y: (geoParent.y) + (geoParent.height * geoPort.y),
            };
        }

        if(portOut == null)
        {
                portOut = graph.insertVertex(parent, null, '', constraint.x-60, constraint.y, 14, 14,
            `portOutStream;portConstraint=${ constraint.constraint };shape=triangle;direction=${ constraint.direction };resizable=0`, false);
            portOut['type'] = 'portOutStream';
        }
        
		// let edge = graph.insertEdge(cell, null, '', portOut, cell, `endArrow=none;strokeColor=${ color };fillColor=${ color };html=1;edgeStyle=orthogonalEdgeStyle;editable=0;strokeWidth=2;`, true);

		let edge = graph.insertEdge(cell, null, '', portOut, cell, `stream;endArrow=none;jumpStyle=gap;strokeColor=${ color };fillColor=${ color };edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;jettySize=auto;orthogonalLoop=1;jumpStyle=gap;jumpSize=6;edgeStyle=orthogonalEdgeStyle;editable=0;strokeWidth=2;spacingTop=4;spacingbottom=4;spacingLeft=4;spacingRight=4;points=[];shadow=1;highlight=1;dist=4`, true);

        edge.geometry.setTerminalPoint(new mxPoint(constraint.x, constraint.y), true);
        edge.geometry.relative = false;	
        edge.setEdge(true);
        edge['type'] = 'FeedStream';
        edge.parent = portOut;
        
        edge.setConnectable(true);
        portOut.edges = [];
        portOut.edges.push(edge);
        portOut.setConnectable(false);
        
        let actX = edge.geometry.sourcePoint.x-30;
        let actY = edge.geometry.sourcePoint.y-15;

        let nameStream = graph.insertVertex(edge, null, name, 0.1, 0.1, 0, 0, 'streamName;', false);
        nameStream.geometry.offset = new mxPoint(0.3, 0.3);
        nameStream['type'] = 'StreamName';
        nameStream['positionX'] = -80;
        nameStream['positionY'] = -15;
        nameStream.source = edge;
        nameStream.edge = false;
        
        nameStream.geometry.x = actX;
        nameStream.geometry.y = actY;
        
        let liSubStream = document.getElementById('stream-name');
        let liSubAll = document.getElementById('hide');        

        if (liSubStream != null && liSubAll != null)
        {
            if (liSubStream.className !== 'checked' ||
                liSubAll.className === 'checked' ||
                name === "") {
                
                nameStream.setVisible(false);
            }
            else
            {
                nameStream.setVisible(true);
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

        //graph.orderCells(true, edge);

        graph.updateCellSize(nameStream);
        
        restoreLabelPosition(edge);
        
        return edge;
    }
}