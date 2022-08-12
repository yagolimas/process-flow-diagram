class Application {

    constructor(app, act) {
        this.application = app;
        if(act == undefined)
        {
            this.action = 'view';
        }
        else
        {
            this.action = act;
        }
    }

    get app() {
        return this.application;
    }
    
    get act() {
        return this.action;
    }

    open() {
        return (this.action === "edit") ? new EditorContainer() : new ViewContainer(); 
    }
}