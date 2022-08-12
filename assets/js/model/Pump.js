class Pump {    

    constructor(name, parent) {

        let pump = graph.insertVertex(parent, null, '', 0, 0, 85, 75, 'unit;pump;');
        pump['type'] = 'Unit';
        pump['name'] = 'Pump';

        let tagName = graph.insertVertex(pump, null, name, 1, 1, 10, 10, 'unitName;', false);
        tagName.geometry.offset = new mxPoint(0.3, 0.3);
        tagName.geometry.relative = false;
        tagName['type'] = 'TagName';
        tagName['positionX'] = 85;
        tagName['positionY'] = 55;
        tagName.source = pump;
        
        let tagAllocation = graph.insertVertex(pump, null, "tag", 0.1, 0.1, 25, 20, 'tagAllc;', false);
        tagAllocation.geometry.offset = new mxPoint(0.3, 0.3);
        tagAllocation.geometry.relative = false;
        tagAllocation['type'] = 'TagAllocation';
        tagAllocation['positionX'] = 85;
        tagAllocation['positionY'] = 12;
        
        let portIn = graph.insertVertex(pump, null, '', 0, 0.337, 14, 14,
        'portIn;portConstraint=west;direction=east;', false);
        portIn.geometry.offset = new mxPoint(-16, 0);
        portIn.geometry.relative = true;
        portIn['type'] = 'PortIn';
        
        let portOut = graph.insertVertex(pump, null, '', 1.015, 0, 14, 14,
        'portOut;portConstraint=east;direction=east;');
        portOut.geometry.offset = new mxPoint(0, -4.5);
        portOut.geometry.relative = true;
        portOut['type'] = 'PortOut';

        pump.setConnectable(false);
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
        
        return pump;
    }
}
