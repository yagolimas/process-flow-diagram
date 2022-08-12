class EmptyStream {
    
    constructor(name, source, target, sourceDirection, targetDirection, ignoreAdd, portOut) 
    {
        if(color == null)
        {
            color = "#000";
        }
        if(ignoreAdd == null)
        {
            ignoreAdd = false;
        }
        let constraint = null;
        if (sourceDirection.includes("direction=north")) 
        {
            constraint = {
                directionSource: "north",
                constraintSource: "north",
                directionTarget: "north",
                constraintTarget: "south"
            };

        }
        else if (sourceDirection.includes("direction=east")) 
        {
            constraint = {
                directionSource: "east",
                constraintSource: "east",
                directionTarget: "east",
                constraintTarget: "west"
            };
        }
        else if (sourceDirection.includes("direction=west")) {
            constraint = {
                directionSource: "west",
                constraintSource: "west",
                directionTarget: "west",
                constraintTarget: "east"
            };
        }
        else {
            constraint = {
                directionSource: "south",
                constraintSource: "south",
                directionTarget: "south",
                constraintTarget: "north"
            };
        }

        let root = model.getRoot();
        let parente = model.getChildAt(root, 0);

        let portIn = graph.insertVertex(parente, null, '', target.x, target.y, 14, 14,
        `portInStream;portConstraint=${ constraint.constraintTarget };shape=triangle;direction=${ constraint.directionTarget };resizable=0;selectable=0`, false);
        portIn['type'] = 'portInStream';
        portIn.edges = [];
        
        if(portOut == null)
        {
            portOut = graph.insertVertex(parente, null, '', source.x, source.y, 14, 14,
            `portOutStream;portConstraint=${ constraint.constraintSource };shape=triangle;direction=${ constraint.directionSource };resizable=0`, false);
            portOut['type'] = 'portOutStream';
        }
        portOut.edges = [];
        
        let edge = null;
        let style = `stream;edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;spacingRight=2;spacingLeft=2;jettySize=auto;orthogonalLoop=1;jumpSize=6;jumpStyle=gap;strokeColor=${ color };fillColor=${ color };startArrow=dash;startSize=14;endArrow=dash;endSize=14;sourcePerimeterSpacing=0;fill=1;startFill=1;endFill=3;strokeWidth=2;spacingTop=4;spacingbottom=4;spacingLeft=4;spacingRight=4;points=[];shadow=1;highlight=1;dist=4`;

        if(clientRn != undefined && clientRn != null)
        {
			edge = clientRn.insertEdge(parente, null, '', portOut, portIn, style, true);
            edge.setEdge(true);
        }
        else
        {
			edge = graph.insertEdge(parente, null, '', portOut, portIn, style, true);
            edge.setEdge(true);
        }

        // portIn.edges.push(edge);
        portIn.setConnectable(false);
        // portOut.edges.push(edge);
        portOut.setConnectable(false);

        edge[mxConstants.STYLE_MOVABLE] = 0;
        edge['type'] = 'Empty';
        
        let tagName = graph.insertVertex(edge, null, name, -0.1, -0.1, 0, 0, 'streamName;', true);
        tagName['type'] = 'StreamName';
        tagName['positionX'] = -0.5;
        tagName['positionY'] = 20;
        tagName.source = edge;
        
        let liSubStream = document.getElementById('stream-name');
        let liSubAll = document.getElementById('hide');  
        
        restoreLabelPosition(edge);             

        if (liSubStream != null && liSubAll != null)
        {
            if (liSubStream.className !== 'checked' ||
                liSubAll.className === 'checked' ||
                name === "") {
                
                    tagName.setVisible(false);
            }
        }
        else
        {
            let nIsVisibleName = isVisibleName && name != '';
            tagName.setVisible(nIsVisibleName);
            
            if(nIsVisibleName)
            {
                restoreLabelPosition(edge);
            }
        }
        
        tagName.setConnectable(false);               
        graph.updateCellSize(tagName);
        restoreLabelPosition(edge);

        return edge;
    }
}