function flipLeftRight(cell, discartUpdate) {

    if (cell != null) {

        if(discartUpdate == null || discartUpdate == false)
        {
            graph.getModel().beginUpdate();
        }

        let ports = cell.children.filter(isPort);

        let rotation = mountObjectRotation(cell.style) != undefined ? mountObjectRotation(cell.style) : 0;
        let calcAngle = (rotation / 90);

        if (cell.style.includes("heater") ||
            cell.style.includes("airCooler") ||
            cell.style.includes("cooler") ||
            cell.style.includes("other")  ||
            cell.style.includes("pump")) {

            for (let i = 0; i < ports.length; i++) {
                let port = ports[i];
                let state = graph.view.getState(ports[i]);
                let dir = state.style[mxConstants.STYLE_DIRECTION];
                let constraint = state.style[mxConstants.STYLE_PORT_CONSTRAINT];

                let geoPort = graph.getCellGeometry(ports[i]);
                let factor = 1;
                let pumpFactor = 0;

                let coolerFactor = 0;

                if(calcAngle == -2 || calcAngle == 2)
                {
                    factor = -1;
                }
                
                if(discartUpdate != null && discartUpdate == true)
                {
                    factor = -1;
                }

                if(cell.style.includes("pump"))
                {
                    pumpFactor = 0.05;
                }
                else if(cell.style.includes("cooler"))
                {
                    if(!mountObjectFlipH(cell.style))
                    {
                        if(port.type == "PortIn")
                        {
                            coolerFactor = -0.1;
                        }
                        else
                        {
                            coolerFactor = -0.01;
                        }
                    }
                    else
                    {
                        if(port.type == "PortIn")
                        {
                            coolerFactor = 0.1;
                        }
                        else
                        {
                            coolerFactor = 0.01;
                        }
                    }
                }

                if (constraint === 'west') 
                { // Port Left
                    geoPort.x = (geoPort.x + ((1.25 - pumpFactor) * factor)) + coolerFactor;
                    
                    if(discartUpdate == null || discartUpdate == false)
                    {   
                        graph.setCellStyles(mxConstants.STYLE_PORT_CONSTRAINT, 'east', [ports[i]]);
                    }
                }
                else if (constraint === 'east') 
                { // Port Rigth
                    geoPort.x = (geoPort.x + ((-1.25 + pumpFactor) * factor)) + coolerFactor;

                    if(discartUpdate == null || discartUpdate == false)
                    {
                        graph.setCellStyles(mxConstants.STYLE_PORT_CONSTRAINT, 'west', [ports[i]]);
                    }
                }

                if ((dir === 'west' && discartUpdate == null || discartUpdate == false) && (discartUpdate == null || discartUpdate == false)) {
                    graph.setCellStyles(mxConstants.STYLE_DIRECTION, 'east', [ports[i]]);
                }
                else if ((dir === 'east' && discartUpdate == null || discartUpdate == false) && (discartUpdate == null || discartUpdate == false)) {
                    graph.setCellStyles(mxConstants.STYLE_DIRECTION, 'west', [ports[i]]);
                }

                // let stream = ports[i].getEdgeAt(0);

                // if (stream !== null && (stream.type === 'FeedStream' || stream.type === 'ProductStream') && (discartUpdate == null || discartUpdate == false)) {

                //     // setDefaultPositon(stream);
                // }
            }

            if(rotation && rotation != 0 && (calcAngle % 2 == 1 || calcAngle % 2 == -1)  && (discartUpdate == null || discartUpdate == false))
            {
                graph.toggleCellStyles(mxConstants.STYLE_FLIPV, false, [cell]);
            }
            else if(discartUpdate == null || discartUpdate == false)
            {
                graph.toggleCellStyles(mxConstants.STYLE_FLIPH, false, [cell]);
            }
        }
        else if (cell.style.includes("splitter") ||
                 cell.style.includes("mixer")) {

            for (let i = 0; i < ports.length; i++) {

                let state = graph.view.getState(ports[i]);
                let dir = state.style[mxConstants.STYLE_DIRECTION];
                let constraint = state.style[mxConstants.STYLE_PORT_CONSTRAINT];
                let factor = 1;

                if(discartUpdate != null && discartUpdate == true)
                {
                    factor = -1;
                }

                let geoPort = graph.getCellGeometry(ports[i]);

                if (constraint === 'west' && (rotation !== undefined && rotation === 180))
                {
                    //normal
                    geoPort.x = geoPort.x - (1.25 * factor);
                }
                if (constraint === 'west' && (rotation === undefined || rotation === 0))
                {
                    //normal
                    geoPort.x = geoPort.x + (1.25 * factor);
                }
                else if (constraint === 'west' && (rotation !== undefined && rotation === -180))
                {
                    //normal
                    geoPort.x = geoPort.x - (1.25 * factor);
                }
                else if (constraint === 'west' && (rotation !== undefined && rotation !== 0 && (calcAngle % 2 === 1)))
                {
                    geoPort.y = geoPort.y - (1.25 * factor);
                }
                else if (constraint === 'west' && (rotation !== undefined && rotation !== 0 && (calcAngle % 2 === -1)))
                {
                    geoPort.y = geoPort.y + (1.25 * factor);
                }
                else if (constraint === 'east' && (rotation !== undefined && rotation === 180))
                {
                    //normal
                    geoPort.x = geoPort.x + (1.25 * factor);
                }
                else if (constraint === 'east' && (rotation === undefined || rotation === 0))
                {
                    //normal
                    geoPort.x = geoPort.x - (1.25 * factor);
                }
                else if (constraint === 'east' && (rotation !== undefined && rotation === -180))
                {
                    //normal
                    geoPort.x = geoPort.x + (1.25 * factor);
                }
                else if (constraint === 'east' && (rotation !== undefined && rotation !== 0 && (calcAngle % 2 === 1)))
                {
                    geoPort.y = geoPort.y + (1.25 * factor);
                }
                else if (constraint === 'east' && (rotation !== undefined && rotation !== 0 && (calcAngle % 2 === -1)))
                {
                    geoPort.y = geoPort.y - (1.25 * factor);
                }
                // else if (constraint === 'north' && (rotation !== undefined && rotation !== 0 && (calcAngle % 2 === 1)))
                // {
                //     geoPort.x = geoPort.x + (1.25 * factor);
                // }
                // else if (constraint === 'north' && (rotation !== undefined && rotation !== 0 && (calcAngle % 2 === -1)))
                // {
                //     geoPort.x = geoPort.x - (1.25 * factor);
                // }
                // else if (constraint === 'south' && (rotation !== undefined && rotation !== 0 && (calcAngle % 2 === 1)))
                // {
                //     geoPort.x = geoPort.x - (1.25 * factor);
                // }
                // else if (constraint === 'south' && (rotation !== undefined && rotation !== 0 && (calcAngle % 2 === -1)))
                // {
                //     geoPort.x = geoPort.x + (1.25 * factor);
                // }


                if (dir === 'west' && (discartUpdate == null || discartUpdate == false)) {
                    graph.setCellStyles(mxConstants.STYLE_DIRECTION, 'east', [ports[i]]);
                }
                else if (dir === 'east' && (discartUpdate == null || discartUpdate == false)) {
                    graph.setCellStyles(mxConstants.STYLE_DIRECTION, 'west', [ports[i]]);
                }

                if (constraint === 'west' && (discartUpdate == null || discartUpdate == false)) {
                    graph.setCellStyles(mxConstants.STYLE_PORT_CONSTRAINT, 'east', [ports[i]]);
                }
                else if (constraint === 'east' && (discartUpdate == null || discartUpdate == false)) {
                    graph.setCellStyles(mxConstants.STYLE_PORT_CONSTRAINT, 'west', [ports[i]]);
                }
                if(rotation !== undefined && rotation !== 0 && (calcAngle % 2 === 1 || calcAngle % 2 === -1) && discartUpdate == null || discartUpdate == false)
                {
                    graph.toggleCellStyles(mxConstants.STYLE_FLIPV, false, [cell]);
                }
                else
                {
                    graph.toggleCellStyles(mxConstants.STYLE_FLIPH, false, [cell]);
                }

                // let stream = ports[i].getEdgeAt(0);

                // if (stream !== null && (stream.type === 'FeedStream' || stream.type === 'ProductStream'))
                // {
                    // setDefaultPositon(stream);
                // }
            }

            if(discartUpdate == null || discartUpdate == false)
            {
                graph.toggleCellStyles(mxConstants.STYLE_FLIPH, false, [cell]);
            }
        }
        else if (cell.style.includes("accumulator")) {

            let reOrder = false;
            let port1 = cell.getChildAt(2);
            if(port1.type.toLowerCase() == "tagname")
            {
                cell.children.slice(2, 3);
                cell.children.splice(0, 0, port1);
                reOrder = true;
            }
            let port2 = cell.getChildAt(3);
            let port3 = cell.getChildAt(4);
            let port4 = cell.getChildAt(5);

            if(port4.type.toLowerCase() == "tagname")
            {
                cell.children.splice(5, 6);
                cell.children.splice(0, 0, port4);
                reOrder = true;
            }

            if(reOrder)
            {
                port1 = cell.getChildAt(2);
                port2 = cell.getChildAt(3);
                port3 = cell.getChildAt(4);
                port4 = cell.getChildAt(5);
            }

            if (port1.geometry.x == 0.14) {

                port1.geometry.x = port1.geometry.x + 0.63;
                port2.geometry.x = port2.geometry.x - 0.63;
                port3.geometry.x = port3.geometry.x + 0.63;
                port4.geometry.x = port4.geometry.x - 0.63;
            }
            else {
                port1.geometry.x = port1.geometry.x - 0.63;
                port2.geometry.x = port2.geometry.x + 0.63;
                port3.geometry.x = port3.geometry.x - 0.63;
                port4.geometry.x = port4.geometry.x + 0.63;
            }

            if(App.app == 2)
            {
                for (let i = 0; i < ports.length; i++)
                {
                    let stream = ports[i].getEdgeAt(0);
    
                    if (stream != undefined && stream != null && stream.type != null &&
                        (stream.type === 'ProductStream'))
                    {
                        // setDefaultPositon(stream);
                        flipArrowToo(stream.target, stream.source, null, discartUpdate);
                        // cell, source, target
                    }
                    else if (stream != undefined && stream != null && stream.type != null &&
                        (stream.type === 'FeedStream'))
                    {
                        // setDefaultPositon(stream);
                        flipArrowToo(stream.source, null, stream.target, discartUpdate);
                    }
                }
            }
            
            if(discartUpdate == null || discartUpdate == false)
            {
                graph.toggleCellStyles(mxConstants.STYLE_FLIPH, false, [cell]);
            }
        }
        else if (cell.style.includes("column") && !cell.style.includes("columnTop")) 
        {

            let reOrder = false;
            let port1 = cell.getChildAt(4);
            let port2 = cell.getChildAt(5);
            let port3 = cell.getChildAt(6);
            let port4 = cell.getChildAt(7);
            let port5 = cell.getChildAt(8);

            if(port1.type.toLowerCase() == "tagname")
            {
                cell.children.slice(4, 5);
                cell.children.splice(0, 0, port1);
                reOrder = true;
            }

            if(port5.type.toLowerCase() == "tagname")
            {
                cell.children.splice(8, 9);
                cell.children.splice(0, 0, port5);
                reOrder = true;
            }

            if(reOrder)
            {
                port1 = cell.getChildAt(4);
                port2 = cell.getChildAt(5);
                port3 = cell.getChildAt(6);
                port4 = cell.getChildAt(7);
                port5 = cell.getChildAt(8);
            }
            let factor = 1;
            // if(discartUpdate != null && discartUpdate == true)
            // {
            //     factor = -1;
            // }

            if (port1.geometry.x == 0) 
            {
                port1.geometry.x = port1.geometry.x + (1.15 * factor);
                port2.geometry.x = port2.geometry.x + (1.15 * factor);
                port3.geometry.x = port3.geometry.x + (1.15 * factor);

                port4.geometry.x = port4.geometry.x - (1.15 * factor);
                port5.geometry.x = port5.geometry.x - (1.15 * factor);
            }
            else 
            {
                port1.geometry.x = port1.geometry.x - (1.15 * factor);
                port2.geometry.x = port2.geometry.x - (1.15 * factor);
                port3.geometry.x = port3.geometry.x - (1.15 * factor);
                port4.geometry.x = port4.geometry.x + (1.15 * factor);
                port5.geometry.x = port5.geometry.x + (1.15 * factor);
            }

            if(discartUpdate == null || discartUpdate == false)
            {
                for (let i = 2; i < ports.length; i++) {

                    let state = graph.view.getState(ports[i]);
                    let constraint = state.style[mxConstants.STYLE_PORT_CONSTRAINT];
                    let dir = state.style[mxConstants.STYLE_DIRECTION];

                    if (constraint === 'west') { // Port Left

                        graph.setCellStyles(mxConstants.STYLE_PORT_CONSTRAINT, 'east', [ports[i]]);
                    }
                    else if (constraint === 'east') { // Port Rigth

                        graph.setCellStyles(mxConstants.STYLE_PORT_CONSTRAINT, 'west', [ports[i]]);
                    }

                    if (dir === 'west') { // Port Left

                        graph.setCellStyles(mxConstants.STYLE_DIRECTION, 'east', [ports[i]]);
                    }
                    else if (dir === 'east') { // Port Rigth

                        graph.setCellStyles(mxConstants.STYLE_DIRECTION, 'west', [ports[i]]);
                    }

                    // let stream = ports[i].getEdgeAt(0);

                    // if (stream != undefined && stream != null && stream.type != null && (stream.type === 'ProductStream') && discartUpdate == null || discartUpdate == false)
                    // {
                    //     // setDefaultPositon(stream);
                    // }
                    // else if (stream != undefined && stream != null && stream.type != null && (stream.type === 'FeedStream') && discartUpdate == null || discartUpdate == false)
                    // {
                    //     // setDefaultPositon(stream);
                    // }
                }
            }

            graph.toggleCellStyles(mxConstants.STYLE_FLIPH, false);
            
        }
        else if (cell.style.includes("columnTop")) 
        {

            let reOrder = false;
            let port1 = cell.getChildAt(3);
            let port2 = cell.getChildAt(4);
            let port3 = cell.getChildAt(5);

            if(port1.type.toLowerCase() == "tagname")
            {
                cell.children.slice(3, 4);
                cell.children.splice(0, 0, port1);
                reOrder = true;
            }

            if(port3.type.toLowerCase() == "tagname")
            {
                cell.children.splice(5, 6);
                cell.children.splice(0, 0, port3);
                reOrder = true;
            }

            if(reOrder)
            {
                port1 = cell.getChildAt(2);
                port2 = cell.getChildAt(3);
                port3 = cell.getChildAt(4);
            }
            
            let factor = 1;

            if (port1.geometry.x == 0) 
            {
                port1.geometry.x = port1.geometry.x + (1.15 * factor);
                port2.geometry.x = port2.geometry.x + (1.15 * factor);
                port3.geometry.x = port3.geometry.x - (1.15 * factor);
            }
            else 
            {
                port1.geometry.x = port1.geometry.x - (1.15 * factor);
                port2.geometry.x = port2.geometry.x - (1.15 * factor);
                port3.geometry.x = port3.geometry.x + (1.15 * factor);
            }

            if(discartUpdate == null || discartUpdate == false)
            {
                for (let i = 1; i < ports.length; i++) {

                    let state = graph.view.getState(ports[i]);
                    let constraint = state.style[mxConstants.STYLE_PORT_CONSTRAINT];
                    let dir = state.style[mxConstants.STYLE_DIRECTION];

                    if (constraint === 'west') { // Port Left

                        graph.setCellStyles(mxConstants.STYLE_PORT_CONSTRAINT, 'east', [ports[i]]);
                    }
                    else if (constraint === 'east') { // Port Rigth

                        graph.setCellStyles(mxConstants.STYLE_PORT_CONSTRAINT, 'west', [ports[i]]);
                    }

                    if (dir === 'west') { // Port Left

                        graph.setCellStyles(mxConstants.STYLE_DIRECTION, 'east', [ports[i]]);
                    }
                    else if (dir === 'east') { // Port Rigth

                        graph.setCellStyles(mxConstants.STYLE_DIRECTION, 'west', [ports[i]]);
                    }
                }
            }

            graph.toggleCellStyles(mxConstants.STYLE_FLIPH, false);
        }

        if(discartUpdate == null || discartUpdate == false)
        {
            graph.getModel().endUpdate('flip-h');
        }

        graph.orderCells(false,[cell]);
        graph.refresh();
    }
};

function flipTopBottom(cell, discartUpdate) {

    if (cell != null) {

        if(discartUpdate == null || discartUpdate == false)
        {
            graph.getModel().beginUpdate();
        }

        let ports = cell.children
            .filter(isPort)
            .filter(isTopBottom);

        let rotation = mountObjectRotation(cell.style);
        let pumpFactor = 0;
        let factor = 1;

        if(rotation == undefined)
        {
            rotation = 0;
        }

        let calcAngle = (rotation / 90);

        if(cell.style.includes("pump"))
        {
            pumpFactor = 0.05;
        }

        if (cell.style.includes("heater") ||
            cell.style.includes("cooler") ||
            cell.style.includes("other")  ||
            cell.style.includes("pump")) {

            for (let i = 0; i < ports.length; i++) {

                let state = graph.view.getState(ports[i]);
                let dir = state.style[mxConstants.STYLE_DIRECTION];
                let constraint = state.style[mxConstants.STYLE_PORT_CONSTRAINT];

                let geoPort = graph.getCellGeometry(ports[i]);

                //debugger

                // if (constraint === 'north') { // Port Top

                //     if (geoPort.x > 0.9) {

                //         geoPort.x = geoPort.x - 1.25;
                //     }
                //     else {

                //         geoPort.x = geoPort.x + 1.25;
                //     }

                //     if(discartUpdate == null || discartUpdate == false)
                //     {
                //         graph.setCellStyles(mxConstants.STYLE_PORT_CONSTRAINT, 'south', [ports[i]]);
                //     }
                // }
                // else if (constraint === 'south') { // Port Bottom

                //     if (geoPort.x <= 0) {

                //         geoPort.x = geoPort.x + 1.25;
                //     }
                //     else {

                //         geoPort.x = geoPort.x - 1.25;
                //     }

                //     if(discartUpdate == null || discartUpdate == false)
                //     {
                //         graph.setCellStyles(mxConstants.STYLE_PORT_CONSTRAINT, 'north', [ports[i]]);
                //     }
                // }
                if (constraint === 'north' && (rotation !== undefined && rotation !== 0 && (calcAngle % 2 === 1)) && (!(discartUpdate == null || discartUpdate == false))) 
                { // Port top
                    geoPort.x = (geoPort.x + ((-1.25 + pumpFactor) * factor));
                }
                else if (constraint === 'north' && (rotation !== undefined && rotation !== 0 && (calcAngle % 2 === -1)) && (!(discartUpdate == null || discartUpdate == false))) 
                { // Port top
                    geoPort.x = (geoPort.x + ((1.25 + pumpFactor) * factor));
                }
                else if (constraint === 'north' && (!(discartUpdate == null || discartUpdate == false))) 
                { // Port top
                    geoPort.x = (geoPort.x + ((1.25 + pumpFactor) * factor));
                }
                else if (constraint === 'south' && (rotation !== undefined && rotation !== 0 && (calcAngle % 2 === 1)) && (!(discartUpdate == null || discartUpdate == false))) 
                { // Port top
                    geoPort.x = (geoPort.x + ((1.25 + pumpFactor) * factor));
                }
                else if (constraint === 'south' && (rotation !== undefined && rotation !== 0 && (calcAngle % 2 === -1)) && (!(discartUpdate == null || discartUpdate == false))) 
                { // Port top
                    geoPort.x = (geoPort.x + ((-1.25 + pumpFactor) * factor));
                }
                else if (constraint === 'south' && (!(discartUpdate == null || discartUpdate == false))) 
                { // Port top
                    geoPort.x = (geoPort.x + ((-1.25 + pumpFactor) * factor));
                }
                else if (constraint === 'north' && (rotation !== undefined && rotation !== 0 && (calcAngle % 2 === 1)) && ((discartUpdate == null || discartUpdate == false))) 
                { // Port top
                    geoPort.x = (geoPort.x + ((1.25 + pumpFactor) * factor));
                    graph.setCellStyles(mxConstants.STYLE_PORT_CONSTRAINT, 'south', [ports[i]]);
                }
                else if (constraint === 'north' && (rotation !== undefined && rotation !== 0 && (calcAngle % 2 === -1)) && ((discartUpdate == null || discartUpdate == false))) 
                { // Port top
                    geoPort.x = (geoPort.x + ((-1.25 + pumpFactor) * factor));
                    graph.setCellStyles(mxConstants.STYLE_PORT_CONSTRAINT, 'south', [ports[i]]);
                }
                else if (constraint === 'north' && ((discartUpdate == null || discartUpdate == false))) 
                { // Port top
                    geoPort.x = (geoPort.x + ((-1.25 + pumpFactor) * factor));
                    graph.setCellStyles(mxConstants.STYLE_PORT_CONSTRAINT, 'south', [ports[i]]);
                }
                else if (constraint === 'south' && (rotation !== undefined && rotation !== 0 && (calcAngle % 2 === 1)) && ((discartUpdate == null || discartUpdate == false))) 
                { // Port top
                    geoPort.x = (geoPort.x + ((-1.25 + pumpFactor) * factor));
                    graph.setCellStyles(mxConstants.STYLE_PORT_CONSTRAINT, 'north', [ports[i]]);
                }
                else if (constraint === 'south' && (rotation !== undefined && rotation !== 0 && (calcAngle % 2 === -1)) && ((discartUpdate == null || discartUpdate == false))) 
                { // Port top
                    geoPort.x = (geoPort.x + ((1.25 + pumpFactor) * factor));
                    graph.setCellStyles(mxConstants.STYLE_PORT_CONSTRAINT, 'north', [ports[i]]);
                }
                else if (constraint === 'south' && ((discartUpdate == null || discartUpdate == false))) 
                { // Port top
                    geoPort.x = (geoPort.x + ((1.25 + pumpFactor) * factor));
                    graph.setCellStyles(mxConstants.STYLE_PORT_CONSTRAINT, 'north', [ports[i]]);
                }   
                // else if (constraint === 'north' && (rotation !== undefined && rotation !== 0 && (calcAngle % 2 === 1)))
                // {
                //     geoPort.x = geoPort.x + (1.25 * factor);
                // }
                // else if (constraint === 'north' && (rotation !== undefined && rotation !== 0 && (calcAngle % 2 === -1)))
                // {
                //     geoPort.x = geoPort.x - (1.25 * factor);
                // }
                // else if (constraint === 'south' && (rotation !== undefined && rotation !== 0 && (calcAngle % 2 === 1)))
                // {
                //     geoPort.x = geoPort.x - (1.25 * factor);
                // }
                // else if (constraint === 'south' && (rotation !== undefined && rotation !== 0 && (calcAngle % 2 === -1)))
                // {
                //     geoPort.x = geoPort.x + (1.25 * factor);
                // }

                if (dir === 'south' && (discartUpdate == null || discartUpdate == false)) {

                    graph.setCellStyles(mxConstants.STYLE_DIRECTION, 'north', [ports[i]]);
                }
                else if (dir === 'north' && (discartUpdate == null || discartUpdate == false)) {

                    graph.setCellStyles(mxConstants.STYLE_DIRECTION, 'south', [ports[i]]);
                }

                let stream = ports[i].getEdgeAt(0);

                if (stream && (stream.type === 'FeedStream' || stream.type === 'ProductStream') && (discartUpdate == null || discartUpdate == false)) {

                    setDefaultPositon(stream);
                }
            }

        }
        else if (cell.style.includes("splitter") ||
                    cell.style.includes("mixer")) {

            for (let i = 0; i < ports.length; i++) {

                let style = ports[i].style;
                let state = graph.view.getState(ports[i]);
                let dir = state.style[mxConstants.STYLE_DIRECTION];
                let type = ports[i].type;
                let constraint = state.style[mxConstants.STYLE_PORT_CONSTRAINT];
                let factor = 1;

                if(discartUpdate != null && discartUpdate == true)
                {
                    factor = -1;
                }

                let geoPort = graph.getCellGeometry(ports[i]);

                if (constraint === 'north' && (rotation === 180))
                {
                    //normal
                    geoPort.y = geoPort.y - (1.25 * factor);
                }
                else if (constraint === 'north' && (rotation === undefined || rotation === 0))
                {
                    //normal
                    geoPort.y = geoPort.y + (1.25 * factor);
                }
                else if (constraint === 'north' && (rotation === undefined || rotation === 0 || rotation === -180))
                {
                    //normal
                    geoPort.y = geoPort.y - (1.25 * factor);
                }
                else if (constraint === 'north' && (rotation !== undefined && rotation !== 0 && (calcAngle % 2 === 1)))
                {
                    geoPort.x = geoPort.x + (1.25 * factor);
                }
                else if (constraint === 'north' && (rotation !== undefined && rotation !== 0 && (calcAngle % 2 === -1)) && (!(discartUpdate == null || discartUpdate == false)))
                {
                    geoPort.x = geoPort.x + (-1.25 * factor);
                }
                else if (constraint === 'north' && (rotation !== undefined && rotation !== 0 && (calcAngle % 2 === -1)))
                {
                    geoPort.x = geoPort.x - (1.25 * factor);
                }
                else if (constraint === 'south' && (rotation === 180))
                {
                    //normal
                    geoPort.y = geoPort.y + (1.25 * factor);
                }
                else if (constraint === 'south' && (rotation === undefined || rotation === 0))
                {
                    //normal
                    geoPort.y = geoPort.y - (1.25 * factor);
                }
                else if (constraint === 'south' && (rotation === undefined || rotation === 0 || rotation === -180))
                {
                    //normal
                    geoPort.y = geoPort.y + (1.25 * factor);
                }
                else if (constraint === 'south' && (rotation !== undefined && rotation !== 0 && (calcAngle % 2 === 1)))
                {
                    geoPort.x = geoPort.x - (1.25 * factor);
                }
                else if (constraint === 'south' && (rotation !== undefined && rotation !== 0 && (calcAngle % 2 === -1)) && (!(discartUpdate == null || discartUpdate == false)))
                {
                    geoPort.x = geoPort.x + (1.25 * factor);
                }
                else if (constraint === 'south' && (rotation !== undefined && rotation !== 0 && (calcAngle % 2 === -1)))
                {
                    geoPort.x = geoPort.x + (1.25 * factor);
                }

                if (dir === 'south' && (discartUpdate == null || discartUpdate == false)) {
                    graph.setCellStyles(mxConstants.STYLE_DIRECTION, 'north', [ports[i]]);
                }
                else if (dir === 'north' && (discartUpdate == null || discartUpdate == false)) {
                    graph.setCellStyles(mxConstants.STYLE_DIRECTION, 'south', [ports[i]]);
                }

                if (constraint === 'north' && (discartUpdate == null || discartUpdate == false)) {
                    graph.setCellStyles(mxConstants.STYLE_PORT_CONSTRAINT, 'south', [ports[i]]);
                }
                else if (constraint === 'south' && (discartUpdate == null || discartUpdate == false)) {
                    graph.setCellStyles(mxConstants.STYLE_PORT_CONSTRAINT, 'north', [ports[i]]);
                }
            }
        }

        if(rotation !== undefined && rotation !== 0 && (calcAngle % 2 === 1 || calcAngle % 2 === -1) && discartUpdate == null || discartUpdate == false)
        {
            graph.toggleCellStyles(mxConstants.STYLE_FLIPV, false, [cell]);
        }
        else if (discartUpdate == null || discartUpdate == false)
        {
            graph.toggleCellStyles(mxConstants.STYLE_FLIPV, false, [cell]);
        }

        if(discartUpdate == null || discartUpdate == false)
        {
            graph.getModel().endUpdate('flip-v');
        }

        graph.orderCells(false, [cell]);
        graph.refresh();
    }
};

function flipArrowToo(cell, source, target, discartUpdate)
{
    //source == output port of unit
    //source == output port of unit
    if (cell != null) {

        if(discartUpdate == null || discartUpdate == false)
        {
            graph.getModel().beginUpdate();
        }

        let rotation = mountObjectRotation(cell.style);
        if(rotation == undefined)
        {
            rotation = 0;
        }
        let calcAngle = (rotation / 90);

        if (cell.edges != null && cell.edges.length > 0 && (cell.type.toLowerCase() == "portinstream" || cell.type.toLowerCase() == "portoutstream"))
        {
            let state = graph.view.getState(cell);
            let dir = state.style[mxConstants.STYLE_DIRECTION];
            let constraint = state.style[mxConstants.STYLE_PORT_CONSTRAINT];

            let geoPort = graph.getCellGeometry(cell);

            let newState = {};
            let geoSTParent = source != null ? source.parent.geometry : target.parent.geometry;
            let geoSTPort = source != null ? source.geometry : target.geometry;
            let corectionOfPositionX = 0;
            let corectionOfPositionY = 0;

            //debugger

            // if (constraint === 'north')
            // {
            //     graph.setCellStyles(mxConstants.STYLE_PORT_CONSTRAINT, 'south', [cell]);
            // }
            // else if (constraint === 'south')
            // {
            //     graph.setCellStyles(mxConstants.STYLE_PORT_CONSTRAINT, 'north', [cell]);
            // }
            // else

            // if (dir === 'south')
            // {
            //     graph.setCellStyles(mxConstants.STYLE_DIRECTION, 'north', [cell]);
            // }
            // else if (dir === 'north')
            // {
            //     graph.setCellStyles(mxConstants.STYLE_DIRECTION, 'south', [cell]);
            // }
            // else

            
            if(discartUpdate != null && discartUpdate == true)
            {
                switch (dir) {
                    case 'west':
                    dir = "east";
                    break;
                    case 'east':
                    dir = "west";
                    break;
                    case 'north':
                    dir = "south";
                    break;
                    case 'south':
                    dir = "north";
                    break;
                }
            }
            else
            {
            
                if (dir === 'west')
                {
                    graph.setCellStyles(mxConstants.STYLE_DIRECTION, 'east', [cell]);
                }
                else if (dir === 'east')
                {
                    graph.setCellStyles(mxConstants.STYLE_DIRECTION, 'west', [cell]);
                }
    
                if (constraint === 'west')
                {
                    graph.setCellStyles(mxConstants.STYLE_PORT_CONSTRAINT, 'east', [cell]);
                }
                else if (constraint === 'east')
                {
                    graph.setCellStyles(mxConstants.STYLE_PORT_CONSTRAINT, 'west', [cell]);
                }
            }

            if (dir === 'west')
            {
                if(geoPort.y != 1 && geoPort.y != -1)
                {
                    newState = {
                        x: corectionOfPositionX + geoSTParent.x + 170,
                        y: geoPort.y
                    };
                }
                else
                {
                    newState = {
                        x: geoPort.x,
                        y: corectionOfPositionY + (geoSTParent.y) + (geoSTParent.height * geoSTPort.y) + 34
                    };
                }

                geoPort.x = newState.x;
                geoPort.y = newState.y;
            }
            else if (dir === 'east') {
                if(geoPort.y != 1 && geoPort.y != -1)
                {
                    newState = {
                        x: corectionOfPositionX + geoSTParent.x - 30,
                        y: geoPort.y
                    };
                }
                else
                {
                    newState = {
                        x: geoPort.x,
                        y: corectionOfPositionY + (geoSTParent.y) + (geoSTParent.height * geoSTPort.y)-30
                    };
                }

                geoPort.x = newState.x;
                geoPort.y = newState.y;
            }
        }

        if(discartUpdate == null || discartUpdate == false)
        {
            if(rotation !== undefined && rotation !== 0 && (calcAngle % 2 === 1 || calcAngle % 2 === -1))
            {
                graph.toggleCellStyles(mxConstants.STYLE_FLIPH, false);
            }
            else
            {
                graph.toggleCellStyles(mxConstants.STYLE_FLIPV, false);
            }

            graph.getModel().endUpdate();
        }
    }
};

function isTopBottom(port) {

    let state = graph.view.getState(port);
    let constraint = state.style[mxConstants.STYLE_PORT_CONSTRAINT];

    return (constraint === 'north' || constraint === 'south');
};

function isPort(children) {
    return (children.type === 'PortIn' || children.type === 'PortOut');
};

function flipArrow(cell, discartUpdate)
{
    if (cell != null) 
    {
        discartUpdate = discartUpdate == null ? false : discartUpdate;

        graph.getModel().beginUpdate();

        let rotation = mountObjectRotation(cell.style);
        if(rotation == undefined)
        {
            rotation = 0;
        }

        let calcAngle = (rotation / 90);

        if (cell.edges != null && cell.edges.length > 0)
        {
            let state = graph.view.getState(cell);
            let dir = state.style[mxConstants.STYLE_DIRECTION];
            let constraint = state.style[mxConstants.STYLE_PORT_CONSTRAINT];

            let geoPort = graph.getCellGeometry(cell);
            
            switch (dir) {
                case 'west':
                    dir = "east";
                    constraint = 'west';
                break;
                case 'east':
                    dir = "west";
                    constraint = 'east';
                break;
                case 'north':
                    dir = "south";
                    constraint = 'north';
                break;
                case 'south':
                    dir = "north";
                    constraint = 'south';
                break;
            }
            
            if(cell.type.toLowerCase() == "portinstream")
            {
                graph.setCellStyles(mxConstants.STYLE_DIRECTION, dir, [cell]);
                graph.setCellStyles(mxConstants.STYLE_PORT_CONSTRAINT, constraint, [cell]);
            }
            else if(cell.type.toLowerCase() == "portoutstream")
            {
                graph.setCellStyles(mxConstants.STYLE_DIRECTION, dir, [cell]);
                graph.setCellStyles(mxConstants.STYLE_PORT_CONSTRAINT, dir, [cell]);
            }
        }

        graph.getModel().endUpdate();
    }
};
