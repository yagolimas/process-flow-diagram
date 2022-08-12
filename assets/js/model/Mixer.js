class Mixer {    

    constructor(name, parent) {

        let mixer = graph.insertVertex(parent, null, '', 0, 0, 65, 65, 'unit;mixer;');                
        mixer['type'] = 'Unit';
        mixer['name'] = 'Mixer';

        let tagName = graph.insertVertex(mixer, null, '-', 1, 1, 0, 0, 'unitName', false);
        tagName.geometry.offset = new mxPoint(0.3, 0.3);
        tagName.geometry.relative = false;
        tagName['type'] = 'TagName';
        tagName['positionX'] = 65;
        tagName['positionY'] = 55;
        tagName.source = mixer;
        
        let tagAllocation = graph.insertVertex(mixer, null, "tag", 0.1, 0.1, 25, 20, 'tagAllc', false);
        tagAllocation.geometry.offset = new mxPoint(0.3, 0.3);
        tagAllocation.geometry.relative = false;
        tagAllocation['type'] = 'TagAllocation';
        tagAllocation['positionX'] = 65;
        tagAllocation['positionY'] = -10;

        let portInTop = graph.insertVertex(mixer, null, null, 0.395, 0, 14, 14,
        'portIn;portConstraint=north;direction=south;', false);
        portInTop.geometry.offset = new mxPoint(0, -17);
        portInTop.geometry.relative = true;
        portInTop['type'] = 'PortIn'; 
        
        let portInBottom = graph.insertVertex(mixer, null, null, 0.395, 1.04, 14, 14,
        'portIn;portConstraint=south;direction=north;', false);
        portInBottom.geometry.offset = new mxPoint(0, 0);
        portInBottom.geometry.relative = true;
        portInBottom['type'] = 'PortIn'; 

        let portInWest = graph.insertVertex(mixer, null, null, 0, 0.41, 14, 14,
        'portIn;portConstraint=west;direction=east;', false);
        portInWest.geometry.offset = new mxPoint(-14, 0);
        portInWest.geometry.relative = true;
        portInWest['type'] = 'PortIn';

        let portOut = graph.insertVertex(mixer, null, null, 1, 0.41, 14, 14,
        'portOut;portConstraint=east;direction=east;', false);
        portOut.geometry.offset = new mxPoint(0, 0);
        portOut.geometry.relative = true;
        portOut['type'] = 'PortOut'; 

        
        mixer.setConnectable(false);
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
        tagName.setValue(name);
        setGeometryName(tagName);

        graph.updateCellSize(tagName);
        
        return mixer;
    }
}
