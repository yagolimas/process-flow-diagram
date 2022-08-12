var optionsMenu =
{
    menu:
        [
            {
                id: 'pfd',
                name: 'PFD',
                sub:
                    [
                        { id: 'save', name: 'Save and Return', sub: null, checked: false, shortCut: 'CTRL+S' },
                        { id: 'export', name: 'Export/Print Drawing', sub: null, checked: false, shortCut: '' },
                        { id: 'cancel', name: 'Cancel and Return', sub: null, checked: false, shortCut: 'CTRL+Q' }
                    ],
                checked: false,
                shortCut: '',
                altname: 'P<u>F</u>D'
            },
            {
                id: 'edit',
                name: 'Edit',
                sub:
                    [
                        { id: 'undo', name: 'Undo', sub: null, checked: false, shortCut: 'CTRL+Z' },
                        // { id: 'redo', name: 'Redo', sub: null, checked: false, shortCut: '' },
                        { id: 'delete', name: 'Delete Selection', sub: null, checked: false, shortCut: 'DEL' }
                    ],
                checked: false,
                shortCut: '',
                altname: '<u>E</u>dit'
            },
            {
                id: 'draw',
                name: 'Draw',
                sub:
                    [
                        { id: 'check', name: 'Check Connectivity', sub: null, checked: false, shortCut: '' }
                        /* { id: 'redraw', name: 'Redraw', sub: null, checked: false, shortCut: 'ALT+D+R'  }  */
                    ],
                checked: false,
                shortCut: '',
                altname: '<u>D</u>raw'
            },
            {
                id: 'view',
                name: 'View',
                sub:
                    [
                        { id: 'in', name: 'Zoom In', sub: null, checked: false, shortCut: '' },
                        { id: 'out', name: 'Zoom Out', sub: null, checked: false, shortCut: '' },
                        { id: 'size', name: 'Normal Size', sub: null, checked: false, shortCut: '' },
                        { id: 'fit', name: 'Fit in Window', sub: null, checked: false, shortCut: '' },
                        { id: 'centre', name: 'Centre', sub: null, checked: false, shortCut: '' },
                        { id: '', name: '', sub: null, checked: false, shortCut: '' },
                        { id: 'hide', name: 'Hide All Names', sub: null, checked: false, shortCut: '' },
                        { id: '', name: '', sub: null, checked: false, shortCut: '' },
                        { id: 'unit-name', name: 'Show Unit Names', sub: null, checked: true, shortCut: '' },
                        { id: 'stream-name', name: 'Show Feed/Product Stream Names', sub: null, checked: true, shortCut: '' },
                        { id: 'other-name', name: 'Show Other Stream Names', sub: null, checked: true, shortCut: '' },
                        // { id: 'tag-name', name: 'Show Tag Names', sub: null, checked: true },
                        { id: 'toolbox', name: 'Toolbox', sub: null, checked: false, shortCut: '' }
                    ],
                checked: false,
                shortCut: '',
                altname: '<u>V</u>iew'
            },
            {
                id: 'setting',
                name: 'Setting',
                sub:
                    [
                        { id: 'confirm', name: 'Confirm Deletions', sub: null, checked: false, shortCut: '' },
                        // { name: 'Prompt for Names', sub: null, checked: false, shortCut: '' },
                        { id: 'autoname', name: 'Autoname', sub: null, checked: false, shortCut: '' },
                        // { name: 'Colours', sub: null, checked: false } 
                    ],
                checked: false,
                shortCut: '',
                altname: '<u>S</u>etting'
            },
            {
                id: 'help',
                name: 'Help',
                sub:
                    [
                        { id: 'help-monitor', name: 'Help', sub: null, checked: false, shortCut: '' }
                        // ,{ id: 'about', name: 'About PFD Editor', sub: null, checked: false }
                    ],
                checked: false,
                shortCut: '',
                altname: '<u>H</u>elp'
            }
        ]
}

Menu = function () {
    this.init();
};

Menu.prototype.init = function () {

    let menuVar = document.querySelector(".menuContainer");

    // let dropdown = document.createAttribute('dropdown');

    var divRow = document.createElement('div');
    divRow.classList.add("row");

    var divMenu = document.createElement('div');
    divMenu.classList.add("menu");
    divMenu.classList.add("col-lg-12");

    var divLogo = document.createElement('div');
    divLogo.classList.add("logo");

    let ul = document.createElement('ul');
    ul.classList.add("topnav");

    optionsMenu.menu.forEach(option => {
        let divMenuItem = document.createElement('div');
        divMenuItem.classList.add("menu-item");
        divMenuItem.classList.add('onclick-menu');
        divMenuItem.setAttribute('tabindex', '0');

        let button = document.createElement('span');
        //mxUtils.write(button, option.name);
        button.innerHTML = option.name;
        divMenuItem.setAttribute('data-genuineName', option.name);
        divMenuItem.setAttribute('data-altKeyName', option.altname);

        divMenuItem.appendChild(button);
        let ulSub = document.createElement('ul');
        ulSub.classList.add('onclick-menu-content');

        option.sub.forEach(subOption => {
            let liSub = document.createElement('li');
            liSub.setAttribute('id', subOption.id);

            let buttonSub = document.createElement('button');
            let spanSub = document.createElement('span');
            mxUtils.write(buttonSub, subOption.name);
            mxUtils.write(spanSub, subOption.shortCut);

            let factorySub = function (name) {
                return function () {
                    if (name.indexOf("Confirm Deletions") >= 0) {
                        confirmDeletions = (confirmDeletions == null) ? true : !confirmDeletions;

                        if (confirmDeletions) {
                            liSub.classList.add("checked");
                        }
                        else {
                            liSub.classList.remove("checked");
                        }
                    }
                    else if (name.toLowerCase() == "save and return") {
                        try {
                            menu.save();
                        }
                        catch (e) {
                            // alert('menu save => ' + e);
                        }
                    }
                    else if (name.toLowerCase() == "undo") {
                        graphEditor.undo();
                        // undo(editor);
                    }
                    else if (name.toLowerCase() == "export/print drawing") {
                        mxUtils.printScreen();
                    }
                    else if (name.toLowerCase() == "redo") {
                        graphEditor.redo();
                    }
                    else if (name.toLowerCase() == "toolbox") {
                        sideBar.showHideTools();
                    }
                    else if (name.toLowerCase() == "delete selection") {
                        editor.execute('delete');
                    }
                    else if (name.toLowerCase() == "redraw") {
                        redraw();
                    }
                    else if (name.toLowerCase() == "centre") {
                        graphEditor.centre();
                    }
                    else if (name.toLowerCase() == "zoom in") {
                        editor.execute('zoomIn');
                    }
                    else if (name.toLowerCase() == "zoom out") {
                        editor.execute('zoomOut');
                    }
                    else if (name.toLowerCase() == "normal size") {
                        graph.zoomActual();
                    }
                    else if (name.toLowerCase() == "fit in window") {
                        graph.fit(30, false, 0);
                        centre();
                    }
                    else if (name.toLowerCase() == "hide all names") {
                        showHideAllNames()
                    }
                    else if (name.toLowerCase() == "show unit names") {
                        showHideAllUnitNames();
                    }
                    else if (name.toLowerCase() == "show feed/product stream names") {
                        showHideStreamNames();
                    }
                    else if (name.toLowerCase() == "show other stream names") {
                        showHideOtherStreamNames();
                    }
                    else if (name.toLowerCase() == "cancel and return") {
                        menu.cancelConfirmation();
                    }
                    else if (name.toLowerCase() == "check connectivity") {
                        document.querySelector(".check-btn").click()
                    }
                    else if (name.toLowerCase() == "autoname") {
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
                    else if (name.toLowerCase() == "help") {
                        callbackObj.openHelpModal(29);
                    }
                    else {
                        editor.execute(name.toLowerCase());
                    }
                };
            };

            if (subOption.name.toLowerCase() == "") {
                liSub.classList.add('line');
            }
            else {
                mxEvent.addListener(buttonSub, 'click', factorySub(subOption.name));
                liSub.appendChild(buttonSub);
                liSub.appendChild(spanSub);
            }

            this.checkedOption(liSub, subOption.checked);
            ulSub.appendChild(liSub);
        });

        //li.appendChild(ulSub);
        //ul.appendChild(li);       

        //divMenuItem.appendChild(ul);
        divMenuItem.appendChild(ulSub);
        divMenu.appendChild(divMenuItem);
        divRow.appendChild(divMenu);
    });
    menuVar.appendChild(divLogo);
    menuVar.appendChild(divRow);

    //menu.appendChild(ul);
};

Menu.prototype.abandon = function () {
    try {
        Init('view');
        callbackObj.returnToView(0);

        let jsonString = jsonSystemSetup;
        if (typeof jsonString != "string") {
            jsonString = JSON.stringify(jsonSystemSetup);
        }
        containerOpened.open(jsonString, XMLOpened);
    }
    catch (e) {
        // alert('abandon => ' + e);
    }
};

Menu.prototype.getXMLModelOpened = function () {
    let encoder = new mxCodec();
    let node = encoder.encode(graph.getModel());
    return mxUtils.getPrettyXml(node);
};

Menu.prototype.openModalCancelConfirmation = function () {
    if (!document.getElementsByClassName('modal open')[0]) {
        var modal = new Modal();
        var lastKey = null;
        let content = modal.createModalCancelChanges('Cancel', "This action will lose any changes you have made.\nReturn anyway?");
        let subContent = modal.createContent(content);
        modal.open();

        const $buttonCancel = document.querySelector("#btn-cancel");
        const $buttonOk = document.querySelector("#btn-ok");
    
        $buttonOk.onclick = () => {
            modal.close();
            this.abandon();
        };

        $buttonCancel.onclick = () => {
            modal.close();
        };

        $buttonCancel.focus();

        $buttonOk.onkeyup = function (event) {
            // event.preventDefault();
            if (event.keyCode === 13) {
                $buttonOk.click();
            }
        };

        $buttonCancel.onkeyup = function (event) {
            // event.preventDefault();
            if (event.keyCode == 13) {
                $buttonCancel.click();
            }
        };

        // document.onkeyup = function (event) {
        //     //event.preventDefault();
        //     if (!document.getElementsByClassName('modal open')[0]) {
        //         if (event.keyCode === 13) {
        //             $buttonOk.click();
        //         } else if (event.keyCode === 27) {
        //             subContent.querySelector("#btn-cancel").click();
        //         } else if (event.keyCode === 9) {
        //             let x = document.activeElement;

        //             if(x.textContent.toLowerCase() == 'yes' && lastKey != null && (lastKey.tagName == x.tagName && x.textContent == lastKey.textContent))
        //             {
        //                 $buttonCancel.focus();
        //             }
        //             else if(x.textContent.toLowerCase() == 'no')
        //             {
        //                 $buttonOk.focus();
        //             }
        //             else
        //             {
        //                 $buttonCancel.focus();
        //             }
        //             lastKey = x;
        //         }
        //     }
        // };
    }
};

Menu.prototype.checkedOption = function (liSub, isChecked) {
    isChecked ? liSub.classList.add("checked") : liSub.classList.remove("checked");
};

Menu.prototype.getLiSubOption = function (id) {
    return document.getElementById(id);
};

Menu.prototype.setDisabledSubOptions = function () {
    document.getElementById("unit-name").classList.add('disabled');
    document.getElementById("stream-name").classList.add('disabled');
    document.getElementById("other-name").classList.add('disabled');
}

Menu.prototype.setAnableSubOptions = function () {
    document.getElementById("unit-name").classList.remove('disabled');
    document.getElementById("stream-name").classList.remove('disabled');
    document.getElementById("other-name").classList.remove('disabled');
}

Menu.prototype.cancelConfirmation = function () {
    let contentXmlUpdated = menu.getXMLModelOpened();
    // if (XMLInitialOpened == null || contentXmlUpdated == XMLInitialOpened) {
    //     menu.abandon();
    // }
    // else {
        menu.openModalCancelConfirmation();
    // }
}

Menu.prototype.save = function () {
    try {
        updateGraphView(true);
        
        if (App.application == 0)
        {
            sendMonitorDto();
        }

        let contentXml = menu.getXMLModelOpened();
        let pfdData = new PFDData(contentXml, graphView);

        XMLOpened = pfdData.xml;

        if (App.application == 2) {
            actreneBase.updateSystemSetupJson();
        }

        let jsonString = jsonSystemSetup;
        if (typeof jsonString != "string") {
            jsonString = JSON.stringify(jsonSystemSetup);
        }
        // alert('jsonString => ' + jsonString);
        // alert('pfdData => ' + JSON.stringify(pfdData));

        callbackObj.systemSetupGetPFD(jsonString, JSON.stringify(pfdData));
    }
    catch (e) {
        //  alert('save 1 => ' + e);
    }

    try {
        callbackObj.returnToView(0);
        // window.load();
        Init('view');
    }
    catch (e) {
        //  alert('save 2 => ' + e);
    }
    centre();

    return pfdData.xml;
};
