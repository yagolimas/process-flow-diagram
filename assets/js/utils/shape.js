function initStyles() {

    /** Style Stream Name */
    let styleStream = {};
    styleStream[mxConstants.STYLE_SPACING] = '10';
    graph.getStylesheet().putCellStyle('stream', styleStream);

    /** Style Unit */
    let styleUnit = {};
    styleUnit[mxConstants.STYLE_DIRECTION] = 'east';
    styleUnit[mxConstants.STYLE_RESIZABLE] = 0;
    styleUnit[mxConstants.STYLE_FOLDABLE] = 0;
    styleUnit[mxConstants.STYLE_AUTOSIZE] = 0;
    styleUnit[mxConstants.STYLE_EDITABLE] = 0;
    graph.getStylesheet().putCellStyle('unit', styleUnit);

    /** Style Port Output */
    let stylePortIn = {};
    stylePortIn[mxConstants.STYLE_GRADIENTCOLOR] = 'white';
    stylePortIn[mxConstants.STYLE_FILLCOLOR] = 'white';
    stylePortIn[mxConstants.STYLE_STROKECOLOR] = '#007ac9';
    stylePortIn[mxConstants.STYLE_SHAPE] = 'triangle';
    stylePortIn[mxConstants.STYLE_PERIMETER] = mxPerimeter.TrianglePerimeter;
    stylePortIn[mxConstants.STYLE_STROKEWIDTH] = '1.5';
    stylePortIn[mxConstants.STYLE_DELETABLE] = 0;
    stylePortIn[mxConstants.STYLE_RESIZABLE] = 0;
    stylePortIn[mxConstants.STYLE_FOLDABLE] = 0;
    stylePortIn[mxConstants.STYLE_AUTOSIZE] = 0;
    stylePortIn[mxConstants.STYLE_EDITABLE] = 0;
    graph.getStylesheet().putCellStyle('portIn', stylePortIn);

    /** Style Port Input */
    let stylePortOut = {};
    stylePortOut[mxConstants.STYLE_GRADIENTCOLOR] = 'white';
    stylePortOut[mxConstants.STYLE_FILLCOLOR] = 'white';
    stylePortOut[mxConstants.STYLE_STROKECOLOR] = '#e00034';
    stylePortOut[mxConstants.STYLE_SHAPE] = 'triangle';
    stylePortOut[mxConstants.STYLE_PERIMETER] = mxPerimeter.TrianglePerimeter;
    stylePortOut[mxConstants.STYLE_STROKEWIDTH] = '1.5';
    stylePortOut[mxConstants.STYLE_DELETABLE] = 0;
    stylePortOut[mxConstants.STYLE_RESIZABLE] = 0;
    stylePortOut[mxConstants.STYLE_FOLDABLE] = 0;
    stylePortOut[mxConstants.STYLE_AUTOSIZE] = 0;
    stylePortOut[mxConstants.STYLE_EDITABLE] = 0;
    graph.getStylesheet().putCellStyle('portOut', stylePortOut);

    /** Style Port Output For Stream */
    let stylePortInStream = {};
    stylePortInStream[mxConstants.STYLE_GRADIENTCOLOR] = 'white';
    stylePortInStream[mxConstants.STYLE_FILLCOLOR] = 'white';
    stylePortInStream[mxConstants.STYLE_STROKECOLOR] = '#007ac9';
    stylePortInStream[mxConstants.STYLE_SHAPE] = 'triangle';
    stylePortInStream[mxConstants.STYLE_PERIMETER] = mxPerimeter.TrianglePerimeter;
    stylePortInStream[mxConstants.STYLE_STROKEWIDTH] = '1.5';
    stylePortInStream[mxConstants.STYLE_RESIZABLE] = 0;
    stylePortInStream[mxConstants.STYLE_FOLDABLE] = 0;
    stylePortInStream[mxConstants.STYLE_AUTOSIZE] = 0;
    stylePortInStream[mxConstants.STYLE_EDITABLE] = 0;
    stylePortInStream[mxConstants.STYLE_ROTATABLE] = 1;
    stylePortInStream[mxConstants.STYLE_MOVABLE] = 1;
    stylePortInStream[mxConstants.STYLE_DELETABLE] = 0;
    stylePortInStream['name'] = 'portInStream';
    graph.getStylesheet().putCellStyle('portInStream', stylePortInStream);

    /** Style Port Output For Stream */
    let stylePortOutStream = {};
    stylePortOutStream[mxConstants.STYLE_GRADIENTCOLOR] = 'white';
    stylePortOutStream[mxConstants.STYLE_FILLCOLOR] = 'white';
    stylePortOutStream[mxConstants.STYLE_STROKECOLOR] = '#e00034';
    stylePortOutStream[mxConstants.STYLE_SHAPE] = 'triangle';
    stylePortOutStream[mxConstants.STYLE_PERIMETER] = mxPerimeter.TrianglePerimeter;
    stylePortOutStream[mxConstants.STYLE_STROKEWIDTH] = '1.5';
    stylePortOutStream[mxConstants.STYLE_RESIZABLE] = 0;
    stylePortOutStream[mxConstants.STYLE_FOLDABLE] = 0;
    stylePortOutStream[mxConstants.STYLE_AUTOSIZE] = 0;
    stylePortOutStream[mxConstants.STYLE_EDITABLE] = 0;
    stylePortOutStream[mxConstants.STYLE_ROTATABLE] = 1;
    stylePortOutStream[mxConstants.STYLE_MOVABLE] = 1;
    stylePortOutStream[mxConstants.STYLE_DELETABLE] = 0;
    stylePortInStream['name'] = 'portOutStream';
    graph.getStylesheet().putCellStyle('portOutStream', stylePortOutStream);

    /** Style Unit Name */
    let styleUnitName = {};
    styleUnitName[mxConstants.STYLE_FILLCOLOR] = '#007ac9';
    styleUnitName[mxConstants.STYLE_FONTSIZE] = '18';
    styleUnitName[mxConstants.STYLE_FONTCOLOR] = '#fff';
    styleUnitName[mxConstants.STYLE_ALIGN] = 'left';
    styleUnitName[mxConstants.STYLE_DELETABLE] = 0;
    styleUnitName[mxConstants.STYLE_RESIZABLE] = 0;
    styleUnitName[mxConstants.STYLE_SPACING_LEFT] = -1;
    styleUnitName[mxConstants.STYLE_SPACING_RIGHT] = 1;
    styleUnitName[mxConstants.STYLE_ROTATABLE] = 0;
    styleUnitName[mxConstants.STYLE_MOVABLE] = 1;
    graph.getStylesheet().putCellStyle('unitName', styleUnitName);

    /** Style Tag Allocation */
    let styleTagAllocation = {};
    styleTagAllocation[mxConstants.STYLE_FILLCOLOR] = '#007ac9';
    styleTagAllocation[mxConstants.STYLE_FONTCOLOR] = '#fff';
    styleTagAllocation[mxConstants.STYLE_RESIZABLE] = 0;
    graph.getStylesheet().putCellStyle('tagAllc', styleTagAllocation);

    /** Style Stream Name */
    let styleStreamName = {};
    styleStreamName[mxConstants.STYLE_FILLCOLOR] = '#007ac9';
    styleStreamName[mxConstants.STYLE_FONTSIZE] = '18';
    styleStreamName[mxConstants.STYLE_FONTCOLOR] = '#fff';
    styleStreamName[mxConstants.STYLE_ALIGN] = 'left';
    styleStreamName[mxConstants.STYLE_DELETABLE] = 0;
    styleStreamName[mxConstants.STYLE_RESIZABLE] = 0;
    styleStreamName[mxConstants.STYLE_SPACING_LEFT] = -1;
    styleStreamName[mxConstants.STYLE_SPACING_RIGHT] = 1;
    styleStreamName[mxConstants.STYLE_ROTATABLE] = 0;
    graph.getStylesheet().putCellStyle('streamName', styleStreamName);

    //** Style Individual Accumulator */ 
    let styleAccumulator = {};
    styleAccumulator[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
    styleAccumulator[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
    styleAccumulator[mxConstants.STYLE_IMAGE] = 'assets/img/accumulator.png';
    graph.getStylesheet().putCellStyle('accumulator', styleAccumulator);

    //** Style Individual Cooler */
    let styleAirCooler = {};
    styleAirCooler[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
    styleAirCooler[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
    styleAirCooler[mxConstants.STYLE_IMAGE] = 'assets/img/air_cooler.png';
    graph.getStylesheet().putCellStyle('airCooler', styleAirCooler);

    //** Style Individual Heater */
    let styleHeater = {};
    styleHeater[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
    styleHeater[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
    styleHeater[mxConstants.STYLE_IMAGE] = 'assets/img/heater.png';
    graph.getStylesheet().putCellStyle('heater', styleHeater);

    //** Style Individual Column */
    let styleColumn = {};
    styleColumn[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
    styleColumn[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
    styleColumn[mxConstants.STYLE_DELETABLE] = 1;
    styleColumn[mxConstants.STYLE_IMAGE] = 'assets/img/column.png';
    graph.getStylesheet().putCellStyle('column', styleColumn);

    //** Style Individual  Cooler */
    let styleCooler = {};
    styleCooler[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
    styleCooler[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
    styleCooler[mxConstants.STYLE_IMAGE] = 'assets/img/cooler.png';
    graph.getStylesheet().putCellStyle('cooler', styleCooler);

    //** Style Individual Column Top */
    let styleColumnTop = {};
    styleColumnTop[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
    styleColumnTop[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
    styleColumnTop[mxConstants.STYLE_IMAGE] = 'assets/img/column_top.png';
    graph.getStylesheet().putCellStyle('columnTop', styleColumnTop);

    //** Style Individual Desalter */
    let styleDesalter = {};
    styleDesalter[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
    styleDesalter[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
    styleDesalter[mxConstants.STYLE_IMAGE] = 'assets/img/desalter.png';
    graph.getStylesheet().putCellStyle('desalter', styleDesalter);

    //** Style Individual Flash Drum */
    let styleFlash = {};
    styleFlash[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
    styleFlash[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
    styleFlash[mxConstants.STYLE_IMAGE] = 'assets/img/flash_drum.png';
    graph.getStylesheet().putCellStyle('flash', styleFlash);

    //** Style Individual Heat Exchanger */
    let styleExchanger = {};
    styleExchanger[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
    styleExchanger[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
    styleExchanger[mxConstants.STYLE_IMAGE] = 'assets/img/heat_exchanger.png';
    graph.getStylesheet().putCellStyle('exchanger', styleExchanger);

    //** Style Individual Kettle Reboiler */
    let styleKettleReboiler = {};
    styleKettleReboiler[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
    styleKettleReboiler[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
    styleKettleReboiler[mxConstants.STYLE_IMAGE] = 'assets/img/kettle.png';
    graph.getStylesheet().putCellStyle('kettleReboiler', styleKettleReboiler);

    //** Style Individual Mixer */
    let styleMixer = {};
    styleMixer[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
    styleMixer[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
    styleMixer[mxConstants.STYLE_IMAGE] = 'assets/img/splitter_mixer.png';
    graph.getStylesheet().putCellStyle('mixer', styleMixer);

    //** Style Individual Other */
    let styleOther = {};
    styleOther[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
    styleOther[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
    styleOther[mxConstants.STYLE_IMAGE] = 'assets/img/other.png';
    graph.getStylesheet().putCellStyle('other', styleOther);

    //** Style Individual Pump */    
    let stylePump = {};
    stylePump[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
    stylePump[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
    stylePump[mxConstants.STYLE_IMAGE] = 'assets/img/pump.png';
    graph.getStylesheet().putCellStyle('pump', stylePump);

    //** Style Individual Splitter */
    let styleSplitter = {};
    styleSplitter[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
    styleSplitter[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
    styleSplitter[mxConstants.STYLE_IMAGE] = 'assets/img/splitter_mixer.png';
    graph.getStylesheet().putCellStyle('splitter', styleSplitter);
};