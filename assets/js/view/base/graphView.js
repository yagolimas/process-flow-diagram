var graphView =
{
    scale:0.7,
    scrollTop:0,
    scrollLeft:0
}


function updateGraphView(isEdit) {
    if(isEdit == null){
      isEdit = false;
    }

    if(App.action == 'view' || isEdit) {
        graphView.scale = graph.view.scale;
        graphView.scrollTop = container.scrollTop;
        graphView.scrollLeft = container.scrollLeft;

        return graphView;
    }
}

function removeDuplicates(arr){
    let unique_array = []
    for(let i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1){
            unique_array.push(arr[i])
        }
    }
    return unique_array
}