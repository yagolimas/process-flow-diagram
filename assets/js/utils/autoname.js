var exchanger = "E-";
var kettle = "Reb-";
var air = "AC-";
var cooler = "Cool-";
var desalter = "Des-";
var pump = "Pump-";
var heater = "Heat-";
var flash = "F-";
var splitter = "Split-";
var mixer = "Mix-";
var stream = "S-";
var column = "C-";
var accumulator = "Drum-";
var other = "X-";
var columnTop = "T-";

function autoname(autonames) {  
    
    let modal = openModalAutoname(autonames);

    const $buttonOk = document.querySelector("#save-autoname");
    const $buttonCancel = document.querySelector("#cancel-autoname");
    const $buttonHelp = document.querySelector("#btn-help");

    $buttonOk.onclick = function() {
        setInputNames();
        modal.close();
    };

    $buttonCancel.onclick = function() {
        modal.close();
    };

    $buttonHelp.onclick = function() {
        callbackObj.openHelpModal(34);
    };
    
    this.onkeyup = function (event) {
        event.preventDefault();

        const $modal = document.querySelector(".modal-autoname");
        if($modal != undefined && $modal != null)
        {
            if (event.keyCode === 13) {
                $buttonOk.click();
            } else if (event.keyCode === 27) {
                $buttonCancel.click();
            }
            //  else if (event.keyCode === 72) {
            //     $buttonHelp.click();
            // }
        }
    };
}

function openModalAutoname(autonames) 
{
    let modal = new Modal();
    let content = modal.createModalAutoname(autonames);
    //modal.removeContent();
    modal.createContent(content);
    modal.open();

    getInputNames(autonames);

    let inputs = document.getElementsByClassName('form-control');
    inputs[0].focus();
    return modal;
}

function getInputNames(autonames) {

    autonames.forEach(name => {
        document.querySelector(`#${ name.id }`).value =  name.value;
    });

    document.querySelector("#stream").value = stream;
}

function setInputNames() 
{
    cooler = document.querySelector('#cooler').value;
    pump = document.querySelector('#pump').value;
    stream =  document.querySelector("#stream").value;   
       
    
    if(App.app == 2)
    {       
        // ** Acretrene **
        accumulator =  document.querySelector("#accumulator").value; 
        other =  document.querySelector("#other").value; 
        heater = document.querySelector('#heater').value;

        autonameActrene.forEach(name => {
            if(name.id == "cooler")
            {
                name.value = cooler;
            }else if(name.id == "pump")
            {
                name.value = pump;
            }else if(name.id == "heater")
            {
                name.value = heater;
            }else if(name.id == "stream")
            {
                name.value = stream;
            }else if(name.id == "accumulator")
            {
                name.value = accumulator;
            }else if(name.id == "other")
            {
                name.value = other;
            }else if(name.id == "splitter")
            {
                name.value = splitter;
            }else if(name.id == "mixer")
            {
                name.value = mixer;
            }
        });
    }
    else if(App.app == 1)
    {
        // ** Pathfinder **
        columnTop =  document.querySelector("#columnTop").value;
        accumulator =  document.querySelector("#accumulator").value; 
        air = document.querySelector('#air').value;

        autonamePathfinder.forEach(name => {
            if(name.id == "cooler")
            {
                name.value = cooler;
            }else if(name.id == "pump")
            {
                name.value = pump;
            }else if(name.id == "airCooler")
            {
                name.value = air;
            }else if(name.id == "stream")
            {
                name.value = stream;
            }else if(name.id == "accumulator")
            {
                name.value = accumulator;
            }else if(name.id == "columnTop")
            {
                name.value = columnTop;
            }else if(name.id == "splitter")
            {
                name.value = splitter;
            }else if(name.id == "mixer")
            {
                name.value = mixer;
            }
        });
    }
    else if(App.app == 0)
    {
        // ** Monitor **
        air = document.querySelector('#air').value;
        exchanger = document.querySelector('#exchanger').value;
        kettle = document.querySelector('#kettle').value;
        desalter = document.querySelector('#desalter').value;
        flash = document.querySelector('#flash').value;
        splitter = document.querySelector('#splitter').value;
        mixer = document.querySelector('#mixer').value;
        heater = document.querySelector('#heater').value;

        autonameMonitor.forEach(name => {
            if(name.id == "cooler")
            {
                name.value = cooler;
            }else if(name.id == "pump")
            {
                name.value = pump;
            }else if(name.id == "airCooler")
            {
                name.value = air;
            }else if(name.id == "stream")
            {
                name.value = stream;
            }else if(name.id == "exchanger")
            {
                name.value = exchanger;
            }else if(name.id == "kettle")
            {
                name.value = kettle;
            }else if(name.id == "flash")
            {
                name.value = flash;
            }else if(name.id == "desalter")
            {
                name.value = desalter;
            }else if(name.id == "heater")
            {
                name.value = heater;
            }else if(name.id == "splitter")
            {
                name.value = splitter;
            }else if(name.id == "mixer")
            {
                name.value = mixer;
            }
        });
    }
}