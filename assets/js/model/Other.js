class Other {    

    constructor(name, parent) {

        let other = graph.insertVertex(parent, null, '', 0, 0, 65, 65, 'unit;other;');                
        other['type'] = 'Unit';
        other['name'] = 'Other';

        let tagName = graph.insertVertex(other, null, name, 1, 1, 0, 0, 'unitName;', false);
        tagName.geometry.offset = new mxPoint(0.3, 0.3);
        tagName.geometry.relative = false;
        tagName['type'] = 'TagName';
        tagName['positionX'] = 65;
        tagName['positionY'] = 55;
        tagName.source = other;
        
        let tagAllocation = graph.insertVertex(other, null, '', 0.1, 0.1, 25, 20, 'tagAllc;', false);
        tagAllocation.geometry.offset = new mxPoint(0.3, 0.3);
        tagAllocation.geometry.relative = false;
        tagAllocation['type'] = 'TagAllocation';
        tagAllocation['positionX'] = 65;
        tagAllocation['positionY'] = -10;
        
        let portIn = graph.insertVertex(other, null, '', 0, 0.4, 14, 14,
        'portIn;portConstraint=west;direction=east;', false);
        portIn.geometry.offset = new mxPoint(-16, 0);
        portIn.geometry.relative = true;
        portIn['type'] = 'PortIn';
        
        let portOut = graph.insertVertex(other, null, '', 1, 0.4, 14, 14,
        'portOut;portConstraint=east;direction=east;');
        portOut.geometry.offset = new mxPoint(2, 0);
        portOut.geometry.relative = true;
        portOut['type'] = 'PortOut';
        
        other.setConnectable(false);
        tagAllocation.setConnectable(false);
        
        tagAllocation.setVisible(false);

        
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
        
        tagName.setConnectable(false);
        
        graph.updateCellSize(tagName);
        
        return other;
    }
}
