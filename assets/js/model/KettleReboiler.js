class KettleReboiler {
    
    constructor(name, parent ) {

        let kettleReboiler = graph.insertVertex(parent, null, '', 0, 0, 120, 60, 'unit;kettleReboiler;');                
        kettleReboiler['type'] = 'Unit';
        kettleReboiler['name'] = 'Kettle Reboiler';

        let tagName = graph.insertVertex(kettleReboiler, null, name, 1, 1, 0, 0, 'unitName', false);
        tagName.geometry.offset = new mxPoint(0.3, 0.3);
        tagName.geometry.relative = false;
        tagName['type'] = 'TagName';
        tagName['positionX'] = 120;
        tagName['positionY'] = 60;
        tagName.source = kettleReboiler;
        
        let tagAllocation = graph.insertVertex(kettleReboiler, null, "tag", 0.1, 0.1, 25, 20, 'tagAllc', false);
        tagAllocation.geometry.offset = new mxPoint(0.3, 0.3);
        tagAllocation.geometry.relative = false;
        tagAllocation['type'] = 'TagAllocation';
        tagAllocation['positionX'] = 120;
        tagAllocation['positionY'] = 0;
        
        let portOutTop = graph.insertVertex(kettleReboiler, null, '', 0.35, 0, 14, 14,
        'portOut;portConstraint=north;direction=north;');
        portOutTop.geometry.offset = new mxPoint(0, -16);
        portOutTop.geometry.relative = true;
        portOutTop['type'] = 'PortOut';
        portOutTop['typePort'] = 'Tube';
        
        let portInBottom = graph.insertVertex(kettleReboiler, null, '', 0.35, 1, 14, 14,
        'portIn;portConstraint=south;direction=north;');
        portInBottom.geometry.offset = new mxPoint(0, 2);
        portInBottom.geometry.relative = true;
        portInBottom['type'] = 'PortIn';
        portInBottom['typePort'] = 'Shell';

        let portOutEast = graph.insertVertex(kettleReboiler, null, '',  1, 0.4, 14, 14,
        'portOut;portConstraint=east;direction=east;');
        portOutEast.geometry.offset = new mxPoint(0, 0);
        portOutEast.geometry.relative = true;
        portOutEast['type'] = 'PortOut';
        portOutEast['typePort'] = 'Tube';

        let portInWest = graph.insertVertex(kettleReboiler, null, '', 0, 0.45, 14, 14,
        'portIn;portConstraint=west;direction=east;');
        portInWest.geometry.offset = new mxPoint(-14, 0);
        portInWest.geometry.relative = true;
        portInWest['type'] = 'PortIn';
        portInWest['typePort'] = 'Shell';
        
        kettleReboiler.setConnectable(false);
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
        
        return kettleReboiler; 
    }
}