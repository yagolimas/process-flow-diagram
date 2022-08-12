var App;
var actreneBase;
var containerOpened;
var listOfChangedNames = [];
var XMLOpened;
var minX = 0;
var minY = 0;
var lastX = 0;
var lastY = 0;
var portOutMove = 0;
var lastStream = null;
var isVisibleName = true;
var cursorPosition;
var isMouseDownPortOut;
var XMLInitialOpened = null;
var jsonSystemSetup = null;
var listenerView = false;
var listenerEdit = false;
var lastAction = null;
var lastValue = '';
var ignoreModelUpdate = false;
 
var flagMouseUpConnect = null;

var canCreateProductStream = true;
//var graph;
// var listOfChangedNames =  [{id: "13", name: "asd"}];

var monitorEditBaselinePFD = null;

Init = function (act, open) {
    let urlParams = new URLSearchParams(window.location.search);

    let application = Init.prototype.getParamsApp(urlParams.get('app'));

    // act = 'edit';

    if(act != null)
    {
        act = act.toLowerCase();
    }

    let action = act;
    //let open = Init.prototype.getParamsAction(urlParams.get('open'));

    App = Init.prototype.getApplication(application, action);
    containerOpened = App.open();
    // //containerOpened = new EditorContainer();

    // if (open != undefined && open != null && open == true) {
    //     containerOpened.open(jsonSystemSetup, XMLOpened);
    //     //callbackObj.systemSetupSetPFD(open);
    // }

    if(App.app == 2)
    {
        actreneBase = Init.prototype.createActreneBase();
    }

    // container.focus();
};

Init.prototype.getParamsApp = function (app) {
    return app ? parseInt(app) : 0;
};

Init.prototype.getParamsAction = function (action) {
    //return (action) ? action : 'view';
    ///?
    return (action) ? action : 'edit';
};

Init.prototype.getApplication = function (app, action) {
    return new Application(app, action);
};

Init.prototype.createActreneBase = function () {
    return new ActreneBase();
};

function load() {
    new Init();
}