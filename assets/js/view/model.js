var graph;

function GraphModel(container, model) {   

    if (!GraphModel.graph) {
        graph = new mxGraph(container, model);
    }
    return graph;
}