function zoom(factor, center) {
    factor = Math.max(0.01, Math.min(graph.view.scale * factor, 160)) / graph.view.scale;

    mxGraph.prototype.zoom.apply(graph, arguments);
};

function zoomIn() {

    if (graph.view.scale < 0.15) {
        this.zoom((graph.view.scale + 0.01) / graph.view.scale);
    }
    else {
        this.zoom((Math.round(graph.view.scale * graph.zoomFactor * 20) / 20) / graph.view.scale);
    }
};

function zoomOut() {

    if (graph.view.scale <= 0.15) {
        this.zoom((graph.view.scale - 0.01) / graph.view.scale);
    }
    else {
        this.zoom((Math.round(graph.view.scale * (1 / graph.zoomFactor) * 20) / 20) / graph.view.scale);
    }
};


function zoomWheeling() {
    mxEvent.addListener(document, 'keydown', function (event) {
        if (mxEvent.isShiftDown(event) || mxEvent.isControlDown(event)) {
            container.style.cursor = "pointer";
        }

        mxEvent.addMouseWheelListener(function (evt, up) {
            if (mxEvent.isControlDown(evt)) {
                if (!mxEvent.isConsumed(evt)) {
                    cursorPosition = new mxPoint(mxEvent.getClientX(evt), mxEvent.getClientY(evt));
                    try
                    {
                        if (up) {
                            container.classList.remove('crollDown');
                            container.classList.add('crollUp');
                            container.style.cursor = "zoom-in";
                           
                            zoomIn()
                        }
                        else {
                            container.classList.remove('crollUp');
                            container.classList.add('crollDown');
                            container.style.cursor = "zoom-out";
    
                            zoomOut()
                        }
                    }
                    catch(e)
                    {
                        // alert('zoomWheeling => ' + e);
                    }

                    mxEvent.consume(evt);
                    updateGraphView();

                    // graph.lazyZoom(up);
                    // mxEvent.consume(evt);
                }
            }
        });
    });

    mxEvent.addListener(document, 'keyup', function (event) {
        container.style.cursor = "default";
    });

    mxEvent.addListener(document, 'mouseup', function (event) {
        container.style.cursor = "default";
    });
};