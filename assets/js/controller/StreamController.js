var countStream = 1;
class StreamController {

    constructor() { }

    createStream(clientRn, parent, source, target, evt, dropTarget) {
        var edge = null;

        let modal = new Modal();
        if (target != null) {
            if (target.parent.id == source.parent.id) {
                // let message = "It should not be possible to connect a stream between ports on the same unit.";

                // let content = modal.createModalAlert('Stream condition', message);
                // modal.createContent(content);
                // modal.open();

                // const $buttonOk = document.querySelector("#btn-ok");
                // $buttonOk.onclick = () => {
                //     modal.close();
                //     return;      
                // };

                // document.querySelector("#btn-cancel").remove();
                // document.querySelector("#btn-help").remove();
                // $buttonOk.focus();
                return;
            }
        }

        let content = modal.createModalProduct("New Stream");
        let subContent = modal.createContent(content);
        modal.open();

        const $input = document.querySelector('#stream');
        const $buttonOk = document.querySelector("#btn-ok");
        const $buttonCancel = document.querySelector("#btn-cancel");
        const $buttonHelp = document.querySelector("#btn-help");

        let name = graphEditor.validateCellNamesSequence("", "stream");

        let style = '';
        let type = '';

        let terminalInserted = false;

        $input.value = name;
        $input.select();

        $input.onkeyup = function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                $buttonOk.click();
            }
        };

        $buttonOk.onkeyup = function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                $buttonOk.click();
            }
        };

        $buttonCancel.onkeyup = function (event) {
            event.preventDefault();
            if (event.keyCode == 13) {
                $buttonCancel.click();
            }
        };

        $buttonOk.onclick = function () {
            // Uses the value of the preview edge state for inserting
            // the new edge into the graph
            
            modal.close();
            graph.getModel().beginUpdate();
            let value = $input.value;
            let isValid = graphEditor.validateCellNames(value);

            if (isValid == false) {
                let subModal = new Modal();
                let content = subModal.createModalAlertMessage('', "The name already exists!");

                let subContent = subModal.createContent(content);
                subModal.open();

                subContent.querySelector("#btn-ok").onclick = () => {
                    document.querySelectorAll('.modal')[1].remove();
                    $input.focus()
                };

                return null;
            }
            else {
                let styleArray = source.style.split(";");
                let direction = "stream;direction=east";
                for (let k in styleArray) {
                    if (styleArray[k].indexOf("direction") == 0) {
                        direction = "stream;" + styleArray[k];
                    }
                }

                if (target == null) {
                    style = 'html=1;startArrow=dash;endSize=14;endArrow=block;sourcePerimeterSpacing=0;startFill=0;endFill=0;fillColor=red;edgeStyle=orthogonalEdgeStyle;strokeWidth=2;spacingTop=4;spacingbottom=4;spacingLeft=4;spacingRight=4;points=[];shadow=1;highlight=1;';
                    type = "ProductStream";
                    edge = new ProductStream(value, parent, source, target, direction, null, clientRn);
                    edge['type'] = type;
                }
                else if ((target != null && target.edges == null) || (target != null && target.edges != null && (target.edges == [] || target.edges.length == 0))) {
                    style = 'html=1;startArrow=dash;startSize=14;endArrow=dash;sourcePerimeterSpacing=0;startFill=0;endFill=0;edgeStyle=orthogonalEdgeStyle;strokeWidth=2;spacingTop=4;spacingbottom=4;spacingLeft=4;spacingRight=4;points=[];shadow=1;highlight=1;';  // Changes in Style Edge  - Yago 03/08/18  
                    type = "InternalStream";
                    edge = new InternalStream(value, parent, source, target, direction, null, clientRn);
                    terminalInserted = true;
                    edge['type'] = type;
                }

                if (clientRn.edgeState != null) {
                    value = clientRn.edgeState.cell.value;
                    style = clientRn.edgeState.cell.style;
                }

                // edge = clientRn.insertEdge(parent, null, '', source, target, style);
                //edge['type'] = type;

                // var nameStream = graph.insertVertex(edge, null, value, 0, 0, 0.5, 0.5,
                // 'fontSize=14;align=left;fillColor=#76eaea;spacingLeft=0;spacingRight=2', true);
                // nameStream['type'] = "StreamName";
                // nameStream.geometry.offset = new mxPoint(0, -10);

                // let liSub = document.getElementById('stream-name');
                // let isChecked = liSub.className;
                // nameStream.setVisible(isChecked && isVisibleName);       
                // nameStream.setConnectable(false);

                // graph.updateCellSize(nameStream);

                if (edge != null) {
                    // Updates the connection constraints
                    clientRn.graph.setConnectionConstraint(edge, source, true, clientRn.sourceConstraint);
                    clientRn.graph.setConnectionConstraint(edge, target, false, clientRn.constraintHandler.currentConstraint);

                    let childName = model.getChildAt(edge, 0);

                    //document.querySelector('#unit').value

                    // Uses geometry of the preview edge state
                    if (clientRn.edgeState != null) {
                        model.setGeometry(edge, clientRn.edgeState.cell.geometry);
                    }

                    var parent = model.getParent(source);

                    // Inserts edge before source
                    if (clientRn.isInsertBefore(edge, source, target, evt, dropTarget)) {
                        var index = null;
                        var tmp = source;

                        while (tmp.parent != null && tmp.geometry != null &&
                            tmp.geometry.relative && tmp.parent != edge.parent) {
                            tmp = clientRn.graph.model.getParent(tmp);
                        }

                        if (tmp != null && tmp.parent != null && tmp.parent == edge.parent) {
                            var index = tmp.parent.getIndex(tmp);
                            tmp.parent.insert(edge, index);
                        }
                    }

                    // Makes sure the edge has a non-null, relative geometry
                    var geo = model.getGeometry(edge);

                    if (geo == null) {
                        geo = new mxGeometry();
                        geo.relative = true;

                        model.setGeometry(edge, geo);
                    }

                    // Uses scaled waypoints in geometry
                    if (clientRn.waypoints != null && clientRn.waypoints.length > 0) {
                        var s = clientRn.graph.view.scale;
                        var tr = clientRn.graph.view.translate;
                        geo.points = [];

                        for (var i = 0; i < clientRn.waypoints.length; i++) {
                            var pt = clientRn.waypoints[i];
                            geo.points.push(new mxPoint(pt.x / s - tr.x, pt.y / s - tr.y));
                        }
                    }

                    if (target == null) {
                        var t = clientRn.graph.view.translate;
                        var s = clientRn.graph.view.scale;
                        var pt = (clientRn.originalPoint != null) ?
                            new mxPoint(clientRn.originalPoint.x / s - t.x, clientRn.originalPoint.y / s - t.y) :
                            new mxPoint(evt.offsetX / s - t.x, evt.offsetY / s - t.y);
                        pt.x -= clientRn.graph.panDx / clientRn.graph.view.scale;
                        pt.y -= clientRn.graph.panDy / clientRn.graph.view.scale;

                        let parent = graph.getDefaultParent();

                        geo.setTerminalPoint(pt, false);
                    }

                    clientRn.fireEvent(new mxEventObject(mxEvent.CONNECT, 'cell', edge, 'terminal', target,
                        'event', evt, 'target', dropTarget, 'terminalInserted', terminalInserted));
                }
                
                orderStream(edge);
                graph.getModel().endUpdate();
                restoreLabelPosition(edge);
                containerOpened.checkConnectivityModalCreate(null, false);
                return edge;
            }
        };

        $buttonCancel.onclick = function () {
            modal.close();
            return null;
        };

        $buttonHelp.onclick = function () {
            callbackObj.openHelpModal(32);
        };

        subContent.addEventListener('keydown', (event) => {
            //event.preventDefault();
            if (event.keyCode == 27) {
                subContent.querySelector("#btn-cancel").click();
            }
        });
    }
}

StreamController.prototype.tagNamePosition = function (stream) {
    // label
    // let streamName = stream.children.filter(function (item) {
    //     if (item.type == "StreamName")
    //         return item;
    // });
    let streamName = stream.children[0];
    if (streamName[0] != null && streamName[0] != undefined) {
        let index = stream.children.indexOf(streamName[0])

        if (index != null && index != -1) {
            debugger;
            // stream.children[index].geometry.relative = false;
            // stream.children[index].geometry.height = 30;
            // stream.children[index].geometry.x = stream.children[index].positionX;
            // stream.children[index].geometry.y = stream.children[index].positionY;
            // stream.children[index].source = stream;
        }
    }
}

// StreamController.prototype.getAllStreamsJson = function () 
// {
//     let cells = Object.values(graph.model.cells);

//     var streams = cells.filter( function( elem, i, cells ) {
//         console.log(elem.id);
//         return cells.indexOf( elem ) === i;
//     } );
// }

class PorInStreamController {
    constructor() { }

    create(parent, port, edge, useMouse, mouseX, mouseY) {
        let constraint = {};
        let unitPositionX = null;
        let unitPositionY = null;
        let unitWidth = null;
        let unitHeigth = null;
        let portRelativeX = 0;
        let portRelativeY = 0;
        let styleDirection = '';
        useMouse = useMouse == null ? false : useMouse;
        mouseX = mouseX == null ? 0 : mouseX;
        mouseY = mouseY == null ? 0 : mouseY;
        
        if(port != null && port.parent != null && port.parent.style != null && (port.parent.style.indexOf('rotation=90') > 1) && !useMouse)
        {
            unitPositionX = port.parent.geometry.x;
            unitPositionY = port.parent.geometry.y;
            unitWidth = port.parent.geometry.width;
            unitHeigth = port.parent.geometry.height;
            portRelativeX = ((port.geometry.x) * (unitWidth)) + ((unitWidth/2) - 6);
            portRelativeY = ((port.geometry.y) * (unitHeigth)) - ((unitHeigth/2));
            styleDirection = mountObjectDirection(port.style);
        }
        else if(port != null && port.parent != null && port.parent.style != null && (port.parent.style.indexOf('rotation=-90') > 1) && !useMouse)
        {
            unitPositionX = port.parent.geometry.x;
            unitPositionY = port.parent.geometry.y;
            unitWidth = port.parent.geometry.width;
            unitHeigth = port.parent.geometry.height;
            portRelativeX = ((port.geometry.x) * (unitWidth)) + ((unitWidth/2) - 7);
            portRelativeY = ((port.geometry.y) * (unitHeigth)) + ((unitHeigth/2) + 9);
            styleDirection = mountObjectDirection(port.style);
        }
        else if(port != null && useMouse && mouseX != 0 && mouseY != 0)
        {
            unitPositionX = mouseX;
            unitPositionY = mouseY;
            portRelativeX = 0;
            portRelativeY = 0;
            styleDirection = mountObjectDirection(port.style);
        }
        else if(port != null)
        {
            unitPositionX = port.parent.geometry.x;
            unitPositionY = port.parent.geometry.y;
            unitWidth = port.parent.geometry.width;
            unitHeigth = port.parent.geometry.height;
            portRelativeX = (port.geometry.x) * (unitWidth);
            portRelativeY = (port.geometry.y) * (unitHeigth);
            styleDirection = mountObjectDirection(port.style);
        }

        if (styleDirection.includes("north")) {
            constraint = {
                direction: "north",
                constraint: "south",
                x: unitPositionX + portRelativeX,
                y: unitPositionY + portRelativeY
            };

        }
        else if (styleDirection.includes("east")) {
            constraint = {
                direction: "east",
                constraint: "west",
                x: (unitPositionX + portRelativeX)-14,
                y: unitPositionY + portRelativeY
            };
        }
        else if (styleDirection.includes("west")) {
            constraint = {
                direction: "west",
                constraint: "east",
                x: unitPositionX + portRelativeX,
                y: unitPositionY + portRelativeY
            };
        }
        else {
            constraint = {
                direction: "south",
                constraint: "north",
                x: unitPositionX + portRelativeX,
                y: unitPositionY + portRelativeY
            };
        }

        let portIn = graph.insertVertex(graph.getDefaultParent(), null, '', constraint.x, constraint.y, 14, 14,
            `portInStream;portConstraint=${constraint.constraint};shape=triangle;direction=${constraint.direction};resizable=0;selectable=0`, false);
        portIn['type'] = 'portInStream';
        portIn.edges = [];
        portIn.edges.push(edge);
        portIn.setConnectable(false);
        edge.parent = portIn;
        edge.target = portIn;
        edge.type = "ProductStream";

        if(port != null)
        {
            port.edges = [];
        }
    }
}
class PorOutStreamController {
    constructor() { }

    create(parent, port, edge) {
        let constraint = {};
        let unitPositionX = null;
        let unitPositionY = null;
        let unitWidth = null;
        let unitHeigth = null;
        let portRelativeX = 0;
        let portRelativeY = 0;
        let styleDirection = '';

        if(port != null && port.parent != null && port.parent.style != null &&  (port.parent.style.indexOf('rotation=90') > 1))
        {
            unitPositionX = port.parent.geometry.x;
            unitPositionY = port.parent.geometry.y;
            unitWidth = port.parent.geometry.width;
            unitHeigth = port.parent.geometry.height;
            portRelativeX = ((port.geometry.x) * (unitWidth)) - ((unitWidth/2) + 6);
            portRelativeY = ((port.geometry.y) * (unitHeigth)) + ((unitHeigth/2) + 5);
            styleDirection = mountObjectDirection(port.style);
        }
        else if(port != null && port.parent != null && port.parent.style != null && (port.parent.style.indexOf('rotation=-90') > 1))
        {
            unitPositionX = port.parent.geometry.x;
            unitPositionY = port.parent.geometry.y;
            unitWidth = port.parent.geometry.width;
            unitHeigth = port.parent.geometry.height;
            portRelativeX = ((port.geometry.x) * (unitWidth)) - ((unitWidth/2) + 5);
            portRelativeY = ((port.geometry.y) * (unitHeigth)) - ((unitHeigth/2) + 5);
            styleDirection = mountObjectDirection(port.style);
        }
        else if(port != null)
        {
            unitPositionX = port.parent.geometry.x;
            unitPositionY = port.parent.geometry.y;
            unitWidth = port.parent.geometry.width;
            unitHeigth = port.parent.geometry.height;
            portRelativeX = (port.geometry.x) * (unitWidth);
            portRelativeY = (port.geometry.y) * (unitHeigth);
            styleDirection = mountObjectDirection(port.style);
        }

        if (styleDirection.includes("north")) {
            constraint = {
                direction: "north",
                constraint: "north",
                x: unitPositionX + portRelativeX,
                y: (unitPositionY + portRelativeY)-15
            };

        }
        else if (styleDirection.includes("east")) {
            constraint = {
                direction: "east",
                constraint: "east",
                x: unitPositionX + portRelativeX,
                y: unitPositionY + portRelativeY
            };
        }
        else if (styleDirection.includes("west")) {
            constraint = {
                direction: "west",
                constraint: "west",
                x: unitPositionX + portRelativeX,
                y: unitPositionY + portRelativeY
            };
        }
        else {
            constraint = {
                direction: "south",
                constraint: "south",
                x: unitPositionX + portRelativeX,
                y: unitPositionY + portRelativeY
            };
        }

        let portOut = graph.insertVertex(parent, null, '', constraint.x, constraint.y, 14, 14,
            `portOutStream;portConstraint=${constraint.constraint};shape=triangle;direction=${constraint.direction};resizable=0`, false);
        portOut['type'] = 'portOutStream';
        portOut.edges = [];
        portOut.edges.push(edge);
        portOut.setConnectable(false);
        portOut.target = edge;
        edge.source = portOut;
        edge.type = "FeedStream"
        if(port != null)
        {
            port.edges = [];
        }
        return portOut;
    }
}
