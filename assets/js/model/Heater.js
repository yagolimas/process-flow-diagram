class Heater {    

    constructor(name, parent) {

        let heater = graph.insertVertex(parent, null, '', 0, 0, 65, 65, 'unit;heater;');                
        heater['type'] = 'Unit';
        heater['name'] = 'Heater';

        let tagName = graph.insertVertex(heater, null, name, 1, 1, 0, 0, 'unitName', false);
        tagName.geometry.offset = new mxPoint(0.3, 0.3);
        tagName.geometry.relative = false;
        tagName['type'] = 'TagName';
        tagName['positionX'] = 70;
        tagName['positionY'] = 55;
        tagName.source = heater;
        
        let tagAllocation = graph.insertVertex(heater, null, "tag", 0.1, 0.1, 25, 20, 'tagAllc', false);
        tagAllocation.geometry.offset = new mxPoint(0.3, 0.3);
        tagAllocation.geometry.relative = false;
        tagAllocation['type'] = 'TagAllocation';
        tagAllocation['positionX'] = 70;
        tagAllocation['positionY'] = -5;
        
        let portIn = graph.insertVertex(heater, null, '', 0, 0.40, 14, 14,
        'portIn;portConstraint=west;direction=east;', false);
        portIn['type'] = 'PortIn';        
        let portOut = graph.insertVertex(heater, null, '', 0.97, 0.40, 14, 14,
        'portOut;portConstraint=east;direction=east;', false);
        portOut['type'] = 'PortOut';

        portIn.geometry.offset = new mxPoint(-16, 0);
        portIn.geometry.relative = true;

        portOut.geometry.offset = new mxPoint(0, 0);
        portOut.geometry.relative = true;
        
        heater.setConnectable(false);
        tagAllocation.setConnectable(false);
        
        tagAllocation.setVisible(false);
        
        let liSubUnit = document.getElementById('unit-name');
        let liSubAll = document.getElementById('hide');        

        if (liSubUnit != null && liSubAll != null)
        {
            if (liSubUnit.className !== 'checked' ||
                liSubAll.className === 'checked' ||
                name === "") 
            {
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
        
        return heater;
    }
}
