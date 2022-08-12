//import { stencilRegistry }  from './utils/registry.js';

ViewContainer = function() {
    try{
        let body = this.newBody();

        if (body == null || body == undefined) {
            body = this.newBody();
        }

        body.innerHTML = this.createContent();
        body.classList.add("viewMode");
        body.classList.remove("editMode");
        
        container = document.querySelector(".graphBackground");   
        
        graph = new GraphModel(container);
    
        // this.open('', xml);
        // this.castToViewModel();

        initStyles();
    
        this.disableMenu();
        graph.setAutoSizeCells(false);
        graph.setCellsResizable(false);
        defaultSize();
        
    
        zoomWheeling();
       
        
        this.setkeyboardShortcut();
        
        container.focus();
    }
    catch(e)
    {
        // alert('ViewContainer => ' + e);
    }
    
    // graph.view.setScale(graphView.scale);
    // container.scrollLeft = graphView.scrollLeft;
    // container.scrollLeft = graphView.scrollTop;
}; 

ViewContainer.prototype.newBody = function() 
{
    let graph = document.querySelector('.graph-component');
    
    if (graph != undefined) 
        graph.remove('graph-component');

    return document.body;
};

ViewContainer.prototype.createContent = function()
{    
    return `
        <div class="graph-component">
            <div class="contentContainer">
                <div class="graphContainer">
                    <div class="graphBackground">
                    </div>        
                </div>     
            </div>
        </div>`;
};

ViewContainer.prototype.open = function(systemSetupJsonFromApp, xmlFromApp, grahpViewJson) 
{
    try
    {
        if(xmlFromApp != null)
        {
            let doc = mxUtils.parseXml(xmlFromApp);
            let codec = new mxCodec(doc);
            codec.decode(doc.documentElement, graph.getModel());
            XMLOpened = xmlFromApp;
            containerOpened.castToViewModel();
        }
        
        if(systemSetupJsonFromApp != null && systemSetupJsonFromApp != '')
        {
            let arr_from_json = JSON.parse(systemSetupJsonFromApp);
            jsonSystemSetup = arr_from_json;
        }
    }
    catch (e)
    {
        // alert('ViewContainer open => ' + e);
    }

    if(grahpViewJson != undefined && grahpViewJson != null && grahpViewJson != '')
    {
        let graphViewRequest = JSON.parse(grahpViewJson);
        graphView.scale = graphViewRequest.scale;
        graphView.scrollLeft = graphViewRequest.scrollLeft;
        graphView.scrollTop = graphViewRequest.scrollTop;
    }

    if(graphView.scrollTop != 0 && graphView.scrollLeft != 0)
    {
        graph.view.setScale(graphView.scale);
        container.scrollLeft = graphView.scrollLeft;
        container.scrollTop = graphView.scrollTop;
    }
    else
    {
        centre();
    }
    
    container.focus();
};

ViewContainer.prototype.castToViewModel = function(needZoom) 
{
    let cells = graph.getModel().cells;

    Object.values(cells).forEach(cell => {
        if(cell != null && cell.id != '0' && cell.id != '1' && cell.parent != null)
        {
            if (cell != null &&
                cell.edges == undefined &&
                cell.geometry != undefined &&
                (cell.type == "PortOut" || cell.type == "PortIn")) { 
                
                cell.geometry.width = 0;
                cell.geometry.height = 0;
            }
            else if (cell != null &&
                    cell.geometry != undefined &&
                    cell.style.includes("direction=east") &&
                    cell.type == "PortOut"
                    && (cell.parent.style.toLowerCase().indexOf("rotation=90") > 1 || cell.parent.style.toLowerCase().indexOf("rotation=-90") > 1)) {
                
                    cell.geometry.width = 0;
                    cell.geometry.height = 0;
                    cell.geometry.offset.x = 6;
                    cell.geometry.offset.y = 1;
            }
            else if (cell != null &&
                    cell.geometry != undefined &&
                    cell.style.includes("direction=north") &&
                    cell.type == "PortOut" &&
                    (cell.parent.style.toLowerCase().indexOf("rotation=90") > 1 || cell.parent.style.toLowerCase().indexOf("rotation=-90")) > 1) {	
                
                    cell.geometry.width = 0;
                    cell.geometry.height = 0;
                    cell.geometry.offset.x = -1;
                    cell.geometry.offset.y = 7;		
            }
            else if (cell != null &&
                    cell.geometry != undefined &&
                    cell.style.includes("direction=south") &&
                    cell.type == "PortOut" &&
                    (cell.parent.style.toLowerCase().indexOf("rotation=90") > 1 || cell.parent.style.toLowerCase().indexOf("rotation=-90") > 1)) {	
                
                    cell.geometry.width = 0;
                    cell.geometry.height = 0;
                    cell.geometry.offset.x = -2;
                    cell.geometry.offset.y = 6.5;		
            }
            else if (cell != null &&
                    cell.geometry != undefined &&
                    cell.style.includes("direction=west") &&
                    cell.type == "PortOut"
                    && (cell.parent.style.toLowerCase().indexOf("rotation=90") > 1 || cell.parent.style.toLowerCase().indexOf("rotation=-90") > 1)) {
                
                    cell.geometry.width = 0;
                    cell.geometry.height = 0;
                    cell.geometry.offset.x = 6.5;
                    cell.geometry.offset.y = -1;
            }
            else if (cell != null &&
                    cell.geometry != undefined &&
                    cell.style.includes("direction=east") &&
                    cell.type == "PortOut") {
                
                    cell.geometry.width = 0;
                    cell.geometry.height = 0;
                    cell.geometry.offset.x = -3;
                    cell.geometry.offset.y = 7.5;
            }
            else if (cell != null &&
                    cell.geometry != undefined &&
                    cell.style.includes("direction=north") &&
                    cell.type == "PortOut") {	
                
                    cell.geometry.width = 0;
                    cell.geometry.height = 0;
                    cell.geometry.offset.x = 6.5;
                    cell.geometry.offset.y = 2;		
            }
            else if (cell != null &&
                    cell.geometry != undefined &&
                    cell.style.includes("direction=south") &&
                    cell.type == "PortOut") {
                
                    cell.geometry.width = 0;
                    cell.geometry.height = 0;
                    cell.geometry.offset.x = 6.5;
                    cell.geometry.offset.y = -2;
            }
            else if (cell != null &&
                    cell.geometry != undefined &&
                    cell.style.includes("direction=west") &&
                    cell.type == "PortOut") {
                
                    cell.geometry.width = 0;
                    cell.geometry.height = 0;
                    cell.geometry.offset.x = 16;
                    cell.geometry.offset.y = 6;
            }
        }
    });
    
    if(needZoom == null || (needZoom != null && needZoom == true))
    {
        //zoomOut();
        //zoomOut();
    }

    self = this;
    let editor = new mxEditor()
    editor.graph = graph;
    
    // graph.popupMenuHandler.factoryMethod = function(menu, cell, evt)
    // {
    //     self.createPopupMenuRightClick(editor, menu, cell, evt);
    // };

    graph.setCellsEditable(false);
    graph.setCellsLocked(true);
    graph.setCellsSelectable(false);

    graph.refresh();

};

ViewContainer.prototype.castToEditModel = function() {
    let cells = graph.getModel().cells;

    Object.values(cells).forEach(cell => 
    {
        if(cell != null && cell.id != '0' && cell.id != '1')
        {
            if (cell != null &&
                cell.edges == undefined &&
                cell.geometry != undefined &&
                (cell.type == "PortOut" || cell.type == "PortIn")) 
            { 
                
                cell.geometry.width = 14;
                cell.geometry.height = 14;
            }	
            else if (cell != null &&
                cell.geometry != undefined &&
                cell.style.includes("direction=east") &&
                cell.type == "PortOut") 
            {
                cell.geometry.width = 14;
                cell.geometry.height = 14;
                cell.geometry.offset.x = 0;
                cell.geometry.offset.y = 0;
            }
            else if (cell != null &&
                cell.geometry != undefined &&
                cell.style.includes("direction=north") &&
                cell.type == "PortOut") 
            {	
            
                cell.geometry.width = 14;
                cell.geometry.height = 14;
                cell.geometry.offset.x = 0;

                if(cell.parent.style.includes("rotation=-90"))
                {
                    cell.geometry.offset.y = 0;	
                }
                else
                {
                    cell.geometry.offset.y = -16;	
                }	
            }	
            else if (cell != null &&
                cell.geometry != undefined &&
                cell.style.includes("direction=south") &&
                cell.type == "PortOut") 
            {
            
                cell.geometry.width = 14;
                cell.geometry.height = 14;
                cell.geometry.offset.x = 0;
                cell.geometry.offset.y = 3;
            }
            else if (cell != null &&
                cell.geometry != undefined &&
                cell.style.includes("direction=west") &&
                cell.type == "PortOut") 
            {
                cell.geometry.width = 14;
                cell.geometry.height = 14;
                cell.geometry.offset.x = 0;
                cell.geometry.offset.y = 0;
            }
        }
    });

    graph.refresh();   
};

ViewContainer.prototype.createPopupMenuRightClick = function (editor, graphEditor, menu, cell, evt)
{
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
    else if ((cell.style.includes("unit") || cell.style.includes("unitName")) && (App.application == 0)) 
    {
        if (cell.style.includes("unitName")) {
            cell = cell.parent.geometry != null ? cell.parent : cell.source;
        }

        if(App.app == 0 && App.action == 'view')
        {
            menuMonitor(cell, menu);
        }

        menuGeneral(cell, 'unit', menu);
    }
    else if ((cell.edge || cell.style.includes("streamName")) && (App.application == 0)) 
    {
        if (cell.style.includes("streamName") && parseInt(cell.parent.id) != 1) {
            cell = cell.parent;
        }
        else if (cell.style.includes("streamName") && parseInt(cell.parent.id) == 1) {
            cell = cell.source;
        }

        menu.addItem('View Results', '', 'G', function () {
            graphEditor.toggleBackgruondGrid();
        });

        menu.addSeparator();

        menuGeneral(cell, 'stream', menu);
    }
    else 
    {
        rename(cell);
    }
};

ViewContainer.prototype.disableMenu = function() {
    
    if (document.addEventListener) {
        document.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        }, false);
    } else {
        document.attachEvent('oncontextmenu', function () {
            window.event.returnValue = false;
        });
    }
    
    document.addEventListener('mousedown', function(evt) {
        graph.popupMenuHandler.hideMenu();
        updateGraphView();
    });

    graph.popupMenuHandler.factoryMethod = function(menu, cell, evt)
    {
        ViewContainer.prototype.createPopupMenuRightClick(editor, graphEditor, menu, cell, evt);
    };
};

ViewContainer.prototype.save = function() 
{
    try
    {
        updateGraphView();
        ViewContainer.prototype.castToEditModel();
    
        let encoder = new mxCodec();
        let node = encoder.encode(graph.getModel());
        let contentXml = mxUtils.getPrettyXml(node);
    
        let pfdData = new PFDData(contentXml, graphView);
    
        // actreneBase.updateSystemSetupJson();
        
        ///?validar por que quando dar o save pela aplicação vem como objeto.
        let jsonString = jsonSystemSetup;
        if(typeof jsonString != "string") {
            jsonString = JSON.stringify(jsonSystemSetup);
        }
        
        // callbackObj.systemSetupGetPFD(jsonString, JSON.stringify(pfdData));
        
        ViewContainer.prototype.castToViewModel(false);

        return JSON.stringify({ IndexIdsNames: jsonString, XML: JSON.stringify(pfdData)});
    }
    catch(e)
    {
        // alert('ViewContainer save => ' + e);
        return null;
    }
};

ViewContainer.prototype.saveFromAcb = function() 
{
    try
    {
        updateGraphView();
        ViewContainer.prototype.castToEditModel();
    
        let encoder = new mxCodec();
        let node = encoder.encode(graph.getModel());
        let contentXml = mxUtils.getPrettyXml(node);

        let pfdData = new PFDData(contentXml, graphView);

        // actreneBase.updateSystemSetupJson();

        ///?validar por que quando dar o save pela aplicação vem como objeto.
        let jsonString = jsonSystemSetup;
        if(typeof jsonString != "string") {
            jsonString = JSON.stringify(jsonSystemSetup);
        }

        callbackObj.systemSetupGetPFD(jsonString, JSON.stringify(pfdData), false);

        ViewContainer.prototype.castToViewModel(false);
    }
    catch(e)
    {
        // alert('ViewContainer save => ' + e);
        return null;
    }
};

ViewContainer.prototype.sendNamesToEdit = function(value, id) 
{
    let tagname = {id: id, name: value};

    listOfChangedNames.push(tagname);
};

ViewContainer.prototype.setkeyboardShortcut = function (key) 
{
    let listenerView = localStorage.getItem('listenerView');

    if((listenerView == undefined && listenerView == null) || (listenerView != undefined && listenerView != null && listenerView == "false"))
    {
        document.body.addEventListener("keydown", keysPressed, true);
        document.body.addEventListener("keyup", keysReleased, true);
        localStorage.removeItem('listenerView');
        localStorage.setItem('listenerView','true');
    }

    var keys = [];

    function keysPressed(event) {
        // store an entry for every key pressed
        keys[event.keyCode] = true;
         
        //validate if have modal opened
        let modalOpened = null;

        modalOpened =  document.querySelector(".modal-class");

        if((modalOpened == undefined || modalOpened == null) && App.action == 'view')
        {
            event.preventDefault();
            let menuSelector = document.getElementsByClassName('menu-item onclick-menu');
            
            if (keys[116] && !mxEvent.isAltDown(event) && !mxEvent.isControlDown(event) && !mxEvent.isShiftDown(event)) {
                // redraw();
            }
            else if (keys[82] && !mxEvent.isAltDown(event) && mxEvent.isControlDown(event) && !mxEvent.isShiftDown(event)) {
                // redraw();
            }
            else if (keys[82] && !mxEvent.isAltDown(event) && mxEvent.isControlDown(event) && mxEvent.isShiftDown(event)) {
                // redraw();
            }
            else if (keys[116] && !mxEvent.isAltDown(event) && mxEvent.isControlDown(event) && !mxEvent.isShiftDown(event)) {
                // redraw();
            }
            else if (keys[70] && !mxEvent.isAltDown(event) && !mxEvent.isControlDown(event) && !mxEvent.isShiftDown(event)) {
                //f
                graph.fit(20, false, 0);
                centre();
            }
            else if (keys[73] && !mxEvent.isAltDown(event) && !mxEvent.isControlDown(event) && !mxEvent.isShiftDown(event)) {
                //i
                zoomIn();
            }
            else if (keys[79] && !mxEvent.isAltDown(event) && !mxEvent.isControlDown(event) && !mxEvent.isShiftDown(event)) {
                //o
                zoomOut();
            }
            else if (keys[67] && !mxEvent.isAltDown(event) && !mxEvent.isControlDown(event) && !mxEvent.isShiftDown(event)) {
                //c
                centre();
            }
            else if (keys[72] && mxEvent.isAltDown(event)) {
                //alt + h
                callbackObj.openHelpModal(29);
            }
            // else if (keys[77] && mxEvent.isControlDown(event)) 
            // {
            // }
        }
    };

    function keysReleased(e) {
        // // mark keys that were released
        // keys[e.keyCode] = false;
        keys = [];
    };
};