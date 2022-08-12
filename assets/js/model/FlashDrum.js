class FlashDrum {

    constructor(name, parent) {

        let flash = graph.insertVertex(parent, null, '', 0, 0, 63, 160, 'unit;flash;');
        flash['type'] = 'Unit';
        flash['name'] = 'Flash Drum';
        
        let tagName = graph.insertVertex(flash, null, name, 1, 1, 0, 0, 'unitName', false);
        tagName.geometry.offset = new mxPoint(0.3, 0.3);
        tagName.geometry.relative = false;
        tagName['type'] = 'TagName';
        tagName['positionX'] = 60;
        tagName['positionY'] = 145;
        tagName.source = flash;
        
        let tagAllocation = graph.insertVertex(flash, null, "tag", 0.1, 0.1, 25, 20, 'tagAllc', false);
        tagAllocation.geometry.offset = new mxPoint(0.3, 0.3);
        tagAllocation.geometry.relative = false;
        tagAllocation['type'] = 'TagAllocation';
        tagAllocation['positionX'] = 60;
        tagAllocation['positionY'] = 0;

        let portOutTop = graph.insertVertex(flash, null, '', 0.4, 0, 14, 14,
        'portOut;portConstraint=north;direction=north;');
        portOutTop.geometry.offset = new mxPoint(0, -16);
        portOutTop.geometry.relative = true; 
        portOutTop['type'] = 'PortOut';        
        
        let portOutBottom = graph.insertVertex(flash, null, '', 0.4, 1, 14, 14,
        'portOut;portConstraint=south;direction=south;');
        portOutBottom.geometry.offset = new mxPoint(0, 3);
        portOutBottom.geometry.relative = true;
        portOutBottom['type'] = 'PortOut'; 

        let portInWest = graph.insertVertex(flash, null, '', 0, 0.455, 14, 14,
        'portIn;portConstraint=west;direction=east;');
        portInWest.geometry.offset = new mxPoint(-14, 0);
        portInWest.geometry.relative = true;
        portInWest['type'] = 'PortIn';
        
        flash.setConnectable(false);
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
        
        return flash;
    }
}