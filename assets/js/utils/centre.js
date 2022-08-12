function centre() {
    graph.center()
}

function realCentre() {
    
    let container = document.querySelector(".graphBackground");

    container.scrollLeft = scrollMiddleWidth(container);
    container.scrollTop = scrollMiddleHeight(container);
}

function scrollMiddleWidth(container) {
    // var sw = this.container.scrollWidth;
    // var sh = this.container.scrollHeight;
    return (container.scrollWidth / 2) - (container.offsetWidth / 2);
};

function scrollMiddleHeight(container) {
    return (container.scrollHeight / 2) - (container.offsetHeight / 2);
};