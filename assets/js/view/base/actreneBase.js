ActreneBase = function () {
    //this.init();
    //this.createModel();
    // this.updateNames('[{"Id":-1,"IndexPfd":null,"IndexApp":0,"Name":"Stripper 3","Type":"Deethaniser 1"},{"Id":-1,"IndexPfd":null,"IndexApp":1,"Name":"Deeth2","Type":"Deethaniser 2"},{"Id":-1,"IndexPfd":null,"IndexApp":2,"Name":"Stripper","Type":"Condensate Stripper"},{"Id":-1,"IndexPfd":null,"IndexApp":3,"Name":"Deprop","Type":"Depropaniser 1"},{"Id":-1,"IndexPfd":null,"IndexApp":4,"Name":"Deprop2","Type":"Depropaniser 2"},{"Id":-1,"IndexPfd":null,"IndexApp":5,"Name":"Debut","Type":"Debutaniser"},{"Id":-1,"IndexPfd":null,"IndexApp":6,"Name":"Stripper2","Type":"Additional Stripper"}]', true, true);
};

ActreneBase.prototype.updateNames = function (appCells, reload, recreate) 
{
    try
    {
        let arr_from_json = JSON.parse(appCells);
        jsonSystemSetup = arr_from_json;
    
        this.createModel(arr_from_json, reload, recreate);
    
        if (App.action == 'edit') {                                                                 
            containerOpened.checkConnectivityModalCreate(null, false);
            this.setOrderUnitsTop();
        }
    }
    catch(e)
    {
        // alert(e);
    }
};

ActreneBase.prototype.createModel = function (arr_from_json, reload, recreate) {
    if (recreate == null || (recreate != null && recreate)) {
        if (reload != null && reload) {
            try {
                redraw();
            }
            catch (e) {
                // alert("redraw" + e);
            }
        }

        if (App.app == 2 && arr_from_json != null) {

            let parent = graph.getDefaultParent();

            try {
                // graph.getModel().beginUpdate();
                // arr_from_json[0] = null;
                // arr_from_json[1] = null;
                // arr_from_json[2] = null;
                // arr_from_json[3] = null;
                // arr_from_json[4] = null;
                // arr_from_json[5] = null;
                // arr_from_json[6] = null;

                //controllers
                let columnC = new ColumnController();

                //modelslet 
                column = null;
                let column1 = null;
                let column2 = null;
                let column3 = null;
                let column4 = null;
                let column5 = null;
                let column6 = null;

                let heater = null;
                let heater1 = null;
                let heater2 = null;
                let heater3 = null;
                let heater4 = null;
                let heater5 = null;
                let heater6 = null;

                let accumulator = null;
                let accumulator1 = null;
                let accumulator2 = null;
                let accumulator3 = null;
                let accumulator4 = null;
                let accumulator5 = null;
                let accumulator6 = null;

                let splitter = null;
                let splitter1 = null;
                let splitter2 = null;
                let splitter3 = null;
                let splitter4 = null;
                let splitter5 = null;
                let splitter6 = null;

                let cooler = null;
                let cooler1 = null;
                let cooler2 = null;
                let cooler3 = null;
                let cooler4 = null;
                let cooler5 = null;
                let cooler6 = null;

                if (arr_from_json[0] != null) {
                    //Deethaniser 1
                    column = new Column(arr_from_json[0].Name, parent);
                    column.geometry.x = minX + 140;
                    column.geometry.y = minY + 150;
                    jsonSystemSetup[0].IndexPfd = column.id;

                    if (arr_from_json[0].Name != null && arr_from_json[0].Name != undefined) {
                        name = arr_from_json[0].Name;
                    }
                    else {
                        column.children[0].setVisible(false);
                    }

                    column.children[1].setVisible(false);
                    columnC.tagNamePosition(column);

                    //cooler of Deethaniser 1
                    cooler = new Cooler('', parent);
                    cooler.children[0].geometry.x = cooler.children[0].positionX;
                    cooler.children[0].geometry.y = cooler.children[0].positionY;
                    cooler.children[0].setVisible(false);
                    cooler.children[1].setVisible(false);

                    //accumulator of Deethaniser 1
                    accumulator = new Accumulator('', parent);
                    accumulator.geometry.x = minX + 290;
                    accumulator.geometry.y = minY + 120;
                    accumulator.children[0].geometry.x = accumulator.children[0].positionX;
                    accumulator.children[0].geometry.y = accumulator.children[0].positionY;
                    accumulator.children[0].setVisible(false);
                    accumulator.children[1].setVisible(false);

                    //heaater of Deethaniser 1
                    heater = new Heater('', parent);
                    heater.geometry.x = minX + 300;
                    heater.geometry.y = minY + 450;
                    heater.children[0].geometry.x = heater.children[0].positionX;
                    heater.children[0].geometry.y = heater.children[0].positionY;
                    heater.children[0].setVisible(false);
                    heater.children[1].setVisible(false);
                    graph.refresh();
                    rotateCell(heater, -90);

                    //splitter of Deethaniser 1
                    splitter = new Splitter('', parent);
                    /* splitter.geometry.x = minX + 304;
                    splitter.geometry.y = minY + 600; */

                    splitter.geometry.x = minX + 300;
                    splitter.geometry.y = minY + 600;

                    splitter.children[0].geometry.x = splitter.children[0].positionX;
                    splitter.children[0].geometry.y = splitter.children[0].positionY;
                    splitter.children[0].setVisible(false);
                    splitter.children[1].setVisible(false);

                    //let vertexAux = graph.insertVertex(parent, null, '', minX + 30, 250, 0, 0, '');

                    let feedStream = new FeedStream('Feed', column.children[5], column.geometry, column.children[5].geometry, '#000', "stream;direction=east");
                    graph.addCell(feedStream, parent, undefined, null, null);

                    let i01 = new InternalStream('', parent, cooler.children[3], accumulator.children[2], "stream;direction=east");
                    let i02 = new InternalStream('', parent, accumulator.children[4], column.children[7], "stream;direction=east");
                    let i03 = new InternalStream('', parent, heater.children[3], column.children[8], "stream;direction=east");
                    let i04 = new InternalStream('', parent, column.children[3], splitter.children[5], "stream;direction=east");
                    let i05 = new InternalStream('', parent, splitter.children[2], heater.children[2], "stream;direction=east");
                }

                if (arr_from_json[1] != null) {
                    //Deethaniser 2
                    column1 = new Column(arr_from_json[1].Name, parent);
                    jsonSystemSetup[1].IndexPfd = column1.id;

                    if (arr_from_json[1].Name != null && arr_from_json[1].Name != undefined) {
                        name = arr_from_json[1].Name;
                    }
                    else {
                        column1.children[0].setVisible(false);
                    }

                    column1.children[1].setVisible(false);
                    columnC.tagNamePosition(column1);

                    //heater of Deethaniser 2
                    heater1 = new Heater('', parent);
                    heater1.children[0].geometry.x = heater1.children[0].positionX;
                    heater1.children[0].geometry.y = heater1.children[0].positionY;
                    heater1.children[0].setVisible(false);
                    heater1.children[1].setVisible(false);

                    //splitter of Deethaniser 2
                    splitter1 = new Splitter('', parent);
                    splitter1.children[0].geometry.x = splitter1.children[0].positionX;
                    splitter1.children[0].geometry.y = splitter1.children[0].positionY;
                    splitter1.children[0].setVisible(false);
                    splitter1.children[1].setVisible(false);

                    graph.refresh();
                    
                    // flipLeftRight(cooler, false);
                    // rotateCell(cooler, 180);
                    rotateCell(heater1, -90);

                    let i06 = new InternalStream('', parent, accumulator.children[5], column1.children[4], "stream;direction=east");
                    let i07 = new InternalStream('', parent, column1.children[2], cooler.children[2], "stream;direction=east");
                    let i08 = new InternalStream('', parent, heater1.children[3], column1.children[8], "stream;direction=east");
                    let i09 = new InternalStream('', parent, splitter1.children[2], heater1.children[2], "stream;direction=east");
                    let i010 = new InternalStream('', parent, column1.children[3], splitter1.children[5], "stream;direction=east");
                }

                if (arr_from_json[2] != null) {
                    let comp = 0;

                    if((arr_from_json[4] == null && arr_from_json[1] == null) || (arr_from_json[4] != null && arr_from_json[1] == null))
                    {
                        comp = -200;
                    }
                    //Condensate Stripper
                    column2 = new Column(arr_from_json[2].Name, parent);
                    jsonSystemSetup[2].IndexPfd = column2.id;
                    column2.geometry.x = minX + 480 + comp;
                    column2.geometry.y = minY + 830;

                    if (arr_from_json[2].Name != null && arr_from_json[2].Name != undefined) {
                        name = arr_from_json[2].Name;
                    }
                    else {
                        column2.children[0].setVisible(false);
                    }

                    column2.children[1].setVisible(false);
                    columnC.tagNamePosition(column2);

                    //heater of Condensate Stripper
                    heater2 = new Heater('', parent);
                    heater2.children[0].geometry.x = heater2.children[0].positionX;
                    heater2.children[0].geometry.y = heater2.children[0].positionY;
                    heater2.children[0].setVisible(false);
                    heater2.children[1].setVisible(false);
                    heater2.geometry.x = minX + 630 + comp;
                    heater2.geometry.y = minY + 1130;

                    //splitter of Condensate Stripper
                    splitter2 = new Splitter('', parent);

                    splitter2.geometry.x = minX + 632 + comp;
                    splitter2.geometry.y = minY + 1280;

                    splitter2.children[0].setVisible(false);
                    splitter2.children[1].setVisible(false);

                    graph.refresh();
                    rotateCell(heater2, -90);

                    let vertexAux0 = graph.insertVertex(parent, null, '', minX + 700 + comp, minY + 795, 0, 0, '');

                    let vertexAux1 = graph.insertVertex(parent, null, '', minX + 500 + comp, minY + 992, 0, 0, '');

                    let p1 = new ProductStream('', parent, column2.children[2], vertexAux0, "stream;direction=north");

                    let f1 = new FeedStream('', column2.children[5], column2.geometry, column2.children[5].geometry, '#000', "stream;direction=east");
                    graph.addCell(f1, parent, undefined, null, null);

                    let i011 = new InternalStream('', parent, heater2.children[3], column2.children[8], "stream;direction=east");
                    let i012 = new InternalStream('', parent, column2.children[3], splitter2.children[5], "stream;direction=east");
                    let i013 = new InternalStream('', parent, splitter2.children[2], heater2.children[2], "stream;direction=east");
                }

                if (arr_from_json[3] != null) {
                    //Depropaniser 1
                    column3 = new Column(arr_from_json[3].Name, parent);
                    jsonSystemSetup[3].IndexPfd = column3.id;

                    if (arr_from_json[3].Name != null && arr_from_json[3].Name != undefined) {
                        name = arr_from_json[3].Name;
                    }
                    else {
                        column3.children[0].setVisible(false);
                    }

                    column3.children[1].setVisible(false);
                    columnC.tagNamePosition(column3);

                    //heater of Depropaniser
                    heater3 = new Heater('', parent);
                    heater3.children[0].geometry.x = heater3.children[0].positionX;
                    heater3.children[0].geometry.y = heater3.children[0].positionY;
                    heater3.children[0].setVisible(false);
                    heater3.children[1].setVisible(false);

                    //splitter of Depropaniser
                    splitter3 = new Splitter('', parent);
                    splitter3.children[0].geometry.x = splitter3.children[0].positionX;
                    splitter3.children[0].geometry.y = splitter3.children[0].positionY;
                    splitter3.children[0].setVisible(false);
                    splitter3.children[1].setVisible(false);

                    //accumulator of Depropaniser
                    accumulator3 = new Accumulator('', parent);
                    accumulator3.children[0].geometry.x = accumulator3.children[0].positionX;
                    accumulator3.children[0].geometry.y = accumulator3.children[0].positionY;
                    accumulator3.children[0].setVisible(false);
                    accumulator3.children[1].setVisible(false);

                    //cooler of Depropaniser
                    cooler3 = new Cooler('', parent);
                    cooler3.children[0].geometry.x = cooler3.children[0].positionX;
                    cooler3.children[0].geometry.y = cooler3.children[0].positionY;
                    cooler3.children[0].setVisible(false);
                    cooler3.children[1].setVisible(false);

                    graph.refresh();
                    rotateCell(heater3, -90);

                    //Depropaniser
                    column3.geometry.x = minX + 590;
                    column3.geometry.y = minY + 150;
                    //heater of Depropaniser
                    heater3.geometry.x = minX + 754;
                    heater3.geometry.y = minY + 450;
                    //splitter of Depropaniser
                    splitter3.geometry.x = minX + 754;
                    splitter3.geometry.y = minY + 600;
                    //accumulator of Depropaniser
                    accumulator3.geometry.x = minX + 740;
                    accumulator3.geometry.y = minY + 120;
                    //cooler of Depropaniser
                    cooler3.geometry.x = minX + 662;
                    cooler3.geometry.y = minY + 20;
                }

                if (arr_from_json[4] != null) {

                    //Depropaniser 2
                    column4 = new Column(arr_from_json[4].Name, parent);
                    column4.geometry.x = minX + 1200;
                    column4.geometry.y = minY + 150;
                    jsonSystemSetup[4].IndexPfd = column4.id;

                    if (arr_from_json[4].Name != null && arr_from_json[4].Name != undefined) {
                        name = arr_from_json[4].Name;
                    }
                    else {
                        column4.children[0].setVisible(false);
                    }

                    column4.children[1].setVisible(false);
                    columnC.tagNamePosition(column4);

                    //heater of Depropaniser 2
                    heater4 = new Heater('', parent);

                    heater4.children[0].setVisible(false);
                    heater4.children[1].setVisible(false);
                    heater4.children[0].geometry.x = heater4.children[0].positionX;
                    heater4.children[0].geometry.y = heater4.children[0].positionY;
                    heater4.geometry.x = minX + 1350;
                    heater4.geometry.y = minY + 450;

                    //splitter of Depropaniser 2
                    splitter4 = new Splitter('', parent);

                    splitter4.geometry.x = minX + 1350;
                    splitter4.geometry.y = minY + 600;

                    splitter4.children[0].setVisible(false);
                    splitter4.children[1].setVisible(false);

                    graph.refresh();
                    // rotateCell(cooler3, 180);
                    rotateCell(heater4, -90);

                    let i1 = new InternalStream('', parent, cooler3.children[3], accumulator3.children[2], "stream;direction=east");
                    let i2 = new InternalStream('', parent, accumulator3.children[4], column3.children[7], "stream;direction=east");
                    let i3 = new InternalStream('', parent, accumulator3.children[5], column4.children[4], "stream;direction=east");
                    let i4 = new InternalStream('', parent, heater3.children[3], column3.children[8], "stream;direction=east");
                    let i5 = new InternalStream('', parent, column3.children[3], splitter3.children[5], "stream;direction=east");
                    let i6 = new InternalStream('', parent, splitter3.children[2], heater3.children[2], "stream;direction=east");
                    let i7 = new InternalStream('', parent, column4.children[2], cooler3.children[2], "stream;direction=east");
                    let i8 = new InternalStream('', parent, heater4.children[3], column4.children[8], "stream;direction=east");
                    let i9 = new InternalStream('', parent, splitter4.children[2], heater4.children[2], "stream;direction=east");
                    let i10 = new InternalStream('', parent, column4.children[3], splitter4.children[5], "stream;direction=east");
                    let i11 = new InternalStream('', parent, splitter3.children[4], column4.children[5], "stream;direction=east");
                }

                if (arr_from_json[5] != null) {
                    //Deebutaneiser
                    column5 = new Column(arr_from_json[5].Name, parent);
                    jsonSystemSetup[5].IndexPfd = column5.id;

                    if (arr_from_json[5].Name != null && arr_from_json[5].Name != undefined) {
                        name = arr_from_json[5].Name;
                    }
                    else {
                        column5.children[0].setVisible(false);
                    }

                    column5.children[1].setVisible(false);
                    columnC.tagNamePosition(column5);

                    cooler5 = new Cooler('', parent);
                    cooler5.children[0].geometry.x = cooler5.children[0].positionX;
                    cooler5.children[0].geometry.y = cooler5.children[0].positionY;
                    cooler5.children[0].setVisible(false);
                    cooler5.children[1].setVisible(false);

                    accumulator5 = new Accumulator('', parent);
                    accumulator5.children[0].geometry.x = accumulator5.children[0].positionX;
                    accumulator5.children[0].geometry.y = accumulator5.children[0].positionY;
                    accumulator5.children[0].setVisible(false);
                    accumulator5.children[1].setVisible(false);

                    //heater of Deebutaneiser
                    heater5 = new Heater('', parent);
                    heater5.children[0].geometry.x = heater5.children[0].positionX;
                    heater5.children[0].geometry.y = heater5.children[0].positionY;
                    heater5.children[0].setVisible(false);
                    heater5.children[1].setVisible(false);

                    //splitter of Deebutaneiser 
                    splitter5 = new Splitter('', parent);
                    splitter5.children[0].geometry.x = splitter5.children[0].positionX;
                    splitter5.children[0].geometry.y = splitter5.children[0].positionY;
                    splitter5.children[0].setVisible(false);
                    splitter5.children[1].setVisible(false);

                    graph.refresh();
                    rotateCell(heater5, -90);

                    //Deebutaneiser
                    column5.geometry.x = minX + 1600;
                    column5.geometry.y = minY + 150;

                    accumulator5.geometry.x = minX + 1750;
                    accumulator5.geometry.y = minY + 120;

                    cooler5.geometry.x = minX + 1675;
                    cooler5.geometry.y = minY + 15;

                    heater5.geometry.x = minX + 1750;
                    heater5.geometry.y = minY + 450;

                    splitter5.geometry.x = minX + 1750;
                    splitter5.geometry.y = minY + 600;

                    let i12 = new InternalStream('', parent, column5.children[2], cooler5.children[2], "stream;direction=east");
                    let i13 = new InternalStream('', parent, cooler5.children[3], accumulator5.children[2], "stream;direction=east");
                    let i14 = new InternalStream('', parent, accumulator5.children[4], column5.children[7], "stream;direction=east");
                    let i15 = new InternalStream('', parent, heater5.children[3], column5.children[8], "stream;direction=east");
                    let i16 = new InternalStream('', parent, column5.children[3], splitter5.children[5], "stream;direction=east");
                    let i17 = new InternalStream('', parent, splitter5.children[2], heater5.children[2], "stream;direction=east");

                    if (splitter4 != undefined) {
                        let i18 = new InternalStream('', parent, splitter4.children[4], column5.children[5], "stream;direction=east");
                    }

                    if (arr_from_json[4] != null || arr_from_json[1] != null || arr_from_json[0] == null) {
                        let vertexAux3 = graph.insertVertex(parent, null, '', minX + 1776, minY + 750, 0, 0, '');
                        let p2 = new ProductStream('', parent, splitter5.children[4], vertexAux3, "stream;direction=east");
                    }
                }

                if (arr_from_json[6] != null) {
                    //add strippepr
                    column6 = new Column(arr_from_json[6].Name, parent);
                    jsonSystemSetup[6].IndexPfd = column6.id;

                    if (arr_from_json[6].Name != null && arr_from_json[6].Name != undefined) {
                        name = arr_from_json[6].Name;
                    }
                    else {
                        column6.children[0].setVisible(false);
                    }

                    column6.children[1].setVisible(false);
                    columnC.tagNamePosition(column6);

                    //heater of add strippepr
                    heater6 = new Heater('', parent);
                    heater6.children[0].geometry.x = heater6.children[0].positionX;
                    heater6.children[0].geometry.y = heater6.children[0].positionY;
                    heater6.children[0].setVisible(false);
                    heater6.children[1].setVisible(false);

                    //splitter of add strippepr
                    splitter6 = new Splitter('', parent);
                    splitter6.children[0].setVisible(false);
                    splitter6.children[1].setVisible(false);

                    graph.refresh();
                    rotateCell(heater6, -90);
                    // debugger;


                    column6.geometry.x = minX + 1100;
                    column6.geometry.y = minY + 830;

                    heater6.geometry.x = minX + 1350;
                    heater6.geometry.y = minY + 1130;

                    splitter6.geometry.x = minX + 1350;
                    splitter6.geometry.y = minY + 1280;

                    let vertexAux0 = graph.insertVertex(parent, null, '', minX + 1205, minY + 795, 0, 0, '');
                    let vertexAux1 = graph.insertVertex(parent, null, '', minX + 9050, minY + 992, 0, 0, '');
                    let vertexAux2 = graph.insertVertex(parent, null, '', minX + 1376, minY + 1430, 0, 0, '');

                    let p3 = new ProductStream('', parent, column6.children[2], vertexAux0, "stream;direction=north");
                    let p4 = new ProductStream('', parent, splitter6.children[4], vertexAux2, "stream;direction=east");

                    let f2 = new FeedStream('', column6.children[5], column6.geometry, column6.children[5].geometry, '#000', "stream;direction=east");
                    graph.addCell(f2, parent, undefined, null, null);

                    let i20 = new InternalStream('', parent, heater6.children[3], column6.children[8], "stream;direction=east");
                    let i21 = new InternalStream('', parent, column6.children[3], splitter6.children[5], "stream;direction=east");
                    let i22 = new InternalStream('', parent, splitter6.children[2], heater6.children[2], "stream;direction=east");
                }

                if (arr_from_json[3] != null && arr_from_json[5] != null && arr_from_json[1] == null && arr_from_json[4] == null) {
                    let i23 = new InternalStream('', parent, splitter3.children[4], column5.children[5], "stream;direction=east");
                    let i24 = new InternalStream('', parent, column3.children[2], cooler3.children[2], "stream;direction=east");

                    if (arr_from_json[0] == null) {
                        let vertexAux1 = graph.insertVertex(parent, null, '', minX + 472, minY + 170, 0, 0, '');
                        if (arr_from_json[2] != null) {

                            let feedStream = new FeedStream('Feed', column3.children[4], column3.geometry, column3.children[4].geometry, '#000', "stream;direction=east");
                            graph.addCell(feedStream, parent, undefined, null, null);
                        }
                        else {
                            let feedStream = new FeedStream('Feed', column3.children[5], column3.geometry, column3.children[5].geometry, '#000', "stream;direction=east");
                            graph.addCell(feedStream, parent, undefined, null, null);
                        }
                    }

                    if (arr_from_json[2] != null && arr_from_json[1] != null) {
                        let vertexAux1 = graph.insertVertex(parent, null, '', minX + 750, minY + 1000, 0, 0, '');
                        let p4 = new ProductStream('', parent, splitter2.children[4], vertexAux1, "stream;direction=east");
                    }

                    if (arr_from_json[3] != null && arr_from_json[5] != null && arr_from_json[0] == null && arr_from_json[1] == null && arr_from_json[2] == null && arr_from_json[4] == null) {

                        let i25 = new InternalStream('', parent, column3.children[3], splitter3.children[5], "stream;direction=east");
                        let i26 = new InternalStream('', parent, splitter3.children[2], heater3.children[2], "stream;direction=east");
                        let i27 = new InternalStream('', parent, heater3.children[3], column3.children[8], "stream;direction=east");
                        let i28 = new InternalStream('', parent, cooler3.children[3], accumulator3.children[2], "stream;direction=east");
                        let i29 = new InternalStream('', parent, accumulator3.children[4], column3.children[7], "stream;direction=east");

                        let vertexAux4 = graph.insertVertex(parent, null, '', minX + 900, minY + 225, 0, 0, '');
                        let p5 = new ProductStream('', parent, accumulator3.children[5], vertexAux4, "stream;direction=east");

                        let vertexAux5 = graph.insertVertex(parent, null, '', minX + 1900, minY + 225, 0, 0, '');
                        let p6 = new ProductStream('', parent, accumulator5.children[5], vertexAux5, "stream;direction=east");
                    }

                }
                if (arr_from_json[3] != null && arr_from_json[5] != null && arr_from_json[0] != null && arr_from_json[1] == null && arr_from_json[4] == null) {
                    //cooler of Deethaniser 1
                    cooler.geometry.x = minX + 212;
                    cooler.geometry.y = minY + 30;


                    let i30 = new InternalStream('', parent, column.children[2], cooler.children[2], "stream;direction=east");
                    let vertexAux = graph.insertVertex(parent, null, '', minX + 450, minY + 225, 0, 0, '');
                    let p7 = new ProductStream('', parent, accumulator.children[5], vertexAux, "stream;direction=east");

                    //Deebutaneiser
                    column5.geometry.x = minX + 1040;
                    column5.geometry.y = minY + 150;

                    accumulator5.geometry.x = minX + 1190;
                    accumulator5.geometry.y = minY + 120;

                    cooler5.geometry.x = minX + 1112;
                    cooler5.geometry.y = minY + 30;

                    heater5.geometry.x = minX + 1200;
                    heater5.geometry.y = minY + 450;

                    splitter5.geometry.x = minX + 1200;
                    splitter5.geometry.y = minY + 600;

                    let vertexAux2 = graph.insertVertex(parent, null, '', minX + 1350, minY + 225, 0, 0, '');
                    let p8 = new ProductStream('', parent, accumulator5.children[5], vertexAux2, "stream;direction=east");

                    let i43 = new InternalStream('', parent, splitter.children[4], column3.children[5], "stream;direction=east");

                    let i44 = new InternalStream('', parent, column3.children[3], splitter3.children[5], "stream;direction=east");
                    let i45 = new InternalStream('', parent, splitter3.children[2], heater3.children[2], "stream;direction=east");
                    let i46 = new InternalStream('', parent, heater3.children[3], column3.children[8], "stream;direction=east");
                    let i47 = new InternalStream('', parent, cooler3.children[3], accumulator3.children[2], "stream;direction=east");
                    let i48 = new InternalStream('', parent, accumulator3.children[4], column3.children[7], "stream;direction=east");

                    let vertexAux3 = graph.insertVertex(parent, null, '', minX + 1226, minY + 750, 0, 0, '');
                    let p9 = new ProductStream('', parent, splitter5.children[4], vertexAux3, "stream;direction=east");

                    let vertexAux4 = graph.insertVertex(parent, null, '', minX + 900, minY + 225, 0, 0, '');
                    let p10 = new ProductStream('', parent, accumulator3.children[5], vertexAux4, "stream;direction=east");

                    if (arr_from_json[2] != null) {
                        let i50 = new InternalStream('', parent, splitter2.children[4], column3.children[6], "stream;direction=east");
                    }
                }
                if (arr_from_json[3] != null && arr_from_json[5] != null && arr_from_json[0] != null && arr_from_json[1] != null) {

                    cooler.geometry.x = minX + 385;
                    cooler.geometry.y = minY + 15;

                    //Depropaniser
                    column3.geometry.x = minX + 900;
                    column3.geometry.y = minY + 150;
                    //heater of Depropaniser
                    heater3.geometry.x = minX + 1050;
                    heater3.geometry.y = minY + 450;
                    //splitter of Depropaniser
                    splitter3.geometry.x = minX + 1050;
                    splitter3.geometry.y = minY + 600;

                    //accumulator of Depropaniser
                    accumulator3.geometry.x = minX + 1040;
                    accumulator3.geometry.y = minY + 120;

                    column1.geometry.x = minX + 450;
                    column1.geometry.y = minY + 150;
                    heater1.geometry.x = minX + 600;
                    heater1.geometry.y = minY + 450;

                    splitter1.geometry.x = minX + 600;
                    splitter1.geometry.y = minY + 600;

                    //cooler of Depropaniser
                    if (arr_from_json[4] != null) {
                        cooler3.geometry.x = minX + 1135;
                        cooler3.geometry.y = minY + 15;

                        let vertexAux0 = graph.insertVertex(parent, null, '', minX + 939, minY + 40, 0, 0, '');
                        let e13 = new ProductStream('', parent, column3.children[2], vertexAux0, "stream;direction=north");
                        flipLeftRight(cooler3);
                    }
                    else {
                        cooler3.geometry.x = minX + 975;
                        cooler3.geometry.y = minY + 15;

                        // let i51 = new InternalStream('', parent, splitter.children[4], column1.children[5], "stream;direction=east");
                        let i52 = new InternalStream('', parent, column3.children[2], cooler3.children[2], "stream;direction=east");
                        let i53 = new InternalStream('', parent, cooler3.children[3], accumulator3.children[2], "stream;direction=east");
                        let i54 = new InternalStream('', parent, accumulator3.children[4], column3.children[7], "stream;direction=east");
                        let i55 = new InternalStream('', parent, heater3.children[3], column3.children[8], "stream;direction=east");
                        let i56 = new InternalStream('', parent, column3.children[3], splitter3.children[5], "stream;direction=east");
                        let i57 = new InternalStream('', parent, splitter3.children[2], heater3.children[2], "stream;direction=east");
                        let i58 = new InternalStream('', parent, splitter3.children[4], column5.children[5], "stream;direction=east");

                        let vertexAux = graph.insertVertex(parent, null, '', minX + 1220, minY + 225, 0, 0, '');
                        let p11 = new ProductStream('', parent, accumulator3.children[5], vertexAux, "stream;direction=east");
                    }

                    let vertexAux2 = graph.insertVertex(parent, null, '', minX + 1920, minY + 225, 0, 0, '');
                    let e18 = new ProductStream('', parent, accumulator5.children[5], vertexAux2, "stream;direction=east");

                    let vertexAux1 = graph.insertVertex(parent, null, '', minX + 189, minY + 40, 0, 0, '');
                    let p12 = new ProductStream('', parent, column.children[2], vertexAux1, "stream;direction=north");

                    if (arr_from_json[2] != null) {
                        let e59 = new InternalStream('', parent, splitter2.children[4], column3.children[5], "stream;direction=east");
                        let i60 = new InternalStream('', parent, splitter1.children[4], column3.children[4], "stream;direction=east");
                    }
                    else {
                        let i61 = new InternalStream('', parent, splitter1.children[4], column3.children[5], "stream;direction=east");
                    }

                    let i62 = new InternalStream('', parent, splitter.children[4], column1.children[5], "stream;direction=east");
                        flipLeftRight(cooler);

                }
                if (arr_from_json[3] != null && arr_from_json[5] != null && arr_from_json[0] == null && arr_from_json[1] == null && arr_from_json[4] != null) {
                    //cooler of Deepropaniser 1
                    cooler3.geometry.x = minX + 1135;
                    cooler3.geometry.y = minY + 30;
                    let feedStream = new FeedStream('Feed', column3.children[5], column3.geometry, column3.children[5].geometry, '#000', "stream;direction=east");
                    graph.addCell(feedStream, parent, undefined, null, null);

                    if (accumulator5.children[5].edges == undefined || accumulator5.children[5].edges == null || accumulator5.children[5].edges.length == 0) {
                        let vertexAux5 = graph.insertVertex(parent, null, '', minX + 1900, minY + 225, 0, 0, '');
                        let p6 = new ProductStream('', parent, accumulator5.children[5], vertexAux5, "stream;direction=east");
                    }

                    let p199 = new ProductStream('', parent, column3.children[2], null, "stream;direction=north");
                    flipLeftRight(cooler3);
                }
                if (arr_from_json[3] != null && arr_from_json[5] != null && arr_from_json[0] != null && arr_from_json[1] == null && arr_from_json[4] != null) {
                    //cooler of Deethaniser 1
                    cooler.geometry.x = minX + 212;
                    cooler.geometry.y = minY + 30;

                    cooler3.geometry.x = minX + 1135;
                    cooler3.geometry.y = minY + 30;

                    let i63 = new InternalStream('', parent, column.children[2], cooler.children[2], "stream;direction=east");
                    let i64 = new InternalStream('', parent, splitter.children[4], column3.children[5], "stream;direction=east");
                    
                    if(arr_from_json[2] != null)
                    {
                        let i65 = new InternalStream('', parent, splitter2.children[4], column3.children[6], "stream;direction=east");
                    }
                    
                    let vertexAux = graph.insertVertex(parent, null, '', minX + 450, minY + 225, 0, 0, '');
                    let p70 = new ProductStream('', parent, accumulator.children[5], vertexAux, "stream;direction=east");
                    let vertexAux5 = graph.insertVertex(parent, null, '', minX + 1900, minY + 225, 0, 0, '');
                    let p71 = new ProductStream('', parent, accumulator5.children[5], vertexAux5, "stream;direction=east");
                    
                    let p100 = new ProductStream('', parent, column3.children[2], null, "stream;direction=north");
                    flipLeftRight(cooler3);
                }
            }
            finally 
            {
                // graph.getModel().endUpdate();
                graph.fit(30, false, 0);
                centre();
                updateGraphView();
                if (App.action == 'view') 
                {
                    try {
                        // this.updateSystemSetupJson();
                        this.sendSystemSetupJson();
                        XMLInitialOpened = containerOpened.saveFromAcb();
                    }
                    catch (e) {
                    }
                    containerOpened.castToViewModel();
                } else {
                    graphEditor.createUndoManager();
                    graphEditor.resetUndoListener();
                }
            }
        }
    }
    else 
    {
        if (App.app == 2 && arr_from_json != null) {
            try {
                graph.getModel().beginUpdate();

                let cells = graph.getModel().cells;

                for (let i in arr_from_json) {
                    for (let j in cells) {
                        // if(item.value != "" && item.type == "TagName" && item.parent.type == "Unit" && item.parent.style.indexOf("column") == 0)
                        if (cells[j].parent != null && arr_from_json[i] != null
                            && cells[j].parent.id == arr_from_json[i].IndexPfd && cells[j].type.toLowerCase() == "tagname") {
                            cells[j].value = arr_from_json[i].Name;
                            graph.updateCellSize(cells[j]);
                        }
                    }
                }
            }
            finally {

                if (App.app == 2 && App.action == 'view') {
                    containerOpened.saveFromAcb();
                }
                graph.getModel().endUpdate();
                
                graph.refresh();

                if(App.app == 2 && App.action == 'edit')
                {
                    graphEditor.createUndoManager();
                    graphEditor.resetUndoListener();
                }
            }
        }
    }
};

ActreneBase.prototype.getJsoNames = function (appCells, reload) {
    let xml = menu.save();
};

ActreneBase.prototype.sendSystemSetupToApplication = function () {
    let columns = [];
    let cells = Object.values(graph.getModel().cells);

    for (let i = 0; i < cells.length; i++) {
        let item = cells[i];
        if (item.value != "" && item.type == "TagName" && item.parent.type == "Unit" && item.parent.style.indexOf("column") == 0) {
            columns.push(item);
        }
    }

    if (jsonSystemSetup != null) {
        let j = 0;
        //on create
        for (let i in jsonSystemSetup) {
            if (jsonSystemSetup[i] != null) {
                let index = jsonSystemSetup[i].IndexPfd;

                if (index == null) {
                    jsonSystemSetup[i].Name = columns[j].value;
                    jsonSystemSetup[i].IndexPfd = columns[j].parent.id;
                    j++;
                }
                else 
                {
                    for (let k = 0; k < columns.length; k++) {
                        let item = columns[k];
                        if (item.value != "" && item.type == "TagName" && item.parent.type == "Unit"
                            && item.parent.id == index) {
                            jsonSystemSetup[i].Name = item.value;
                            jsonSystemSetup[i].IndexPfd = item.IndexApp;
                        }
                    }
                }
            }
        }
    }
    else 
    {
        for (let i in columns) {
            //on open
            jsonSystemSetup[i].Name = columns[i].value;
            jsonSystemSetup[i].Type = columns[i].parent.style.split(";")[0];
        }
    }
    try {
        // //before was necessar
        // var jsonString = JSON.stringify(jsonSystemSetup);    
        callbackObj.updateSystemSetupFromPFD(jsonSystemSetup);
    } catch (error) {
    }

};


ActreneBase.prototype.sendSystemSetupJson = function () {
    if (jsonSystemSetup != null) {
        try {
            // //before was necessar
            // var jsonString = JSON.stringify(jsonSystemSetup);
            callbackObj.updateSystemSetupFromPFD(jsonSystemSetup);
        } catch (error) {

        }
    }
};

ActreneBase.prototype.updateSystemSetupJson = function () {
    if (App.app == 2 && jsonSystemSetup != null) {
        let cells = graph.getModel().cells;

        for (let i in jsonSystemSetup) {
            for (let j in cells) {
                if (cells[j].parent != null && jsonSystemSetup[i] != null
                    && cells[j].parent.id == jsonSystemSetup[i].IndexPfd && cells[j].type.toLowerCase() == "tagname") {
                    jsonSystemSetup[i].Name = cells[j].value;
                }
            }
        }
    }

    if(App.app == 2 && App.action == 'edit')
    {
        editor.undoManager = graphEditor.createUndoManager();
        graphEditor.resetUndoListener();
    }
};

ActreneBase.prototype.updatePFDFromJson = function () {
    if (App.app == 2 && jsonSystemSetup != null) {
        try {
            // graph.getModel().beginUpdate();

            let cells = graph.getModel().cells;

            for (let i in jsonSystemSetup) {
                for (let j in cells) {
                    // if(item.value != "" && item.type == "TagName" && item.parent.type == "Unit" && item.parent.style.indexOf("column") == 0)
                    if (cells[j].parent != null && jsonSystemSetup[i] != null
                        && cells[j].parent.id == jsonSystemSetup[i].IndexPfd && cells[j].type.toLowerCase() == "tagname") {
                        cells[j].value = jsonSystemSetup[i].Name;
                        graph.updateCellSize(cells[j]);
                        graph.refresh();
                    }
                }
            }
        }
        finally {
            // graph.getModel().endUpdate();
        }
    }
};

ActreneBase.prototype.setOrderUnitsTop = function () {

    let unitcells = Object.values(graph.getModel().cells);

    let units = [];

    if (unitcells.length > 0) {
        for (let i = 2; i < unitcells.length; i++) {
            if (unitcells[i].style.indexOf("unit") == 0) {
                units.push(unitcells[i]);
            }
        }
    }

    graph.orderCells(false, [units]);
}