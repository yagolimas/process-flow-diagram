function redraw() {    
    try
    {
        let cellsCreated = Object.values(graph.getModel().cells);
        if (graph.isEnabled() && cellsCreated.length > 2)
        {
            graph.removeCells(graph.getChildVertices(graph.getDefaultParent()), true, true);
	        graph.removeEmptyArrows();
            
            if(App.action == 'edit'){
                containerOpened.checkConnectivityModalCreate(null, false);
            }
            graph.refresh();
        }
    }
    catch (e)
    {
        //alert(e);
    }
};