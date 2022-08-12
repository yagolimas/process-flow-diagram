class Desalter {    

    constructor(name, parent) {

        let desalter = graph.insertVertex(parent, null, '', 0, 0, 130, 60, 'unit;desalter;');
        desalter['type'] = 'Unit';                      
        desalter['name'] = 'Desalter';
        
        let tagName = graph.insertVertex(desalter, null, name, 1, 1, 0, 0,
        'fontSize=18;align=left;fillColor=#007ac9;fontColor=#fff;spacingLeft=-1;spacingRight=1', false);
        tagName.geometry.offset = new mxPoint(0.3, 0.3);
        tagName.geometry.relative = false;
        tagName['type'] = 'TagName';
        tagName['positionX'] = 130;
        tagName['positionY'] = 50;
        tagName.source = desalter;
        
        let tagAllocation = graph.insertVertex(desalter, null, "tag", 0.1, 0.1, 25, 20,
        'fillColor=#007ac9;fontColor=#fff;resizable=0;', false);
        tagAllocation.geometry.offset = new mxPoint(0.3, 0.3);
        tagAllocation.geometry.relative = false;
        tagAllocation['type'] = 'TagAllocation';
        tagAllocation['positionX'] = 130;
        tagAllocation['positionY'] = -10;
        
        let portIn = graph.insertVertex(desalter, null, '', 0, 0.4, 14, 14,
        'portIn;portConstraint=west;shape=triangle;direction=east;resizable=0');
        portIn.geometry.offset = new mxPoint(-16, 0);
        portIn.geometry.relative = true;
        portIn['type'] = 'PortIn'; 
        
        let portOut = graph.insertVertex(desalter, null, '', 1.02, 0.4, 14, 14,
        'portOut;portConstraint=east;shape=triangle;direction=east;resizable=0');
        portOut.geometry.offset = new mxPoint(0, 0);
        portOut.geometry.relative = true;
        portOut['type'] = 'PortOut'; 
        
        desalter.setConnectable(false);
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
        
        return desalter;
    }
}
