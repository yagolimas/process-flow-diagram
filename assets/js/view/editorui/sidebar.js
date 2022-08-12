Sidebar = function(){
    this.init();
};

Sidebar.prototype.init = function() {
    let sideContainer = document.querySelector(".sideContainer");

    mxDragSource.prototype.getDropTarget = function(graph, x, y)
    {
        let cell = editor.graph.getCellAt(x, y);
        
        return !editor.graph.isValidDropTarget(cell) ? null : cell;
    };    

    let application = App.app;

    switch (application) {
        case 0:
            
            addToolbarItem(graph, sideContainer, 'assets/img/heat_exchanger.png', 'Heat_Exchanger', new HeatExchangerController());
                
            addToolbarItem(graph, sideContainer, 'assets/img/kettle.png', 'KettleReboiler', new KettleReboilerController());

            addToolbarItem(graph, sideContainer, 'assets/img/air_cooler.png', 'Air_Cooler', new AirCoolerController());
            
            addToolbarItem(graph, sideContainer, 'assets/img/nMixer.png', 'Mixer', new MixerController());
            
            addToolbarItem(graph, sideContainer, 'assets/img/nSplitter.png', 'Splitter', new SplitterController());

            addToolbarItem(graph, sideContainer, 'assets/img/cooler.png', 'Cooler', new CoolerController());
            
            addToolbarItem(graph, sideContainer, 'assets/img/heater.png', 'Heater', new HeaterController());

            addToolbarItem(graph, sideContainer, 'assets/img/desalter.png', 'Desalter', new DesalterController());
            
            addToolbarItem(graph, sideContainer, 'assets/img/flash_drum.png', 'Flash', new FlashDrumController());

            addToolbarItem(graph, sideContainer, 'assets/img/pump.png', 'Pump', new PumpController());
            
           break;
        case 1:

            addToolbarItem(graph, sideContainer, 'assets/img/column_top.png', 'ColumnTop', new ColumnTopController());
        
            addToolbarItem(graph, sideContainer, 'assets/img/air_cooler.png', 'Air_Cooler', new AirCoolerController());
                
            addToolbarItem(graph, sideContainer, 'assets/img/nMixer.png', 'Mixer', new MixerController());
            
            addToolbarItem(graph, sideContainer, 'assets/img/nSplitter.png', 'Splitter', new SplitterController());

            addToolbarItem(graph, sideContainer, 'assets/img/cooler.png', 'Cooler', new CoolerController());
            
            addToolbarItem(graph, sideContainer, 'assets/img/accumulator.png', 'Accumulator', new AccumulatorController());
            
            addToolbarItem(graph, sideContainer, 'assets/img/pump.png', 'Pump', new PumpController());
            
            break;
        case 2:
                
            //addToolbarItem(graph, sideContainer, 'assets/img/column.png', 'Column', new ColumnController());

            addToolbarItem(graph, sideContainer, 'assets/img/nMixer.png', 'Mixer', new MixerController());
                
            addToolbarItem(graph, sideContainer, 'assets/img/nSplitter.png', 'Splitter', new SplitterController());
            
            addToolbarItem(graph, sideContainer, 'assets/img/cooler.png', 'Cooler', new CoolerController());
            
            addToolbarItem(graph, sideContainer, 'assets/img/heater.png', 'Heater', new HeaterController());
            
            addToolbarItem(graph, sideContainer, 'assets/img/accumulator.png', 'Accumulator', new AccumulatorController());
            
            addToolbarItem(graph, sideContainer, 'assets/img/pump.png', 'Pump', new PumpController());
            
            addToolbarItem(graph, sideContainer, 'assets/img/other.png', 'Other', new OtherController());

           break;
    }
    
    function addToolbarItem(graph, sidebar, image, id, controller)
    {        
        var funct = function(graph, evt, cell, x, y) {        
            controller.add(graph, evt);
        }
        
        var unitName = controller.name;
        var div = document.createElement('div');
        div.setAttribute('model-name', unitName);
        div.setAttribute('id', id);

        var img = document.createElement('img');
        img.setAttribute('src', image);
        img.classList.add("imgSidebarMode");
        
        div.appendChild(img);
        sidebar.appendChild(div);

        var dragElt = document.createElement('div');
        dragElt.style.border = 'dashed black 1px';
        dragElt.style.width = '80px';
        dragElt.style.height = '80px';

        mxUtils.makeDraggable(img, graph, funct, dragElt, 0, 0, true, true);
    }  
};

Sidebar.prototype.showHideTools = function() {
    var sidebar = document.getElementsByClassName("sideContainer")[0];
    
    if (typeof sidebar !== 'undefined' && sidebar != null) {
        let liSub = document.getElementById('toolbox');

        if (sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            liSub.classList.remove("checked");
            return false;
        } else {
            sidebar.classList.add('active');
            liSub.classList.add("checked");
            return true;
        }
    }
    return false;
};