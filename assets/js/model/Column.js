class Column {

    constructor(name, parent) {

        let column = graph.insertVertex(parent, null, '', 0, 0, 80, 340, 'unit;column;');                
        column['type'] = 'Unit';
        column['name'] = 'Column';

        let tagName = graph.insertVertex(column, null, name, 1, 1, 0, 0, 'unitName;', false);
        tagName.geometry.offset = new mxPoint(0.3, 0.3);
        tagName.geometry.relative = false;
        tagName['type'] = 'TagName';
        tagName['positionX'] = 75;
        tagName['positionY'] = 335;
        tagName.source = column;
        
        let tagAllocation = graph.insertVertex(column, null, '', 0.1, 0.1, 25, 20, 'tagAllc;', false);
        tagAllocation.geometry.offset = new mxPoint(0.3, 0.3);
        tagAllocation.geometry.relative = false;
        tagAllocation['type'] = 'TagAllocation';
        tagAllocation['positionX'] = 65;
        tagAllocation['positionY'] = 0;

        let portOutTop = graph.insertVertex(column, null, '', 0.4, 0, 14, 14,
        'portOut;portConstraint=north;shape=triangle;direction=north;resizable=0');
        portOutTop.geometry.offset = new mxPoint(0, -16);
        portOutTop.geometry.relative = true;
        portOutTop['type'] = 'PortOut';        
        
        let portOutBottom = graph.insertVertex(column, null, '',  0.4, 1, 14, 14,
        'portOut;portConstraint=south;shape=triangle;direction=south;resizable=0');
        portOutBottom.geometry.offset = new mxPoint(0, 3);
        portOutBottom.geometry.relative = true;
        portOutBottom['type'] = 'PortOut';

        let portInWestTop = graph.insertVertex(column, null, '', 0, 0.2, 14, 14,
        'portIn;portConstraint=west;shape=triangle;direction=east;resizable=0');
        portInWestTop.geometry.offset = new mxPoint(-14, 0);
        portInWestTop.geometry.relative = true;
        portInWestTop['type'] = 'PortIn';
        portInWestTop['position'] = 'west';
        
        let portInWestMiddle  = graph.insertVertex(column, null, '', 0, 0.455, 14, 14,
        'portIn;portConstraint=west;shape=triangle;direction=east;resizable=0');
        portInWestMiddle.geometry.offset = new mxPoint(-14, 0);
        portInWestMiddle.geometry.relative = true;
        portInWestMiddle['type'] = 'PortIn';
        portInWestMiddle['position'] = 'west';
        
        let portInWestBottom = graph.insertVertex(column, null, '', 0, 0.72, 14, 14,
        'portIn;portConstraint=west;shape=triangle;direction=east;resizable=0');
        portInWestBottom.geometry.offset = new mxPoint(-14, 0);
        portInWestBottom.geometry.relative = true;
        portInWestBottom['type'] = 'PortIn';
        portInWestBottom['position'] = 'west';

        let portInEstTop = graph.insertVertex(column, null, '', 1, 0.2, 14, 14,
        'portIn;portConstraint=east;shape=triangle;direction=west;resizable=0');
        portInEstTop.geometry.offset = new mxPoint(0, 0);
        portInEstTop.geometry.relative = true;
        portInEstTop['type'] = 'PortIn';
        portInEstTop['position'] = 'east';
        
        let portInEstBottom = graph.insertVertex(column, null, '', 1, 0.72, 14, 14,
        'portIn;portConstraint=east;shape=triangle;direction=west;resizable=0');
        portInEstBottom.geometry.offset = new mxPoint(0, 0);
        portInEstBottom.geometry.relative = true;
        portInEstBottom['type'] = 'PortIn';
        portInEstBottom['position'] = 'east';
        
        column.setConnectable(false);
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
        
        return column;
    }
}