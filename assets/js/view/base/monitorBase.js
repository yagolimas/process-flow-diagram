class PfdStreamDTO 
{
    constructor()
    {
        this.Id;
        this.StreamType;
        this.StreamName;
        this.INPortId;
        this.OutPortId;
        this.FeedStreamId;
        this.SplitterProductStreamId;
        this.GUID = guid();
    }
};

class PfdUnitDTO 
{
    constructor()
    {
        this.Id;
        this.UnitType;
        this.UnitName;
        this.PfdUnitOutPorts;
        this.PfdUnitInPorts;
        this.GUID = guid();
    }
};

class BasePortDTO 
{
    constructor()
    {
        this.Number;
        this.PfdUnitId;
        this.ConnectedStream;
        this.PfdUnitPortType;
        this.ExchangerSide;
        this.GUID = guid();
    }
};

class NetworkGetPfdUnitsDTOResponse 
{
    constructor(pfdUnits, pfdStreams)
    {
        this.PfdUnits = pfdUnits;
        this.PfdStreams = pfdStreams;
    }
};

function guid() {
    function hash4() {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    return hash4() + hash4() + '-' + hash4() + '-' + hash4() + '-' + hash4() + '-' + hash4() + hash4() + hash4();
};

function sendMonitorDto()
{
    // let inicial = JSON.parse(monitorEditBaselinePFD);
    // let actual = castGraphModelToMonitorDto();

    // for(let i = 0; i < initial.PfdStreams.length; i++)
    // {
    //     let stream = initial.PfdStreams[i];

    //     for(let a = 0; a < actual.PfdStreams.length; a++)
    //     {

    //     }
    // }

    // for(let i = 0; i < initial.PfdUnits.length; i++)
    // {

    // }
    callbackObj.getMonitorPFDObjects(JSON.stringify(castGraphModelToMonitorDto()));
};

function castGraphModelToMonitorDto()
{
    let cellsToFindDuplicates = Object.values(graph.model.cells);
    let PfdUnits = [];
    let PfdStreams = [];

    for(let i = 2; i < cellsToFindDuplicates.length; i++)
    {
        let actualCell = cellsToFindDuplicates[i];

        if(actualCell.edge)
        {
            let streamBase = new PfdStreamDTO();
            streamBase.Id = Number(actualCell.id);
            streamBase.StreamType = castStreamTypeTo(actualCell);
            streamBase.StreamName = actualCell.children[0].value;
            streamBase.OutPortId = actualCell.source != null ? actualCell.source.type.toLowerCase() == "portoutstream" ? null : Number(actualCell.source.parent.id) : null;
            streamBase.INPortId = actualCell.target != null ? actualCell.target.type.toLowerCase() == "portinstream" ? null : Number(actualCell.target.parent.id) : null;
            streamBase.SplitterProductStreamId = streamBase.StreamType == "SplitterProductStream" ? Number(actualCell.id) : null;
            streamBase.FeedStreamId = streamBase.StreamType == "FeedStream" ? Number(actualCell.id) : null;
            PfdStreams.push(streamBase);
        }
        else if(actualCell.type != null && actualCell.type == "Unit")
        {
            let unitBase = new PfdUnitDTO();

            //for to select ports 
            let inPorts = [];
            let outPorts = [];
            let children = actualCell.children;

            for(let p = 0; p < children.length; p++)
            {
                if(children[p].type.toLowerCase() == "portin" || children[p].type.toLowerCase() == "portout")
                {
                    let portAux = new BasePortDTO();

                    portAux.Number = Number(children[p].id);
                    portAux.PfdUnitId = Number(children[p].parent.id);
                    portAux.ConnectedStream = (children[p].edges != null && children[p].edges.length > 0) ? children[p].edges[0] != null ? Number(children[p].edges[0].id) : null : null;
                    portAux.PfdUnitPortType = children[p].type.toLowerCase() == "portin" ? 0 : 1;
                    portAux.ExchangerSide = children[p].typePort != null ? children[p].typePort.toLowerCase() == "tube" ? 1 : 0 : null;
                    
                    if(children[p].type.toLowerCase() == "portin")
                    {
                        inPorts.push(portAux);
                    }
                    else if(children[p].type.toLowerCase() == "portout")
                    {
                        outPorts.push(portAux);
                    }
                }
            }

            unitBase.Id = Number(actualCell.id);
            unitBase.UnitType = castUnitTypeToNumber(actualCell.name);
            unitBase.UnitName = actualCell.children[0].value;
            unitBase.PfdUnitInPorts = inPorts;
            unitBase.PfdUnitOutPorts = outPorts;
            PfdUnits.push(unitBase);
        }
    }

    let response = new NetworkGetPfdUnitsDTOResponse(PfdUnits, PfdStreams);
    
    // console.log(response);
    return response;
    // return response;
};

function castUnitTypeToNumber(type) 
{
    let returnType = null;
    switch (type) {
        case 'Heat Exchanger':
            returnType =  0;
            break;   
        case 'Mixer':
            returnType = 1;   
            break;   
        case 'Splitter':
            returnType = 2;   
            break;   
        case 'Cooler':
            returnType = 3;   
            break;   
        case 'Desalter':
            returnType = 4;   
            break;   
        case 'Flash Drum':
            returnType = 5;   
            break;   
        case 'Heater':
            returnType = 6;   
            break;   
        case 'Pump':
            returnType = 7;   
            break;  
        case 'Air Cooler':
            returnType = 8;   
            break;  
        case 'Kettle Reboiler':
            returnType = 9;   
            break;   
    }
    return returnType;
};

function castStreamTypeTo(cell) 
{
    let returnType = cell.type;
    
    if(cell.source != null && cell.source.parent != null && cell.source.parent.name == 'Splitter')
    {
        returnType = 'SplitterProductStream';
    }

    return returnType;
};

function generateBaselineMonitorPFD() 
{
    monitorEditBaselinePFD = castGraphModelToMonitorDto();
};