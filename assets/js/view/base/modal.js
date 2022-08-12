Modal = function () {
    this.init();
};

Modal.prototype.modalDiv = document.createElement('div');
Modal.prototype.contentModal = document.createElement('div');

Modal.prototype.createModalRename = function (title) {

    return `
        <div class="modal-unit content modal-class" id="divModalUnitRename">

            <div class="modal-header containerDivHeader" id="divContainerRenameHeader">                
                <h3>${ title}</h3>
            </div>

            <div class="modal-body">
                <div class="form-group">
                    <label>Name</label>
                    <input id="name" class="form-control" maxlength="20" required>
                </div>
            </div>           

            <div class="modal-footer">
                <button type="submit" id="btn-cancel" class="btn btn-primary pull-left">Cancel</button>
                <button type="button" id="btn-help" class="btn btn-primary pull-left">Help</button>                
                <button type="submit" id="btn-ok" class="btn btn-secondary pull-right">OK</button>
            </div>

        </div>
    `;
};

Modal.prototype.createModalUnit = function (title) {

    title = "New Unit";

    return `
        <div id="mydiv" class="modal-unit content modal-class">

            <div class="modal-header containerDivHeader" id="divContainerUnitHeader">                
                <h3>${ title}</h3>
            </div>

            <div class="modal-body">
                <div class="form-group">
                    <label>${ title} Name</label>
                    <input id="unit" class="form-control" maxlength="20" required>
                </div>
            </div>           

            <div class="modal-footer">
                <button type="submit" id="btn-cancel" class="btn btn-primary pull-left">Cancel</button>
                <button type="button" id="btn-help" class="btn btn-primary pull-left">Help</button>                
                <button type="submit" id="btn-ok" class="btn btn-secondary pull-right">OK</button>
            </div>

        </div>
    `;
};

Modal.prototype.createModalFeed = function (title) {

    return `
            <div class="modal-autoname content modal-class">

                <div class="modal-header containerDivHeader" id="divContainerFeedHeader">                
                    <h3>${ title}</h3>
                </div>

                <div class="modal-body">                    
                
                    <div class="row" style="padding-top:0">  

                        <div class="form-group half" id="feed-stream">
                            <label>Stream Name</label>
                            <input id="stream" type="text" class="form-control" maxlength="8" required>
                        </div>                       
                        <div id="radios" class="form-group half">
                            <div class="form-group radio">
                                <input id="cold" name="temp" type="radio" class="form-control">
                                <label style="color:#007ac9">Cold Feed</label>
                            </div>
                            <div class="form-group radio">
                                <input id="hot" name="temp" type="radio" class="form-control">   
                                <label style="color:#e00034">Hot Feed</label>
                            </div>   
                        </div>

                    </div>                         
                </div>   

                <div class="modal-footer">
                    <button type="submit" id="btn-ok" class="btn btn-secondary pull-right">OK</button>
                    <button type="submit" id="btn-cancel" class="btn btn-primary pull-left">Cancel</button>
                    <button type="button" id="btn-help" class="btn btn-primary pull-left">Help</button>                
                </div>

            </div>
        `;
};

Modal.prototype.createModalProduct = function (title) {

    return `
            <div class="modal-feed content modal-class">

                <div class="modal-header containerDivHeader" id="divContainerProductHeader">                
                    <h3>${ title}</h3>
                </div>

                <div class="modal-body">                
                    
                    <div class="form-group">
                        <label>Stream Name</label>
                        <input id="stream" type="text" class="form-control" maxlength="20" required>
                    </div>
                        
                </div>   

                <div class="modal-footer">
                    <button type="submit" id="btn-ok" class="btn btn-secondary pull-right">OK</button>
                    <button type="submit" id="btn-cancel" class="btn btn-primary pull-left">Cancel</button>
                    <button type="button" id="btn-help" class="btn btn-primary pull-left">Help</button>                
                </div>

            </div>
        `;
};

Modal.prototype.createModalAutoname = function (autonames) {
    return `
        <div class="modal-autoname content modal-class">
            <div class="modal-header containerDivHeader" id="divContainerAutonameHeader">                
                <h3>Autoname</h3>
            </div>

            <div class="modal-body">

            
                <div class="row">
                    <h4>Unit Name Prefixes</h4>
                    ${ autonames.map(el => {
            return `                            
                                <div class="form-group half">
                                    <label>${ el.element}</label>
                                    <input id="${ el.id}" type="text"
                                            value="" class="form-control" maxlength="6" required>
                                </div>
                        `}).join('')
        }
                </div>  

                    
                <div class="row">                                       
                    <h4>Stream Name Prefix</h4>
                    <div class="form-group half">
                        <label>Stream</label>
                        <input id="stream" type="text"
                            class="form-control" maxlength="6" required>
                    </div>                    
                </div> 
            </div>  
               
            <div class="modal-footer">
                <button type="submit" id="save-autoname" class="btn btn-secondary pull-right" >OK</button>
                <button type="submit" id="cancel-autoname"class="btn btn-primary pull-left">Cancel</button>
                <button type="button" id="btn-help"class="btn btn-primary pull-left">Help</button>
            </div>
        </div>
    `;
};

Modal.prototype.createModalAlert = function (title, message, type) {

    return `
            <div class="modal-alert modal-class">

                <div class="modal-header containerDivHeader" id="divContainerAlertHeader">                
                    <h3>${ title}</h3>
                </div>

                <div class="modal-body">                
                    
                <div class="icon"><img src="assets/img/${ this.isType(type)}" style="width:40px;height:40px;" alt="Warning"></div>

                    <div>
                        <p>
                            ${ message}
                        </p>
                    </div>
                        
                </div>   

                <div class="modal-footer">
                    <button type="submit" id="btn-ok" class="btn btn-secondary pull-right">OK</button>
                    <button type="submit" id="btn-cancel" class="btn btn-primary pull-left">Cancel</button>
                    <button type="button" id="btn-help" class="btn btn-primary pull-left">Help</button>                
                </div>

            </div>
        `;
};

Modal.prototype.createModalConfirmation = function (title, message) {

    return `
            <div class="modal-alert modal-class">
                <div class="modal-header containerDivHeader" id="divContainerConfirmationHeader">                
                    <h3>${title}</h3>
                </div>

                <div class="modal-body">                
                    <div class="icon"><img src="assets/img/warning.png" style="width:40px;height:40px;" alt="Warning"></div>
                    <div>
                        <p>
                            ${message}
                        </p>
                    </div>
                </div>   

                <div class="modal-footer">
                    <button type="submit" id="btn-ok" class="btn btn-secondary pull-right">Yes</button>
                    <button type="submit" id="btn-cancel" class="btn btn-primary pull-left">No</button>
                </div>
            </div>
        `;
};

Modal.prototype.createModalAlertMessage = function (title, message, type) {

    this.title = title;

    return `
            <div class="modal-alert-message modal-class"> 
                <div class="modal-header containerDivHeader" id="divContainerAlertMessageHeader">               
                    <h3>${ this.title}</h3>
                </div>
                <div class="modal-body">
                    <div class="icon"><img src="assets/img/${ this.isType(type)}" style="width:40px;height:40px;" alt="Warning"></div>
                    <p>
                        ${ message}
                    </p>                       
                </div>
                <div class="modal-footer">
                    <button type="submit" id="btn-ok" class="btn btn-secondary pull-right close">OK</button>
                </div>
            </div>
        `;
};

Modal.prototype.createModalCancelChanges = function (title, message) {

    return `
            <div class="modal-alert">
                <div class="modal-header containerDivHeader" id="divContainerConfirmationHeader">                
                    <h3>${title}</h3>
                </div>

                <div class="modal-body">                
                    <div class="icon"><img src="assets/img/warning.png" style="width:40px;height:40px;" alt="Warning"></div>
                    <div>
                        <p>
                            ${message}
                        </p>
                    </div>
                </div>   

                <div class="modal-footer">
                    <button type="submit" id="btn-cancel" class="btn btn-primary pull-left">No</button>
                    <button type="submit" id="btn-ok" class="btn btn-secondary pull-right">Yes</button>
                </div>
            </div>
        `;
};

Modal.prototype.isType = function (type) {

    if (type == undefined ||
        type == null ||
        type === 'warning') {

        type = 'warning.png';
    }
    else if (type == 'checked') {
        type = 'checked.png';
    }
    return type;
};

Modal.prototype.init = function () {

    let appGraph = document.querySelector('.graph-component');

    // Create div Modal
    this.modalDiv = document.createElement('div');
    this.modalDiv.classList.add('modal');
    appGraph.appendChild(this.modalDiv);

    // Create Content Modal
    this.contentModal = document.createElement('div');
    this.contentModal.className = 'container containerDiv';

    this.addListeners();
};

Modal.prototype.addListeners = function () {
    this.contentModal.addEventListener('keydown', (event) => {
        if (event.keyCode == 9) { //Tab
            event.preventDefault();
            var modalInputs = this.modalDiv.getElementsByTagName('input');
            var modalButtons = this.modalDiv.getElementsByTagName('button');
            var modalControls = [];

            if (modalInputs != null && modalInputs != undefined && modalInputs.length > 0) {
                for (let index = 0; index < modalInputs.length; index++) {
                    const element = modalInputs[index];
                    modalControls.push(element);
                }
            }

            if (modalButtons != null && modalButtons != undefined && modalButtons.length > 0) {
                for (let index = 0; index < modalButtons.length; index++) {
                    const element = modalButtons[index];
                    modalControls.push(element);
                }
            }

            if (modalControls != null && modalControls != undefined && modalControls.length > 0) {
                for (let index = 0; index < modalControls.length; index++) {
                    const element = modalControls[index];
                    if (document.activeElement.id == element.id) {
                        if (index == modalControls.length - 1) {
                            modalControls[0].focus();
                            event.preventDefault();
                            return;
                        }
                        else
                        {
                            modalControls[index+1].focus();
                            return;
                        }
                    }
                }
            }
        }
    });
};

Modal.prototype.addDraggableFunction = function (elementName) {

    // Make the DIV element draggable:
    dragElement(document.getElementById(elementName));

    function dragElement(elmnt) {

        const containerDiv = elmnt.parentElement.parentElement;

        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id)) {
            // if present, the header is where you move the DIV from:
            document.getElementById(elmnt.id).onmousedown = dragMouseDown;
        } else {
            // otherwise, move the DIV from anywhere inside the DIV: 
            containerDiv.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            containerDiv.style.top = (containerDiv.offsetTop - pos2) + "px";
            containerDiv.style.left = (containerDiv.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
};

Modal.prototype.removeListeners = function () {
    this.contentModal.removeEventListener('keydown', (event) => { });
};

Modal.prototype.createContent = function (content) {
    this.contentModal.innerHTML = content;
    this.modalDiv.appendChild(this.contentModal);

    //this.addDraggableFunction();

    var startPosition = this.contentModal.innerHTML.indexOf('id="divContainer') + 4;
    var divContainerName = this.contentModal.innerHTML.substring(startPosition, this.contentModal.innerHTML.indexOf('"', startPosition));

    this.addDraggableFunction(divContainerName);

    return this.contentModal;
};

Modal.prototype.createContentWithId = function (content, Id) {
    this.contentModal.innerHTML = content;

    this.modalDiv.id = Id;
    this.modalDiv.appendChild(this.contentModal);

    var startPosition = this.contentModal.innerHTML.indexOf('id="divContainer') + 4;
    var divContainerName = this.contentModal.innerHTML.substring(startPosition, this.contentModal.innerHTML.indexOf('"', startPosition));

    this.addDraggableFunction(divContainerName);

    return this.contentModal;
};

Modal.prototype.close = function () {
    this.modalDiv.classList.remove('open');
    this.removeListeners();
    this.removeContent();
};

Modal.prototype.closeById = function (Id) {
    document.getElementById(Id).classList.remove('open');
    this.removeListenersById(Id);
    this.removeContentById(Id);
};

Modal.prototype.open = function () {
    this.modalDiv.classList.add('open');

    //this.dragElement(document.getElementById("mydiv"));
};

Modal.prototype.removeContent = function () {

    let content = document.querySelector(".modal");

    if (content != null)
        content.remove();
};

Modal.prototype.removeContentById = function (Id) {

    let content = document.getElementById(Id);

    if (content != null)
        content.remove();
};

Modal.prototype.removeListenersById = function (Id) {
    document.getElementById(Id).querySelector(".container").removeEventListener('keydown', (event) => { });
};