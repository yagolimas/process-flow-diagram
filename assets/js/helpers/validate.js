function createNameSequence(valueNamed, style, exists) {
    
    if (valueNamed == undefined || valueNamed == null || valueNamed == 'undefined') {
        valueNamed = "";
    }

    let valid = graphEditor.validateCellNames(valueNamed, exists);

    let type = style;

    if (style.indexOf(";") > 0)
        type = style.split(';')[0];

    valueToReturn = valueNamed;

    if ((valid && App.app == 2) || (!valid && (App.app == 1 || App.app == 0))) {
        switch (type) {
            case "accumulator":
                valueToReturn = accumulator + countAccumulator;
                countAccumulator++;
                break;
            case "exchanger":
                valueToReturn = exchanger + countExchanger;
                countExchanger++;
                break;
            case "splitter":
                valueToReturn = splitter + countSplitter;
                countSplitter++;
                break;
            case "pump":
                valueToReturn = pump + countPump;
                countPump++;
                break;
            case "other":
                valueToReturn = other + countOther;
                countOther++;
                break;
            case "mixer":
                valueToReturn = mixer + countMixer;
                countMixer++;
                break;
            case "kettleReboiler":
                valueToReturn = kettle + countKettleReboiler;
                countKettleReboiler++;
                break;
            case "heater":
                valueToReturn = heater + countHeater;
                countHeater++;
                break;
            case "flash":
                valueToReturn = flash + countFlash;
                countFlash++;
                break;
            case "desalter":
                valueToReturn = desalter + countDesalter;
                countDesalter++;
                break;
            case "cooler":
                valueToReturn = cooler + countCooler;
                countCooler++;
                break;
            case "columnTop":
                valueToReturn = columnTop + countColumnTop;
                countColumnTop++;
                break;
            case "column":
                valueToReturn = column + countColumn;
                countColumn++;
                break;
            case "airCooler":
                valueToReturn = air + countAirCooler;
                countAirCooler++;
                break;
            case "stream":
                valueToReturn = stream + countStream;
                countStream++;
                break;
        }
    }

    return valueToReturn;
};

function validateCellNames(valueNamed, exists) {
    
    let cells = graph.getModel().cells;
    let count = 0;

    if(valueNamed == "" && App.application == 2)
    {
        return true;
    }
    else if (valueNamed == "") 
    {
        return false;
    }

    for (let i in cells) {
        if (cells[i] != null && cells[i].style != null && cells[i].style.indexOf("portOut") != 0 && cells[i].style.indexOf("portIn") != 0) {
            if (exists != null && exists != cells[i].mxObjectId && valueNamed == cells[i].value + "") {
                return false;
            }
            else if (exists == null && valueNamed == cells[i].value + "") {
                return false;
            }
        }
    }

    return true;
};