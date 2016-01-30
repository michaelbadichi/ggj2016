var _ = require("lodash");

function World(options) {
    this._level = 1;
    this._running = true;
    this._objects = [];
    this._lastUpdate = null;
    // For now...
    this.canvas = this._canvas = options.canvas;
    this.context = this._context = options.context;
    this.assets = this._assets = options.assets;
}

World.prototype.addObject = function(obj) {
    this._objects.push(obj);
};

World.prototype.removeObject = function(obj) {
    _.pull(this._objects, obj);
};

World.prototype.start = function() {
    requestAnimationFrame(this.update.bind(this));
};

World.prototype.update = function(now) {
    if (!this._lastUpdate) {
        this._lastUpdate = now;
    }
    if (!this._running) {
        return;
    }
    var interval = now - this._lastUpdate;
    this._lastUpdate = now;

    this._context.fillStyle = "#000040";
    this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);

    //multiply interval by 1.level making the game faster as we advance
    interval *= 1.0 + ((this._level-1)/10.0);

    this._objects.forEach(function(obj) {
        obj.update(interval);
    });

    this._objects.forEach(function(obj) {
        obj.draw();
    });

    requestAnimationFrame(this.update.bind(this));
};

module.exports = World;
