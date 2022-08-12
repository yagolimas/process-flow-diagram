function orderStream(stream) {
    let parent = graph.getModel().getParent(stream);
                    
    if (stream != null) {
        if (stream.edge) {
            graph.getModel().add(parent, stream, 0);
        }
    }
}
