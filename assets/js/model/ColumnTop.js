class ColumnTop {

    constructor(name, parent) {

        let columnTop = graph.insertVertex(parent, null, '', 0, 0, 80, 80, 'unit;columnTop;');
        columnTop['type'] = 'Unit';
        columnTop['name'] = 'Column Top';
        
        let tagName = graph.insertVertex(columnTop, null, name, 1, 1, 0, 0, 'unitName;', false);
        tagName.geometry.offset = new mxPoint(0.3, 0.3);
        tagName.geometry.relative = false;
        tagName['type'] = 'TagName';
        tagName['positionX'] = 80;
        tagName['positionY'] = 60;
        tagName.source = columnTop;
        
        let tagAllocation = graph.insertVertex(columnTop, null, "tag", 0.1, 0.1, 25, 20, 'tagAllc;', false);
        tagAllocation.geometry.offset = new mxPoint(0.3, 0.3);
        tagAllocation.geometry.relative = false;
        tagAllocation['type'] = 'TagAllocation';
        tagAllocation['positionX'] = 80;
        tagAllocation['positionY'] = 0;
        
        let portOutTop = graph.insertVertex(columnTop, null, '', 0.41, 0, 14, 14,
        'portOut;portConstraint=north;shape=triangle;direction=north;resizable=0');
        portOutTop.geometry.offset = new mxPoint(0, -16);
        portOutTop.geometry.relative = true;
        portOutTop['type'] = 'PortOut';         
        
        let portInWestTop = graph.insertVertex(columnTop, null, '', 0, 0.3, 14, 14,
        'portIn;portConstraint=west;direction=east;');
        portInWestTop.geometry.offset = new mxPoint(-14, 0);
        portInWestTop.geometry.relative = true;
        portInWestTop['type'] = 'PortIn'; 
        portInWestTop['position'] = 'west';

        let portInWestBottom = graph.insertVertex(columnTop, null, '', 0, 0.75, 14, 14,
        'portIn;portConstraint=west;shape=triangle;direction=east;resizable=0');
        portInWestBottom.geometry.offset = new mxPoint(-14, 0);
        portInWestBottom.geometry.relative = true;
        portInWestBottom['type'] = 'PortIn'; 
        portInWestBottom['position'] = 'west';
        
        let portInEast = graph.insertVertex(columnTop, null, '', 1, 0.3, 14, 14,
        'portIn;portConstraint=east;shape=triangle;direction=west;resizable=0');
        portInEast.geometry.offset = new mxPoint(0, 0);
        portInEast.geometry.relative = true;
        portInEast['type'] = 'PortIn'; 
        portInEast['position'] = 'east';
        
        columnTop.setConnectable(false);
        tagAllocation.setConnectable(false);
        tagName.setConnectable(false);

        let liSubUnit = document.getElementById('unit-name');
        let liSubAll = document.getElementById('hide');        

        if (liSubUnit != null && liSubAll != null)
        {
            if (liSubUnit.className !== 'checked' ||
                liSubAll.className === 'checked' ||
                name === "") {
                
                tagName.setVisible(false);
            }
        }
        else
        {
            let nIsVisibleName = isVisibleName && name != '';
            tagName.setVisible(nIsVisibleName);
        }
        
        tagAllocation.setVisible(false);

        // graph.updateCellSize(tagName);
        setGeometryName(tagName);
        
        return columnTop;
    }
}