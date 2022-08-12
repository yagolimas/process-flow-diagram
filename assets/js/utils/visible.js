function showHideAllNames() {

    let isChecked = setOptionSubMenu('hide');

    isChecked ? menu.setAnableSubOptions() : menu.setDisabledSubOptions()

    let cells = graph.getModel().cells;

    Object.values(cells)
        .filter(getAllNames)
        .forEach((cellName) => cellName.setVisible(isChecked));

    graph.refresh();
};

function showHideAllUnitNames() {

    let isChecked = setOptionSubMenu('unit-name');

    let cells = graph.getModel().cells;

    Object.values(cells)
        .filter(getUnitName)
        .forEach((cellName) => cellName.setVisible(!isChecked));

    graph.refresh();
};

function showHideStreamNames() {

    let isChecked = setOptionSubMenu('stream-name');

    let cells = graph.getModel().cells;
    
    Object.values(cells)
        .filter(getFeedProductStream)
        .reduce(flatChildrens, [])
        .filter(getChildrenStreamName)
        .forEach((cellName) => cellName.setVisible(!isChecked));

    graph.refresh();
};

function showHideOtherStreamNames() {

    let isChecked = setOptionSubMenu('other-name');

    let cells = graph.getModel().cells;

    Object.values(cells)
            .filter(getInternalStream)
            .reduce(flatChildrens, [])
            .filter(getChildrenStreamName)
            .forEach((cellName) => cellName.setVisible(!isChecked));
            
    graph.refresh();
};

function flatChildrens(childrens, cell) {
    return childrens.concat(cell.children);
};

function getChildrenStreamName(cell) {
    
    return (cell.type === "StreamName" &&
            cell.value != undefined &&
            cell.value != null &&
            cell.value != '');
};

function getInternalStream(cell) {
    return (cell.type === "InternalStream");
};

function getFeedProductStream(cell) {
    return (cell.type === "FeedStream" ||
            cell.type === "ProductStream");
};

function getUnitName(cell) {
    
    return  cell.type === "TagName" &&
            cell.value != undefined &&
            cell.value != null &&
            cell.value != '';
};

function getAllNames(cell) {
    
    return  (cell.type === "TagName" ||
            cell.type === "StreamName") &&
            cell.value != undefined &&
            cell.value != null &&
            cell.value != '';
};

function setOptionSubMenu(id) {

    let liSub = menu.getLiSubOption(id);
    let isChecked = liSub.className ? true : false;
    menu.checkedOption(liSub, !isChecked);
    return isChecked;
};

function setVisible(cell) {
    
    if (cell != null) {

        let child = cell.getChildAt(0);

        if (child != null) {

            let childValue  = child.getValue();
    
            if (childValue) {
                let isVisible = child.isVisible();
                child.setVisible(!isVisible);
                graph.refresh();
            }
        }
    }
}


attachListener = function() 
{
    localStorage.clear();
};