class InternalStream {
    
    constructor(name, parent, source, target, styleDirection, color, clientRn) 
    {
        if(color == null)
        {
            color = "#000";
        }
        
        let edge = null;
        // let style = `endArrow=none;startArrow=none;strokeColor=${ color };fillColor=${ color };html=1;edgeStyle=orthogonalEdgeStyle;editable=0;strokeWidth=2;`;

        let style = `stream;endArrow=none;startArrow=none;strokeColor=${ color };fillColor=${ color };edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;jettySize=auto;orthogonalLoop=1;jumpStyle=gap;jumpSize=6;edgeStyle=orthogonalEdgeStyle;editable=0;strokeWidth=2;spacingTop=4;spacingbottom=4;spacingLeft=4;spacingRight=4;points=[];shadow=1;highlight=1;dist=4`;

        if(clientRn != null)
        {
			edge = clientRn.insertEdge(parent, null, '', source, target, style);
            edge.setEdge(true);
        }
        else
        {
			edge = graph.insertEdge(parent, null, '', source, target, style);
            edge.setEdge(true);
        }
        
        edge['type'] = 'InternalStream';
        edge[mxConstants.STYLE_MOVABLE] = 0;

        let tagName = graph.insertVertex(edge, null, name, 0.1, 0.1, 0, 0, 'streamName;', false);
        tagName.geometry.offset = new mxPoint(0.3, 0.3);
        tagName['type'] = 'StreamName';
        tagName['positionX'] = 0;
        tagName['positionY'] = -15;
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
        
        //nameStream.setVisible(true);
        tagName.setConnectable(false);               
        graph.updateCellSize(tagName);
        // edge.value = null;
        // graph.addCell(edge, parent, undefined, null, null);
        restoreLabelPosition(edge);

        return edge;
    }
}