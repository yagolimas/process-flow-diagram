class AirCooler {    

    constructor(name, parent) {

        let airCooler = graph.insertVertex(parent, null, '', 0, 0, 95, 80, 'unit;airCooler;');                
        airCooler['type'] = 'Unit';        
        airCooler['name'] = 'Air Cooler';      
        
        let tagName = graph.insertVertex(airCooler, null, name, 1, 1, 0, 0, 'unitName', false);
        tagName.geometry.offset = new mxPoint(0.3, 0.3);
        tagName.geometry.relative = false;
        tagName['type'] = 'TagName';
        tagName['positionX'] = 100;
        tagName['positionY'] = 60;
        tagName.source = airCooler;
        
        let tagAllocation = graph.insertVertex(airCooler, null, "tag", 0.1, 0.1, 25, 20, 'tagAllc', false);
        tagAllocation.geometry.offset = new mxPoint(0.3, 0.3);
        tagAllocation.geometry.relative = false;
        tagAllocation['type'] = 'TagAllocation';
        tagAllocation['positionX'] = 100;
        tagAllocation['positionY'] = 0;
                
        let portIn = graph.insertVertex(airCooler, null, '', 0, 0.3, 14, 14,
        'portIn;portConstraint=west;direction=east;', false);
        portIn.geometry.offset = new mxPoint(-10, 0);
        portIn.geometry.relative = true;
        portIn['type'] = 'PortIn';

        let portOut = graph.insertVertex(airCooler, null, '', 0.95, 0.3, 14, 14,
        'portOut;portConstraint=east;direction=east;', false);
        portOut.geometry.offset = new mxPoint(0, 0);
        portOut.geometry.relative = true;
        portOut['type'] = 'PortOut';
        
        airCooler.setConnectable(false);
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
                
        return airCooler;
    }
}


        
/* let portIn = graph.insertVertex(airCooler, null, '', 0, 0, 10, 10, 'portIn;, true);
let portOut = graph.insertVertex(airCooler, null, '', 0, 0, 10, 10, 'portOut;portConstraint=east;direction=east;perimeter=true;', true); */

//let edge = graph.insertEdge(airCooler, null, '', portOut, null, '');
//var e2 = graph.insertEdge(airCooler, null, '', portOut, tagName, '');

//let fi = graph.insertVertex(parent, null, '', 200, 150, 80, 30);
//e1 = graph.insertEdge(parent, null, 'shazam', portOut, fi);

/* portIn.geometry.offset = new mxPoint(-5, 38);*/
//portOut.geometry.offset = new mxPoint(107, 38); 

//console.log(model)

//portIn.setConnectable(true);
//portOut.setConnectable(true);


/* var ports2 = new Array();

ports2['out1'] = {x: 0.5, y: 0, perimeter: true, constraint: 'north east'};
ports2['out2'] = {x: 1, y: 0.5, perimeter: true, constraint: 'east'};
ports2['out3'] = {x: 0.5, y: 1, perimeter: true, constraint: 'south east'};

mxTriangle.prototype.getPorts = function()
{
    return ports2;
};

graph.connectionHandler.isConnectableCell = function(cell)
{
    return false;
};

mxEdgeHandler.prototype.isConnectableCell = function(cell)
{
    return graph.connectionHandler.isConnectableCell(cell);
};

// Disables existing port functionality
graph.view.getTerminalPort = function(state, terminal, source)
{
    return terminal;
};

// Returns all possible ports for a given terminal
graph.getAllConnectionConstraints = function(terminal, source)
{
    if (terminal != null && terminal.shape != null && terminal.shape.stencil != null)
    {
        // for stencils with existing constraints...
        if (terminal.shape.stencil != null)
        {
            return terminal.shape.stencil.constraints;
        }
    }
    else if (terminal != null && this.model.isVertex(terminal.cell))
    {
        if (terminal.shape != null)
        {
            var ports = terminal.shape.getPorts();
            var cstrs = new Array();
            
            for (var id in ports)
            {
                var port = ports[id];
                
                var cstr = new mxConnectionConstraint(new mxPoint(port.x, port.y), port.perimeter);
                cstr.id = id;
                cstrs.push(cstr);
            }
            
            return cstrs;
        }
    }
    
    return null;
};

// Sets the port for the given connection
graph.setConnectionConstraint = function(edge, terminal, source, constraint)
{
    if (constraint != null)
    {
        var key = (source) ? mxConstants.STYLE_SOURCE_PORT : mxConstants.STYLE_TARGET_PORT;
        
        if (constraint == null || constraint.id == null)
        {
            this.setCellStyles(key, null, [edge]);
        }
        else if (constraint.id != null)
        {
            this.setCellStyles(key, constraint.id, [edge]);
        }
    }
};

// Returns the port for the given connection
graph.getConnectionConstraint = function(edge, terminal, source)
{
    var key = (source) ? mxConstants.STYLE_SOURCE_PORT : mxConstants.STYLE_TARGET_PORT;
    var id = edge.style[key];
    
    if (id != null)
    {
        var c =  new mxConnectionConstraint(null, null);
        c.id = id;
        
        return c;
    }
    
    return null;
};
// Returns the actual point for a port by redirecting the constraint to the port        
graphGetConnectionPoint = graph.getConnectionPoint;

graph.getConnectionPoint = function(vertex, constraint)
{
    if (constraint.id != null && vertex != null && vertex.shape != null)
    {
        var port = vertex.shape.getPorts()[constraint.id];
        
        if (port != null)
        {
            constraint = new mxConnectionConstraint(new mxPoint(port.x, port.y), port.perimeter);
        }
    }
    
    return graphGetConnectionPoint.apply(this, arguments);
}; */