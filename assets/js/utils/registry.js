const stencilRegistry = (shape, attr) => {
    
    while (shape != null)
    {
        if (shape.nodeType == mxConstants.NODETYPE_ELEMENT)
        {
            mxStencilRegistry.addStencil(shape.getAttribute(attr), new mxStencil(shape));
        }            
        shape = shape.nextSibling;
    }
}