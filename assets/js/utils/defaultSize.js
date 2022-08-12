function defaultSize() {

    graph.scrollTileSize = new mxRectangle(0, 0, 100, 100);
   
    graph.getPagePadding = function()
    {
        return new mxPoint(Math.max(0, Math.round(graph.container.offsetWidth - 50)),
                Math.max(0, Math.round(graph.container.offsetHeight - 50)));
    };
    
    graph.getPageSize = function()
    {
        return (this.pageVisible) ? new mxRectangle(0, 0, this.pageFormat.width * this.pageScale,
                this.pageFormat.height * this.pageScale) : this.scrollTileSize;
    };

    graph.getPageLayout = function()
    {
        let size = (this.pageVisible) ? this.getPageSize() : this.scrollTileSize;
        let bounds = this.getGraphBounds();

        if (bounds.width == 0 || bounds.height == 0)
        {
            return new mxRectangle(0, 0, 1, 1);
        }
        else
        {
            let x = Math.ceil(bounds.x / this.view.scale - this.view.translate.x);
            let y = Math.ceil(bounds.y / this.view.scale - this.view.translate.y);
            let w = Math.floor(bounds.width / this.view.scale);
            let h = Math.floor(bounds.height / this.view.scale);
            
            let x0 = Math.floor(x / size.width);
            let y0 = Math.floor(y / size.height);
            let w0 = Math.ceil((x + w) / size.width) - x0;
            let h0 = Math.ceil((y + h) / size.height) - y0;
            
            return new mxRectangle(x0, y0, w0, h0);
        }
    };

    graph.view.getBackgroundPageBounds = function()
    {
        let layout = this.graph.getPageLayout();
        let page = this.graph.getPageSize();
        
        return new mxRectangle(this.scale * (this.translate.x + layout.x * page.width),
                this.scale * (this.translate.y + layout.y * page.height),
                this.scale * layout.width * page.width,
                this.scale * layout.height * page.height);
    };
    
    graph.getPreferredPageSize = function(bounds, width, height)
    {
        let pages = this.getPageLayout();
        let size = this.getPageSize();
        
        return new mxRectangle(0, 0, pages.width * size.width, pages.height * size.height);
    };

    var graphViewValidate = graph.view.validate;
    graph.view.validate = function()
    {
        if (this.graph.container != null && mxUtils.hasScrollbars(this.graph.container))
        {
            let pad = this.graph.getPagePadding();
            let size = this.graph.getPageSize();
            
            let tx = this.translate.x;
            let ty = this.translate.y;
            this.translate.x = pad.x / this.scale - (this.x0 || 0) * size.width;
            this.translate.y = pad.y / this.scale - (this.y0 || 0) * size.height;
        }
        
        graphViewValidate.apply(this, arguments);
    };
    
    var graphSizeDidChange = graph.sizeDidChange;
    graph.sizeDidChange = function()
    {
        if (this.container != null && mxUtils.hasScrollbars(this.container))
        {
            let pages = this.getPageLayout();
            let pad = this.getPagePadding();
            let size = this.getPageSize();
            
            let minw = Math.ceil(2 * pad.x / this.view.scale + pages.width * size.width);
            let minh = Math.ceil(2 * pad.y / this.view.scale + pages.height * size.height);
            
            let min = graph.minimumGraphSize;
            
            if (min == null || min.width != minw || min.height != minh)
            {
                graph.minimumGraphSize = new mxRectangle(0, 0, minw, minh);
            }
            
            let dx = pad.x / this.view.scale - pages.x * size.width;
            let dy = pad.y / this.view.scale - pages.y * size.height;
            
            if (!this.autoTranslate && (this.view.translate.x != dx || this.view.translate.y != dy))
            {
                this.autoTranslate = true;
                this.view.x0 = pages.x;
                this.view.y0 = pages.y;

                let tx = graph.view.translate.x;
                let ty = graph.view.translate.y;

                graph.view.setTranslate(dx, dy);
                graph.container.scrollLeft += (dx - tx) * graph.view.scale;
                graph.container.scrollTop += (dy - ty) * graph.view.scale;

                this.autoTranslate = false;
                return;
            }

            graphSizeDidChange.apply(this, arguments);
        }
    };
}