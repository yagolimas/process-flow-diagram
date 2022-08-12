function swapCell(cell, discartUpdate)
{
    if (cell != null)
    {
        if(discartUpdate == null || discartUpdate == false)
        {
            graph.getModel().beginUpdate();
        }
        
        try 
        {
            let rotation = mountObjectRotation(cell.style);
            rotation = rotation == null ? 0 : rotation;
            let ports = [];
            let state = graph.view.getState(cell);
            let children = cell.children;
            let tagName = null;
            let tagAllocation = null;
            let childrenToExclude = [];
            
            for (let i in children) {
                if (children[i] != null && children[i].type == "TagName") {
                    tagName = children[i];
                }
                else if (children[i] != null && children[i].type == "TagAllocation") {
                    tagAllocation = children[i];
                }
                else
                {
                    ports.push(children[i]);
                }
                childrenToExclude.push(i);
            }

            if (childrenToExclude != null) {
                childrenToExclude.reverse();
            }

            for (let j in childrenToExclude) {
                cell.children.splice(childrenToExclude[j], 1);
            }

            if (state != null) {
                let vertexHandler = graph.createVertexHandler(state);
                vertexHandler.rotateCell(cell, 90, cell.parent);
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
            let point0 = null;
            let point1 = null;
            let point2 = null;
            let point3 = null;
            
            for (let i in ports) {
                if (ports[i] != null && (ports[i].type == "PortIn" || ports[i].type == "PortOut")) 
                {
                    switch (i) {
                        case "0":
                            point0 = ports[i].geometry;
                            break;
                        case "1":
                            point1 = ports[i].geometry;
                            break;
                        case "2":
                            point2 = ports[i].geometry;
                            break;
                        case "3":
                            point3 = ports[i].geometry;
                            break;
                        default:
                            break;
                    }
                }
            }
            
            for (let i in ports) {
                if (ports[i] != null && (ports[i].type == "PortIn" || ports[i].type == "PortOut")) 
                {    
                    switch (i) {
                        case "0":
                            // ports[i].geometry = point1;
                            graph.model.setGeometry(ports[i], point1);
                            break;
                        case "1":
                            // ports[i].geometry = point3;
                            graph.model.setGeometry(ports[i], point3);
                            break;
                        case "2":
                            // ports[i].geometry = point0;
                            graph.model.setGeometry(ports[i], point0);
                            break;
                        case "3":
                            // ports[i].geometry = point2;
                            graph.model.setGeometry(ports[i], point2);
                            break;
                        default:
                            break;
                    }
                    cell.children.push(ports[i]);
                    let vertexHandler = graph.createVertexHandler(state);
                    // vertexHandler.rotateCell(ports[i], 90, cell);

                }
            }
        }
        finally 
        {
            if(discartUpdate == null || discartUpdate == false)
            {
                graph.getModel().endUpdate();
            }
            removeRectsOfSelections();
            graph.refresh();
        }
    }
};