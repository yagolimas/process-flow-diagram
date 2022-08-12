NetworkDefaultModel = function(){
    this.application;
    this.option1;
    this.option2;
    this.option3;
    this.option4;
};

NetworkDefaultModel.prototype.get = function() {
    return this;
};

NetworkDefaultModel.prototype.set = function(application, option1, option2, option3, option4) {
    
    this.application = application;
    this.option1 = option1;
    this.option2 = option2;
    this.option3 = option3;
    this.option4 = option4;

    return this;
};
  
function NetworkModel() {
  NetworkDefaultModel.call(this); // call super constructor.
}

// subclass extends superclass
NetworkModel.prototype = Object.create(NetworkDefaultModel.prototype);
NetworkModel.prototype.constructor = NetworkModel;

// superclass method
// NetworkDefaultModel.prototype.move = function(application) {
//     this.application += application;
//     console.info('NetworkDefaultModel moved.');
//   };