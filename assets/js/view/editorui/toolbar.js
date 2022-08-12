toolbarOptions = ['group', 'ungroup', 'cut', 'copy', 'paste', 'delete', 'undo', 'redo', 'print', 'show', 'saveAsImage', 'Autoname'];

Toolbar = function(){
    this.init();
};

Toolbar.prototype.init = function() {
    // let toolbarContainer = document.querySelector(".toolbarContainer");
    // addToolbarButton(toolbarContainer, 'undo', 'Undo', 'images/undo.png');
    //Create select actions in page
    var node = document.querySelector('.toolbarContainer');

    for (var i = 0; i < toolbarOptions.length; i++)
    {
        var button = document.createElement('button');        
        mxUtils.write(button, toolbarOptions[i]);
        //mxUtils.write(button, mxResources.get(toolbarOptions[i]));
    
        var factory = function(name)
        {
            return function()
            {
                editor.execute(name);
            };
        };
    
        if(toolbarOptions[i] == "undo"){
            mxEvent.addListener(button, 'click', function()
            {
                graphEditor.undo();
            });
            node.appendChild(button);
        }
        else if(toolbarOptions[i] == "redo"){
            mxEvent.addListener(button, 'click', function()
            {
                graphEditor.redo();
            });
            node.appendChild(button);
        }
        else if(toolbarOptions[i] == "Autoname"){
            mxEvent.addListener(button, 'click', function()
            {
                let content = modal.createModalAutoname();
                modal.removeContent();
                modal.createContent(content);
                modal.open();

                getNames();

                const $buttonOk = document.querySelector("#save-autoname");

                $buttonOk.onclick = function() {
                    setNames();
                    modal.close();
                }

            });
            node.appendChild(button);
        }
        else if(toolbarOptions[i] == "Show/Hide Tools"){
            mxEvent.addListener(button, 'click', function()
            {
                sideBar.showHideTools();
            });
            node.appendChild(button);
        }
        else{
            mxEvent.addListener(button, 'click', factory(toolbarOptions[i]));
            node.appendChild(button);
        }
    }
};

// Toolbar.prototype.addToolbarButton = function(toolbar, action, label, image, isTransparent)
// {
//     var button = document.createElement('button');
//     button.style.fontSize = '10';
//     if (image != null)
//     {
//         var img = document.createElement('img');
//         img.setAttribute('src', image);
//         img.style.width = '16px';
//         img.style.height = '16px';
//         img.style.verticalAlign = 'middle';
//         img.style.marginRight = '2px';
//         button.appendChild(img);
//     }
    
//     // if (isTransparent)
//     // {
//     //     button.style.background = 'transparent';
//     //     button.style.color = '#FFFFFF';
//     //     button.style.border = 'none';
//     // }

//     mxEvent.addListener(button, 'click', function(evt)
//     {
//         editor.execute(action);
//     });
    
//     mxUtils.write(button, label);
//     toolbar.appendChild(button);
// }