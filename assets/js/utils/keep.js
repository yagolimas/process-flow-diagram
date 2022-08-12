var isKeepUnit = true;

function keep(sender, evt) 
{
    if(streamsToKeepWithUnits.includes(sender))
    {
        let index = streamsToKeepWithUnits.indexOf(sender);
        if (index > -1) 
        {
            streamsToKeepWithUnits.splice(index, 1);
        }
    }
    else
    {
        streamsToKeepWithUnits.push(sender);
    }
};

function isStream(streamType) {
    return (streamType == "FeedStream" || streamType == "ProductStream" || streamType == "InternalStream");
}

function isKeepUnit() {
    isKeepUnit = isKeepUnit ? false : true;
};

/* graph.getSelectionModel().addListener(mxEvent.CHANGE, function(sender, evt)
{        
    let cell = sender.cells[0];

    if (cell && cell.type == "Unit" && isKeepUnit) {
        
        if (cell.children.length > 0) {

            cell.children.forEach(children => {

                if (children.edges) {
                    sender.cells.push(children.edges[0]);
                }
            });
        }
    }
}); */