class Accumulator {    

    constructor(name, parent) {

        let accumulator = graph.insertVertex(parent, null, '', 0, 0,  130, 60, 'unit;accumulator;');   
        accumulator['type'] = 'Unit';
        accumulator['name'] = 'Accumulator';
                
        let tagName = graph.insertVertex(accumulator, null, name, 1, 1, 0, 0, 'unitName;', false);
        tagName.geometry.offset = new mxPoint(0.3, 0.3);
        tagName.geometry.relative = false;
        tagName['type'] = 'TagName';
        tagName['positionX'] = 130;
        tagName['positionY'] = 60;
        tagName.source = accumulator;
        
        let tagAllocation = graph.insertVertex(accumulator, null, "tag", 0.1, 0.1, 25, 20, 'tagAllc;', false);
        tagAllocation.geometry.offset = new mxPoint(0.3, 0.3);
        tagAllocation.geometry.relative = false;
        tagAllocation['type'] = 'TagAllocation';
        tagAllocation['positionX'] = 130;
        tagAllocation['positionY'] = 0;
        
        let portIn = graph.insertVertex(accumulator, null, '', 0.14, 0, 14, 14,
        'portIn;portConstraint=north;direction=south;', false);
        portIn.geometry.offset = new mxPoint(0, -16);
        portIn.geometry.relative = true;
        portIn['type'] = 'PortIn';
       
        let portOutTop = graph.insertVertex(accumulator, null, '', 0.77, 0, 14, 14,
        'portOut;portConstraint=north;direction=north;', false);
        portOutTop.geometry.offset = new mxPoint(0, -16);
        portOutTop.geometry.relative = true;
        portOutTop['type'] = 'PortOut';
        portOutTop['position'] = 'east';
       
        let portOutWest = graph.insertVertex(accumulator, null, '', 0.14, 1, 14, 14,
        'portOut;portConstraint=south;direction=south;', false);
        portOutWest.geometry.offset = new mxPoint(0, 0.1);
        portOutWest.geometry.relative = true;
        portOutWest['type'] = 'PortOut';
        portOutWest['position'] = 'west';
        
        let portOutEst = graph.insertVertex(accumulator, null, '', 0.77, 1, 14, 14,
        'portOut;portConstraint=south;direction=south;', false);
        portOutEst.geometry.offset = new mxPoint(0, 0.1);
        portOutEst.geometry.relative = true;
        portOutEst['type'] = 'PortOut';
        portOutEst['position'] = 'east';
        
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

        accumulator.setConnectable(false);        
        tagAllocation.setConnectable(false);        
        tagAllocation.setVisible(false);
        tagName.setConnectable(false);        
        graph.updateCellSize(tagName);
        
        return accumulator;
    }
}
