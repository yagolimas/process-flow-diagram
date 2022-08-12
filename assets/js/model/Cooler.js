class Cooler {    

    constructor(name, parent) {

        let cooler = graph.insertVertex(parent, null, null, 0, 0, 65, 65, 'unit;cooler;');                
        cooler['type'] = 'Unit';
        cooler['name'] = 'Cooler';

        let tagName = graph.insertVertex(cooler, null, name, 1, 1, 0, 0, 'unitName;', false);
        tagName.geometry.offset = new mxPoint(0.3, 0.3);
        tagName.geometry.relative = false;
        tagName['type'] = 'TagName';
        tagName['positionX'] = 65;
        tagName['positionY'] = 60;
        tagName.source = cooler;
        
        let tagAllocation = graph.insertVertex(cooler, null, "tag", 0.1, 0.1, 25, 20, 'tagAllc;', false);
        tagAllocation.geometry.offset = new mxPoint(0.3, 0.3);
        tagAllocation.geometry.relative = false;
        tagAllocation['type'] = 'TagAllocation';
        tagAllocation['positionX'] = 65;
        tagAllocation['positionY'] = 0;
        
        let portIn = graph.insertVertex(cooler, null, '', 0, 0.40, 14, 14,
        'portIn;portConstraint=west;direction=east;');
        portIn['type'] = 'PortIn';
        portIn.geometry.offset = new mxPoint(-12, 0);
        portIn.geometry.relative = true; 

        let portOut = graph.insertVertex(cooler, null, '', 1.02, 0.40, 14, 14,
        'portOut;portConstraint=east;direction=east;');
        portOut['type'] = 'PortOut';
        portOut.geometry.offset = new mxPoint(0, 0);
        portOut.geometry.relative = true; 
        
        cooler.setConnectable(false);
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
                
        return cooler;
    }
};