class Splitter {    

    constructor(name, parent) 
    {
        let splitter = graph.insertVertex(parent, null, '', 0, 0, 65, 65, 'unit;splitter;');   
        splitter['type'] = 'Unit';
        splitter['name'] = 'Splitter';
               
        let tagName = graph.insertVertex(splitter, null, name, 1, 1, 0, 0, 'unitName;', false);
        tagName.geometry.offset = new mxPoint(0.3, 0.3);
        tagName.geometry.relative = false;
        tagName['type'] = 'TagName';
        tagName['positionX'] = 65;
        tagName['positionY'] = 55;
        tagName.source = splitter;
        
        let tagAllocation = graph.insertVertex(splitter, null, "tag", 0.1, 0.1, 25, 20, 'tagAllc;', false);
        tagAllocation.geometry.offset = new mxPoint(0.3, 0.3);
        tagAllocation.geometry.relative = false;
        tagAllocation['type'] = 'TagAllocation';
        tagAllocation['positionX'] = 65;
        tagAllocation['positionY'] = -10;

        let portOutTop = graph.insertVertex(splitter, null, '', 0.400, 0, 14, 14,
        'portOut;portConstraint=north;direction=north;', false);
        portOutTop.geometry.offset = new mxPoint(0, -17);
        portOutTop.geometry.relative = true;
        portOutTop['type'] = 'PortOut';

        let portOutBottom = graph.insertVertex(splitter, null, '', 0.395, 1.02, 14, 14,
        'portOut;portConstraint=south;direction=south;', false);
        portOutBottom.geometry.offset = new mxPoint(0, 0);
        portOutBottom.geometry.relative = true;
        portOutBottom['type'] = 'PortOut';
        
        let portOutEst = graph.insertVertex(splitter, null, '',  0.98, 0.38, 14, 14,
        'portOut;portConstraint=east;direction=east;', false);
        portOutEst.geometry.offset = new mxPoint(0, 0);
        portOutEst.geometry.relative = true;
        portOutEst['type'] = 'PortOut';        

        let portIn = graph.insertVertex(splitter, null, '', 0, 0.38, 14, 14,
        'portIn;portConstraint=west;direction=east;', false);
        portIn.geometry.offset = new mxPoint(-14, 0);
        portIn.geometry.relative = true;
        portIn['type'] = 'PortIn';
        
        splitter.setConnectable(false);
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
        
        return splitter;
    }
}
