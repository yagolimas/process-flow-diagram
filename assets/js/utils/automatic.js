function automaticRouting() {

    let cells = graph.getSelectionCells();

    if (cells != null) {
        cells = graph.addAllEdges(cells);
        
        try 
        {
            graph.getModel().beginUpdate();

            for (let i = 0; i < cells.length; i++) {
                let cell = cells[i];

                if (graph.getModel().isEdge(cell)) {
                    let geo = graph.getCellGeometry(cell);

                    if (geo != null) {
                        geo = geo.clone();
                        geo.points = null;
                        graph.getModel().setGeometry(cell, geo);
                    }
                }
            }
        }
        finally {
            graph.getModel().endUpdate();
        }
    }
};