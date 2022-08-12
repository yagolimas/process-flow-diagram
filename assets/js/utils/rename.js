function rename(cell) {

    try
    {
        if (cell != null) {
    
            if (cell.type == "TagAllocation" || cell.type == "TagName" || cell.type == "StreamName") {
                cell = cell.parent;
            }
    
            let modal = openModal();
    
            // debugger;
            //disable menu application
            if (App.action == "view")
            {
                callbackObj.enableMenuAndHeaderButtons(false);
            }
            const $inputName = document.querySelector('#name');
            const $buttonOk = document.querySelector("#btn-ok");
            const $buttonHelp = document.querySelector("#btn-help");
            const $buttonCancel = document.querySelector("#btn-cancel");
    
            // let childName = cell.getChildAt(0);
            let childName = null;
            // cell.children.filter(function (item) {
            //     if (item.type.toLowerCase() == "tagname" || item.type.toLowerCase() == "streamname") {
            //         childName = item;
            //     }
            // });
            let children = cell.children;
            for(let i = 0; i < children.length; i++)
            {
                let item = children[i];
                if (item != null && item.type.toLowerCase() == "tagname" || item.type.toLowerCase() == "streamname") {
                    childName = item;
                    graph.selectionModel.cells = [childName];
                }
            }
            // || item.type.toLowerCase() == "tagallocation"
            let name = getValueName(childName);
    
            $inputName.value = name;
            $inputName.focus();
            $inputName.select();
    
            $inputName.onkeyup = function (event) {
                event.preventDefault();
    
                if (event.keyCode === 13) {
                    $buttonOk.click();
                } else if (event.keyCode === 27) {
                    $buttonCancel.click();
                }
            };
    
            $buttonOk.onclick = function () 
            {
                graph.getModel().beginUpdate();
                try {
                    let isValid = validateCellNames($inputName.value, childName.mxObjectId);
    
                    if (!isValid) {
                        throw new NameInUseExcpetion("Name already in use");
                    }
                    else {
                        lastValue = childName.value;
                        childName.setValue($inputName.value);
                        setGeometryName(childName);
    
                        modal.close();
                        
                        if (App.action == "view")
                        {
                            callbackObj.enableMenuAndHeaderButtons(true);
                            // actreneBase.updateSystemSetupJson();
                            containerOpened.saveFromAcb();
                            // actreneBase.sendSystemSetupJson();
                            // containerOpened.sendNamesToEdit(childName.getValue(), childName.id);
                        }
                        // else if (App.action == "view" && App.application != 2)
                        // {
                        //     callbackObj.enableMenuAndHeaderButtons(true);
                        //     containerOpened.saveFromAcb();
                        // }
                    }
                }
                catch (e) {
                    e.openModalAlert();
                }
                finally {
                    graph.getModel().endUpdate('rename');
                    graph.refresh();
                }
            };
    
            $buttonCancel.onclick = function () {
                modal.close();
    
                if (App.action == "view") {
                    callbackObj.enableMenuAndHeaderButtons(true);
                }
                // graph.getModel().endUpdate();
            };
    
            $buttonHelp.onclick = function () {
                callbackObj.openHelpModal(33);
            };
        }
    }
    catch(e)
    {
        // alert('rename 9 =>' + e);
    }
};

function setGeometryName(childName) {

    if (childName.value != null && childName.value != '') {
        graph.updateCellSize(childName);
        // restoreLabelPosition(childName);
        childName.setVisible(true);
    } else {
        childName.setVisible(false);
    }
    // graph.getModel().beginUpdate();
    // graph.getModel().endUpdate();

    // let geo = childName.getGeometry();
    // geo.width = childName.getValue().length * 10;
    // geo.height = 25;
    // childName.setGeometry(geo);
};

function openModal() {
    let modal = new Modal();
    let content = modal.createModalRename('Rename');
    modal.createContent(content);
    modal.open();

    return modal;
};

function getValueName(childName) {

    if (childName.value == "") {
        childName.setValue("");
    }
    return childName.getValue();
};
