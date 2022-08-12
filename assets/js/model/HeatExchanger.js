class HeatExchanger {
    
    constructor(name, parent) {

        let exchanger = graph.insertVertex(parent, null, '', 0, 0, 62, 62, 'unit;exchanger;');
        exchanger['type'] = 'Unit';
        exchanger['name'] = 'Heat Exchanger';
        
        let tagName = graph.insertVertex(exchanger, null, name, 0.1, 0.1, 25, 20, 'unitName;', false);
        tagName.geometry.offset = new mxPoint(0.3, 0.3);
        tagName.geometry.relative = false;
        tagName['type'] = 'TagName';
        tagName['positionX'] = 60;
        tagName['positionY'] = 60;
        tagName.source = exchanger;
        
        let tagAllocation = graph.insertVertex(exchanger, null, "tag", 0.1, 0.1, 25, 20, 'tagAllc', false);
        tagAllocation.geometry.offset = new mxPoint(0.3, 0.3);
        tagAllocation.geometry.relative = false;
        tagAllocation['type'] = 'TagAllocation';
        tagAllocation['positionX'] = 60;
        tagAllocation['positionY'] = 0;

        let portInWest = graph.insertVertex(exchanger, null, '', 0, 0.39, 14, 14,
        'portIn;portConstraint=west;direction=east;');
        portInWest.geometry.offset = new mxPoint(-16, 0);
        portInWest.geometry.relative = true;
        portInWest['type'] = 'PortIn';
        portInWest['typePort'] = 'Tube';
        
        let portInBottom = graph.insertVertex(exchanger, null, '', 0.39, 1.04, 14, 14,
        'portIn;portConstraint=south;direction=north;');
        portInBottom.geometry.offset = new mxPoint(0, 0);
        portInBottom.geometry.relative = true;
        portInBottom['type'] = 'PortIn';
        portInBottom['typePort'] = 'Shell';
        
        let portOutTop = graph.insertVertex(exchanger, null, '', 0.39, 0, 14, 14,
        'portOut;portConstraint=north;direction=north;');
        portOutTop.geometry.offset = new mxPoint(0, -16);
        portOutTop.geometry.relative = true;
        portOutTop['type'] = 'PortOut';
        portOutTop['typePort'] = 'Tube';

        let portOutEast = graph.insertVertex(exchanger, null, '',  1.02, 0.39, 14, 14,
        'portOut;portConstraint=east;direction=east;');
        portOutEast.geometry.offset = new mxPoint(0, 0);
        portOutEast.geometry.relative = true;
        portOutEast['type'] = 'PortOut';
        portOutEast['typePort'] = 'Shell';
        
        exchanger.setConnectable(false);
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

        graph.ungroupCells(exchanger);

        
        return exchanger; 
    }
}