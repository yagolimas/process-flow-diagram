GraphEditor = function () {

    this.createLineDragDrop();
    this.handTool();
    this.multiSelect();
    this.zoomWheeling();
    this.backgroundGrid();

    editor.undoManager = this.createUndoManager();

    //this.keepWithUnit();
    //this.disableMenu();
    // this.snapToGrid();

    (function () {
        graph.addMouseListener({
            mouseDown: function (sender, evt) {
                isMouseDownPortOut = evt.getCell();

                // let cells = sender.cells;
                // if (sender.cells == undefined || sender.cells == null) {
                //     //cells = graph.getModel().cells;
                //     cells = graph.getSelectionCells();
                // }

                // let units = [];

                // if (cells.length > 0) {
                //     for (let i = 0; i < cells.length; i++) {
                //         if (cells[i].style.includes("unit;")) {
                //             units.push(cells[i]);
                //         }
                //     }
                // }

                //graph.orderCells(false, units); 

                let menuButtons = document.getElementsByClassName('onclick-menu');

                if (event.button == 0) {

                    for (i in menuButtons) {
                        try {
                            menuButtons[i].blur();
                        }
                        catch (e) {
                            // alert('GraphEditor => ' + e);
                        }
                    }
                }
                graph.popupMenuHandler.hideMenu();
                updateGraphView();
            }
            , mouseMove: function (sender, evt) {
                return;
            }, mouseUp: function (sender, evt) {

                let cells = sender.cells;
                if (sender.cells == undefined || sender.cells == null) {
                    cells = graph.getSelectionCells();
                }

                let units = [];

                if (cells.length > 0) {
                    for (let i = 0; i < cells.length; i++) {
                        if (cells[i] != null && cells[i].style.includes("unit;")) {
                            units.push(cells[i]);
                        }
                    }
                    if (cells.length > 1) {
                        if (mxEvent.isControlDown(evt.getEvent()) && !mxEvent.isShiftDown(evt.getEvent())) {
                            if (units.length > 1) {
                                align(units);
                            }
                        }
                    }
                }

                if (units.length > 0) {
                    //graph.orderCells(false, units);
                }

                graph.refresh();
                canCreateProductStream = true;
                lastStream = null;
            }
        });
    })();
};

GraphEditor.prototype.createLineDragDrop = function () {
    var connectionHandlerIsStartEvent = graph.connectionHandler.isStartEvent;

    graph.connectionHandler.isStartEvent = function (me) {
        return (me.evt.currentTarget.className == "graphBackground") ||
            connectionHandlerIsStartEvent.apply(this, arguments);
    };

    // var connectionHandlerMouseUp = graph.connectionHandler.mouseUp;
    // graph.connectionHandler.mouseUp = function (sender, me) 
    // {
    // };
};

GraphEditor.prototype.createPopupMenuRightClickAc = function (editor, graphEditor, menu, cell, evt) {
    if (cell == null) 
    {
        menu.addItem('Zoom In', '', 'I', function () {
            editor.execute('zoomIn');
        });

        menu.addItem('Zoom Out', '', 'O', function () {
            editor.execute('zoomOut');
        });

        menu.addSeparator();

        menu.addItem('Normal Size', '', 'N', function()
        {
            graph.zoomActual();
        });

        menu.addItem('Fit in Window', '', 'F', function () {
            graph.fit(30, false, 0);
            centre();
        });

        menu.addItem('Toggle Grid', '', 'G', function () {
            graphEditor.toggleBackgruondGrid();
        });

        menu.addItem('Centre', '', 'C', function () {
            centre();
        });
    }
    else if (cell.style.includes("unit") || cell.style.includes("unitName")) 
    {
        if (cell.style.includes("unitName")) {
            cell = cell.parent.geometry != null ? cell.parent : cell.source;
        }

        if(App.app == 0 && App.action == 'view')
        {
            menuMonitor(cell, menu);
        }

        var subMenu = menu.addItem('Flip and Rotate', '', '', null);

        menu.addItem('Flip Left-Right', '', '', function () {
            //** Refactoring */
            flipLeftRight(cell);
        }, subMenu);

        if (cell.style.includes("heater") ||
            cell.style.includes("cooler") ||
            cell.style.includes("mixer") ||
            cell.style.includes("splitter") ||
            cell.style.includes("other") ||
            cell.style.includes("exchanger")) rotateOthers(cell, menu, subMenu);

        if (cell.style.includes("exchanger"))
        {
            menu.addItem('Swap Exchanger sides', '', '', function () {
                swapCell(cell);
            });
        }

        menu.addSeparator();

        menuGeneral(cell, 'unit', menu);
    }
    else if (cell.edge || cell.style.includes("streamName")) 
    {
        if (cell.style.includes("streamName") && parseInt(cell.parent.id) != 1) {
            cell = cell.parent;
        }
        else if (cell.style.includes("streamName") && parseInt(cell.parent.id) == 1) {
            cell = cell.source;
        }

        if (cell.type == 'ProductStream' || cell.type == 'FeedStream') {

            // Refactoring
            menu.addItem('Default Position', '', '', function () {
                setDefaultPositon(cell);
            });

            // Refactoring
            menu.addItem('Keep with Unit', '', '', function () {
                //setKeepUnit();
                keep(cell, evt);
            });
        }

        menu.addItem('Automatic Routing', '', '', function () {
            automaticRouting();
        });

        menu.addSeparator();

        menuGeneral(cell, 'stream', menu);
    }
    else if (cell.edges != null && cell.edges.length > 0 && 
        (cell.type.toLowerCase() == "portinstream" || cell.type.toLowerCase() == "portoutstream"))
        {
        menu.addItem('Flip', '', '', function () {
            flipArrow(cell);
        }, subMenu);
        menu.addItem('Rotate Clockwise', '', '', function () {
            rotateClockwiseArrow(cell);
        }, subMenu);
        menu.addItem('Rotate Anticlockwise', '', '', function () {
            rotateAnticlockwiseArrow(cell);
        }, subMenu);
    }
};

GraphEditor.prototype.createPopupMenuRightClick = function (editor, graphEditor, menu, cell, evt) {

    if (cell == null) {

        menu.addItem('Zoom In', '', 'I', function () {
            editor.execute('zoomIn');
        });

        menu.addItem('Zoom Out', '', 'O', function () {
            editor.execute('zoomOut');
        });

        menu.addSeparator();

        menu.addItem('Normal Size', '', 'N', function()
        {
            graph.zoomActual();
        });

        menu.addItem('Fit in Window', '', 'F', function () {
            graph.fit(30, false, 0);
            centre();
        });

        menu.addItem('Toggle Grid', '', 'G', function (evt) {
            graphEditor.toggleBackgruondGrid();
        });

        menu.addItem('Centre', '', 'C', function () {
            centre();
        });
    }
    else if (cell.type != "PortIn" &&
        cell.type != "PortOut" &&
        cell.type != "TagName" &&
        cell.type != "TagAllocation") {

        menu.addItem('Delete', '', 'DEL', function () {
            editor.execute('delete', cell);
        });

        menu.addSeparator();

        if (cell.type == "FeedStream") {

            menu.addItem('Specify Hot/Cold Feed', '', '', function (evt) {

                let content = modal.createModalFeed('Specify Hot/Cold Feed');
                modal.removeContent();
                modal.createContent(content);
                let divName = document.querySelector("#feed-stream");
                divName.remove();

                let divRadios = document.querySelector("#radios");
                //divRadios.setAttribute("style", "margin: auto");

                //document.querySelector('.row').setAttribute("style", "padding-top:0;display:flex;");
                document.querySelector('.modal-body').innerHTML = `
                <div class="row" style="padding-top:0;display:flex;">                       
                        <div id="radios" class="form-group half" style="margin:auto">
                            <div class="form-group radio">
                                <input id="cold" name="temp" type="radio" class="form-control">
                                <label style="color:#007ac9">Cold Feed</label>
                            </div>
                            <div class="form-group radio">
                                <input id="hot" name="temp" type="radio" class="form-control">   
                                <label style="color:#e00034">Hot Feed</label>
                            </div>   
                        </div>

                    </div> `

                modal.open();

                const $buttonOk = document.querySelector("#btn-ok");
                const $buttonCancel = document.querySelector("#btn-cancel");
                const $radioHot = document.querySelector("#hot");
                const $radioCold = document.querySelector("#cold");
                let color = "#007ac9";

                $radioHot.onclick = function () {
                    color = "#e00034";   // red         
                }

                $radioCold.onclick = function () {
                    color = "#007ac9";   // blue         
                }

                $buttonOk.onclick = function () {
                    modal.close();

                    graph.getModel().beginUpdate();

                    try {
                        //updateSvgArrow(color);       

                        cell.style = `endArrow=none;strokeColor=${color};fillColor=${color};html=1;edgeStyle=orthogonalEdgeStyle;strokeWidth=2;spacingTop=4;spacingbottom=4;spacingLeft=4;spacingRight=4;points=[];shadow=1;highlight=1;`;
                        //cell.style = `html=1;startArrow=dash;startSize=14;endArrow=dash;strokeColor=${ color };sourcePerimeterSpacing=0;startFill=0;endFill=0;fillColor=red;edgeStyle=orthogonalEdgeStyle;`;

                    }
                    finally {
                        graph.getModel().endUpdate();
                        graph.refresh();
                        //updateSvgArrow(color);           
                    }
                };

                $buttonCancel.onclick = function () {
                    modal.close();
                };
            });

            menu.addItem('Rename', '', '', function (evt) {
                rename(cell);
            });

            menu.addItem((isVisibleName ? 'Hide' : 'Show') + ' Stream Name', '', '', function (evt) {
                isVisibleName = (isVisibleName) ? false : true;

                cell.children.forEach(children => {
                    if (children.type === "StreamName") {
                        children.setVisible(isVisibleName);
                    }
                });
                graph.refresh();
            });
        }
        else if (cell.edge == true) {
            menu.addItem('Rename', '', '', function (evt) {
                rename(cell);
            });

            menu.addItem((isVisibleName ? 'Hide' : 'Show') + ' Stream Name', '', '', function (evt) {
                isVisibleName = (isVisibleName) ? false : true;

                cell.children.forEach(children => {
                    if (children.type === "StreamName") {
                        children.setVisible(isVisibleName);
                    }
                });
                graph.refresh();
            });
        }
        else if (cell.type == "Unit") {
            menu.addItem('Rename', '', function (evt) {
                rename(cell);
            });

            menu.addItem((isVisibleName ? 'Hide' : 'Show') + ' Unit Name', '', '', function (evt) {
                isVisibleName = (isVisibleName) ? false : true;

                cell.children.forEach(children => {
                    if (children.type === "TagName") {
                        children.setVisible(isVisibleName);
                    }
                });
                graph.refresh();
            });

            menu.addItem('Restore Label position', '', '', function (event) {
                // graphEditor.retoreLabelPosition(cell.getChildAt(0), event);
                // restore(cell);
                graph.getModel().beginUpdate();
                restoreLabelPosition(cell);
                graph.getModel().endUpdate();
            });

            menu.addItem('Flip Left-Right', '', '', function (evt) {
                flipRotate();
            });

            if (cell.style.indexOf("exchanger") == 0 ||
                cell.style.indexOf("mixer") == 0 ||
                cell.style.indexOf("splitter") == 0 ||
                cell.style.indexOf("cooler") == 0 ||
                cell.style.indexOf("heater") == 0) {
                menu.addItem('Flip Top-Bottom', '', '', function (evt) {
                    flipTopBottom();
                });

                menu.addItem('Rotate Clockwise', '', '', function (evt) {
                    rotateClockwise(graphEditor);
                });

                menu.addItem('Rotate Anticlockwise', '', '', function (evt) {
                    rotateAnticlockwise(graphEditor);
                });
            }

            if (cell.style.indexOf("exchanger") == 0) {

                menu.addItem('Flip and Rotate', '', '', function (evt) {
                    flipRotate();
                });
            }
        }
    }
};

GraphEditor.prototype.createUndoManager = function () {
    editor.undoManager = null;
    editor.undoManager = new mxUndoManager();
    this.resetUndoListener();
    return editor.undoManager;
};

GraphEditor.prototype.resetUndoListener = function () {
    editor.undoManager.history = [];
    editor.undoListener = function (sender, evt) {
        editor.undoManager.undoableEditHappened(evt.getProperty('edit'));
    };

    var listener = mxUtils.bind(this, function (sender, evt) {
        editor.undoListener.apply(this, arguments);
    });

    graph.getModel().addListener(mxEvent.UNDO, listener);
    graph.getView().addListener(mxEvent.UNDO, listener);

    var undoHandler = function (sender, evt) {
        let cand = graph.getSelectionCellsForChanges(evt.getProperty('edit').changes);
        let model = graph.getModel();
        let cells = [];
        let cellsUndoned = sender.history[sender.history.length-1];
        let feedStreamRecreate = false;
        
        if(cand != null && cand.length == 4)
        {
            ignoreModelUpdate = true;

            let hasEmpty = false;
            let hasFeed = false;
            let hasPoS = false;
            let hasName = false;
            let feed = null;

            for (let i = 0; i < cand.length; i++) 
            {
                if(cand[i] != null && cand[i].type != null && cand[i].type.toLowerCase() == "empty")
                {
                    hasEmpty = true;
					graph.removeCells([cand[i]],false,true);
                }
                else if(cand[i] != null && cand[i].type != null && cand[i].type.toLowerCase() == "streamname")
                {
                    hasName = true;
                    cand[i].parent = cand[3];
                }
                else if(cand[i] != null && cand[i].type != null && cand[i].type.toLowerCase() == "feedstream")
                {
                    hasFeed = true;
					graph.removeCells([cand[i]],false,true);
                    // cand[i].source = cand[3];
                    // cand[i].visible == true;
                    feed = cand[i];
                }
                else if(cand[i] != null && cand[i].type != null && cand[i].type.toLowerCase() == "portoutstream")
                {
                    hasPoS = true;
					graph.removeCells([cand[i]],false,true);
                    // cand[i].edges = [];
                    // cand[i].edges.push(cand[2]);
                }
            }

            if(hasEmpty && hasName && hasPoS && hasFeed)
            {
                let nameOfEdge = feed.children[0];
                if(nameOfEdge == undefined || nameOfEdge == null)
                {
                    nameOfEdge = '';
                } 
                else if (nameOfEdge.type = "StreamName")
                {
                    nameOfEdge = nameOfEdge.value;
                }
                else
                {
                    nameOfEdge = '';
                }

                var root = model.getRoot();
                parente = model.getChildAt(root, 0);
                
                let newEdge = new FeedStream(nameOfEdge, feed.target, feed.target.parent.geometry, feed.target.geometry, '#000', "stream;direction=" + mountObjectDirection(feed.target.style));
                graph.addCell(newEdge, parente, undefined, null, null);

                feedStreamRecreate = true;
            }
            // cleanContainer();
            ignoreModelUpdate = false;
        }
        
        if (cand != null)
        {
            for (let i = 0; i < cand.length; i++) {
                if ((model.isVertex(cand[i]) || model.isEdge(cand[i]))) {
                    let childCell =  cand[i];
                    if (childCell.type != null && childCell.type.toLowerCase() == "productstream"
                    && childCell.source != null && childCell.source.parent != null && childCell.source.parent.type.toLowerCase() == "unit"
                    && childCell.target != null && childCell.target.type.toLowerCase() == "portin"
                    && childCell.source.type.toLowerCase() == "portout") 
                    {
                        childCell.type = "InternalStream";
                    }
                    else if (childCell.type != null && childCell.type.toLowerCase() == "empty"
                    && childCell.source != null && childCell.source.parent != null && childCell.source.parent.type == null
                    && childCell.target != null && childCell.target.type.toLowerCase() == "portin"
                    && childCell.source != null && childCell.source.type.toLowerCase() == "portoutstream") 
                    {
                        childCell.type = "FeedStream";
                    }
                    else if (childCell.type != null && childCell.type.toLowerCase() == "empty"
                    && childCell.target != null && childCell.target.parent != null && childCell.target.parent.type == null
                    && childCell.target.type.toLowerCase() == "portinstream"
                    && childCell.source != null && childCell.source.type.toLowerCase() == "portout") 
                    {
                        childCell.type = "ProductStream";
                    }
                    else if (childCell.type != null && childCell.type.toLowerCase() == "empty"
                    && childCell.source != null && childCell.source.parent != null && childCell.source.parent.type != null && childCell.source.parent.type.toLowerCase() == "unit"
                    && childCell.target != null && childCell.target.type.toLowerCase() == "portin"
                    && childCell.source.type.toLowerCase() == "portout") 
                    {
                        childCell.type = "InternalStream";
                    }
                    else if (childCell.type != null && childCell.type.toLowerCase() == "feedstream"
                    && childCell.source != null && childCell.source.parent != null && childCell.source.parent.type != null && childCell.source.parent.type.toLowerCase() == "unit"
                    && childCell.source.type.toLowerCase() == "portout"
                    && childCell.target != null && childCell.target.type.toLowerCase() == "portin") 
                    {
                        childCell.type = "InternalStream";
                    }
                    else if (childCell.type != null && childCell.type.toLowerCase() == "empty"
                    && childCell.source != null && childCell.source.parent != null && childCell.source.parent.type != null && childCell.source.parent.type.toLowerCase() == "unit"
                    && childCell.source.type.toLowerCase() == "portout"
                    && childCell.target != null && childCell.target.type.toLowerCase() == "portinstream") 
                    {
                        childCell.type = "ProductStream";
                    }
                    else if (childCell.type != null && childCell.type.toLowerCase() == "empty"
                    && childCell.source != null && childCell.source.parent != null && childCell.source.parent.type != null && childCell.source.parent.type.toLowerCase() == "unit"
                    && childCell.source.type.toLowerCase() == "portoutstream"
                    && childCell.target != null && childCell.target.type.toLowerCase() == "portin") 
                    {
                        childCell.type = "FeedStream";
                    }
                    else if (childCell.type != null && childCell.type.toLowerCase() == "portinstream"
                    && childCell.source == null && childCell.target == null 
                    && childCell.edges.length > 0 && childCell.edges[0].type.toLowerCase() == "productstream") 
                    {
                        let edge = childCell.edges[0];
                        if(edge.source.edges == null || (edge.source.edges != null && edge.source.edges.length <= 0))
                        {
                            edge.source.edges = [];
                            edge.source.edges.push(edge);
                        }
                    }
                    // else if (childCell.type != null && childCell.type.toLowerCase() == "portinstream"
                    // && childCell.source == null && childCell.target == null 
                    // && childCell.edges.length > 0 && childCell.edges[0].type.toLowerCase() == "internalstream") 
                    // {
                    //     childCell.type = "ProductStream";
                    // }
                    else if (childCell.type != null && childCell.type.toLowerCase() == "internalstream"
                    && childCell.source != null && childCell.target != null 
                    && childCell.source.type != null && childCell.target.type != null 
                    && childCell.source.type.toLowerCase() == "portout" && childCell.target.type.toLowerCase() == "portinstream"
                    && childCell.edges.length > 0) 
                    {
                        let findPortOut = Object.values(graph.getModel().cells);
                        for(let t = 2; t < findPortOut.length; t++)
                        {
                            if(findPortOut[t] != null && childCell.target != null && findPortOut[t].id != childCell.target.id && findPortOut[t].edges != null && findPortOut[t].edges.length > 0 && findPortOut[t].edges[0] != null && findPortOut[t].edges[0].id == childCell.id)
                            {
                                findPortOut[t].edges = [];
                            }
                        }
                        childCell.type = "ProductStream";
                    }
                    else if(childCell.type != null && (childCell.type.toLowerCase() == "tagname" || childCell.type.toLowerCase() == "streamname"))  
                    {
                        if(childCell.value == null || childCell.value == "")
                        {
                            childCell.setVisible(false);
                        }
                        else
                        {
                            setGeometryName(childCell);
                        }
                    }
                    else if (childCell.type != null && childCell.type.toLowerCase() == "portinstream"
                    && childCell.source == null && childCell.target == null 
                    && childCell.edges.length == 0) 
                    {
                        let findPortOut = Object.values(graph.getModel().cells);
                        // for(let t = 2; t < findPortOut.length; t++)
                        // {
                        //     if(findPortOut[t] != null && childCell.target != null && findPortOut[t].id != childCell.target.id && findPortOut[t].edges != null && findPortOut[t].edges.length > 0 && findPortOut[t].edges[0] != null && findPortOut[t].edges[0].id == childCell.id)
                        //     {
                        //         findPortOut[t].edges = [];
                        //     }
                        // }
                        // childCell.type = "ProductStream";
                    }
    
                    let cell = childCell;
                    let parent = cell.parent;
    
                    if (parent != undefined && parent != null && cell.style != null
                        && editor.undoManager.history.includes(evt.properties.edit)) {
                                
                        let actualUndo = null;
                        let actualUndoCell = null;
                        let indexToSlice = undoManagerStack.length;
                        let removeFromList = false;
    
                        for(let u = undoManagerStack.length -1; u >= 0; u--)
                        {
                            if(undoManagerStack[u].index == sender.indexOfNextAdd && undoManagerStack[u].cells != null && undoManagerStack[u].cells.length > 0)
                            {
                                actualUndo = undoManagerStack[u];
                                indexToSlice = u;
                                for(let c = 0; c < undoManagerStack[u].cells.length; c++)
                                {
                                    if(undoManagerStack[u].cells[c] != null && undoManagerStack[u].cells[c].id == cell.id)
                                    {
                                        actualUndoCell = undoManagerStack[u].cells[c];
                                        break;
                                    }
                                }
    
                                if(actualUndoCell != null)
                                {
                                    break;
                                }
                            }
                        }
                        
                        // && !cell.style.includes("flip")
                        if(actualUndoCell == null && actualUndo != null && actualUndo.cells != null && actualUndo.cells != [] && actualUndo.cells.length == 1 
                            && actualUndo.type != null && (actualUndo.type == 'flip-h' || actualUndo.type == 'flip-v') && cell != null && cell.type != null && cell.type.toLowerCase() == 'unit')
                        {
                            actualUndoCell = actualUndo.cells[0];
                        }
    
                        if(actualUndo != null && actualUndo.type != null && actualUndo.type == 'rename' && actualUndoCell != null && actualUndoCell.style.includes("unitName") && (actualUndoCell.lastValue != actualUndoCell.value))
                        {
                            cell.value = actualUndoCell.lastValue;
                            setGeometryName(cell);
                        }
                        else if(actualUndoCell != null && actualUndoCell.style.includes("flipH") && !cell.style.includes("flipH") && (!cell.style.includes("rotation=-90") && !cell.style.includes("rotation=90")))
                        {
                            flipLeftRight(cell, true);
                            removeFromList = true;
                        }
                        else if (actualUndoCell != null && actualUndoCell.style.includes("flipV") && !cell.style.includes("flipV") && (!cell.style.includes("rotation=-90") && !cell.style.includes("rotation=90")))
                        {
                            flipTopBottom(cell, true);
                            removeFromList = true;
                        }
                        else if(actualUndoCell != null && actualUndoCell.style.includes("flipV") && !cell.style.includes("flipV") && (cell.style.includes("rotation=-90") || cell.style.includes("rotation=90")) && (cell.style.includes("mixer") || cell.style.includes("splitter")))
                        {
                            flipTopBottom(cell, true);
                            removeFromList = true;
                        }
                        else if(actualUndoCell != null && actualUndoCell.style.includes("flipV") && !cell.style.includes("flipV") && (cell.style.includes("rotation=-90") || cell.style.includes("rotation=90"))
                        && (cell.style.includes("heater") || cell.style.includes("airCooler") || cell.style.includes("cooler") || cell.style.includes("other")  || cell.style.includes("pump")))
                        {
                            flipLeftRight(cell, true);
                            removeFromList = true;
                        }
                        else if(actualUndoCell != null && actualUndoCell.style.includes("flipV") && !cell.style.includes("flipV") && (cell.style.includes("rotation=-90") || cell.style.includes("rotation=90")))
                        {
                            flipTopBottom(cell, true);
                            removeFromList = true;
                        }
                        else if (actualUndoCell != null && actualUndoCell.style.includes("flipH") && !cell.style.includes("flipH") && (cell.style.includes("rotation=-90") || cell.style.includes("rotation=90")))
                        {
                            flipTopBottom(cell, true);
                            removeFromList = true;
                        }
                        else if (actualUndoCell != null && !actualUndoCell.style.includes("flipH") && cell.style.includes("flipH") && (!cell.style.includes("rotation=-90") && !cell.style.includes("rotation=90")))
                        {
                            flipLeftRight(cell, true);
                            removeFromList = true;
                        }
                        else if (actualUndoCell != null && !actualUndoCell.style.includes("flipV") && cell.style.includes("flipV") && (!cell.style.includes("rotation=-90") && !cell.style.includes("rotation=90")))
                        {
                            flipTopBottom(cell, true);
                            removeFromList = true;
                        }
                        else if (actualUndoCell != null && !actualUndoCell.style.includes("flipV") && cell.style.includes("flipV") && (cell.style.includes("rotation=-90") || cell.style.includes("rotation=90")))
                        {
                            flipTopBottom(cell, true);
                            removeFromList = true;
                        }
                        else if (actualUndoCell != null && !actualUndoCell.style.includes("flipH") && cell.style.includes("flipH") && (cell.style.includes("rotation=-90") || cell.style.includes("rotation=90")))
                        {
                            flipLeftRight(cell, true);
                            removeFromList = true;
                        }
                        else if (actualUndoCell != null && actualUndoCell.style.includes("flipH=0") && cell.style.includes("flipH=1") && (!cell.style.includes("rotation=-90") && !cell.style.includes("rotation=90")))
                        {
                            flipLeftRight(cell, true);
                            removeFromList = true;
                        }
                        else if (actualUndoCell != null && actualUndoCell.style.includes("flipH=0") && cell.style.includes("flipH=1") && (cell.style.includes("rotation=-90") || cell.style.includes("rotation=90")))
                        {
                            flipLeftRight(cell, true);
                            removeFromList = true;
                        }
                        else if (actualUndoCell != null && actualUndoCell.style.includes("flipV=0") && cell.style.includes("flipV=1") && (!cell.style.includes("rotation=-90") && !cell.style.includes("rotation=90")) && (actualUndoCell.style.includes("accumulator")))
                        {
                            flipLeftRight(cell, true);
                            removeFromList = true;
                        }
                        else if (actualUndoCell != null && actualUndoCell.style.includes("flipV=0") && cell.style.includes("flipV=1") && (!cell.style.includes("rotation=-90") && !cell.style.includes("rotation=90")))
                        {
                            flipTopBottom(cell, true);
                            removeFromList = true;
                        }
                        else if (actualUndoCell != null && actualUndoCell.style.includes("flipV=0") && cell.style.includes("flipV=1") && (cell.style.includes("rotation=-90") || cell.style.includes("rotation=90"))
                            && (cell.style.includes("heater") || cell.style.includes("airCooler") || cell.style.includes("cooler") || cell.style.includes("other")  || cell.style.includes("pump")))
                        {
                            flipLeftRight(cell, true);
                            removeFromList = true;
                        }
                        else if (actualUndoCell != null && actualUndoCell.style.includes("flipV=0") && cell.style.includes("flipV=1") && (cell.style.includes("rotation=-90") || cell.style.includes("rotation=90")))
                        {
                            flipTopBottom(cell, true);
                            removeFromList = true;
                        }
                        else if(actualUndoCell != null && actualUndoCell.style.includes("flipH") && cell.style.includes("flipH") && (!cell.style.includes("rotation=-90") && !cell.style.includes("rotation=90")) && (actualUndoCell.style.includes("accumulator") || actualUndoCell.style.includes("column;")))
                        {
                            flipLeftRight(cell, true);
                            removeFromList = true;
                        }
                        else if(actualUndoCell != null && actualUndoCell.style.includes("flipH=1") && cell.style.includes("flipH=0") && (!cell.style.includes("rotation=-90") && !cell.style.includes("rotation=90")) 
                        && (!actualUndoCell.style.includes("accumulator") && !actualUndoCell.style.includes("column;")))
                        {
                            flipLeftRight(cell, true);
                            removeFromList = true;
                        }
                        else if(actualUndoCell != null && actualUndoCell.style.includes("flipH=1") && cell.style.includes("flipH=0") && (cell.style.includes("rotation=-90") || cell.style.includes("rotation=90")) 
                        && (!actualUndoCell.style.includes("accumulator") && !actualUndoCell.style.includes("column;")))
                        {
                            flipTopBottom(cell, true);
                            removeFromList = true;
                        }
                        // else if(cell != null && cell.style.includes("flipH=1") && (cell.style.includes("rotation=-90") || cell.style.includes("rotation=90")) 
                        // && (cell.style.includes("mixer") || cell.style.includes("splitter")))
                        // {
                        //     flipTopBottom(cell, true);
                        //     removeFromList = true;
                        // }
                        // else if(cell != null && cell.style.includes("flipH=1") && (!cell.style.includes("rotation=-90") && !cell.style.includes("rotation=90")) 
                        // && (cell.style.includes("mixer") || cell.style.includes("splitter")))
                        // {
                        //     flipLeftRight(cell, true);
                        //     removeFromList = true;
                        // }
    
                        if(removeFromList)
                        {
                            undoManagerStack.splice(indexToSlice, indexToSlice+1);
                        }
                    }
                    cells.push(cand[i]);
                }
            }
            // cleanContainer();
            // graph.removeEmptyArrows();
            graph.refresh();
        }

        // graph.setSelectionCells(cells);
        graph.selectionModel.cells = [];
    };

    editor.undoManager.addListener(mxEvent.UNDO, undoHandler);
    editor.undoManager.addListener(mxEvent.REDO, undoHandler);
};

GraphEditor.prototype.undo = function () {

    if (graph.isEditing()) {
        let value = graph.cellEditor.textarea.innerHTML;
        document.execCommand('undo', false, null);

        if (value == graph.cellEditor.textarea.innerHTML) {
            graph.stopEditing(true);
            undoManager.undo();
        }
    }
    else {
        editor.undoManager.undo();
    }

    containerOpened.checkConnectivityModalCreate(null, false);
};

GraphEditor.prototype.canUndo = function () {
    return graph.isEditing() || editor.undoManager.canUndo();
};

GraphEditor.prototype.zoomWheeling = function () {
    zoomWheeling();
};

GraphEditor.prototype.multiSelect = function () {

    graph.rubberband.isForceRubberbandEvent = function (me) {
        let verify = false;

        verify = (((mxEvent.isShiftDown(me.getEvent()) &&
            mxEvent.isLeftMouseButton(me.getEvent()))) && !mxEvent.isAltDown(me.getEvent()));

        if (verify) {
            container.style.cursor = "pointer";
        }
        else {
            container.style.cursor = "default";
        }

        return verify;
    };

};

GraphEditor.prototype.handTool = function () {
    let panningHandlerIsForcePanningEvent = graph.panningHandler.isForcePanningEvent;
    if (panningHandlerIsForcePanningEvent) {
        container.style.cursor = "pointer";
    }

    graph.panningHandler.isForcePanningEvent = function (me) {
        // Ctrl+left button is reported as right button in FF on Mac
        let verify = false;

        verify = (mxEvent.isControlDown(me.getEvent()) &&
            mxEvent.isLeftMouseButton(me.getEvent()) &&
            me.getEvent().target.outerHTML.indexOf('<image') != 0 &&
            !mxEvent.isRightMouseButton(me.getEvent()));

        if (verify == true) {
            container.style.cursor = "pointer";
        }
        else {
            container.style.cursor = "default";
        }

        updateGraphView();
        return verify;
    };
};

GraphEditor.prototype.backgroundGrid = function () {
    graph.container.children[0].style.background = graphContainer.GRID_CONTAINER;
};

GraphEditor.prototype.toggleBackgruondGrid = function () {
    if (graph.container.children[0].style.background == "") {
        graph.container.children[0].style.background = graphContainer.GRID_CONTAINER;
    }
    else {
        graph.container.children[0].style.background = "";
    }
};

GraphEditor.prototype.centre = function () {
    centre();
};

GraphEditor.prototype.validateName = function (name) {
    let cells = graph.getModel().cells;
    return !(Object.values(cells).map(cell => cell.getValue()).includes(name.toUpperCase()));
};

GraphEditor.prototype.validateCellNames = function (valueNamed, exists) {
    let cells = graph.getModel().cells;
    let count = 0;

    if (valueNamed == "" && App.application == 2) {
        return true;
    }
    else if (valueNamed == "") {
        return false;
    }

    for (let i in cells) {
        if (cells[i] != null && cells[i].style != null && cells[i].style.indexOf("portOut") != 0 && cells[i].style.indexOf("portIn") != 0) {
            if (exists != null && exists != cells[i].mxObjectId && valueNamed == cells[i].value + "") {
                return false;
            }
            else if (exists == null && valueNamed == cells[i].value + "") {
                return false;
            }
        }
    }

    return true;
};

GraphEditor.prototype.validateCellNamesSequence = function (valueNamed, style, exists) {

    if (valueNamed == undefined || valueNamed == null || valueNamed == 'undefined') {
        valueNamed = "";
    }

    let valid = graphEditor.validateCellNames(valueNamed, exists);

    let type = style;

    if (style.indexOf(";") > 0)
        type = style.split(';')[0];

    valueToReturn = valueNamed;

    if ((!valid && (App.app == 1 || App.app == 0))||(valid && App.app == 2)) {
        switch (type) {
            case "accumulator":
                valueToReturn = accumulator + countAccumulator;
                countAccumulator++;
                break;
            case "exchanger":
                valueToReturn = exchanger + countExchanger;
                countExchanger++;
                break;
            case "splitter":
                valueToReturn = splitter + countSplitter;
                countSplitter++;
                break;
            case "pump":
                valueToReturn = pump + countPump;
                countPump++;
                break;
            case "other":
                valueToReturn = other + countOther;
                countOther++;
                break;
            case "mixer":
                valueToReturn = mixer + countMixer;
                countMixer++;
                break;
            case "kettleReboiler":
                valueToReturn = kettle + countKettleReboiler;
                countKettleReboiler++;
                break;
            case "heater":
                valueToReturn = heater + countHeater;
                countHeater++;
                break;
            case "flash":
                valueToReturn = flash + countFlash;
                countFlash++;
                break;
            case "desalter":
                valueToReturn = desalter + countDesalter;
                countDesalter++;
                break;
            case "cooler":
                valueToReturn = cooler + countCooler;
                countCooler++;
                break;
            case "columnTop":
                valueToReturn = columnTop + countColumnTop;
                countColumnTop++;
                break;
            case "column":
                valueToReturn = column + countColumn;
                countColumn++;
                break;
            case "airCooler":
                valueToReturn = air + countAirCooler;
                countAirCooler++;
                break;
            case "stream":
                valueToReturn = stream + countStream;
                countStream++;
                break;
        }
    }

    return valueToReturn;
};

GraphEditor.prototype.decrementCellNamesSequence = function (style) {
    let type = style;

    if (style.indexOf(";") > 0)
        type = style.split(';')[0];

    switch (type) {
        case "accumulator":
            countAccumulator--;
            break;
        case "exchanger":
            countExchanger--;
            break;
        case "splitter":
            countSplitter--;
            break;
        case "pump":
            countPump--;
            break;
        case "other":
            countOther--;
            break;
        case "mixer":
            countMixer--;
            break;
        case "kettleReboiler":
            countKettleReboiler--;
            break;
        case "heater":
            countHeater--;
            break;
        case "flash":
            countFlash--;
            break;
        case "desalter":
            countDesalter--;
            break;
        case "cooler":
            countCooler--;
            break;
        case "columnTop":
            countColumnTop--;
            break;
        case "column":
            countColumn--;
            break;
        case "airCooler":
            countAirCooler--;
            break;
        case "stream":
            countStream--;
            break;
    }

    return valueToReturn;
};

GraphEditor.prototype.checkConnectivity = function (cell) {
    
    let cells = graph.getModel().cells;
    let detailedInformation = "";

    let emptyExchangerShellInPorts = 0;
    let emptyExchangerTubeInPorts = 0;
    let emptyReboilerShellInPorts = 0;
    let emptyReboilerTubeInPorts = 0;

    let emptyAccumulatorInPorts = 0;
    let emptyColumnInPorts = 0;
    let emptyColumnTopInPorts = 0;
    let emptyCoolerInPorts = 0;
    let emptyAirCoolerInPorts = 0;
    let emptyHeaterInPorts = 0;
    let emptyDesalterInPorts = 0;
    let emptyFlashDrumInPorts = 0;
    let emptyPumpInPorts = 0;
    let emptySplitterInPorts = 0;
    let emptyMixerInPorts = 0;
    let emptyOtherInPorts = 0;


    let emptyExchangerShellOutPorts = 0;
    let emptyExchangerTubeOutPorts = 0;
    let emptyReboilerShellOutPorts = 0;
    let emptyReboilerTubeOutPorts = 0;

    let emptyAccumulatorOutPorts = 0;
    let emptyColumnOutPorts = 0;
    let emptyColumnTopOutPorts = 0;
    let emptyCoolerOutPorts = 0;
    let emptyAirCoolerOutPorts = 0;
    let emptyHeaterOutPorts = 0;
    let emptyDesalterOutPorts = 0;
    let emptyFlashDrumOutPorts = 0;
    let emptyPumpOutPorts = 0;
    let emptySplitterOutPorts = 0;
    let emptyMixerOutPorts = 0;
    let emptyOtherOutPorts = 0;

    let emptyFeeds = 0;
    let emptyProducts = 0;
    let emptyInternal = 0;

    let actualName = '';

    if (cells != null && Object.values(cells).length > 2) {

        let tagName = null;
        for (let i in cells) {

            if (cells[i].parent != null && cells[i].parent.id != 0 && cells[i].parent.id != 1 && cells[i].parent.children != null && cells[i].parent.children != []) {
                let children = cells[i].parent.children;
                for (let k = 0; k < children.length; k++) {
                    // cells[i].parent.children.filter(function (item) {
                    let item = children[k];
                    if (item == null) {
                        break;
                    }

                    if (item.type == "TagName" && item.value != actualName) {
                        tagName = item;
                        emptyExchangerShellInPorts = 0;
                        emptyExchangerTubeInPorts = 0;
                        emptyReboilerShellInPorts = 0;
                        emptyReboilerTubeInPorts = 0;

                        emptyAccumulatorInPorts = 0;
                        emptyColumnInPorts = 0;
                        emptyColumnTopInPorts = 0;
                        emptyCoolerInPorts = 0;
                        emptyAirCoolerInPorts = 0;
                        emptyHeaterInPorts = 0;
                        emptyDesalterInPorts = 0;
                        emptyFlashDrumInPorts = 0;
                        emptyPumpInPorts = 0;
                        emptySplitterInPorts = 0;
                        emptyMixerInPorts = 0;
                        emptyOtherInPorts = 0;


                        emptyExchangerShellOutPorts = 0;
                        emptyExchangerTubeOutPorts = 0;
                        emptyReboilerShellOutPorts = 0;
                        emptyReboilerTubeOutPorts = 0;

                        emptyAccumulatorOutPorts = 0;
                        emptyColumnOutPorts = 0;
                        emptyColumnTopOutPorts = 0;
                        emptyCoolerOutPorts = 0;
                        emptyAirCoolerOutPorts = 0;
                        emptyHeaterOutPorts = 0;
                        emptyDesalterOutPorts = 0;
                        emptyFlashDrumOutPorts = 0;
                        emptyPumpOutPorts = 0;
                        emptySplitterOutPorts = 0;
                        emptyMixerOutPorts = 0;
                        emptyOtherOutPorts = 0;
                        continue;
                    }
                    else if (item.type == "StreamName") {
                        if (item.value == "Feed") {
                            //debugger;
                        }
                        tagName = item;

                        emptyFeeds = 0;
                        emptyProducts = 0;
                        emptyInternal = 0;
                    }
                    // });
                }
            }
            else {
                continue;
            }

            // if(tagName == null && cells[i].children != null)
            // {
            //     cells[i].children.filter(function (item) {
            //         //if(item.value != "" && item.type == "TagName")
            //         if(item.value != "")
            //             tagName = item;
            //     });
            // }

            if (tagName == undefined || tagName == null) {
                actualName = '';
            }
            else {
                actualName = tagName.value;
            }

            switch (cells[i].type) {
                case "PortIn":
                    if (cells[i].parent.style.indexOf("airCooler") >= 4 && ((cells[i].edges == null) || (cells[i].edges == [] || (cells[i].edges != null && cells[i].edges.length <= 0)))) {
                        emptyAirCoolerInPorts += 1;
                        if (emptyAirCoolerInPorts == 1) {
                            detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no feed stream." : "\n" + actualName + " In not connected.";
                        }
                        break;
                    }

                    if (cells[i].parent.style.indexOf("accumulator") >= 4 && ((cells[i].edges == null) || (cells[i].edges == [] || (cells[i].edges != null && cells[i].edges.length <= 0)))) {
                        emptyAccumulatorInPorts += 1;
                        if (emptyAccumulatorInPorts == 1) {
                            detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no feed stream." : "\n" + actualName + " has no feed stream.";
                        }
                        break;
                    }
                    if (cells[i].parent.style.indexOf("columnTop") >= 4 && ((cells[i].edges == null) || (cells[i].edges == [] || (cells[i].edges != null && cells[i].edges.length <= 0)))) {
                        emptyColumnTopInPorts += 1;
                        if (emptyColumnTopInPorts == 1) {
                            detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no feed stream." : "\n" + actualName + " has no feed stream.";
                        }
                        break;
                    }
                    if (cells[i].parent.style.indexOf("column") >= 4
                        && ((cells[i].edges == null) || (cells[i].edges == [] || (cells[i].edges != null && cells[i].edges.length <= 0)))) {
                        if (cells[i].position != undefined && cells[i].position == "west") {
                            emptyColumnInPorts += 1;
                            if (emptyColumnInPorts == 3) {
                                detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no feed stream." : "\n" + actualName + " has no feed stream.";
                            }
                            break;
                        }
                    }
                    if (cells[i].parent.style.indexOf("cooler") >= 4 && ((cells[i].edges == null) || (cells[i].edges == [] || (cells[i].edges != null && cells[i].edges.length <= 0)))) {
                        emptyCoolerInPorts += 1;
                        if (emptyCoolerInPorts == 1) {
                            detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no feed stream." : "\n" + actualName + " In not connected.";
                        }
                        break;
                    }
                    if (cells[i].parent.style.indexOf("desalter") >= 4 && ((cells[i].edges == null) || (cells[i].edges == [] || (cells[i].edges != null && cells[i].edges.length <= 0)))) {
                        emptyDesalterInPorts += 1;
                        if (emptyDesalterInPorts == 1) {
                            detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no feed stream." : "\n" + actualName + " has no feed stream.";
                        }
                        break;
                    }
                    if (cells[i].parent.style.indexOf("flash") >= 4 && ((cells[i].edges == null) || (cells[i].edges == [] || (cells[i].edges != null && cells[i].edges.length <= 0)))) {
                        emptyFlashDrumInPorts += 1;
                        if (emptyFlashDrumInPorts == 1) {
                            detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no feed stream." : "\n" + actualName + " has no feed stream.";
                        }
                        break;
                    }
                    if (cells[i].parent.style.indexOf("heater") >= 4 && ((cells[i].edges == null) || (cells[i].edges == [] || (cells[i].edges != null && cells[i].edges.length <= 0)))) {
                        emptyHeaterInPorts += 1;
                        if (emptyHeaterInPorts == 1) {
                            detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no feed stream." : "\n" + actualName + " In not connected.";
                        }
                        break;
                    }
                    if (cells[i].parent.style.indexOf("exchanger") >= 4 && ((cells[i].edges == null) || (cells[i].edges == [] || (cells[i].edges != null && cells[i].edges.length <= 0)))) {
                        if (cells[i].typePort == "Shell") {
                            emptyExchangerShellInPorts += 1;
                            if (emptyExchangerShellInPorts == 1) {
                                detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no feed stream." : "\n" + actualName + " Shell In not connected.";
                            }
                        }
                        else if (cells[i].typePort == "Tube") {
                            emptyExchangerTubeInPorts += 1;
                            if (emptyExchangerTubeInPorts == 1) {
                                detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no feed stream." : "\n" + actualName + " Tube In not connected.";
                            }
                        }
                        break;
                    }
                    if (cells[i].parent.style.indexOf("kettleReboiler") >= 4 && ((cells[i].edges == null) || (cells[i].edges == [] || (cells[i].edges != null && cells[i].edges.length <= 0)))) {
                        if (cells[i].typePort == "Shell") {
                            emptyReboilerShellInPorts += 1;
                            if (emptyReboilerShellInPorts == 1) {
                                detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no feed stream." : "\n" + actualName + " Shell Out not connected.";
                            }
                        }
                        else if (cells[i].typePort == "Tube") {
                            emptyReboilerTubeInPorts += 1;
                            if (emptyReboilerTubeInPorts == 1) {
                                detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no feed stream." : "\n" + actualName + " Tube Out not connected.";
                            }
                        }
                        break;
                    }
                    if (cells[i].parent.style.indexOf("mixer") >= 4 && ((cells[i].edges == null) || (cells[i].edges == [] || (cells[i].edges != null && cells[i].edges.length <= 0)))) {
                        emptyMixerInPorts += 1;
                        if (emptyMixerInPorts == 2) {
                            detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no feed stream." : "\n" + actualName + " has fewer than 2 feed streams.";
                        }
                        break;
                    }
                    if (cells[i].parent.style.indexOf("other") >= 4 && ((cells[i].edges == null) || (cells[i].edges == [] || (cells[i].edges != null && cells[i].edges.length <= 0)))) {
                        emptyOtherInPorts += 1;
                        if (emptyOtherInPorts == 1) {
                            detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no feed stream." : "\n" + actualName + " has no feed stream.";
                        }
                        break;
                    }
                    if (cells[i].parent.style.indexOf("pump") > 3 && ((cells[i].edges == null) || (cells[i].edges == [] || (cells[i].edges != null && cells[i].edges.length <= 0)))) {
                        emptyPumpInPorts += 1;
                        if (emptyPumpInPorts == 1) {
                            detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no feed stream." : "\n" + actualName + " In not connected.";
                        }
                        break;
                    }
                    if (cells[i].parent.style.indexOf("splitter") >= 4 && ((cells[i].edges == null) || (cells[i].edges == [] || (cells[i].edges != null && cells[i].edges.length <= 0)))) {
                        emptySplitterInPorts += 1;
                        if (emptySplitterInPorts == 1) {
                            detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no feed stream." : "\n" + actualName + " has no feed stream.";
                        }
                        break;
                    }
                    break;


                case "PortOut":
                    if (cells[i].parent.style.indexOf("airCooler") >= 4 && ((cells[i].edges == null) || (cells[i].edges == [] || (cells[i].edges != null && cells[i].edges.length <= 0)))) {
                        emptyAirCoolerOutPorts += 1;
                        if (emptyAirCoolerOutPorts == 1) {
                            detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no product stream." : "\n" + actualName + " Out not connected.";
                        }
                        break;
                    }

                    if (cells[i].parent.style.indexOf("accumulator") >= 4 && ((cells[i].edges == null) || (cells[i].edges == [] || (cells[i].edges != null && cells[i].edges.length <= 0))) && (cells[i].position != undefined && cells[i].position == "west")) {
                        if (cells[i].position != undefined && cells[i].position == "west") {

                            //debugger;
                            emptyAccumulatorOutPorts += 1;
                            if (emptyAccumulatorOutPorts == 1) {
                                detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no product stream." : "\n" + actualName + " has no product stream.";
                            }
                            break;
                        }
                    }

                    if (cells[i].parent.style.indexOf("columnTop") >= 4 && ((cells[i].edges == null) || (cells[i].edges == [] || (cells[i].edges != null && cells[i].edges.length <= 0)))) {
                        emptyColumnTopOutPorts += 1;
                        if (emptyColumnTopOutPorts == 1) {
                            detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no product stream." : "\n" + actualName + " has no product stream.";
                        }
                        break;
                    }
                    if (cells[i].parent.style.indexOf("column") >= 4 && ((cells[i].edges == null) || (cells[i].edges == [] || (cells[i].edges != null && cells[i].edges.length <= 0)))) {
                        emptyColumnOutPorts += 1;
                        if (emptyColumnOutPorts == 1) {
                            detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no product stream." : "\n" + actualName + " has no product stream.";
                        }
                        break;
                    }
                    if (cells[i].parent.style.indexOf("cooler") >= 4 && ((cells[i].edges == null) || (cells[i].edges == [] || (cells[i].edges != null && cells[i].edges.length <= 0)))) {
                        emptyCoolerOutPorts += 1;
                        if (emptyCoolerOutPorts == 1) {
                            detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no product stream." : "\n" + actualName + " Out not connected.";
                        }
                        break;
                    }
                    if (cells[i].parent.style.indexOf("desalter") >= 4 && ((cells[i].edges == null) || (cells[i].edges == [] || (cells[i].edges != null && cells[i].edges.length <= 0)))) {
                        emptyDesalterOutPorts += 1;
                        if (emptyDesalterOutPorts == 1) {
                            detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no product stream." : "\n" + actualName + " has no product stream.";
                        }
                        break;
                    }
                    if (cells[i].parent.style.indexOf("flash") >= 4 && ((cells[i].edges == null) || (cells[i].edges == [] || (cells[i].edges != null && cells[i].edges.length <= 0)))) {
                        emptyFlashDrumOutPorts += 1;
                        if (emptyFlashDrumOutPorts == 2) {
                            detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no product stream." : "\n" + actualName + " has no product stream.";
                        }
                        break;
                    }
                    if (cells[i].parent.style.indexOf("heater") >= 4 && ((cells[i].edges == null) || (cells[i].edges == [] || (cells[i].edges != null && cells[i].edges.length <= 0)))) {
                        emptyHeaterOutPorts += 1;
                        if (emptyHeaterOutPorts == 1) {
                            detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no product stream." : "\n" + actualName + " Out not connected.";
                        }
                        break;
                    }
                    if (cells[i].parent.style.indexOf("exchanger") >= 4 && ((cells[i].edges == null) || (cells[i].edges == [] || (cells[i].edges != null && cells[i].edges.length <= 0)))) {
                        if (cells[i].typePort == "Shell") {
                            emptyExchangerShellOutPorts += 1;
                            if (emptyExchangerShellOutPorts == 1) {
                                detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no product stream." : "\n" + actualName + " Shell Out not connected.";
                            }
                        }
                        else if (cells[i].typePort == "Tube") {
                            emptyExchangerTubeOutPorts += 1;
                            if (emptyExchangerTubeOutPorts == 1) {
                                detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no product stream." : "\n" + actualName + " Tube Out not connected.";
                            }
                        }
                        break;
                    }
                    if (cells[i].parent.style.indexOf("kettleReboiler") >= 4 && ((cells[i].edges == null) || (cells[i].edges == [] || (cells[i].edges != null && cells[i].edges.length <= 0)))) {
                        if (cells[i].typePort == "Shell") {
                            emptyReboilerShellOutPorts += 1;
                            if (emptyReboilerShellOutPorts == 1) {
                                detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no product stream." : "\n" + actualName + " Shell Out not connected.";
                            }
                        }
                        else if (cells[i].typePort == "Tube") {
                            emptyReboilerTubeOutPorts += 1;
                            if (emptyReboilerTubeOutPorts == 1) {
                                detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no product stream." : "\n" + actualName + " Tube Out not connected.";
                            }
                        }
                        break;
                    }
                    if (cells[i].parent.style.indexOf("mixer") >= 4 && ((cells[i].edges == null) || (cells[i].edges == [] || (cells[i].edges != null && cells[i].edges.length <= 0)))) {
                        emptyMixerOutPorts += 1;
                        if (emptyMixerOutPorts == 1) {
                            emptyMixerOutPorts += "\n" + actualName + " has no product stream.";
                        }
                        break;
                    }
                    if (cells[i].parent.style.indexOf("other") >= 4 && ((cells[i].edges == null) || (cells[i].edges == [] || (cells[i].edges != null && cells[i].edges.length <= 0)))) {
                        emptyOtherOutPorts += 1;
                        if (emptyOtherOutPorts == 1) {
                            detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no product stream." : "\n" + actualName + " has no product stream.";
                        }
                        break;
                    }
                    if (cells[i].parent.style.indexOf("pump") > 3 && ((cells[i].edges == null) || (cells[i].edges == [] || (cells[i].edges != null && cells[i].edges.length <= 0)))) {
                        emptyPumpOutPorts += 1;
                        if (emptyPumpOutPorts == 1) {
                            detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no product stream." : "\n" + actualName + " Out not connected.";
                        }
                        break;
                    }
                    if (cells[i].parent.style.indexOf("splitter") >= 4 && ((cells[i].edges == null) || (cells[i].edges == [] || (cells[i].edges != null && cells[i].edges.length <= 0)))) {
                        //debugger;
                        emptySplitterOutPorts += 1;
                        if (emptySplitterOutPorts == 2) {
                            detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no product stream." : "\n" + actualName + " has fewer than 2 product streams.";
                        }
                        break;
                    }
                    break;

                case "FeedStream":
                    if (cells[i].target == null && cells[i].source == null) {
                        emptyFeeds += 1;
                        detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no feed stream." : "\n" + actualName + " not connected to a unit.";
                    }
                    break;

                case "Empty":
                    if (cells[i].target == null && cells[i].source == null) {
                        emptyFeeds += 1;
                        detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no stream." : "\n" + actualName + " not connected to a unit.";
                    }
                    break;

                case "ProductStream":
                    if (cells[i].target == null && cells[i].source == null) {
                        emptyProducts += 1;
                        detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no product stream." : "\n" + actualName + " not connected to a unit.";
                    }
                    break;

                case "InternalStream":
                    if (cells[i].target == null && cells[i].source == null) {
                        emptyInternal += 1;
                        detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no stream." : "\n" + actualName + " not connected to a unit.";
                    }
                    break;
                case "StreamName":
                    if (cells[i].parent.target == null && cells[i].parent.source == null) {
                        emptyFeeds += 1;
                        detailedInformation += (actualName == null || actualName == '') ? "\n" + cells[i].parent.name + " has no feed stream." : "\n" + actualName + " not connected to a unit.";
                    }
                    break;
            }
        }
    }

    if (detailedInformation == "" && cells != null && Object.values(cells).length > 2) {
        let arrReturned = [true, "Connectivity Complete!", ""];
        return arrReturned;
    }
    else {
        let arrReturned = [false, "Connectivity Incomplete!", detailedInformation];
        return arrReturned;
    }
};

GraphEditor.prototype.setTagNamePosition = function (cell, child) {
    let type = "";

    let controller = null;

    if (cell.style.indexOf(";") > 0)
        type = cell.style.split(';')[0];

    switch (type) {
        case "accumulator":
            controller = new AccumulatorController();
            break;
        case "exchanger":
            controller = new HeatExchangerController();
            break;
        case "splitter":
            controller = new SplitterController();
            break;
        case "pump":
            controller = new PumpController();
            break;
        case "other":
            controller = new OtherController();
            break;
        case "mixer":
            controller = new MixerController();
            break;
        case "kettleReboiler":
            controller = new KettleReboilerController();
            break;
        case "heater":
            controller = new HeaterController();
            break;
        case "flash":
            controller = new FlashDrumController();
            break;
        case "desalter":
            controller = new DesalterController();
            break;
        case "cooler":
            controller = new CoolerController();
            break;
        case "columnTop":
            controller = new ColumnTopController();
            break;
        case "column":
            controller = new ColumnController();
            break;
        case "airCooler":
            controller = new AirCoolerController();
            break;
    }

    if (controller != null) {
        controller.tagNamePosition(cell);
        childName.setVisible(true);
    }
};

GraphEditor.prototype.keepWithUnit = function (cell, evt) {
    keep(cell, evt);
};

GraphEditor.prototype.snapToGrid = function (event) {

    graph.getSelectionModel().addListener(mxEvent.CHANGE, function (sender, evt) {

        let cells = sender.cells;
        let units = [];

        if (mxEvent.isControlDown(evt.getEvent()) && !mxEvent.isShiftDown(evt.getEvent()) && cells.length > 1) {
            for (let i = 0; i < cells.length; i++) {
                if (cells[i].style.includes("unit;")) {
                    units.push(cells[i]);
                }
            }

            if (units.length > 1) {

                align(units);
            }
        }
    });
};