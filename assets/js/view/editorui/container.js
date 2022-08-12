var model;
var container;
var sideBar;
var toolBar;
var menu;

var networkModel = null;
var color;

var spaceKeyPressed = false;
var confirmDeletions;

var undoManager;
var undoManagerStack = [];
var rubberband;
var keyHandler;

var editor;
var graphEditor;

var streamsToKeepWithUnits = [];
var keepingUnint = false;

var graphComponent;

EditorContainer = function () {
    try {
        let body = document.querySelector("body");

        if (body == null || body == undefined) {
            body = this.newBody();
        }

        body.innerHTML = this.createContent();
        body.classList.add("editMode");
        body.classList.remove("viewMode");

        container = document.querySelector(".graphBackground");

        editor = new mxEditor();
        model = new mxGraphModel();
        graph = new GraphModel(container, model);
        // graph.init(container);

        graph.panningHandler.useLeftButtonForPanning = false;
        graph.panningHandler.popupMenuHandler = false;
        graph.panningHandler.ignoreCell = true;
        graph.graphHandler.scaleGrid = true;
        graph.centerZoom = true;
        graph.dropEnabled = true;

        new mxDivResizer(container);

        graph.rubberband = new mxRubberband(graph);
        graph.rubberband.enabled = false;

        graph.setPanning(true);
        graph.setConnectable(true);
        graph.setPortsEnabled(true);
        graph.setDisconnectOnMove(false);
        graph.dropEnabled = true;
        graph.foldingEnabled = false;
        graph.recursiveResize = true;

        editor.graph = graph;

        initStyles();

        menu = this.createMenu();
        toolBar = this.createToolbar();
        sideBar = this.createSidebar();
        graphEditor = this.createGraph();

        this.setkeyboardShortcut();

        mxGraphHandler.prototype.guidesEnabled = true;
        mxGraphHandler.prototype.scaleGrid = true;

        this.showHideGrid();
        this.showHideTools();
        this.checkConnectivity(true);
        this.disableMenu();

        graph.setAutoSizeCells(false);
        graph.setCellsResizable(false);
        defaultSize();
        centre();

        graph.setDropEnabled(false);

        graph.setAllowDanglingEdges(true);

        /* document.addEventListener('keydown', (event) => {
            if (event.keyCode == 13) {
                if (document.getElementById("btn-ok") != null) {
                    if (document.getElementById("btn-ok") == document.activeElement ||
                        document.activeElement.localName != "button") {
                        document.getElementById("btn-ok").click();
                    }
                }
            } else if (event.keyCode == 27) {
                if (document.getElementById("btn-cancel") != null) {
                    document.getElementById("btn-cancel").click();
                }
            }
        }); */

        container.focus();
        graphEditor.resetUndoListener();
        undoManagerStack = [];
        
        confirmDeletions = (confirmDeletions == null) ? true : confirmDeletions;
        
        if (confirmDeletions) {
            let confirm = document.getElementById('confirm');
            confirm.classList.add("checked");
        }
        else {
            let confirm = document.getElementById('confirm');
            confirm.classList.remove("checked");
        }
    }
    catch (e) {
        // alert('EditorContainer => ' + e);
    }
};

EditorContainer.prototype.newBody = function () {
    let graph = document.querySelector('.graph-component');

    if (graph != undefined)
        document.body.remove('graph-component');

    return document.body;
};

EditorContainer.prototype.createContent = function () {
    return `
    <div class="graph-component">
        <div class="top-menu">
            <div class="toolbarContainer" style="display: none;"></div>
            <div class="menuContainer"></div>
        </div>

        <div class="contentContainer">
            <!-- Creates a container for the outline
            <div id="outlineContainer"
                style="z-index:1;position:absolute;overflow:hidden;top:0px;right:0px;width:160px;height:120px;background:transparent;border-style:solid;border-color:lightgray;">
            </div> -->
            <div class="graphContainer">
                <div class="graphBackground">
                </div>        
            </div>        
            <div class="sideContainer"></div>
        </div>
    </div>`;
};

EditorContainer.prototype.showHideTools = function () {
    let $buttonContent = document.createElement('button');
    mxUtils.write($buttonContent, 'Toolbox');
    $buttonContent.classList.add('btn', 'btn-secondary', 'tools-btn');
    let content = document.querySelector(".contentContainer");

    mxEvent.addListener($buttonContent, 'click', function () {
        sideBar.showHideTools();
    });
    content.appendChild($buttonContent);
};

EditorContainer.prototype.showHideGrid = function () {
    let $buttonContent = document.createElement('button');
    mxUtils.write($buttonContent, 'Show/Hide Grid');
    $buttonContent.classList.add('btn', 'btn-secondary', 'grid-btn');
    let content = document.querySelector(".contentContainer");

    mxEvent.addListener($buttonContent, 'click', function () {
        graphEditor.toggleBackgruondGrid();
    });
    content.appendChild($buttonContent);
};

EditorContainer.prototype.checkConnectivity = function (showModal) {
    let content = document.querySelector(".contentContainer");
    let $buttonContent = document.getElementById("btnCheckConnectivity");

    if ($buttonContent == null) {
        $buttonContent = document.createElement('button');
        $buttonContent.id = "btnCheckConnectivity";
        mxUtils.write($buttonContent, 'Connectivity Incomplete!');
        $buttonContent.classList.add('btn', 'connectivity', 'check-btn');

        mxEvent.addListener($buttonContent, 'click', function () {
            containerOpened.checkConnectivityModalCreate($buttonContent, showModal);
        });

        content.appendChild($buttonContent);
    }
};

EditorContainer.prototype.checkConnectivityModalCreate = function ($buttonContent, showModal) {
    if ($buttonContent == null) {
        //let content = document.querySelector(".contentContainer");
        $buttonContent = document.getElementById("btnCheckConnectivity");
    }

    let result = graphEditor.checkConnectivity(true);
    //let print = result[1] + "\n" + result[2];
    //mxUtils.popup(print, true);

    let contentReplaced = result != undefined ? result[2].replace(/\n/g, '<br>') : null;

    let typeM = 'warning';
    if(contentReplaced != null)
    {
        if (result[1].indexOf("Incomplete") > 0) {
            typeM = 'warning';
            $buttonContent.classList.remove('checked');
        } else {
            typeM = 'checked';
            $buttonContent.classList.add('checked');
        }
    }

    $buttonContent.innerHTML = result[1];

    if (showModal) {
        let subModal = new Modal();
        let content = subModal.createModalAlertMessage(result[1], contentReplaced, typeM);

        let subContent = subModal.createContent(content);
        subModal.open();
        subContent.querySelector("#btn-ok").focus();
        subContent.querySelector("#btn-ok").onclick = () => {
            document.querySelectorAll('.modal')[0].remove();
            //document.querySelector('#unit').focus()                     
        };

        subContent.addEventListener('keydown', (event) => {
            event.preventDefault();
            if (event.keyCode == 13) {
                subContent.querySelector("#btn-ok").click();
            } else if (event.keyCode == 27) {
                subContent.querySelector("#btn-ok").click();
            }
        });
    }
    //alert(result[1] + "\n" + result[2]);
};

EditorContainer.prototype.createMenu = function () {
    return new Menu();
};

EditorContainer.prototype.createToolbar = function () {
    return new Toolbar();
};

EditorContainer.prototype.createSidebar = function () {
    return new Sidebar();
};

EditorContainer.prototype.createGraph = function () {
    return new GraphEditor();
};

EditorContainer.prototype.open = function (systemSetupJsonFromApp, xmlFromApp, grahpViewJson) {
    graph.getModel().beginUpdate();
    try {
        if (systemSetupJsonFromApp != null) {
            let arr_from_json = JSON.parse(systemSetupJsonFromApp);
            jsonSystemSetup = arr_from_json;
        }
    }
    catch (e) {
        // alert('EditorContainer open => ' + e);
    }

    try {
        //graphEditor.redraw();
        var xml = null;
        if (xmlFromApp != null) {
            XMLOpened = xmlFromApp;
            xml = xmlFromApp;
            let doc = mxUtils.parseXml(xmlFromApp);
            this.setGraphXml(doc.documentElement);
        }
        else {
            let doc = mxUtils.load('assets/xml/model.xml');
            xml = doc.getDocumentElement();
            this.setGraphXml(xml);
        }

        XMLInitialOpened = xml;
    }
    catch (e) {
        // alert('EditorContainer open 2 => ' + e);
    }

    if (grahpViewJson != null && grahpViewJson != '') {
        let graphViewRequest = JSON.parse(grahpViewJson);
        graphView.scale = graphViewRequest.scale;
        graphView.scrollLeft = graphViewRequest.scrollLeft;
        graphView.scrollTop = graphViewRequest.scrollTop;
    }

    containerOpened.getNamesToEdit();

    if (App.action == 'edit') 
    {
        undoManagerStack = [];
        containerOpened.checkConnectivityModalCreate(null, false);
        // editor.undoManager = graphEditor.createUndoManager();
        // graphEditor.resetUndoListener();
        removeDuplicateddhildren();
        container.focus();
        container.click();
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

    graph.getModel().endUpdate();
};

EditorContainer.prototype.setGraphXml = function (node) {

    if (node != null) {
        let dec = new mxCodec(node.ownerDocument);

        if (node.nodeName == 'mxGraphModel') {
            try {
                // graph.getModel().beginUpdate();
    
                dec.decode(node, graph.getModel());
            }
            finally {
                // graph.getModel().endUpdate();
            }

            graph.fireEvent(new mxEventObject('resetGraphView'));
        }
        else if (node.nodeName == 'root') {
            this.resetGraph();

            // Workaround for invalid XML output in Firefox 20 due to bug in mxUtils.getXml
            let wrapper = dec.document.createElement('mxGraphModel');
            wrapper.appendChild(node);

            dec.decode(wrapper, this.graph.getModel());
            this.updateGraphComponents();
            graph.fireEvent(new mxEventObject('resetGraphView'));
        }
        else {
            throw {
                message: mxResources.get('cannotOpenFile'),
                node: node,
                toString: function () { return this.message; }
            };
        }
    }
    else {
        this.resetGraph();
        graph.getModel().clear();
        graph.fireEvent(new mxEventObject('resetGraphView'));
    }
};

EditorContainer.prototype.disableMenu = function () {

    if (document.addEventListener) {
        document.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        }, false);
    } else {
        document.attachEvent('oncontextmenu', function () {
            window.event.returnValue = false;
        });
    }

    // document.addEventListener('mousedown', function(evt) {
    //     graph.popupMenuHandler.hideMenu();
    // });

    graph.popupMenuHandler.factoryMethod = function (menu, cell, evt) {
        graphEditor.createPopupMenuRightClickAc(editor, graphEditor, menu, cell, evt);
    };
};

EditorContainer.prototype.getNamesToEdit = function () {
    try {
        let cells = graph.getModel().cells;

        for (let i in listOfChangedNames) {
            for (let j in cells) {
                if (cells[j].id == listOfChangedNames[i].id) {
                    cells[j].value = listOfChangedNames[i].name;
                    graph.updateCellSize(cells[j]);
                    cells[j].setVisible(true);
                }
            }
        }
    }
    catch(e)
    {
        console.log(e);
    }
    finally {
    }
};

EditorContainer.prototype.setkeyboardShortcut = function (key) {
    let listenerEdit = localStorage.getItem('listenerEdit');

    if ((listenerEdit == undefined && listenerEdit == null) || (listenerEdit != undefined && listenerEdit != null && listenerEdit == "false")) {
        document.body.addEventListener("keydown", keysPressed, true);
        document.body.addEventListener("keyup", keysReleased, true);
        localStorage.removeItem('listenerEdit');
        localStorage.setItem('listenerEdit', 'true');
    }

    var keys = [];

    function keysPressed(event) {
        // store an entry for every key pressed

        //validate if have modal opened
        let modalOpened = null;

        modalOpened = document.querySelector(".modal-class");

        if ((modalOpened == undefined || modalOpened == null) && App.action == 'edit') {
            event.preventDefault();
            keys[event.keyCode] = true;
            let menuSelector = document.getElementsByClassName('menu-item onclick-menu');

            if (keys[116] && !mxEvent.isAltDown(event) && !mxEvent.isControlDown(event) && !mxEvent.isShiftDown(event)) {
                redraw();
            }
            if (keys[82] && !mxEvent.isAltDown(event) && mxEvent.isControlDown(event) && !mxEvent.isShiftDown(event)) {
                // redraw();
            }
            if (keys[82] && !mxEvent.isAltDown(event) && mxEvent.isControlDown(event) && mxEvent.isShiftDown(event)) {
                // redraw();
            }
            if (keys[116] && !mxEvent.isAltDown(event) && mxEvent.isControlDown(event) && !mxEvent.isShiftDown(event)) {
                // redraw();
            }
            if (keys[73] && !mxEvent.isAltDown(event) && !mxEvent.isControlDown(event) && !mxEvent.isShiftDown(event)) {
                //i
                editor.execute('zoomIn');
            }
            if (keys[84] && !mxEvent.isAltDown(event) && !mxEvent.isControlDown(event) && !mxEvent.isShiftDown(event)) {
                //T
                sideBar.showHideTools();
            }
            else if (keys[70] && keys[83] && mxEvent.isAltDown(event)) {
                //alt + f + s
                menu.save();
            }
            else if (keys[70] && keys[69] && mxEvent.isAltDown(event)) {
                //alt + f + e
                mxUtils.printScreen();
            }
            else if (keys[70] && keys[67] && mxEvent.isAltDown(event)) {
                //alt + f + c
                menu.abandon();
            }
            else if (keys[69] && keys[85] && mxEvent.isAltDown(event)) {
                //alt + e + u
                graphEditor.undo();
            }
            else if (keys[69] && keys[68] && mxEvent.isAltDown(event)) {
                //alt + e + d
                editor.execute('delete');
            }
            else if (keys[68] && keys[67] && mxEvent.isAltDown(event)) {
                //alt + d + c
                containerOpened.checkConnectivity(true);
            }
            else if (keys[68] && keys[82] && mxEvent.isAltDown(event)) {
                //alt + d + r
                redraw();
            }
            else if (keys[86] && keys[73] && mxEvent.isAltDown(event)) {
                //alt + v + i
                editor.execute('zoomIn');
            }
            else if (keys[86] && keys[79] && mxEvent.isAltDown(event)) {
                //alt + v + o
                editor.execute('zoomOut');
            }
            else if (keys[86] && keys[78] && mxEvent.isAltDown(event)) {
                //alt + v + n
                graph.zoomActual();
            }
            else if (keys[86] && keys[70] && mxEvent.isAltDown(event)) {
                //alt + v + f
                graph.fit(20, false, 0);
                centre();
            }
            else if (keys[86] && keys[67] && mxEvent.isAltDown(event)) {
                //alt + v + c
                centre();
            }
            else if (keys[86] && keys[72] && mxEvent.isAltDown(event)) {
                //alt + v + h
                showHideAllNames();
            }
            else if (keys[86] && keys[85] && mxEvent.isAltDown(event)) {
                //alt + v + u
                showHideAllUnitNames();
            }
            else if (keys[86] && keys[69] && mxEvent.isAltDown(event)) {
                //alt + v + e
                showHideStreamNames();
            }
            else if (keys[86] && keys[82] && mxEvent.isAltDown(event)) {
                //alt + v + r
                showHideOtherStreamNames();
            }
            else if (keys[86] && keys[84] && mxEvent.isAltDown(event)) {
                //alt + v + t
                sideBar.showHideTools();
            }
            else if (keys[83] && keys[68] && mxEvent.isAltDown(event)) {
                //alt + s + d
                confirmDeletions = !confirmDeletions;
                let confirmLi = document.querySelector("#confirm");
                if (confirmDeletions) {
                    confirmLi.classList.add("checked");
                }
                else {
                    confirmLi.classList.remove("checked");
                }
            }
            else if (keys[83] && keys[65] && mxEvent.isAltDown(event)) {
                //alt + s + a
                if (App.app == 0) {
                    autoname(autonameMonitor);
                }
                else if (App.app == 1) {
                    autoname(autonamePathfinder);
                }
                else if (App.app == 2) {
                    autoname(autonameActrene);
                }
            }
            else if (mxEvent.isAltDown(event) && keys[115]) {
                //alt + f4
                // alert('save and return');
                menu.save();
            }
            else if (keys[46]) {
                editor.execute('delete');
                // graph.removeCells();
            }
            else if (keys[90] && mxEvent.isControlDown(event)) {
                //ctrl + z
                graphEditor.undo();
            }
            else if (keys[70] && !mxEvent.isAltDown(event) && !mxEvent.isControlDown(event) && !mxEvent.isShiftDown(event)) {
                //f
                graph.fit(20, false, 0);
                centre();
            }
            else if (keys[73] && !mxEvent.isAltDown(event) && !mxEvent.isControlDown(event) && !mxEvent.isShiftDown(event)) {
                //i
                editor.execute('zoomIn');
            }
            else if (keys[79] && !mxEvent.isAltDown(event) && !mxEvent.isControlDown(event) && !mxEvent.isShiftDown(event)) {
                //o
                editor.execute('zoomOut');
            }
            else if (keys[67] && !mxEvent.isAltDown(event) && !mxEvent.isControlDown(event) && !mxEvent.isShiftDown(event)) {
                //c
                centre();
            }
            else if (keys[71] && !mxEvent.isAltDown(event) && !mxEvent.isControlDown(event) && !mxEvent.isShiftDown(event)) {
                //G
                graphEditor.toggleBackgruondGrid();
            }
            else if (keys[78] && !mxEvent.isAltDown(event) && !mxEvent.isControlDown(event) && !mxEvent.isShiftDown(event)) {
                //N
                graph.zoomActual();
            }
            else if (keys[83] && mxEvent.isControlDown(event)) {
                //ctrl + s
                menu.save();
            }
            else if (keys[81] && mxEvent.isControlDown(event)) {
                //ctrl + q
                let contentXmlUpdated = menu.getXMLModelOpened();
                if (contentXmlUpdated == XMLInitialOpened || XMLInitialOpened == null) {
                    menu.abandon();
                }
                else {
                    menu.openModalCancelConfirmation();
                }
                // let contentXmlUpdated = menu.getXMLModelOpened();
                // let countUpdated = contentXmlUpdated != null ? (contentXmlUpdated.match(/<mxCell/g) || []).length : 0;
                // let countOpened = XMLInitialOpened != null ? (XMLInitialOpened.match(/<mxCell/g) || []).length : 0;
                // let diff = 0;
                // alert('countUpdated =>' + countUpdated + '   countOpened => ' + countOpened);
                // if(countUpdated != countOpened)
                // {
                //     if(countUpdated > countOpened)
                //     {
                //         diff = Math.abs(countUpdated - countOpened)
                //     }
                //     else 
                //     if(countUpdated < countOpened)
                //     {
                //         diff = Math.abs(countOpened - countUpdated)
                //     }
                // }
                // alert(diff);
                // if (diff > 2 || diff < -2) {
                //     menu.openModalCancelConfirmation();
                // }
                // else 
                // {
                //     menu.abandon();
                // }
                // mxLog.show();
                // mxLog.debug('contentXmlUpdated= ' + contentXmlUpdated);
                // mxLog.debug('XMLInitialOpened= ' + XMLInitialOpened);
            }
            // else if (keys[77] && mxEvent.isControlDown(event)) {
            //     //ctrl + m implement modify button on viewmode only
            // }
            else if (keys[70] && mxEvent.isAltDown(event)) {
                //alt + f
                menuSelector[0].focus();
            }
            else if (keys[69] && mxEvent.isAltDown(event)) {
                //alt + e
                menuSelector[1].focus();
            }
            else if (keys[68] && mxEvent.isAltDown(event)) {
                //alt + d
                menuSelector[2].focus();
            }
            else if (keys[86] && mxEvent.isAltDown(event)) {
                //alt + v
                menuSelector[3].focus();
            }
            else if (keys[83] && mxEvent.isAltDown(event)) {
                //alt + s
                menuSelector[4].focus();
            }
            else if (keys[72] && mxEvent.isAltDown(event)) {
                //alt + h
                menuSelector[5].focus();
                callbackObj.openHelpModal(29);
            }

            if (mxEvent.isAltDown(event)) {
                //verify if its already underlined
                let altKeyNameMenu = menuSelector[0].childNodes[0].innerHTML;

                for (i in menuSelector) {
                    try {
                        if (altKeyNameMenu.includes("<u>"))
                            menuSelector[i].childNodes[0].innerHTML = menuSelector[i].getAttribute('data-genuineName');
                        else
                            menuSelector[i].childNodes[0].innerHTML = menuSelector[i].getAttribute('data-altKeyName');
                    }
                    catch (e) {
                        // alert('GraphEditor => ' + e);
                    }
                }
            }
        }
    };

    function keysReleased(e) {
        // // mark keys that were released
        // if (keys[18])
        // {
        keys = [];
        // }
        // else
        // {
        //     keys[e.keyCode] = false;
        // }
    };
};