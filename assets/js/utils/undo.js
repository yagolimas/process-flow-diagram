function undo(editor) {

    try {
        //let graph = editor.graph;	

        if (graph.isEditing()) {

            let value = graph.cellEditor.textarea.innerHTML;
            document.execCommand('undo', false, null);

            if (value == graph.cellEditor.textarea.innerHTML) {
                graph.stopEditing(true);
                undoManager.undo();
            }
        }
        else {
            undoManager.undo();
        }
    }
    catch (e) {
        // alert('undo 0 => ' + e);
    }
    finally {

        let cells = graph.getSelectionModel().cells;
        let units = [];

        for (let j = 0; j < cells.length; j++) {

            if (cells[i].style.includes("unit;")) {
                units.push(cells[i]);
            }

            if (cells[j].edge != null && cells[j].edge == true) {

                if (cells[j].target == null && cells[j].source != null) {
                    cells[j].style = 'html=1;startArrow=dash;startSize=14;endArrow=block;endSize=14;sourcePerimeterSpacing=0;startFill=0;endFill=0;fillColor=red;edgeStyle=orthogonalEdgeStyle;strokeWidth=2;spacingTop=4;spacingbottom=4;spacingLeft=4;spacingRight=4;points=[];shadow=1;highlight=1;';
                }
                else if (cells[j].source == null && cells[j].target != null) {
                    //cells[j].style = 'html=1;startArrow=block;startSize=14;endArrow=dash;endSize=14;sourcePerimeterSpacing=0;startFill=0;endFill=0;fillColor=red;edgeStyle=orthogonalEdgeStyle;strokeWidth=2;spacingTop=4;spacingbottom=4;spacingLeft=4;spacingRight=4;points=[];shadow=1;highlight=1;';
                    cells[j].style = `html=1;endArrow=none;strokeColor=black;fillColor=black;html=1;edgeStyle=orthogonalEdgeStyle;`;
                }
                else if (cells[j].source == null && cells[j].target == null) {
                    cells[j].style = 'html=1;startArrow=block;startSize=14;endArrow=block;endSize=14;sourcePerimeterSpacing=0;startFill=0;endFill=0;fillColor=red;edgeStyle=orthogonalEdgeStyle;strokeWidth=2;spacingTop=4;spacingbottom=4;spacingLeft=4;spacingRight=4;points=[];shadow=1;highlight=1;';
                }
                else if (cells[j].source != null && cells[j].target != null) {
                    cells[j].style = 'html=1;edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;spacingRight=2;spacingLeft=2;jettySize=auto;orthogonalLoop=1;jumpSize=6;jumpStyle=gap;strokeColor=#000;fillColor=#000;startArrow=dash;startSize=14;endArrow=dash;endSize=14;sourcePerimeterSpacing=0;fill=1;startFill=1;endFill=3;strokeWidth=2;spacingTop=4;spacingbottom=4;spacingLeft=4;spacingRight=4;points=[];shadow=1;highlight=1;';
               }
            }
        }

        graph.orderCells(false, [units]);
        graph.refresh();
    }
};

function canUndo() {
    return graph.isEditing() || undoManager.canUndo();
};